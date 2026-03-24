import { Pool, ResultSetHeader } from "mysql2/promise";
import {
  ErrorResponse,
  Result,
  SuccessResponse,
  User,
  UserResponse,
} from "../../utils";
import { connection } from "../../config/mysql.db";
import {
  CreateReservation,
  Reservation,
} from "../../utils/models/reservation.model";

export const createReservation = async (
  payload: CreateReservation,
): Promise<Result<SuccessResponse<{ id: string }>, ErrorResponse>> => {
  const db = connection();
  const { v4: uuidv4 } = await import("uuid");
  const id = uuidv4();

  try {
    const [slotRows]: any = await db.query(
      `SELECT slotStatus FROM parking_slot WHERE id = ? FOR UPDATE`,
      [payload.slotId],
    );

    if (slotRows.length === 0) {
      await db.rollback();
      return {
        success: false,
        error: {
          statusCode: 404,
          errorMessage: "Parking slot not found",
        },
      };
    }

    if (slotRows[0].slotStatus !== "AVAILABLE") {
      await db.rollback();
      return {
        success: false,
        error: {
          statusCode: 409,
          errorMessage: "Parking slot is already occupied",
        },
      };
    }

    await db.query(
      `INSERT INTO vehicle (licensePlate, carType, ownerId) 
        VALUES (?, ?, ?) 
        ON DUPLICATE KEY UPDATE 
        carType = VALUES(carType),
        ownerId = VALUES(ownerId)`,
      [payload.licensePlate, payload.carType ?? null, payload.userId],
    );
    await db.query(
      `
      INSERT INTO reservation (
        id, slotId, userId, licensePlate, carType,
        startTime, endTime, amount, paymentMethod, paymentStatus, reservationDate
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
      [
        id,
        payload.slotId,
        payload.userId,
        payload.licensePlate,
        payload.carType ?? null,
        payload.startTime,
        payload.endTime,
        payload.amount,
        payload.paymentMethod ?? null,
        payload.paymentStatus ?? "PENDING",
        payload.reservationDate,
      ],
    );

    await db.query(
      `
      UPDATE parking_slot
      SET
        carOccupied = ?,
        slotStatus = 'RESERVED'
      WHERE id = ?
      `,
      [payload.licensePlate, payload.slotId],
    );

    return {
      success: true,
      data: {
        statusCode: 201,
        message: "Reservation created successfully",
        data: { id },
      },
    };
  } catch (error: any) {
    return {
      success: false,
      error: {
        statusCode: 500,
        errorMessage: error instanceof Error ? error.message : String(error),
      },
    };
  }
};

export const getReservationsByUserId = async (
  userId: string,
): Promise<Result<SuccessResponse<Reservation[]>, ErrorResponse>> => {
  const db = connection();

  try {
    const [rows] = await db.execute(
      "SELECT 1 FROM users WHERE id = ? LIMIT 1",
      [userId],
    );

    const users = rows as User[];

    if (users.length < 0) {
      return {
        success: false,
        error: {
          errorMessage: "User not found",
          statusCode: 404,
        },
      };
    }

    const [query] = await db.query(
      `
    SELECT 
      r.id,
      r.userId,
      r.licensePlate,
      r.carType,
      r.startTime,
      r.endTime,
      r.amount,
      r.paymentMethod,
      r.paymentStatus,
      r.paymentResult,
      r.isPaid,
      r.paidAt,
      r.reservationDate,
      r.createdAt,
      r.updatedAt,
      p.slotName
    FROM reservation r
    INNER JOIN parking_slot p ON r.slotId = p.id
    WHERE r.userId = ?
  `,
      [userId],
    );

    const reservations = query as Reservation[];

    return {
      success: true,
      data: {
        statusCode: 200,
        message: `Reservation found for current user`,
        data: reservations.length > 0 ? reservations : [],
      },
    };
  } catch (error: any) {
    return {
      success: false,
      error: {
        statusCode: 500,
        errorMessage: error instanceof Error ? error.message : String(error),
      },
    };
  }
};

export const getAllReservations = async (): Promise<
  Result<SuccessResponse<Reservation[]>, ErrorResponse>
> => {
  const db = connection();
  try {
    const [query] = await db.query(
      `
    SELECT 
      r.id,
      r.userId,
      r.licensePlate,
      r.carType,
      r.startTime,
      r.endTime,
      r.amount,
      r.paymentMethod,
      r.paymentStatus,
      r.paymentResult,
      r.isPaid,
      r.paidAt,
      r.reservationDate,
      r.createdAt,
      r.updatedAt,
      p.slotName
    FROM reservation r
    INNER JOIN parking_slot p ON r.slotId = p.id
  
  `,
    );

    const reservations = query as Reservation[];

    return {
      success: true,
      data: {
        statusCode: 200,
        message: "Reservations retrieved successfully",
        data: reservations.length > 0 ? reservations : [],
      },
    };
  } catch (error) {
    return {
      success: false,
      error: {
        statusCode: 500,
        errorMessage: error instanceof Error ? error.message : String(error),
      },
    };
  }
};

export const deleteReservationById = async (
  reservationId: string,
): Promise<Result<SuccessResponse, ErrorResponse>> => {
  const db = connection();

  try {
    // 1. Fetch reservation FIRST
    const [rows] = await db.query(
      `SELECT slotId, licensePlate FROM reservation WHERE id = ? FOR UPDATE`,
      [reservationId],
    );

    const reservations = rows as Reservation[];

    if (reservations.length === 0) {
      await db.rollback();
      return {
        success: false,
        error: {
          statusCode: 404,
          errorMessage: "Reservation not found",
        },
      };
    }

    const { slotId, licensePlate } = reservations[0]!;

    // 2. Delete reservation
    const [result] = await db.execute(`DELETE FROM reservation WHERE id = ?`, [
      reservationId,
    ]);

    const deleteResult = result as ResultSetHeader;

    if (deleteResult.affectedRows === 0) {
      await db.rollback();
      return {
        success: false,
        error: {
          statusCode: 404,
          errorMessage: "Reservation not found",
        },
      };
    }

    // 3. Only update if licensePlate exists
    if (licensePlate && licensePlate !== "") {
      await db.execute(
        `
        UPDATE parking_slot
        SET 
          carOccupied = '',
          slotStatus = 'AVAILABLE'
        WHERE id = ?
        `,
        [slotId],
      );
    }

    return {
      success: true,
      data: {
        statusCode: 200,
        message: "Reservation deleted and slot updated",
      },
    };
  } catch (error) {
    return {
      success: false,
      error: {
        statusCode: 500,
        errorMessage: error instanceof Error ? error.message : String(error),
      },
    };
  }
};

export const updateReservationStatus = async (
  reservationId: string,
): Promise<Result<SuccessResponse, ErrorResponse>> => {
  const db = connection();
  try {
    const query = `
        UPDATE reservation
        SET paymentStatus = ?,
            isPaid = ?,
            paidAt = NOW()
        WHERE id = ?
      `;

    const [result] = await db.execute(query, ["PAID", true, reservationId]);

    const insertResult = result as ResultSetHeader;

    if (insertResult.affectedRows === 0) {
      return {
        success: false,
        error: {
          statusCode: 404,
          errorMessage: "Reservation not found",
        },
      };
    }

    return {
      success: true,
      data: {
        statusCode: 200,
        message: "Reservation updated successfully",
      },
    };
  } catch (error) {
    return {
      success: false,
      error: {
        statusCode: 500,
        errorMessage: error instanceof Error ? error.message : String(error),
      },
    };
  }
};

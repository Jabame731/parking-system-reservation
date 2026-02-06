import { Pool } from "mysql2/promise";
import { ErrorResponse, Result, SuccessResponse } from "../../utils";
import { connection } from "../../config/mysql.db";
import { CreateReservation } from "../../utils/models/reservation.model";

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

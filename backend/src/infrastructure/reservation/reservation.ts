import { Pool } from "mysql2/promise";
import { ErrorResponse, Result, SuccessResponse } from "../../utils";
import { connection } from "../../config/mysql.db";
import { CreateReservation } from "../../utils/models/reservation.model";

export const createReservation = async (
  payload: CreateReservation
): Promise<Result<SuccessResponse, ErrorResponse>> => {
  const db = connection();

  try {
    const [slotRows]: any = await db.query(
      `SELECT status FROM parking_slot WHERE id = ? FOR UPDATE`,
      [payload.slotId]
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

    if (slotRows[0].status !== "AVAILABLE") {
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
      `
      INSERT INTO reservation (
        id, slotId, userId, licensePlate, carType,
        startTime, endTime, amount, paymentMethod, paymentStatus
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
      [
        payload.id,
        payload.slotId,
        payload.userId,
        payload.licensePlate,
        payload.carType ?? null,
        payload.startTime,
        payload.endTime,
        payload.amount,
        payload.paymentMethod ?? null,
        payload.paymentStatus ?? "PENDING",
      ]
    );

    await db.query(
      `
      UPDATE parking_slot
      SET
        carOccupied = ?,
        status = 'OCCUPIED'
      WHERE id = ?
      `,
      [payload.licensePlate, payload.slotId]
    );

    await db.query(
      `
      UPDATE vehicle
      SET carType = ?
      WHERE licensePlate = ?
      `,
      [payload.carType ?? null, payload.licensePlate]
    );

    return {
      success: true,
      data: {
        statusCode: 201,
        message: "Reservation created successfully",
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

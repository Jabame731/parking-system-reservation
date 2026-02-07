import { connection } from "../../config/mysql.db";
import { ErrorResponse, Parking, Result, SuccessResponse } from "../../utils";
import { Reservation } from "../../utils/models/reservation.model";

/**
 *
 * @returns array of strings parking slot if the area is active
 */
export const getAvailableSlots = async (): Promise<
  Result<SuccessResponse<string[]>, ErrorResponse>
> => {
  const db = connection();

  try {
    const [rows] = await db.execute(
      `
            SELECT slotName
            FROM parking_slot
            WHERE sensorStatus = 'ACTIVE'
            ORDER BY slotName
        `,
    );

    const slotNames = (rows as Parking[]).map((r: Parking) => r.slotName);

    return {
      success: true,
      data: {
        statusCode: 200,
        message: "Slot name retrieved successfully",
        data: slotNames,
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

/**
 *
 * @param payload id and value of the parking slot
 * @returns success message once the function is valid
 */
export const updateSensorSlot = async (payload: {
  slotId: string;
  sensorValue: number;
}): Promise<Result<SuccessResponse, ErrorResponse>> => {
  const db = connection();
  try {
    const { slotId, sensorValue } = payload;

    const sensor = Number(sensorValue) === 1;
    const status = Number(sensorValue) === 1 ? "OCCUPIED" : "AVAILABLE";

    const [rows] = await db.execute(
      `SELECT id, carOccupied FROM parking_slot WHERE slotName = ?`,
      [slotId],
    );

    const parkingSlots = rows as Parking[];
    const parkingSlot = parkingSlots[0]!;

    const car = sensorValue === 0 ? "" : parkingSlot.carOccupied;

    if (parkingSlots.length === 0) {
      return {
        success: false,
        error: {
          statusCode: 404,
          errorMessage: "Parking slot not found",
        },
      };
    }

    const slotPkId = parkingSlots[0]?.id;

    if (sensorValue === 0) {
      const [resRows] = await db.execute(
        `
          SELECT id FROM reservation
          WHERE slotId = ? AND endTime IS NULL
        `,
        [slotPkId],
      );

      const reservations = resRows as Reservation[];

      if (reservations.length > 0) {
        const reservationId = reservations[0]?.id;

        await db.execute(
          `
            UPDATE reservation
            SET endTime = NOW()
            WHERE id = ?
          `,
          [reservationId],
        );
      }
    }

    await db.execute(
      `
        UPDATE parking_slot
        SET sensorValue = ?, slotStatus = ?, carOccupied = ?, updatedAt = NOW()
        WHERE slotName = ?
      `,
      [sensor, status, car, slotId],
    );

    return {
      success: true,
      data: {
        statusCode: 200,
        message: "Parking slot updated successfully",
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

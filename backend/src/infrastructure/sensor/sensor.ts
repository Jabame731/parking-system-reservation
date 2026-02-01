import { connection } from "../../config/mysql.db";
import { ErrorResponse, Parking, Result, SuccessResponse } from "../../utils";

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
            WHERE slotStatus = 'AVAILABLE'
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

    const sensor = sensorValue === 1;
    const status = sensorValue === 1 ? "OCCUPIED" : "AVAILABLE";

    const [rows] = await db.execute(
      `SELECT id FROM parking_slot WHERE slotName = ?`,
      [slotId],
    );

    if ((rows as any[]).length === 0) {
      return {
        success: false,
        error: {
          statusCode: 404,
          errorMessage: "Parking slot not found",
        },
      };
    }

    await db.execute(
      `
        UPDATE parking_slot
        SET sensorValue = ?, slotStatus = ? updatedAt = NOW()
        WHERE slotName = ?
      `,
      [sensor, status, slotId],
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

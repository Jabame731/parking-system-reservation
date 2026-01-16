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
            WHERE status = 'Active'
            ORDER BY slotName

        `
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

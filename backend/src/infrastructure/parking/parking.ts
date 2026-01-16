import { connection } from "../../config/mysql.db";
import {
  CreateParking,
  ErrorResponse,
  Parking,
  Result,
  SuccessResponse,
} from "../../utils";

export const createParkingSlot = async (
  parking: CreateParking
): Promise<Result<SuccessResponse<Partial<Parking>>, ErrorResponse>> => {
  const db = connection();
  const { v4: uuidv4 } = await import("uuid");
  const id = uuidv4();

  try {
    const [slotCheck] = await db.execute(
      "SELECT * FROM `parking_slot` WHERE `slotName` = ?",
      [parking.slotName]
    );

    if ((slotCheck as any[]).length > 0) {
      return {
        success: false,
        error: {
          errorMessage: "Slot name is already created.",
          statusCode: 409,
        },
      };
    }

    const query =
      "INSERT INTO parking_slot (id, slotName, status, carOccupied, createdBy) VALUES (?, ?, ?, ?, ?)";

    await db.execute(query, [
      id,
      parking.slotName,
      parking.status,
      parking.carOccupied,
      parking.createdBy,
    ]);

    const response: Partial<Parking> = {
      id,
      slotName: parking.slotName,
      status: parking.status,
      carOccupied: parking.carOccupied,
      createdBy: parking.createdBy,
    };

    return {
      success: true,
      data: {
        statusCode: 201,
        message: "Parking lot created successfully",
        data: response,
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

export const getAllParkingSlots = async (): Promise<
  Result<SuccessResponse<Parking[]>, ErrorResponse>
> => {
  const db = connection();

  try {
    const [rows] = await db.execute("SELECT * FROM parking_slot");

    return {
      success: true,
      data: {
        statusCode: 200,
        message: "Records retrieved successfully",
        data: rows as Parking[],
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

export const getParkingSlotById = async (
  slotId: string
): Promise<Result<SuccessResponse<Parking>, ErrorResponse>> => {
  const db = connection();
  try {
    const [rows]: any = await db.execute(
      "SELECT * FROM parking_lot WHERE id = ?",
      [slotId]
    );
    if (rows.length === 0) {
      return {
        success: false,
        error: { statusCode: 404, errorMessage: "Parking lot not found" },
      };
    }
    return {
      success: true,
      data: {
        statusCode: 200,
        message: "Record found",
        data: rows[0] as Parking,
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

export const updateParkingSlot = async (
  parking: Partial<Parking>
): Promise<Result<SuccessResponse, ErrorResponse>> => {
  const db = connection();

  try {
    if (
      parking.slotName === undefined &&
      parking.carOccupied === undefined &&
      parking.status === undefined
    ) {
      return {
        success: false,
        error: {
          statusCode: 400,
          errorMessage: "No fields provided for update",
        },
      };
    }

    const updatedAt = new Date();

    const query = `
      UPDATE parking_slot
      SET slotName = ?,
          carOccupied = ?,
          status = ?,
          updatedAt = ?
      WHERE id = ?
    `;

    const [result]: any = await db.execute(query, [
      parking.slotName ?? null,
      parking.carOccupied ?? null,
      parking.status ?? null,
      updatedAt,
      parking.id,
    ]);

    if (result.affectedRows === 0) {
      return {
        success: false,
        error: {
          statusCode: 404,
          errorMessage: "Parking slot not found",
        },
      };
    }

    return {
      success: true,
      data: {
        statusCode: 200,
        message: "Parking slot updated successfully",
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

export const deleteParkingSlot = async (
  id: string
): Promise<Result<SuccessResponse, ErrorResponse>> => {
  const db = connection();
  try {
    const [result]: any = await db.execute(
      "DELETE FROM parking_lot WHERE id = ?",
      [id]
    );
    if (result.affectedRows === 0) {
      return {
        success: false,
        error: { statusCode: 404, errorMessage: "Parking lot not found" },
      };
    }
    return {
      success: true,
      data: { statusCode: 200, message: "Parking lot deleted successfully" },
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

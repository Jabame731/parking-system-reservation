import { connection } from "../../config/mysql.db";
import {
  CreateParking,
  ErrorResponse,
  Parking,
  ParkingResponseData,
  Result,
  SuccessResponse,
} from "../../utils";

export const createParkingSlot = async (
  parking: CreateParking,
): Promise<Result<SuccessResponse<Partial<Parking>>, ErrorResponse>> => {
  const db = connection();
  const { v4: uuidv4 } = await import("uuid");
  const id = uuidv4();

  try {
    const [slotCheck] = await db.execute(
      "SELECT * FROM `parking_slot` WHERE `slotName` = ?",
      [parking.slotName],
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
      "INSERT INTO parking_slot (id, slotName, slotStatus, carOccupied, createdBy) VALUES (?, ?, ?, ?, ?)";

    await db.execute(query, [
      id,
      parking.slotName,
      parking.slotStatus,
      parking.carOccupied,
      parking.createdBy,
    ]);

    const response: Partial<Parking> = {
      id,
      slotName: parking.slotName,
      slotStatus: parking.slotStatus,
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
  Result<SuccessResponse<ParkingResponseData>, ErrorResponse>
> => {
  const db = connection();

  const query = `
    SELECT 
      ps.*,
      r.id as reservationId,
      r.userId as userId,
      r.carType,
      r.isPaid, 
      r.paymentResult 
    FROM parking_slot ps
    LEFT JOIN reservation r ON ps.id = r.slotId AND r.endTime IS NULL
  `;

  try {
    const [rows] = await db.execute(query);
    const parkingData = rows as Parking[];

    const stats = parkingData.reduce(
      (acc, slot) => {
        acc.totalSlots++;

        if (slot.slotStatus === "OCCUPIED") acc.occupiedSlots++;
        else if (slot.slotStatus === "RESERVED") acc.reservedSlots++;

        return acc;
      },
      {
        totalSlots: 0,
        occupiedSlots: 0,
        reservedSlots: 0,
      },
    );

    const availableSlots =
      stats.totalSlots - stats.occupiedSlots - stats.reservedSlots;

    return {
      success: true,
      data: {
        statusCode: 200,
        message: "Records retrieved successfully",
        data: {
          slots: parkingData,
          stats: {
            totalSlots: stats.totalSlots,
            availableSlots,
            occupiedSlots: stats.occupiedSlots,
          },
        },
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
  slotId: string,
): Promise<Result<SuccessResponse<Parking>, ErrorResponse>> => {
  const db = connection();
  try {
    const [rows]: any = await db.execute(
      "SELECT * FROM parking_lot WHERE id = ?",
      [slotId],
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
  parking: Partial<Parking>,
): Promise<Result<SuccessResponse, ErrorResponse>> => {
  const db = connection();

  try {
    if (
      parking.slotName === undefined &&
      parking.carOccupied === undefined &&
      parking.slotStatus === undefined
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
      parking.slotStatus ?? null,
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
  id: string,
): Promise<Result<SuccessResponse, ErrorResponse>> => {
  const db = connection();
  try {
    const [result]: any = await db.execute(
      "DELETE FROM parking_lot WHERE id = ?",
      [id],
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

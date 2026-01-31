import { Request, Response } from "express";
import { ErrorResponse, Parking, Result, SuccessResponse } from "../../utils";
import {
  createParkingSlot,
  deleteParkingSlot,
  getAllParkingSlots,
  getParkingSlotById,
  updateParkingSlot,
} from "../../infrastructure";

export const createParkingSlotController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const result: Result<
    SuccessResponse<Partial<Parking>>,
    ErrorResponse
  > = await createParkingSlot(req.body);

  if (!result.success) {
    res.status(result.error.statusCode).json({
      error: result.error.errorMessage,
    });

    return;
  }

  res.status(result.data.statusCode).json({
    message: result.data.message,
    data: result.data.data,
  });
};

export const getAllParkingSlotsController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const result: Result<
    SuccessResponse<Parking[]>,
    ErrorResponse
  > = await getAllParkingSlots();

  if (!result.success) {
    res.status(result.error.statusCode).json({
      error: result.error.errorMessage,
    });

    return;
  }

  res.status(result.data.statusCode).json({
    message: result.data.message,
    data: result.data.data,
  });
};

export const getParkingSlotByIdController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const slot = req.params.id;
  if (!slot || typeof slot !== "string") {
    res.status(400).json({
      error: 'Missing or invalid "parking slot" query parameter',
    });
    return;
  }

  const result: Result<
    SuccessResponse<Parking>,
    ErrorResponse
  > = await getParkingSlotById(slot);

  if (!result.success) {
    res.status(result.error.statusCode).json({
      error: result.error.errorMessage,
    });

    return;
  }

  res.status(result.data.statusCode).json({
    message: result.data.message,
    data: result.data.data,
  });
};

export const updateParkingSlotController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const result: Result<SuccessResponse, ErrorResponse> =
    await updateParkingSlot(req.body);

  if (!result.success) {
    res.status(result.error.statusCode).json({
      error: result.error.errorMessage,
    });

    return;
  }

  res.status(result.data.statusCode).json({
    message: result.data.message,
    data: result.data.data,
  });
};

export const deleteParkingSlotController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const result: Result<SuccessResponse, ErrorResponse> =
    await deleteParkingSlot(req.body);

  if (!result.success) {
    res.status(result.error.statusCode).json({
      error: result.error.errorMessage,
    });

    return;
  }

  res.status(result.data.statusCode).json({
    message: result.data.message,
    data: result.data.data,
  });
};

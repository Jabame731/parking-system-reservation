import { Request, Response } from "express";
import {
  createReservation,
  deleteReservationById,
  getAllReservations,
  getReservationsByUserId,
  updateReservationStatus,
} from "../../infrastructure";
import { ErrorResponse, Result, SuccessResponse } from "../../utils";
import { Reservation } from "../../utils/models/reservation.model";

export const createReservationController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const result: Result<
    SuccessResponse<{ id: string }>,
    ErrorResponse
  > = await createReservation(req.body);

  if (!result.success) {
    res.status(result.error.statusCode).json({
      error: result.error.errorMessage,
    });

    return;
  }

  const id = result.data.data?.id;

  res
    .status(result.data.statusCode)
    .set({
      "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
      Pragma: "no-cache",
      Expires: "0",
    })
    .setHeader("Access-Control-Expose-Headers", "Location")
    .location(`/reservation/${id}`)
    .json({
      message: result.data.message,
    });
};

export const getReservationsByUserIdController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { id } = req.params;

  const result: Result<
    SuccessResponse<Reservation[]>,
    ErrorResponse
  > = await getReservationsByUserId(id!);

  if (!result.success) {
    res.status(result.error.statusCode).json({
      error: result.error.errorMessage,
    });

    return;
  }

  res
    .status(result.data.statusCode)
    .set({
      "Cache-Control": "no-store",
      Pragma: "no-cache",
      Expires: "0",
    })
    .json({
      message: result.data.message,
      data: result.data.data,
    });
};

export const getAllReservationsController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const result: Result<
    SuccessResponse<Reservation[]>,
    ErrorResponse
  > = await getAllReservations();

  if (!result.success) {
    res.status(result.error.statusCode).json({
      error: result.error.errorMessage,
    });

    return;
  }

  const { data, ...other } = result.data;

  res
    .status(result.data.statusCode)
    .set({
      "Cache-Control": "no-store",
      Pragma: "no-cache",
      Expires: "0",
    })
    .json({
      message: result.data.message,
      data: data,
    });
};

export const deleteReservationByIdController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { id } = req.params;

  const result: Result<SuccessResponse, ErrorResponse> =
    await deleteReservationById(id!!);

  if (!result.success) {
    res.status(result.error.statusCode).json({
      error: result.error.errorMessage,
    });

    return;
  }

  res
    .status(result.data.statusCode)
    .set({
      "Cache-Control": "no-store",
      Pragma: "no-cache",
      Expires: "0",
    })
    .json({
      message: result.data.message,
    });
};

export const updateReservationStatusController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { id } = req.params;

  const result: Result<SuccessResponse, ErrorResponse> =
    await updateReservationStatus(id!!);

  if (!result.success) {
    res.status(result.error.statusCode).json({
      error: result.error.errorMessage,
    });

    return;
  }

  res
    .status(result.data.statusCode)
    .set({
      "Cache-Control": "no-store",
      Pragma: "no-cache",
      Expires: "0",
    })
    .json({
      message: result.data.message,
    });
};

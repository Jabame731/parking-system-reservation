import { Request, Response } from "express";
import {
  approvePaypalOrder,
  createPaypalReservation,
} from "../../infrastructure";
import { ErrorResponse, Result, SuccessResponse } from "../../utils";
import { Reservation } from "../../utils/models/reservation.model";

export const createPaypalReservationController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const result: Result<
    SuccessResponse<{ orderId: string }>,
    ErrorResponse
  > = await createPaypalReservation(req.body.reservationId);

  if (!result.success) {
    res.status(result.error.statusCode).json({
      error: result.error.errorMessage,
    });

    return;
  }

  res
    .status(result.data.statusCode)
    .set({
      "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
      Pragma: "no-cache",
      Expires: "0",
    })
    .setHeader("Access-Control-Expose-Headers", "Location")
    .json({
      message: result.data.message,
      data: result.data.data?.orderId,
    });
};

export const approvePaypalOrderController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { reservationId, paypalOrderId } = req.body;

  const result: Result<
    SuccessResponse<Reservation>,
    ErrorResponse
  > = await approvePaypalOrder(reservationId, paypalOrderId);

  if (!result.success) {
    res.status(result.error.statusCode).json({
      error: result.error.errorMessage,
    });

    return;
  }

  res
    .status(result.data.statusCode)
    .set({
      "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
      Pragma: "no-cache",
      Expires: "0",
    })
    .json({
      message: result.data.message,
      data: result.data.data,
    });
};

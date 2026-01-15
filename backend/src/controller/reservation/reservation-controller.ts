import { Request, Response } from "express";
import { createReservation } from "../../infrastructure";
import { ErrorResponse, Result, SuccessResponse } from "../../utils";

export const createReservationController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const result: Result<SuccessResponse, ErrorResponse> =
    await createReservation(req.body);

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

import { Request, Response } from "express";
import { createReservation } from "../../infrastructure";
import { ErrorResponse, Result, SuccessResponse } from "../../utils";

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

import { Request, Response } from "express";
import { ErrorResponse, Result, SuccessResponse } from "../../utils";
import { updateSensorSlot } from "../../infrastructure";

export const updateSensorSlotController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const result: Result<SuccessResponse, ErrorResponse> = await updateSensorSlot(
    req.body
  );

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

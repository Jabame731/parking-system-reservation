import { Request, Response } from "express";
import { ErrorResponse, Result, SuccessResponse } from "../../utils";
import { getAvailableSlots } from "../../infrastructure";

export const getAvailableSlotsController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const result: Result<
    SuccessResponse<string[]>,
    ErrorResponse
  > = await getAvailableSlots();

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

import { Request, Response } from "express";
import { getDashboardAnalyticsData } from "../../infrastructure";
import {
  DashboardStats,
  ErrorResponse,
  Result,
  SuccessResponse,
} from "../../utils";

export const getDashboardAnalyticsDataController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const result: Result<
    SuccessResponse<DashboardStats>,
    ErrorResponse
  > = await getDashboardAnalyticsData();

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

import { Request, Response } from "express";
import {
  ErrorResponse,
  Parking,
  ParkingResponseData,
  Result,
  SuccessResponse,
} from "../../utils";
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
    SuccessResponse<{ id: string }>,
    ErrorResponse
  > = await createParkingSlot(req.body);

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
      "Cache-Control": "no-store,",
      Pragma: "no-cache",
      Expires: "0",
    })
    .setHeader("Access-Control-Expose-Headers", "Location")
    .location(`/parkingSlot/${id}`)
    .json({
      message: result.data.message,
    });
};

export const getAllParkingSlotsController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const result: Result<
    SuccessResponse<ParkingResponseData>,
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
  const { id } = req.params;
  const result: Result<SuccessResponse, ErrorResponse> =
    await deleteParkingSlot(id!);

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

//SSE GET PARKING SLOTS
export const getParkingSlotsStreamController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  res.writeHead(200, {
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    Connection: "keep-alive",
  });

  const sendUpdate = async () => {
    const result = await getAllParkingSlots();

    if (!result.success) {
      res.write(
        `event: error\ndata: ${JSON.stringify({ error: result.error.errorMessage })}\n\n`,
      );
      return;
    }

    const payload = JSON.stringify({
      message: result.data.message,
      data: result.data.data,
    });

    res.write(`event: update\n`);
    res.write(`data: ${payload}\n\n`);
  };

  await sendUpdate();

  const intervalId = setInterval(sendUpdate, 5000);

  req.on("close", () => {
    clearInterval(intervalId);

    res.end();
  });
};

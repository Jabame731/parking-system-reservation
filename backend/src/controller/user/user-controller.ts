import { Request, Response } from "express";
import { deleteUser, editUser, getAllUsers } from "../../infrastructure";
import { ErrorResponse, Result, SuccessResponse, User } from "../../utils";

export const getAllUsersController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const result: Result<
    SuccessResponse<User[]>,
    ErrorResponse
  > = await getAllUsers();

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

export const deleteUserController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { id } = req.params;
  const result: Result<SuccessResponse, ErrorResponse> = await deleteUser(id!!);

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

export const editUserController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const result: Result<SuccessResponse, ErrorResponse> = await editUser(
    req.body.data,
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
      "Cache-Control": "no-store",
      Pragma: "no-cache",
      Expires: "0",
    })
    .json({
      message: result.data.message,
    });
};

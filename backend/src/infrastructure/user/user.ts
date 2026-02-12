import { ResultSetHeader } from "mysql2";
import { connection } from "../../config/mysql.db";
import {
  EditUserData,
  ErrorResponse,
  Result,
  SuccessResponse,
  User,
} from "../../utils";

export const getAllUsers = async (): Promise<
  Result<SuccessResponse<User[]>, ErrorResponse>
> => {
  const db = connection();
  try {
    const [rows] = await db.execute("SELECT * FROM users");
    const users = rows as User[];

    const newData = users.map((user) => {
      //exclude a certain property here
      const { password, ...rest } = user;

      return rest as User;
    });

    return {
      success: true,
      data: {
        statusCode: 200,
        message: "Users retrieved successfully",
        data: newData,
      },
    };
  } catch (error) {
    return {
      success: false,
      error: {
        statusCode: 500,
        errorMessage: error instanceof Error ? error.message : String(error),
      },
    };
  }
};

export const editUser = async (
  user: EditUserData,
): Promise<Result<SuccessResponse, ErrorResponse>> => {
  const db = connection();
  try {
    const query = `
            UPDATE users
            SET firstName = ?,
                lastName = ?,
                address = ?,
                contactNumber = ?,
                userRole = ?,
                updatedAt = NOW()
            WHERE id = ?
        `;

    const [result] = await db.execute(query, [
      user.firstName,
      user.lastName,
      user.address,
      user.contactNumber,
      user.userRole,
      user.id,
    ]);

    const innerResult = result as ResultSetHeader;

    if (innerResult.affectedRows === 0) {
      return {
        success: false,
        error: {
          statusCode: 404,
          errorMessage: "User not found",
        },
      };
    }

    return {
      success: true,
      data: {
        statusCode: 200,
        message: "User updated successfully",
      },
    };
  } catch (error) {
    return {
      success: false,
      error: {
        statusCode: 500,
        errorMessage: error instanceof Error ? error.message : String(error),
      },
    };
  }
};

export const deleteUser = async (
  id: string,
): Promise<Result<SuccessResponse, ErrorResponse>> => {
  const db = connection();
  try {
    const [result] = await db.execute(`DELETE FROM users WHERE id = ?`, [id]);

    const insertResult = result as ResultSetHeader;

    if (insertResult.affectedRows === 0) {
      return {
        success: false,
        error: {
          statusCode: 404,
          errorMessage: "User not found",
        },
      };
    }

    return {
      success: true,
      data: {
        statusCode: 200,
        message: "User  deleted successfully",
      },
    };
  } catch (error) {
    return {
      success: false,
      error: {
        statusCode: 500,
        errorMessage: error instanceof Error ? error.message : String(error),
      },
    };
  }
};

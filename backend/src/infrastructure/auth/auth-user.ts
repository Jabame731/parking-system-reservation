import { ResultSetHeader } from "mysql2";
import { connection } from "../../config/mysql.db";
import {
  ErrorResponse,
  generateAccessToken,
  RegisterUser,
  Result,
  SuccessResponse,
  User,
  UserResponse,
} from "../../utils";
import bcrypt from "bcryptjs";

export const registerUserIn = async (
  user: RegisterUser
): Promise<Result<SuccessResponse, ErrorResponse>> => {
  const db = connection();

  try {
    if (
      !user?.email ||
      !user?.firstName ||
      !user?.password ||
      !user?.contactNumber
    ) {
      return {
        success: false,
        error: {
          errorMessage: "Missing Required Fields.",
          statusCode: 400,
        },
      };
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(user.email)) {
      return {
        success: false,
        error: {
          errorMessage: "Invalid email format.",
          statusCode: 400,
        },
      };
    }

    const [emailCheck] = await db.execute(
      "SELECT * FROM `users` WHERE `email` = ?",
      [user.email]
    );

    if ((emailCheck as any[]).length > 0) {
      return {
        success: false,
        error: {
          errorMessage: "Email is already registered.",
          statusCode: 409,
        },
      };
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(user.password, salt);
    const { v4: uuidv4 } = await import("uuid");
    const role = user.userRole ? user.userRole : "user";
    const newUserId = uuidv4();

    const [result] = await db.execute(
      "INSERT INTO users (`id`, `firstName`, `lastName`, `address`, `contactNumber`, `email`, `password`, `userRole`) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [
        newUserId,
        user.firstName,
        user.lastName,
        user.address,
        user.contactNumber,
        user.email,
        hash,
        role,
      ]
    );

    const insertResult = result as ResultSetHeader;

    if (insertResult.affectedRows === 0) {
      return {
        success: false,
        error: {
          statusCode: 500,
          errorMessage: "Failed to insert user.",
        },
      };
    }

    return {
      success: true,
      data: {
        statusCode: 200,
        message: "User registered successfully.",
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

export const loginUserIn = async (
  data: User
): Promise<Result<SuccessResponse<UserResponse>, ErrorResponse>> => {
  const db = connection();

  try {
    if (!data?.email || !data?.password) {
      return {
        success: false,
        error: {
          errorMessage: "Email and Password are required",
          statusCode: 400,
        },
      };
    }

    const [rows] = await db.execute("SELECT * FROM users WHERE email = ?", [
      data?.email,
    ]);

    const users = rows as User[];

    if (users.length === 0) {
      return {
        success: false,
        error: {
          errorMessage: "User not found",
          statusCode: 404,
        },
      };
    }

    const user = users[0]!;

    const isMatch = await bcrypt.compare(data.password, user?.password);

    if (!isMatch) {
      return {
        success: false,
        error: {
          errorMessage: "Incorrect password",
          statusCode: 424,
        },
      };
    }

    const accessToken = generateAccessToken(user);

    const response: UserResponse = {
      id: user.id,
      type: "User",
      attributes: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        address: user.address,
        contactNumber: user.contactNumber,
        userRole: user.userRole,
        image: user.image,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
      accessToken: accessToken,
    };

    return {
      success: true,
      data: {
        statusCode: 200,
        message: "Login successfully.",
        data: response,
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

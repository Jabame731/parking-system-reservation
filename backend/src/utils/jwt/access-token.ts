import * as jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { NextFunction, Request, Response } from "express";

dotenv.config();

interface AuthenticatedRequest extends Request {
  user?:
    | {
        id: string;
        email: string;
      }
    | jwt.JwtPayload;
}

export const generateAccessToken = (user: { id: string; email: string }) => {
  const secret = process.env.JWT_SECRET!;
  const expiresIn = process.env.JWT_ACCESS_TOKEN_EXPIRES!;
  return jwt.sign({ id: user.id, email: user.email }, secret, {
    expiresIn: expiresIn as any,
  });
};

export const verifyToken = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const secret = process.env.JWT_SECRET!;
  const authHeader = req.headers["authorization"];

  const token = authHeader?.split(" ")[1];

  if (!token) return res.sendStatus(401);

  jwt.verify(token, secret, (err, user) => {
    if (err)
      return res.status(403).json({
        message: "Invalid or expired token",
      });

    req.user = user as { id: string; email: string };
    next();
  });
};

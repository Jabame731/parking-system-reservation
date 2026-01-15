import * as jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { NextFunction, Request, Response } from "express";

dotenv.config();

interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    email: string;
    role: string;
  };
}

export const generateAccessToken = (user: {
  id: string;
  email: string;
  role: string;
}) => {
  const secret = process.env.JWT_SECRET!;
  const expiresIn = process.env.JWT_ACCESS_TOKEN_EXPIRES!;

  return jwt.sign({ id: user.id, email: user.email, role: user.role }, secret, {
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

  if (!token) return res.status(401).json({ message: "Access Denied" });

  jwt.verify(token, secret, (err, decoded) => {
    if (err)
      return res.status(403).json({ message: "Invalid or expired token" });

    req.user = decoded as { id: string; email: string; role: string };
    next();
  });
};

export const verifyAdmin = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(403).json({ message: "Access denied: Admins only" });
  }
};

/* eslint-disable @typescript-eslint/no-unused-vars */
import {NextRequest} from "next/server";
import jwt from "jsonwebtoken";

export const authMiddleware = async (request: NextRequest) => {
  const authHeader = request.headers.get("authorization");
  if (!authHeader) {
    throw new Error("No authorization header");
  }

  const token = authHeader.replace("Bearer ", "");
  try {
    // Replace with your JWT secret
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    return decoded;
  } catch (error) {
    throw new Error("Invalid token");
  }
};

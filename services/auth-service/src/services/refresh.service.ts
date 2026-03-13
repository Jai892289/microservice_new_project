import jwt from "jsonwebtoken";
import redis from "../lib/redis";

export const refreshAccessToken  = async (refreshToken: string) => {
  if (!refreshToken) {
    throw new Error("Refresh token is required");
  }

  const decoded = jwt.verify(
    refreshToken,
    process.env.JWT_REFRESH_SECRET as string,
  ) as { userId: number; email: string };

  const storedToken = await redis.get(`refresh_token:${decoded.userId}`);

  if (!storedToken || storedToken !== refreshToken) {
    throw new Error("Invalid refresh token");
  }

  const newAccessToken = jwt.sign(
    { userId: decoded.userId, email: decoded.email },
    process.env.JWT_SECRET as string,
    { expiresIn: "15m" }
  );
  return {accessToken: newAccessToken};
};

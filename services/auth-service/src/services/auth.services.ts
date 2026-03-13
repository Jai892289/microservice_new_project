import bcrypt from "bcryptjs";
import { prisma } from "../lib/prisma";
import * as jwt from "jsonwebtoken";
import { SignOptions } from "jsonwebtoken";
import redis from "../lib/redis";

export const registerUser = async (email: string, password: string) => {

  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
    },
  });
  return user;

}

export const loginUser = async (email: string, password: string) => {

  const key = `login_attempts:${email}`;

  const attempts = await redis.get(key);

  if (Number(attempts) === 1) {
  await redis.expire(key, 300);
}

  if (attempts && Number(attempts) >= 5) {
    console.log("attempt", attempts)
    throw new Error("Too many login attempts. Please try again later.");
  }

  // console.log("attempts", attempts)
  console.log("key", key)
  const user = await prisma.user.findUnique({
    where: { email },
  })

  console.log("process.env.JWT_SECRET", process.env.JWT_SECRET)
  if (!user) {
    await redis.incr(key);      // increase attempts
    await redis.expire(key, 300); // expire in 5 minutes
    throw new Error("User not found");
  }

  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    const count = await redis.incr(key);

    if (count === 1) {
      await redis.expire(key, 300);
    }

    throw new Error("Invalid password");
  }

  await redis.del(key);
  const secret = process.env.JWT_SECRET;
  const refreshTokenSecret:any = process.env.JWT_REFRESH_SECRET;

  if (!secret) {
    throw new Error("JWT_SECRET not defined");
  }

  const options: SignOptions = {
    expiresIn: "15m",
  };

  const token = jwt.sign(
    { userId: user.id, email: user.email },
    secret,
    options
  );

  const refreshToken = jwt.sign({ userId: user.id, email: user.email }, refreshTokenSecret, { expiresIn: "7d" });

  await redis.set(`refresh_token:${user.id}`, refreshToken, "EX", 60 * 60 * 24 * 7);

  return {
    token,
    refreshToken,
    user: {
      id: user.id,
      email: user.email
    },
  };

}
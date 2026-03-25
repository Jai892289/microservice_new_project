import { Request, Response } from "express";
import { registerUser, loginUser } from "../services/auth.services";
import { refreshAccessToken  } from "../services/refresh.service"

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        if (!email && !password) {
            throw new Error("Email and password are required");
        }

        const userLogin = await loginUser(email, password)
        res.status(201).json({ message: "User logged in successfully", userLogin });

    } catch (error) {
        res.json({ message: "Error logging in user", error })
    }
}


export const register = async (req: Request, res: Response) => {
    try {
        const { email, password, role } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        const user = await registerUser(email, password, role);
        res.status(201).json({ message: "User registered successfully", user });
    } catch (error) {
        res.status(500).json({ message: "Error registering user", error });
    }
}


export const refreshTokenController = async (req: Request, res: Response) => {
  try {

    const { refreshToken } = req.body;

    const result = await refreshAccessToken(refreshToken);

    res.json(result);

  } catch (err: any) {
    res.status(401).json({
      message: err.message
    });
  }
};
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { UserModel } from "@models";
import { Status } from "@utils";

export const login = async (request: Request, response: Response) => {
  try {
    const { email, password } = request.body;
    const user = await UserModel.findOne({ email });

    if (!user) {
      response
        .status(Status.NOT_FOUND)
        .json({ success: false, message: "Invalid email or password" });
      return;
    }

    const userPassword = await bcrypt.compare(
      password,
      user.password as string
    );

    if (!userPassword) {
      response
        .status(Status.NOT_FOUND)
        .json({ message: "Invalid email or password" });
      return;
    }

    if (user.disabled)
      return response
        .status(Status.FORBIDDEN)
        .json({ success: false, message: "You're disabled contact the admin" });

    const payload = {
      id: user._id,
    };

    const token = await jwt.sign(payload, process.env.SECRET as string, {
      expiresIn: 3600 * 24,
    });

    response.status(Status.SUCCESS).json({
      message: "Login successful",
      success: true,
      data: {
        user: payload,
        token: `Bearer ${token}`,
      },
    });
  } catch (error) {
    response
      .status(Status.SERVER_ERROR)
      .json({ success: false, message: "Failed to login" });
    console.log(error);
  }
};

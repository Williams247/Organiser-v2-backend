import { Request, Response } from "express";
import axios from "axios";
import dotenv from "dotenv";
import { Status, OtpProps, generateOTPCode } from "@utils";
import { UserModel, OtpModel } from "@models";
import { fetchOneWithMoreParams } from "@services";

dotenv.config();

export const recoverPassword = async (request: Request, response: Response) => {
  try {
    const {
      body: { email },
    } = request;

    const isUserRegistered = await fetchOneWithMoreParams({
      model: UserModel,
      searchParams: { email },
    });

    if (isUserRegistered.status !== 200 && !isUserRegistered.success) {
      response.status(isUserRegistered.status).json({
        status: isUserRegistered.status,
        success: isUserRegistered.success,
        message: isUserRegistered.message,
      });
      return;
    }

    const otp = new OtpModel<OtpProps>({
      code: generateOTPCode(),
      email: isUserRegistered.data.email,
    });

    await otp.save();

    const fetchOtp = await fetchOneWithMoreParams({
      model: OtpModel,
      searchParams: { email: otp.email },
    });

    const serviceResponse = await axios.put(
      process.env.RECOVERY_URL as string,
      {
        serviceToken: process.env.SERVICE_TOKEN,
        service: process.env.SERVICE_NAME,
        code: fetchOtp.data.code,
      }
    );

    response.status(serviceResponse.data.status).json(serviceResponse.data);
  } catch (error) {
    console.log(error);
    response.status(Status.SERVER_ERROR).json({
      success: false,
      status: Status.SERVER_ERROR,
      message: "Failed to send request",
    });
  }
};

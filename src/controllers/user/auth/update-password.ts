import { Request, Response } from "express";
import bcryptjs from "bcryptjs";
import { OtpModel, UserModel } from "@models";
import { fetchOneWithMoreParams } from "@services";
import { Status } from "@utils";

export const updatePassword = async (request: Request, response: Response) => {
  try {
    const {
      body: { email, password, otpCode },
    } = request;

    const { status, success, message, data } = await fetchOneWithMoreParams({
      model: OtpModel,
      searchParams: { email, code: otpCode },
    });

    if (status !== Status.SUCCESS && !success && !data) {
      response.status(status).json({ status, success, message });
      return;
    }

    const updatedPassword = await bcryptjs.hashSync(password, 10);

    const user = await UserModel.findOneAndUpdate({ email });

    if (user) {
      user.password = updatedPassword;
      await user.save();
      await OtpModel.deleteMany({ email });
      response.status(status).json({ status, success, message });
    }
    
  } catch (error) {
    console.log(error);
    response.status(Status.SERVER_ERROR).json({
      status: Status.SERVER_ERROR,
      success: false,
      message: "Failed to update passwordd",
    });
  }
};

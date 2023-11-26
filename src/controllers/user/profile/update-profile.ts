import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { UserModel } from '@models';
import { fetchById } from '@services';
import { Status } from '@utils';

export const updateProfile = async (request: Request, response: Response) => {
  try {
    const userId = request?.user?.id as string;
    const {
      body: { firstName, lastName, password },
    } = request;

    const { status, message, data, success } = await fetchById({
      model: UserModel,
      id: userId ?? ""
    });

    if (!success) {
      response.status(status).json({ success, message, data });
      return;
    }

    let updatedPassword;

    if (success && data) {
      const user = await UserModel.findByIdAndUpdate(userId);
      if (password) updatedPassword = await bcrypt.hash(password, 10);
      if (user) {
        user.firstName = firstName;
        user.lastName = lastName;
        user.password = updatedPassword ?? user.password;
        await user.save();
        response
          .status(Status.SUCCESS)
          .json({ success, message: 'Profile updated' });
      }
    }
  } catch (error) {
    console.log(error);
    response
      .status(Status.SERVER_ERROR)
      .json({ success: false, message: 'Failed to update profile' });
  }
};

import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { Role, UserPayload, Status } from '@utils';
import { UserModel } from '@models';

export const register = async (request: Request, response: Response) => {
  try {
    const {
      body: { email, firstName, lastName, password, role },
    } = request;

    if (role === Role.ADMIN) {
      const isAdmin = await UserModel.find({ role }).count();
      if (isAdmin > 0) {
        response
          .status(Status.CONFLICT)
          .json({ success: false, message: 'An admin is already registered' });
        return;
      }
    }

    const user = await UserModel.findOne({ email });

    if (user) {
      response
        .status(Status.CONFLICT)
        .json({ success: false, message: `${email} is already taken.` });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const createUser = new UserModel<UserPayload>({
      email,
      firstName,
      lastName,
      password: hashedPassword,
      role,
      verified: true,
      disabled: false
    });

    await createUser.save();

    response
      .status(Status.CREATED)
      .json({ success: true, message: 'Account created.' });
  } catch (error) {
    response
      .status(Status.SERVER_ERROR)
      .json({ success: false, message: 'Failed to register user.' });
    console.log(error);
  }
};

import express, { Application } from "express";
import { register, login, recoverPassword, updatePassword } from "@controllers";
import {
  validateAuthRegister,
  validateAuthLogin,
  validateRecoverPassword,
  validateUpdatePassword,
} from "@middleware";

const router: Application = express();

router.post("/register", validateAuthRegister, register);
router.post("/login", validateAuthLogin, login);
router.put("/recover-password", validateRecoverPassword, recoverPassword);
router.put("/update-password", validateUpdatePassword, updatePassword);

export default router;

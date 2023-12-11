import express, { Application } from "express";
import { getUsers, enableDisableUser } from "@controllers";
import { auth } from "@middleware";
import { Role } from "@utils";

const router: Application = express();

router.get("/fetch-users", auth({ userType: Role.ADMIN }), getUsers);
router.put("/change-user-status/:id", auth({ userType: Role.ADMIN }), enableDisableUser);

export default router;

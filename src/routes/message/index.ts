import express, { Application } from "express";
import {
  sendMessage,
  deleteAMessage,
  deleteAllMessages,
  fetchMessages,
} from "@controllers";
import { validateMessage, auth } from "@middleware";
import { Role } from "@utils";

const router: Application = express();

router.get("/fetch-messages", auth({ userType: Role.ADMIN }), fetchMessages);
router.post("/send-message", validateMessage, sendMessage);

router.delete(
  "/delete-a-message/:id",
  auth({ userType: Role.ADMIN }),
  deleteAMessage
);

router.delete(
  "/delete-all-messages",
  auth({ userType: Role.ADMIN }),
  deleteAllMessages
);

export default router;

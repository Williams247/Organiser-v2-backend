import mongoose from "mongoose";
import dotenv from "dotenv";
import { UserModel } from "../models";

dotenv.config();

const updateCriteria = {};

const updateOperation = {
  $set: { disabled: false },
};

(async () => {
  mongoose.connect(process.env.DATABASE_URI as string);
  console.log("Connection created");

  try {
    const seed = await UserModel.updateMany(updateCriteria, updateOperation);
    console.log("Seeding complete");
    console.log(seed);
  } catch (error) {
    console.log("Failed to seed ", error);
  }

  await mongoose.connection.close();
  console.log("Connection closed");
})();

import { Schema, model } from "mongoose";
import { UserSchema } from "../types/schemaInterfaces";

const schema = new Schema<UserSchema>({
  UserID: { type: String, required: true },
});

export default model<UserSchema>("User", schema);

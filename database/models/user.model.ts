import { model, models, Schema, Document } from "mongoose";

export interface IUser {
  username: string;
  email: string;
  image?: string;
}

export interface IUserDoc extends IUser, Document {}
const UserSchema = new Schema<IUser>(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    image: { type: String },
  },
  { timestamps: true }
);

const User = models?.User || model<IUser>("User", UserSchema);

export default User;

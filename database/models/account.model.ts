// Need an account to associate user with same email to the same account since we are using OAuth and Credential providers

import { Document, model, models, Schema, Types } from "mongoose";

export interface IAccount {
  userId: Types.ObjectId;
  username: string;
  image?: string;
  provider: string;
  providerAccountId: string;
  password?: string;
}
export interface IAccountDoc extends IAccount, Document {}
const AccountSchema = new Schema<IAccount>(
  {
    userId: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    username: { type: String, required: true },
    image: { type: String },
    password: { type: String },
    provider: { type: String, required: true },
    providerAccountId: { type: String, required: true },
  },
  { timestamps: true }
);

const Account = models?.Account || model<IAccount>("Account", AccountSchema);
export default Account;

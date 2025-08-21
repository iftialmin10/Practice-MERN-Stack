import mongoose, { Schema, Document, Model } from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

// const Schema = mongoose.Schema;
export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  image: string;
  places: mongoose.Types.ObjectId[];
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 6 },
  image: { type: String, required: true },
  places: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Place", required: false },
  ],
});

userSchema.plugin(uniqueValidator);

const User: Model<IUser> = mongoose.model<IUser>("User", userSchema);

export default User;

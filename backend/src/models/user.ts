import mongoose, { Schema, Document, Model } from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

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
    { type: mongoose.Schema.Types.ObjectId, required: false, ref: "Place" },
  ],
});

userSchema.plugin(uniqueValidator);

const User: Model<IUser> = mongoose.model<IUser>("User", userSchema);

export default User;

import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  image: { type: String, required: true },
  places: { type: String, required: true },
});

userSchema.plugin(uniqueValidator);

const User = mongoose.model("User", userSchema);

export default User;

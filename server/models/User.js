import mongoose from "mongoose";
import bcrypt from "bcrypt";

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  addresses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Address",
      required: true, // Ensure each user has at least one address
    },
  ],
});

// Hash the password before saving
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  console.log("Hashing password...");
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Method to compare hashed password
UserSchema.methods.isCorrectPassword = function (password) {
  return bcrypt.compare(password, this.password);
};
const User = mongoose.model("User", UserSchema);
export default User;

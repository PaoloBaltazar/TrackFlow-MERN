import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  department: {
    type: String,
    enum: ["Finance", "Marketing", "Human Resources", "Operations", "IT"],
    required: true,
  },
  role: {
    type: String,
    required: true,
    enum: [
      "Intern",
      "Junior Staff",
      "Senior Staff",
      "Supervisor",
      "Manager",
      "Team Lead",
      "Director",
      "Executive",
      "Administrator",
      "Consultant",
    ],
  },

  verifyOtp: { type: String, default: "" },
  verifyOtpExpireAt: { type: Number, default: 0 },
  isAccountVerified: { type: Boolean, default: false },
  resetOtp: { type: String, default: "" },
  resetOtpExpireAt: { type: Number, default: 0 },
});

const userModel = mongoose.models.user || mongoose.model("user", userSchema);

export default userModel;

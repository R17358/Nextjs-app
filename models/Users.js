import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    clerkId: { type: String, required: true, unique: true }, // Link to Clerk
    email: { type: String, required: true },
    role: { type: String, enum: ["admin", "school", "management", "principal", "teacher", "parents", "student"], default: "student" },
    firstName: { type: String},
    middleName: {type: String},
    lastName: {type: String},
    dob: {type: Date},
    gender: {type: String, enum:["Male", "Female", "Other"]},
    address: {type: String},
    phone: {type: String},
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", UserSchema);
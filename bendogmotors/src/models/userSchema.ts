import mongoose, { CallbackError } from "mongoose";
import bcrypt from "bcrypt";

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { 
      type: String, 
      required: true, 
      unique: true, 
      validate: {
        validator: function (v: string) {
          return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v); // Regex for email
        },
        message: (props: { value: string }) => `${props.value} is not a valid email address!`
      }
    },
    password: { type: String, required: true },
    image: { type: String, default: "https://example.com/default-user-image.jpg" },
    role: { 
      type: String, 
      enum: ["user", "admin", "moderator"], 
      default: "user" 
    },
  },
  { timestamps: true, collection: "users" } // Explicitly set collection name
);

export default mongoose.models.User || mongoose.model("User", UserSchema);

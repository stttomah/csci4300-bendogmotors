import mongoose, { Schema, Document, Model } from "mongoose";

// Define the IUser interface
interface IUser extends Document {
    email: string;
    password: string;
    name?: string; // Optional field for the user's name
    role: "user" | "admin"; // Role-based access control
    created_at: Date;
    updated_at: Date;
}

// Define the User schema
const userSchema = new Schema<IUser>({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        match: [/.+@.+\..+/, "Invalid email format"], // Email validation
    },
    password: {
        type: String,
        required: true,
        minlength: 6, // Ensure a minimum length for security
    },
    name: {
        type: String,
        trim: true, // Optional field with trimming
    },
    role: {
        type: String,
        enum: ["user", "admin"], // Allowed values
        default: "user",
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
    updated_at: {
        type: Date,
        default: Date.now,
    },
});

// Pre-save hook to update `updated_at` timestamp before saving
userSchema.pre<IUser>("save", function (next) {
    this.updated_at = new Date();
    next();
});

// Create or reuse the User model
const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>("User", userSchema);

export default User;

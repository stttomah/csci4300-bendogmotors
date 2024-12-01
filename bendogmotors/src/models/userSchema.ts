import mongoose, { CallbackError } from "mongoose";

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
    image: { type: String, default: "https://static.wikia.nocookie.net/outfit7talkingfriends/images/8/80/Talking_Ben_the_Dog_Original_HD_Icon.png/revision/latest/scale-to-width/360?cb=20231224180925" },
    role: { 
      type: String, 
      enum: ["user", "admin", "moderator"], 
      default: "user" 
    },
  },
  { timestamps: true, collection: "users" } // Explicitly set collection name
);

export default mongoose.models.User || mongoose.model("User", UserSchema);

import mongoose, { Schema, Document, Model } from "mongoose";

interface IItem extends Document {
  title: string;
  description?: string;
  price: number;
  makeModel: string;
  year: number;
  fuel: string;
  mpg: number;
  mileage: number; // Required
  horsepower: number; // Required
  engine: string; // Required
  interiorColor: string;
  exteriorColor: string;
  features: string;
  image: string;
  sellerName: string; // Required
  sellerJoinDate: string; // Required
  updated_date: Date;
}

const itemSchema = new Schema<IItem>({
  title: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  makeModel: { type: String, required: true },
  year: { type: Number, required: true },
  fuel: { type: String },
  mpg: { type: Number },
  mileage: { type: Number, required: true }, // Added
  horsepower: { type: Number, required: true }, // Added
  engine: { type: String, required: true }, // Added
  interiorColor: { type: String },
  exteriorColor: { type: String },
  features: { type: String },
  image: { type: String },
  sellerName: { type: String, required: true }, // Added
  sellerJoinDate: { type: String, required: true }, // Added
  updated_date: { type: Date, default: Date.now },
});

const Item: Model<IItem> = mongoose.models.Item || mongoose.model<IItem>("Item", itemSchema);
export default Item;

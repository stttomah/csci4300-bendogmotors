import mongoose, { Schema, Document, Model } from "mongoose";

interface IItem extends Document {
    title: String;
    description?: string;
    image?: string;
    updated_date: Date;
}

const itemSchema =  new Schema<IItem>({

    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    image: {
        type: String,
    },
    updated_date: {
        type: Date,
        default: Date.now,
    },
});

const Item: Model<IItem> = mongoose.models.Item || mongoose.model<IItem>("Item", itemSchema);
export default Item;
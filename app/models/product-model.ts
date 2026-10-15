
import { Schema, model, models } from "mongoose";

const productSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, "Product name is required"],
            trim: true,
        },
        description: {
            type: String,
            default: "",
        },
        price: {
            type: Number,
            required: [true, "Product price is required"],
            min: [0, "Price cannot be negative"],
        },
        quantity: {
            type: Number,
            default: 0,
            min: [0, "Quantity cannot be negative"],
        },
    },
    { timestamps: true }
);

const Product =
    models.Product || model("Product", productSchema);

export default Product;

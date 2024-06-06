import mongoose from "mongoose";
const { Schema } = mongoose;

const cartSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    products: [
      {
        gigId: {
          type: String,
          required: true,
        },
        sellerId: {
          type: String,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
        title: {
          type: String,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          default: 1,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Cart", cartSchema);

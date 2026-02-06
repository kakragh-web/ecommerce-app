import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userId: mongoose.Schema.Types.ObjectId,
    products: Array,
    totalAmount: Number,
    paymentStatus: String,
    orderStatus: { type: String, default: "pending" },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);

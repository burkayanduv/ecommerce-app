import mongoose from 'mongoose';

const CartSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    products: [
      {
        productId: { type: String, required: true },
        quantity: { type: Number, default: 1, required: true }
      }
    ]
  },
  {
    timestamps: true
  }
);

export default mongoose.model('Cart', CartSchema);

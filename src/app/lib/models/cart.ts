import { Schema, model, models } from 'mongoose';

const cartItemSchema = new Schema({
  _id: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  imageUrl: { type: String },
  unit: { type: String },
});

const cartSchema = new Schema({
  userId: { type: String, required: true, unique: true },
  items: [cartItemSchema],
});

const Cart = models.Cart || model('Cart', cartSchema);

export default Cart;

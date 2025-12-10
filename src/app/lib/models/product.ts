import { Schema, model, models } from 'mongoose';

const productSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  imageUrl: { type: String },
  images: { type: [String] },
  stock: { type: Number, default: 0 },
  unit: { type: String },
});

const Product = models.Product || model('Product', productSchema);

export default Product;

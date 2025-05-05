import mongoose, { Schema } from 'mongoose';

const categorySchema = new Schema({
  _id: { type: Schema.Types.ObjectId }, // Explicitly defining _id type (optional as Mongoose handles it)
  name: { type: String, required: true, unique: true, trim: true }
});

const Category = mongoose.models.Category || mongoose.model('Category', categorySchema);

export default Category;
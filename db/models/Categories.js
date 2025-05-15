import mongoose, { Schema } from "mongoose";

const categorySchema = new Schema({
  name: { type: String, required: true, unique: true, trim: true },
});

const Category =
  mongoose.models.Category || mongoose.model("Category", categorySchema);

export default Category;

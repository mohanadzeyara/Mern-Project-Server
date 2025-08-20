import mongoose from "mongoose";

const recipeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: [true, "Image is required"] }, // 🔥 required
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // 🔥 track recipe owner
  },
  { timestamps: true }
);

export default mongoose.model("Recipe", recipeSchema);

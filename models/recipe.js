const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  ingredients: [{ type: String, required: true }],
  steps: [{ type: String, required: true }],
  image: { type: String, required: true }, // ✅ required now
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

// ✅ Prevent OverwriteModelError
module.exports = mongoose.models.Recipe || mongoose.model('Recipe', recipeSchema);

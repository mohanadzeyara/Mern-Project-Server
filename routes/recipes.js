// routes/recipe.js
import express from "express";
import { protect } from "../middleware/auth.js";
import { addRecipe, updateRecipe, deleteRecipe, getRecipes } from "../controllers/recipeController.js";

const router = express.Router();

// anyone can view
router.get("/", getRecipes);

// only logged in users can add/update/delete
router.post("/", protect, addRecipe);
router.put("/:id", protect, updateRecipe);
router.delete("/:id", protect, deleteRecipe);

export default router;

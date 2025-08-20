// controllers/recipeController.js
import Recipe from "../models/recipe.js";

// ✅ Add recipe (user must be logged in)
export const addRecipe = async (req, res) => {
  try {
    const { name, description, price, image } = req.body;

    if (!name || !description || !price || !image) {
      return res.status(400).json({ message: "All fields including image are required" });
    }

    const recipe = await Recipe.create({
      name,
      description,
      price,
      image,
      user: req.user._id, // attach logged in user as owner
    });

    res.status(201).json(recipe);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Update recipe
export const updateRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);

    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    // user can only edit his own recipe unless admin
    if (recipe.user.toString() !== req.user._id.toString() && req.user.role !== "admin") {
      return res.status(403).json({ message: "Not authorized to edit this recipe" });
    }

    recipe.name = req.body.name || recipe.name;
    recipe.description = req.body.description || recipe.description;
    recipe.price = req.body.price || recipe.price;
    recipe.image = req.body.image || recipe.image;

    const updatedRecipe = await recipe.save();
    res.json(updatedRecipe);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Delete recipe
export const deleteRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);

    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    // user can only delete his own recipe unless admin
    if (recipe.user.toString() !== req.user._id.toString() && req.user.role !== "admin") {
      return res.status(403).json({ message: "Not authorized to delete this recipe" });
    }

    await recipe.deleteOne();
    res.json({ message: "Recipe removed" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Get all recipes
export const getRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find().populate("user", "name email role");
    res.json(recipes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// ---------------------------------
// Boilerplate Code to Set Up Server
// ---------------------------------

// imports our node modules
import express from "express";
import fs from "fs/promises";

// declares app variable
const app = express();

// defines our port number
const port = 3000;

// tells our server to use JSON
app.use(express.json());

// starts the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// ---------------------------------
// Helper Functions
// ---------------------------------

// 1. getAllRecipes()

// gets all recipes from recipes-data.json
async function getAllRecipes() {
  const data = await fs.readFile("recipes-data.json", "utf8");
  const parsedRecipes = JSON.parse(data);
  return parsedRecipes;
}


// 2. getOneRecipe(index)

// gets one recipe based on index
// creates a function that gets one recipe using its index
async function getOneRecipe(index) {

  // reads the recipes-data.json file
  const data = await fs.readFile("recipes-data.json", "utf8");

  // converts the JSON text into a JavaScript object
  const parsedRecipes = JSON.parse(data);

  // returns the recipe at the given index
  return parsedRecipes[index];
}


// 3. getAllRecipeNames()

// returns only the recipe names
async function getAllRecipeNames() {
  const data = await fs.readFile("recipes-data.json", "utf8");
  const parsedRecipes = JSON.parse(data);
  return parsedRecipes.map((recipe) => recipe.name);
}

// 4. getRecipesCount()

// returns total number of recipes
async function getRecipesCount() {
  const data = await fs.readFile("recipes-data.json", "utf8");
  const parsedRecipes = JSON.parse(data);
  return parsedRecipes.length;
}

// ---------------------------------
// API Endpoints
// ---------------------------------

// 1. GET /get-all-recipes

app.get("/get-all-recipes", async (req, res) => {
  const recipes = await getAllRecipes();
  res.json(recipes);
});


// 2. GET /get-one-recipe/:index

// creates an endpoint that returns one recipe by its index
app.get("/get-one-recipe/:index", async (req, res) => {

  // gets the index value from the URL parameter
  const index = req.params.index;

  // calls the helper function to get the recipe
  const recipe = await getOneRecipe(index);

  // sends the recipe back as JSON
  res.json(recipe);
});


// 3. GET /get-all-recipe-names

app.get("/get-all-recipe-names", async (req, res) => {
  const recipeNames = await getAllRecipeNames();
  res.json(recipeNames);
});


// 4. GET /get-recipes-count

app.get("/get-recipes-count", async (req, res) => {
  const count = await getRecipesCount();
  res.json(count);
});
//testing express
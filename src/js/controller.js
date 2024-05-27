import * as model from "./model.js";
import recipeview from "./views/recipeview.js";
import searchView from "./views/searchView.js";
import resultView from "./views/resultView.js";
import "core-js/stable";
import "regenerator-runtime/runtime";

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);

    console.log(id);

    if (!id) return;
    recipeview.renderSpinner();

    // 1) Loading Recipe
    await model.loadRecipe(id);

    // 2) Rending Recipe
    recipeview.render(model.state.recipe);
    resultView.render(model.state.recipe);
  } catch (error) {
    console.error(error);
    recipeview.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    resultView.renderSpinner();
    // 1) Get Search Query
    const query = searchView.getQuery();

    // 2) Load search Results
    await model.loadSearchResults(query);
  } catch (error) {
    console.error(error);
  }
};

const init = function () {
  recipeview.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
};
init();

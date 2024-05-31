import * as model from "./model.js";
import recipeview from "./views/recipeview.js";
import searchView from "./views/searchView.js";
import resultView from "./views/resultView.js";
import paginationView from "./views/paginationView.js";
import "core-js/stable";
import "regenerator-runtime/runtime";

if (module.hot) {
  module.hot.accept;
}

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;
    recipeview.renderSpinner();

    // 1) Loading Recipe
    await model.loadRecipe(id);

    // 2) Rending Recipe
    recipeview.render(model.state.recipe);
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
    // 3) Render Results
    // resultView.render(model.state.search.results);
    resultView.render(model.getSearchResultsPage());

    // 4) Render Initial pagination button
    paginationView.render(model.state.search);
  } catch (error) {
    console.error(error);
  }
};

const controlPagination = function (goToPage) {
  // 1) Render NEW Results
  // resultView.render(model.state.search.results);
  resultView.render(model.getSearchResultsPage(goToPage));

  // 4) Render NEW pagination button
  paginationView.render(model.state.search);
};

const controlServings = function (newServings) {
  // Update the Recipe servings (in state)
  model.updateServings(newServings);

  // Update the recipe view
  recipeview.render(model.state.recipe);
};

const init = function () {
  recipeview.addHandlerRender(controlRecipes);
  recipeview.addHandlerUpdateServings(controlServings);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
};
init();

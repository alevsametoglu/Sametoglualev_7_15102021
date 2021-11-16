import api from './api.js';
import DropdownButton from './components/DropdownButton.js';
import TagList from './components/TagList.js';
import RecipeCard from './components/RecipesCard.js';
import SearchInput from './components/SearchInput.js';

let searchKey = '';

const refreshRecipeList = () => {
    const recipes = api.getRecipes({
        utils: tagListUtilEl.selectedTags,
        ingredients: tagListIngredientEl.selectedTags,
        utensils: tagListUtensilEl.selectedTags,
        searchKey,
    });

    const recipeListSection = document.querySelector('#recipes-list');
    recipeListSection.innerHTML = ``;
    recipes.forEach((recipe) => {
        const recipeEl = new RecipeCard(recipe.name, recipe.time, recipe.ingredients, recipe.description);
        recipeListSection.appendChild(recipeEl.el);
    });
    const alertRecipe = document.querySelector('.card-alert');
    recipes.length === 0 ? (alertRecipe.style.display = 'block') : (alertRecipe.style.display = 'none');
};

const tagListIngredientEl = new TagList('primary', refreshRecipeList);
const tagListUtilEl = new TagList('success', refreshRecipeList);
const tagListUtensilEl = new TagList('danger', refreshRecipeList);

const initTagList = () => {
    const tagSectionEl = document.getElementById('selected-tags');
    tagSectionEl.appendChild(tagListIngredientEl.el);
    tagSectionEl.appendChild(tagListUtilEl.el);
    tagSectionEl.appendChild(tagListUtensilEl.el);
};

// create filter buttons function
const initFilterButtons = () => {
    const filterSection = document.querySelector('section.filter-tags');

    // create ingredients filter button
    const ingredients = api.getIngredients();
    const itemClickedIngredient = (item) => tagListIngredientEl.addTag(item);

    const filterDropdownIngredientItems = (inputValue) => {
        const ingredients = api.getIngredients(inputValue);
        dropdownButtonIngredients.updateOptionList(ingredients);
    };
    const dropdownButtonIngredients = new DropdownButton(
        'Ingredients',
        'primary',
        ingredients,
        itemClickedIngredient,
        filterDropdownIngredientItems,
    );
    filterSection.appendChild(dropdownButtonIngredients.el);

    // create utils filter button
    const utils = api.getUtils();
    const itemClickedUtils = (item) => tagListUtilEl.addTag(item);

    const filterDropdownUtilsItems = (inputValue) => {
        const utils = api.getUtils(inputValue);
        dropdownUtils.updateOptionList(utils);
    };

    const dropdownUtils = new DropdownButton('Appareil', 'success', utils, itemClickedUtils, filterDropdownUtilsItems);
    filterSection.appendChild(dropdownUtils.el);

    // create utensils filter button
    const utensils = api.getUtensils();
    const itemClickedUtensil = (item) => tagListUtensilEl.addTag(item);
    const filterDropdownUtensilsItems = (inputValue) => {
        const utensils = api.getUtensils(inputValue);
        dropdownUtensils.updateOptionList(utensils);
    };
    const dropdownUtensils = new DropdownButton(
        'Ustensiles',
        'danger',
        utensils,
        itemClickedUtensil,
        filterDropdownUtensilsItems,
    );
    filterSection.appendChild(dropdownUtensils.el);
};

const initRecipeList = () => {
    const recipes = api.getRecipes();
    refreshRecipeList(recipes);
};

const initSearchInput = () => {
    const searchSection = document.querySelector('section#search-input');
    const searchInputEl = new SearchInput(
        'Rechercher un ingrédient, appareil, ustensiles ou une recette',
        (inputValue) => {
            if (!!inputValue && inputValue.length >= 3) searchKey = inputValue;
            else searchKey = '';

            refreshRecipeList();
        },
    );
    searchSection.appendChild(searchInputEl.el);
};
initSearchInput();
initFilterButtons();
initTagList();
initRecipeList();

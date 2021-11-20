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

    dropdownUtils.updateOptionList(api.getUtils());
    dropdownButtonIngredients.updateOptionList(api.getIngredients());
    dropdownUtensils.updateOptionList(api.getUtensils());

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

const dropdownUtils = new DropdownButton(
    'Appareil',
    'success',
    api.getUtils(),
    (item) => tagListUtilEl.addTag(item),
    (inputValue) => {
        const utils = api.getUtils(inputValue);
        dropdownUtils.updateOptionList(utils);
    },
);
const dropdownUtensils = new DropdownButton(
    'Ustensiles',
    'danger',
    api.getUtensils(),
    (item) => tagListUtensilEl.addTag(item),
    (inputValue) => {
        const utensils = api.getUtensils(inputValue);
        dropdownUtensils.updateOptionList(utensils);
    },
);
const dropdownButtonIngredients = new DropdownButton(
    'Ingredients',
    'primary',
    api.getIngredients(),
    (item) => tagListIngredientEl.addTag(item),
    (inputValue) => {
        const ingredients = api.getIngredients(inputValue);
        dropdownButtonIngredients.updateOptionList(ingredients);
    },
);

const initTagList = () => {
    const tagSectionEl = document.getElementById('selected-tags');
    tagSectionEl.appendChild(tagListIngredientEl.el);
    tagSectionEl.appendChild(tagListUtilEl.el);
    tagSectionEl.appendChild(tagListUtensilEl.el);
};

// create filter buttons function
const initFilterButtons = () => {
    const filterSection = document.querySelector('section.filter-tags');
    filterSection.appendChild(dropdownButtonIngredients.el);
    filterSection.appendChild(dropdownUtils.el);
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
            inputValue = inputValue.trim();
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

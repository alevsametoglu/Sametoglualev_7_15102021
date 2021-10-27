import api from './api.js';
import DropdownButton from './components/DropdownButton.js';
import TagList from './components/TagList.js';
import RecipeCard from './components/RecipesCard.js';

const selectedTagsChanged = () => {
    console.log(tagListIngredientEl.selectedTags);
    console.log(tagListUtilEl.selectedTags);
    console.log(tagListUtensilEl.selectedTags);
};

const tagListIngredientEl = new TagList('primary', selectedTagsChanged);
const tagListUtilEl = new TagList('success', selectedTagsChanged);
const tagListUtensilEl = new TagList('danger', selectedTagsChanged);

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
        const utensils = api.getUtils(inputValue);
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
    const recipeListSection = document.querySelector('#recipes-list');
    const recipes = api.getRecipes();
    // console.log(recipes);
    recipes.forEach((recipe) => {
        const recipeEl = new RecipeCard(recipe.name, recipe.time, recipe.ingredients, recipe.description);
        recipeListSection.appendChild(recipeEl.el);
    });
};

initFilterButtons();
initTagList();
initRecipeList();

import api from './api.js';
import DropdownButton from './components/DropdownButton.js';

const filterSection = document.querySelector('section.filter-tags');

const selectFilterOption = (id, option) => {
    console.log(id, '-', option);
};

// create ingredients filter button
const ingredients = api.getIngredients();
const dropdownButtonIngredients = new DropdownButton(
    'ingredient',
    'Ingredients',
    'btn-primary',
    'ingredient',
    ingredients,
    selectFilterOption,
);
filterSection.appendChild(dropdownButtonIngredients.el);

// create utils filter button
const utils = api.getUtils();
const dropdownUtils = new DropdownButton('util', 'Appareil', 'btn-success', 'appareil', utils, selectFilterOption);
filterSection.appendChild(dropdownUtils.el);

// create utensils filter button

const utensils = api.getUtensils();
const dropdownUtensils = new DropdownButton(
    'utensils',
    'Ustensiles',
    'btn-danger',
    'ustensiles',
    utensils,
    selectFilterOption,
);
filterSection.appendChild(dropdownUtensils.el);

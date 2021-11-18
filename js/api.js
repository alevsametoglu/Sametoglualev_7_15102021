import recipes from './recipes.js';
// filter recipes by for (boucle Native)
const normalize = (text) => text.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
const isSearchKeyExist = (text, searchKey) => normalize(text).toLowerCase().includes(searchKey);

const searchOnRecipes = (searchingList, searchKey) => {
    searchKey = searchKey.toLowerCase();
    const filteredRecipes = searchingList.filter((recipe) => {
        if (isSearchKeyExist(recipe.name, searchKey)) {
            return true;
        } else if (isSearchKeyExist(recipe.description, searchKey)) {
            return true;
        } else {
            for (const ingredientInfo of recipe.ingredients) {
                if (isSearchKeyExist(ingredientInfo.ingredient, searchKey)) {
                    return true;
                }
            }
        }
    });
    return filteredRecipes;
};

let _filteredRecipes = recipes;
class API {
    static getUtensils(searchKey) {
        const uniqUtensils = [];
        const utensils = _filteredRecipes.map((recipe) => recipe.ustensils).flat();
        utensils.forEach((utensil) => {
            if (!uniqUtensils.includes(utensil)) uniqUtensils.push(utensil);
        });
        if (!searchKey) return uniqUtensils;
        else {
            searchKey = normalize(searchKey);
            searchKey = searchKey.toLowerCase();
            const filteredUtensils = uniqUtensils.filter((utensil) => {
                const isInclude = normalize(utensil).toLowerCase().includes(searchKey);
                return isInclude;
            });
            return filteredUtensils;
        }
    }

    static getIngredients(searchKey) {
        const uniqIngredients = [];
        const ingredients = _filteredRecipes.map((recipe) => recipe.ingredients).flat();

        ingredients.forEach((item) => {
            if (!uniqIngredients.includes(item.ingredient)) uniqIngredients.push(item.ingredient);
        });

        if (!searchKey) return uniqIngredients;
        else {
            searchKey = normalize(searchKey);
            searchKey = searchKey.toLowerCase();
            const filteredIngredients = uniqIngredients.filter((ingredient) => {
                const isInclude = normalize(ingredient).toLowerCase().includes(searchKey);
                return isInclude;
            });
            return filteredIngredients;
        }
    }

    static getUtils = (searchKey) => {
        const uniqUtils = [];
        const utils = _filteredRecipes.map((recipe) => recipe.appliance);
        utils.forEach((util) => {
            if (!uniqUtils.includes(util)) uniqUtils.push(util);
        });
        if (!searchKey) return uniqUtils;
        else {
            searchKey = normalize(searchKey);
            searchKey = searchKey.toLowerCase();
            const filteredUtils = uniqUtils.filter((util) => {
                const isInclude = normalize(util).toLowerCase().includes(searchKey);
                return isInclude;
            });
            return filteredUtils;
        }
    };

    static getRecipes = (filterParams) => {
        console.log(filterParams);
        if (!filterParams) {
            _filteredRecipes = recipes;
            return _filteredRecipes;
        }
        const { utils, ingredients, utensils, searchKey } = filterParams;

        const _recipes = searchKey ? searchOnRecipes(recipes, searchKey) : recipes;

        if (!utils && !ingredients && !utensils)
            if (utils.length === 0 && ingredients.length === 0 && utensils.length === 0) {
                _filteredRecipes = _recipes;
                return _filteredRecipes;
            }

        _filteredRecipes = [];

        _recipes.forEach((recipe) => {
            const isIngredientsExist = ingredients.every((ingredient) =>
                recipe.ingredients.some((x) => x.ingredient === ingredient),
            );
            const isUtilsExist = utils.every((util) => recipe.appliance.includes(util));

            const isUtensilsExist = utensils.every((utensil) => recipe.ustensils.includes(utensil));

            // filtered
            if (isUtilsExist && isIngredientsExist && isUtensilsExist) _filteredRecipes.push(recipe);
        });

        return _filteredRecipes;
    };
}

export default API;

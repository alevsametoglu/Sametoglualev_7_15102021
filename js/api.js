import recipes from './recipes.js';

class API {
    static getUtensils(searchKey) {
        const uniqUtensils = [];

        const utensils = recipes.map((recipe) => recipe.ustensils).flat();
        utensils.forEach((utensil) => {
            if (!uniqUtensils.includes(utensil)) uniqUtensils.push(utensil);
        });
        if (!searchKey) return uniqUtensils;
        else {
            searchKey = searchKey.toLowerCase();
            const filteredUtensils = uniqUtensils.filter((utensils) => {
                const isIncude = utensil.toLowerCase().includes(searchKey);
                return isIncude;
            });
            return filteredUtils;
        }
    }

    static getIngredients(searchKey) {
        const uniqIngredients = [];
        const ingredients = recipes.map((recipe) => recipe.ingredients).flat();

        ingredients.forEach((item) => {
            if (!uniqIngredients.includes(item.ingredient)) uniqIngredients.push(item.ingredient);
        });

        if (!searchKey) return uniqIngredients;
        else {
            searchKey = searchKey.toLowerCase();
            const filteredIngredients = uniqIngredients.filter((ingredient) => {
                const isInclude = ingredient.toLowerCase().includes(searchKey);
                return isInclude;
            });
            return filteredIngredients;
        }
    }

    static getUtils = (searchKey) => {
        const uniqUtils = [];
        const utils = recipes.map((recipe) => recipe.appliance);
        utils.forEach((util) => {
            if (!uniqUtils.includes(util)) uniqUtils.push(util);
        });
        if (!searchKey) return uniqUtils;
        else {
            searchKey = searchKey.toLowerCase();
            const filteredUtils = uniqUtils.filter((util) => {
                const isInclude = util.toLowerCase().includes(searchKey);
                return isInclude;
            });
            return filteredUtils;
        }
    };

    static getRecipes = (filterParams) => {
        console.log(filterParams);
        if (!filterParams) return recipes;
        const { utils, ingredients, utensils, searchKey } = filterParams;

        if (!utils && !ingredients && !utensils && !searchKey) return recipes;
        if (utils.length === 0 && ingredients.length === 0 && utensils.length === 0) return recipes;

        const filteredRecipes = [];

        recipes.forEach((recipe) => {
            //TODO: filter recipe with filter params and push to filtered recipes array

            const isIngredientsExist = ingredients.every((ingredient) =>
                recipe.ingredients.some((x) => x.ingredient === ingredient),
            );
            const isUtilsExist = utils.every((util) => recipe.appliance.includes(util));

            const isUtensilsExist = utensils.every((utensil) => recipe.ustensils.includes(utensil));

            // filtered tag by tag
            // if (isIngredientsExist) filteredRecipes.push(recipe);
            // if (isUtilsExist) filteredRecipes.push(recipe);
            // if (isUtensilsExist) filteredRecipes.push(recipe);

            // filtered
            if (isUtilsExist && isIngredientsExist && isUtensilsExist) filteredRecipes.push(recipe);
        });

        return filteredRecipes;
    };
}

export default API;

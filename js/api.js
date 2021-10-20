import recipes from './recipes.js';

class API {
    static getUtensils() {
        const uniqUtensils = [];

        const utensils = recipes.map((recipe) => recipe.ustensils).flat();
        utensils.forEach((utensil) => {
            if (!uniqUtensils.includes(utensil)) uniqUtensils.push(utensil);
        });

        return uniqUtensils;
    }

    static getIngredients() {
        const uniqIngredients = [];
        const ingredients = recipes.map((recipe) => recipe.ingredients).flat();

        ingredients.forEach((item) => {
            if (!uniqIngredients.includes(item.ingredient)) uniqIngredients.push(item.ingredient);
        });

        return uniqIngredients;
    }

    static getUtils = () => {
        const uniqUtils = [];
        const utils = recipes.map((recipe) => recipe.appliance);
        utils.forEach((util) => {
            if (!uniqUtils.includes(util)) uniqUtils.push(util);
        });
        return uniqUtils;
    };
}

export default API;

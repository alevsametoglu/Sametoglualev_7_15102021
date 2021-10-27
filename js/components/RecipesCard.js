export default class RecipeCard {
    el;
    constructor(name, time, ingredients, description) {
        this.el = document.createElement('div');
        this.el.classList.add('card');
        this.el.innerHTML = ` <img class="card-img-top" src="./data/img/bg-recipe.png" alt="Card image cap" />`;

        const cardBody = document.createElement('div');
        cardBody.classList.add('card-body');

        const recipesTitle = document.createElement('div');
        recipesTitle.classList.add('title-recipes');
        recipesTitle.innerHTML = `
        <h5 class="card-title">${name}</h5>
        <h5 class="card-title"><i class="far fa-clock"></i>${time} min</h5>`;
        const informationRecipe = document.createElement('div');
        informationRecipe.classList.add('information-recipes');

        const recipesList = document.createElement('ul');
        recipesList.classList.add('card-text');
        recipesList.classList.add('list');
        informationRecipe.appendChild(recipesList);

        ingredients.forEach((element) => {
            const recipesListItem = document.createElement('li');
            recipesListItem.innerText = `${element.ingredient}:${element.quantity || ''}${element.unit || ''}`;
            recipesList.appendChild(recipesListItem);
        });

        const recipesText = document.createElement('p');
        recipesText.classList.add('card-text');
        recipesText.classList.add('recette');

        recipesText.innerText = description;
        informationRecipe.appendChild(recipesText);

        cardBody.appendChild(recipesTitle);
        cardBody.appendChild(informationRecipe);
        this.el.appendChild(cardBody);
    }
}

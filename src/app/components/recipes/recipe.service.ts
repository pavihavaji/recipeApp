import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Recipe } from 'src/app/components/recipes/recipe.model';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../../shared/services/shopping-list.service';

@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();
  /*private recipes: Recipe[] = [
    new Recipe(
      'Toffu Masala',
      'Vegan India Tofu Tikka Masala',
      'https://www.thespruceeats.com/thmb/qV3rWToK2GI8HQE8Djo1rYzuPfA=/960x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/vegan-tofu-tikka-masala-recipe-3378484-hero-01-d676687a7b0a4640a55be669cba73095.jpg',
      [new Ingredient('Toffu', 1), new Ingredient('Masala', 10)]
    ),
    new Recipe(
      'Fruit sandwich',
      'Japaneese fruit sandwich',
      'https://web-japan.org/trends/img/jfd202010_fruit-sandwich04.jpg',
      [
        new Ingredient('Kiwi', 1),
        new Ingredient('Strawberry', 1),
        new Ingredient('Filling', 1),
      ]
    ),
    new Recipe(
      'Chicken burger',
      'Mexican chicken burger',
      'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/mexican-chicken-burger_1-b5cca6f.jpg?quality=90&webp=true&resize=440,400',
      [
        new Ingredient('Bun', 1),
        new Ingredient('Chicken', 1),
        new Ingredient('Lettuce', 1),
      ]
    ),
  ];*/

  private recipes: Recipe[] = [];

  constructor(private shoppingListService: ShoppingListService) {}

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }
  getRecipes() {
    //so that we only pass a copy
    //no the actual reference of the recipes[]
    return this.recipes.slice();
  }

  getRecipeById(index: number) {
    return this.recipes.slice()[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
}

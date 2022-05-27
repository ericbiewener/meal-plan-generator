import { getFoodsByType, Food } from "../foods";
import _ from "lodash";

export type Meal = {
  protein: Food;
  carbs?: Food;
  veggies?: Food;
};

export const createMeals = (quantity: number, pinnedMeals: Meal[] = []) => {
  const meals = [...pinnedMeals];
  const remaining = quantity - meals.length;

  const foods = getFoodsByType();
  const proteins = _.shuffle(foods.proteins).filter(
    (p) => !meals.some((m) => m.protein.name === p.name)
  );
  const carbs = _.shuffle(foods.carbs);
  const veggies = _.shuffle(foods.veggies);

  for (let i = 0; i < remaining; i++) {
    const protein = proteins.pop();
    if (!protein) break;

    const meal: Meal = { protein };
    if (protein.sides) {
      protein.sides.forEach((side) => {
        if (side.veggies) {
          meal.veggies = side;
        } else if (side.carbs) {
          meal.carbs = side;
        }
      });
    }

    if (!meal.carbs && !meal.veggies?.carbs && !protein.carbs)
      meal.carbs = carbs.pop();
    if (!meal.veggies && !meal.carbs?.veggies && !protein.veggies)
      meal.veggies = veggies.pop();
    meals.push(meal);
  }

  return meals;
};

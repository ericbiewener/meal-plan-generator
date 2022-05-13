import { useForm } from "react-hook-form";
import _ from "lodash";
import { titleCase } from "title-case";
import { getFoodsByType, FoodWithName } from "./foods";
import { EmojiHeader } from "./emojis/emoji-header";
import { useState, SyntheticEvent } from "react";

type Meal = {
  protein: FoodWithName;
  carb?: FoodWithName;
  veggie?: FoodWithName;
};

const preventDefault = (e: SyntheticEvent) => e.preventDefault()

const createMeals = (quantity: number) => {
  const meals: Meal[] = [];
  const foods = getFoodsByType();
  const proteins = _.shuffle(foods.proteins);
  const carbs = _.shuffle(foods.carbs);
  const veggies = _.shuffle(foods.veggies);

  for (let i = 0; i < quantity; i++) {
    const protein = proteins.pop();
    if (!protein) break;

    const meal: Meal = { protein };
    if (!protein.carb) meal.carb = carbs.pop();
    if (!protein.veggie) meal.veggie = veggies.pop();
    meals.push(meal);
  }

  return meals;
};

export const SelectionForm = () => {
  const [_, reRender] = useState(0);
  const { register, watch } = useForm({ defaultValues: { days: 10 } });

  const days = watch("days");
  const meals = createMeals(Number(days));

  return (
    <>
      <EmojiHeader />
      <form id="settings" onSubmit={preventDefault}>
        <div>
          <input
            {...register("days")}
            type="number"
            placeholder="Days"
            className="day-input"
            autoFocus
          />
        </div>
        <div>
          <button onClick={() => reRender((v) => v + 1)}>Shuffle</button>
        </div>
      </form>
      <table cellSpacing="0" cellPadding="0">
        <thead>
          <tr>
            <th>Protein</th>
            <th>Carb</th>
            <th>Veggie</th>
          </tr>
        </thead>
        <tbody>
          {meals.map((meal) => (
            <tr key={meal.protein.name}>
              <td>{titleCase(meal.protein.name)}</td>
              <td>{meal.carb && titleCase(meal.carb.name)}</td>
              <td>{meal.veggie && titleCase(meal.veggie.name)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

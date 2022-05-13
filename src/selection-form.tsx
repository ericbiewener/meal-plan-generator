import { useForm } from "react-hook-form";
import _ from "lodash";
import { titleCase } from "title-case";
import { getFoodsByType, Food } from "./foods";
import { EmojiHeader } from "./emojis/emoji-header";
import { useState, SyntheticEvent, useEffect, useMemo } from "react";
import copy from "copy-to-clipboard";

type Meal = {
  protein: Food;
  carb?: Food;
  veggie?: Food;
};

const preventDefault = (e: SyntheticEvent) => e.preventDefault();

const createMeals = (quantity: number, pinnedMeals: Meal[]) => {
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
        if (side.veggie) {
          meal.veggie = side;
        } else if (side.carb) {
          meal.carb = side;
        }
      });
    }

    if (!meal.carb && !meal.veggie?.carb && !protein.carb)
      meal.carb = carbs.pop();
    if (!meal.veggie && !meal.carb?.veggie && !protein.veggie)
      meal.veggie = veggies.pop();
    meals.push(meal);
  }

  return meals;
};

const usePinned = () => {
  const [pinned, setPinned] = useState<Meal[]>([]);

  const togglePin = (meal: Meal) => {
    const idx = pinned.indexOf(meal);
    if (idx < 0) {
      setPinned([...pinned, meal]);
    } else {
      setPinned([...pinned.slice(0, idx), ...pinned.slice(idx)]);
    }
  };

  return { pinned, togglePin };
};

const copyMeals = (meals: Meal[]) => () => {
  copy(
    meals
      .map((m) =>
        [m.protein.name, m.veggie?.name, m.carb?.name]
          .filter(Boolean)
          .join(", ")
      )
      .join("\n")
  );
};

export const SelectionForm = () => {
  const [reRenderCount, reRender] = useState(0);
  const { register, watch } = useForm({ defaultValues: { days: 10 } });

  const days = watch("days");
  const { pinned, togglePin } = usePinned();
  const meals = useMemo(
    () => createMeals(days, pinned),
    [days, reRenderCount, pinned]
  );

  return (
    <>
      <EmojiHeader reRenderCount={`${reRenderCount}${days}`} />
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
        <tbody style={{ cursor: "pointer" }}>
          {meals.map((meal) => (
            <tr
              key={meal.protein.name}
              onClick={() => togglePin(meal)}
              className={pinned.includes(meal) ? "pinned" : undefined}
            >
              <td>{titleCase(meal.protein.name)}</td>
              <td>{meal.carb && titleCase(meal.carb.name)}</td>
              <td>{meal.veggie && titleCase(meal.veggie.name)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="text-center">
        <button className="copy-results" onClick={copyMeals(meals)}>
          Copy results
        </button>
      </div>
    </>
  );
};

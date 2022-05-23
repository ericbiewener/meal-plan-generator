import cn from "classnames";
import { useForm } from "react-hook-form";
import _ from "lodash";
import { titleCase } from "title-case";
import { getFoodsByType, Food } from "../foods";
import { EmojiHeader } from "../emojis/emoji-header";
import {
  useState,
  SyntheticEvent,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react";
import copy from "copy-to-clipboard";
import { OutlineButton } from "../components/button";

type Meal = {
  protein: Food;
  carbs?: Food;
  veggies?: Food;
};

const preventDefault = (e: SyntheticEvent) => e.preventDefault();

const createMeals = (quantity: number, pinnedMeals: Meal[] = []) => {
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

const usePinned = (setMeals: Dispatch<SetStateAction<Meal[]>>) => {
  const [pinned, setPinned] = useState<Meal[]>([]);

  const togglePin = (...meals: Meal[]) => {
    const newPinned = [...pinned];
    for (const meal of meals) {
      const idx = pinned.indexOf(meal);
      if (idx < 0) {
        newPinned.push(meal);
      } else {
        newPinned.splice(idx, 1);
      }
    }
    setPinned(newPinned);
    console.info("::", newPinned);
    setMeals((allMeals) => [
      ...newPinned,
      ...allMeals.filter((m) => !newPinned.includes(m)),
    ]);
  };

  return { pinned, togglePin };
};

const copyMeals = (meals: Meal[]) => () => {
  copy(
    meals
      .map((m) =>
        [m.protein.name, m.veggies?.name, m.carbs?.name]
          .filter(Boolean)
          .join(", ")
      )
      .join("\n")
  );
};

const getNewValue = <V extends unknown>(arr: V[], val: V) => {
  let v: V;
  while ((v = _.shuffle(arr)[0])) {
    if (v !== val) return v;
  }
};

const refreshButtonClassName = "invisible group-hover:visible mr-1 -ml-5";

export const MealPlanGenerator = () => {
  const [reRenderCount, reRender] = useState(0);
  const { register, watch } = useForm({ defaultValues: { days: 10 } });
  const days = watch("days");

  const [meals, setMeals] = useState(() => createMeals(days));
  const { pinned, togglePin } = usePinned(setMeals);
  useEffect(
    () => setMeals(createMeals(days, pinned)),
    [days, reRenderCount, pinned.length]
  );

  const shuffleFood =
    (foodType: "carbs" | "veggies", mealIdx: number) => (e) => {
      e.stopPropagation();
      const foods = getFoodsByType();
      const meal = meals[mealIdx];
      const food = getNewValue(foods[foodType], meal.carbs);
      const newMeal = { ...meal, [foodType]: food };
      setMeals([
        ...meals.slice(0, mealIdx),
        newMeal,
        ...meals.slice(mealIdx + 1),
      ]);
      if (pinned.includes(meal)) {
        togglePin(meal, newMeal);
      }
    };

  return (
    <>
      <EmojiHeader reRenderCount={`${reRenderCount}${days}`} />
      <form className="text-center" onSubmit={preventDefault}>
        <div className="flex flex-col items-center">
          <input
            {...register("days")}
            type="number"
            className="text-center text-7xl font-semibold w-32 p-2"
            autoFocus
          />
          <OutlineButton
            onClick={() => reRender((v) => v + 1)}
            className="mt-4 mb-8"
          >
            Shuffle
          </OutlineButton>
        </div>
      </form>
      <table cellSpacing="0" cellPadding="0">
        <thead className="bg-stone-100">
          <tr className="children:p-1">
            <th className="w-1/2">Protein</th>
            <th className="w-1/4">Carb</th>
            <th>Veggie</th>
          </tr>
        </thead>
        <tbody className="cursor-pointer">
          {meals.map((meal, i) => (
            <tr
              key={i}
              onClick={() => togglePin(meal)}
              className={`children:p-1 group ${
                pinned.includes(meal) ? "bg-yellow-100" : "hover:bg-yellow-50"
              }`}
            >
              <td>{titleCase(meal.protein.name)}</td>
              <td>
                {meal.carbs && (
                  <>
                    <button
                      className={refreshButtonClassName}
                      onClick={shuffleFood("carbs", i)}
                    >
                      🔄
                    </button>
                    {titleCase(meal.carbs.name)}
                  </>
                )}
              </td>
              <td>
                {meal.veggies && (
                  <>
                    <button
                      className={refreshButtonClassName}
                      onClick={shuffleFood("veggies", i)}
                    >
                      🔄
                    </button>
                    {titleCase(meal.veggies.name)}
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="text-center">
        <OutlineButton className="mt-4" onClick={copyMeals(meals)}>
          Copy results
        </OutlineButton>
      </div>
    </>
  );
};

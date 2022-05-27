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
import { Button } from "../components/button";
import { classes } from "../components/classes";
import { IoShuffle } from "react-icons/io5";
import { useFlashNotificationCtx } from "../flash-notifications/flash-notification-provider";
import { preventDefault } from "../utils";
import { Meal, createMeals } from "./create-meals";
import { usePinned } from "./use-pinned";

const copyMeals = (meals: Meal[]) => {
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

const refreshButtonClassName =
  "invisible group-hover:visible -ml-5 text-stone-500 hover:text-stone-400 active:text-stone-500";
const trClassName = "children:py-5 children:px-6";

export const MealPlanGenerator = () => {
  const [reRenderCount, reRender] = useState(0);
  const { register, watch } = useForm({ defaultValues: { days: 10 } });
  const days = watch("days");

  const { showFlashNotification } = useFlashNotificationCtx();

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
            className="text-center shadow-2xl text-7xl font-semibold w-32 p-2 border-2 border-stone-200 focus:border-blue-500"
            autoFocus
          />
          <Button
            onClick={() => reRender((v) => v + 1)}
            className="mt-4 mb-8"
            type={1}
          >
            Shuffle
          </Button>
        </div>
      </form>
      <div
        className={`${classes.card.main} border border-stone-200 overflow-hidden`}
      >
        <table>
          <thead className="">
            <tr className={`${trClassName} bg-stone-100 `}>
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
                className={`${trClassName} border-t border-stone-200 group ${
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
                        <IoShuffle />
                      </button>{" "}
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
                        <IoShuffle />
                      </button>{" "}
                      {titleCase(meal.veggies.name)}
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className={`border-stone-200 border-t ${trClassName}`}>
              <td colSpan={3} className="text-center">
                <Button
                  onClick={() => {
                    copyMeals(meals);
                    showFlashNotification('Copied!')
                  }}
                >
                  Copy results
                </Button>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </>
  );
};

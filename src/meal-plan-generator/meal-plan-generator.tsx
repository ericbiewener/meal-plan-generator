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
import { mergeClass } from "../components";

const Td = mergeClass("td", "p-1")
const Th = mergeClass("th", "p-1")

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
    console.info('::', newPinned)
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
      <table cellSpacing="0" cellPadding="0" className="meal-plan-table">
        <thead className="bg-stone-100">
          <tr>
            <Th className="w-1/2">Protein</Th>
            <Th className="w-1/4">Carb</Th>
            <Th>Veggie</Th>
          </tr>
        </thead>
        <tbody style={{ cursor: "pointer" }}>
          {meals.map((meal, i) => (
            <tr
              key={i}
              onClick={() => togglePin(meal)}
              className={pinned.includes(meal) ? "pinned" : undefined}
            >
              <Td>{titleCase(meal.protein.name)}</Td>
              <Td>
                {meal.carbs && (
                  <>
                    <button
                      className="emoji-button"
                      onClick={shuffleFood("carbs", i)}
                    >
                      🔄
                    </button>
                    {titleCase(meal.carbs.name)}
                  </>
                )}
              </Td>
              <Td>
                {meal.veggies && (
                  <>
                    <button
                      className="emoji-button"
                      onClick={shuffleFood("veggies", i)}
                    >
                      🔄
                    </button>
                    {titleCase(meal.veggies.name)}
                  </>
                )}
              </Td>
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

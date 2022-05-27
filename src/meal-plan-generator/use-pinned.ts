import {
  useState,
  SyntheticEvent,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react";
import { Meal, createMeals } from "./create-meals";

export const usePinned = (setMeals: Dispatch<SetStateAction<Meal[]>>) => {
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

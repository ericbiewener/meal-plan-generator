import { MealPlanGenerator } from "./meal-plan-generator/meal-plan-generator";
import { createRoot } from "react-dom/client";
import { FoodList } from "./food-list";
import { useState } from "react";
import { PillBox } from "./components/pills";

const App = () => {
  const [showMealGenerator, setShowMealGenerator] = useState(true);

  return (
    <>
      <PillBox className="mb-7">
        <button
          onClick={() => setShowMealGenerator(true)}
          className={showMealGenerator ? "pointer-events-none" : "bg-stone-100"}
        >
          Meal Generator
        </button>
        <button
          onClick={() => setShowMealGenerator(false)}
          className={
            !showMealGenerator ? "pointer-events-none" : "bg-stone-100"
          }
        >
          Food List
        </button>
      </PillBox>
      {/* Never unmount MealPlanGenerator so that we don't lose its state */}
      <div style={{ display: showMealGenerator ? "block" : "none" }}>
        <MealPlanGenerator />
      </div>
      {!showMealGenerator && <FoodList />}
    </>
  );
};

const root = createRoot(document.getElementById("react-root"));
root.render(<App />);

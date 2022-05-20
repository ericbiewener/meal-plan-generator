import { MealPlanGenerator } from "./meal-plan-generator/meal-plan-generator";
import { createRoot } from "react-dom/client";
import { FoodList } from "./food-list";
import { useState } from "react";

type Screen = "foodList" | "generator";

const getScreen = (screen: Screen) => {
  switch (screen) {
    case "foodList":
      return <FoodList />;
    default:
      return null;
  }
};

const App = () => {
  const [screen, setScreen] = useState<Screen>("generator");

  const visibleScreen = getScreen(screen);

  return (
    <>
      <div className="mb-8 text-sm text-stone-500">
        <button onClick={() => setScreen("generator")} className="mr-5">Meal Generator</button>
        <button onClick={() => setScreen("foodList")}>Food List</button>
      </div>
      {/* Never unmount MealPlanGenerator so that we don't lose its state */}
      <div style={{ display: visibleScreen ? "none" : "block" }}><MealPlanGenerator /></div>
      {visibleScreen}
    </>
  );
};

const root = createRoot(document.getElementById("react-root"));
root.render(<App />);

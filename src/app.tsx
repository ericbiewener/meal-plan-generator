import { MealPlanGenerator } from "./meal-plan-generator/meal-plan-generator";
import { createRoot } from "react-dom/client";
import { FoodList } from "./food-list";
import { useState } from "react";
import { PillBox } from "./components/pills";
import { IconContext } from "react-icons";
import { FlashNotificationProvider } from "./flash-notifications/flash-notification-provider";

const App = () => {
  const [showMealGenerator, setShowMealGenerator] = useState(true);

  return (
    <IconContext.Provider
      value={{
        className: "inline-block align-top",
        size: "1.15em",
        style: { marginTop: 3 },
      }}
    >
      <FlashNotificationProvider>
        <PillBox className="mb-7 mt-4">
          <button
            onClick={() => setShowMealGenerator(true)}
            className={
              showMealGenerator ? "pointer-events-none" : "bg-stone-100"
            }
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
      </FlashNotificationProvider>
    </IconContext.Provider>
  );
};

const root = createRoot(document.getElementById("react-root"));
root.render(<App />);

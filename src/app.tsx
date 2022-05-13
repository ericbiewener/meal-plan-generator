import { SelectionForm } from "./selection-form";
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
      <div id="main-menu">
        <button onClick={() => setScreen("generator")}>Meal Generator</button>
        <button onClick={() => setScreen("foodList")}>Food List</button>
      </div>
      {/* Never unmount SelectionForm so that we don't lose its state */}
      <div style={{ display: visibleScreen ? "none" : "block" }}><SelectionForm /></div>
      {visibleScreen}
    </>
  );
};

const root = createRoot(document.getElementById("react-root"));
root.render(<App />);

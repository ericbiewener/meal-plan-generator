import { SelectionForm } from "./selection-form";
import { createRoot } from "react-dom/client";

const App = () => {
  return <SelectionForm />
}

const root = createRoot(document.getElementById("react-root"));
root.render(<App />);

import { Food } from "./foods";
import { FC } from "react";
import { getFoodsByType } from "./foods";

const { proteins, veggies, carbs } = getFoodsByType();

type ListProps = { title: string; data: Food[] };

const List: FC<ListProps> = ({ title, data }) => (
  <div className="list">
    <h2>{title}</h2>
    <ul>
      {data.map((d) => (
        <li key={d.name}>{d.name}</li>
      ))}
    </ul>
  </div>
);

export const FoodList = () => {
  return (
    <div id="food-list">
      <h1>Food List</h1>
      <div className="lists">
        <List title="Protein" data={proteins} />
        <List title="Veggies" data={veggies} />
        <List title="Carbs" data={carbs} />
      </div>
    </div>
  );
};

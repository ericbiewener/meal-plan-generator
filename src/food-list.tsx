import { Food } from "./foods";
import { FC } from "react";
import { getFoodsByType } from "./foods";
import { classes } from "./components/classes";

const { proteins, veggies, carbs } = getFoodsByType();

type ListProps = { title: string; data: Food[] };

const List: FC<ListProps> = ({ title, data }) => (
  <div>
    <h2>{title}</h2>
    <ul>
      {data.map((d) => (
        <li key={d.name}>{d.name}</li>
      ))}
    </ul>
  </div>
);

export const FoodList = () => (
  <div>
    <h1 className={classes.card.header}>Food List</h1>
    <div
      className={`flex justify-between ${classes.card.padding} ${classes.card.main}`}
    >
      <List title="Protein 🍖" data={proteins} />
      <List title="Veggies 🥦" data={veggies} />
      <List title="Carbs 🍞" data={carbs} />
    </div>
  </div>
);

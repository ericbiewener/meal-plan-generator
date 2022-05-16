export type Food = {
  name: string;
  protein?: boolean;
  carbs?: boolean;
  veggies?: boolean;
  weight: number;
  sides?: Food[];
};

type FoodWithoutName = Omit<Food, "name">;

const rice: Food = { name: "rice", carbs: true, weight: 100 };
const polenta: Food = { name: "polenta", carbs: true, weight: 0 };

const shrimp: FoodWithoutName = {
  protein: true,
  weight: 75,
  sides: [rice],
};

const veggies: Food[] = [
  { name: "salad", veggies: true, weight: 100 },
  { name: "broccoli", veggies: true, weight: 50 },
  { name: "green beans", veggies: true, weight: 50 },
  { name: "asparagus", veggies: true, weight: 75 },
  { name: "wilted chard", veggies: true, weight: 10 },
  { name: "wilted kale", veggies: true, weight: 10 },
  { name: "wilted spinach", veggies: true, weight: 10 },
];

const carbs: Food[] = [rice, { name: "crusty bread", carbs: true, weight: 10 }];

const proteins: Food[] = [
  { name: "rotisserie chicken", protein: true, weight: 100 },
  { name: "salmon", protein: true, weight: 100 },
  { name: "steak", protein: true, weight: 50 },
  { name: "garlic shrimp", ...shrimp },
  { name: "anne red sauce shrimp", ...shrimp },
  { name: "lentils", protein: true, weight: 50 },
  { name: "pesto turkey burgers", protein: true, weight: 100 },
  { name: "chicken", protein: true, weight: 100 },
];

const combos: Food[] = [
  { name: "fajita bowl", protein: true, veggies: true, carbs: true, weight: 100 },
  { name: "sheet pan greek chicken", protein: true, veggies: true, weight: 50 },
  { name: "crispy tortellini", protein: true, carbs: true, weight: 50 },
  {
    name: "spicy squash salad with lentils and goat cheese",
    protein: true,
    carbs: true,
    veggies: true,
    weight: 50,
  },
  {
    name: "easiest chicken noodle soup",
    protein: true,
    veggies: true,
    carbs: true,
    weight: 50,
  },
  {
    name: "oven braised beef with tomato and garlic",
    protein: true,
    carbs: true,
    weight: 50,
    sides: [polenta],
  },
  { name: "white chili", protein: true, carbs: true, weight: 50 },
];

export const foods = [...veggies, ...carbs, ...proteins, ...combos];

export const getFoodsByType = () => {
  const proteins: Food[] = [];
  const carbs: Food[] = [];
  const veggies: Food[] = [];

  foods.forEach((food) => {
    if (food.protein) {
      proteins.push(food);
    } else if (food.veggies) {
      veggies.push(food);
    } else if (food.carbs) {
      carbs.push(food);
    }
  });

  return { proteins, carbs, veggies };
};

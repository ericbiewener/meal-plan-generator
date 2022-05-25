export type Food = {
  name: string;
  protein?: boolean;
  carbs?: boolean;
  veggies?: boolean;
  sides?: Food[];
};

type FoodWithoutName = Omit<Food, "name">;

const rice: Food = { name: "rice", carbs: true };
const bread: Food = { name: "crusty bread", carbs: true };
const polenta: Food = { name: "polenta", carbs: true };

const shrimp: FoodWithoutName = {
  protein: true,
  sides: [rice],
};

const veggies: Food[] = [
  { name: "salad", veggies: true },
  { name: "broccoli", veggies: true },
  { name: "green beans", veggies: true },
  { name: "asparagus", veggies: true },
  { name: "wilted chard", veggies: true },
  { name: "wilted kale", veggies: true },
  { name: "wilted spinach", veggies: true },
  { name: "chopped salad with feta, lime, & mint", veggies: true },
];

const carbs: Food[] = [rice, bread];

const proteins: Food[] = [
  { name: "rotisserie chicken", protein: true },
  { name: "salmon", protein: true },
  { name: "steak", protein: true },
  { name: "garlic shrimp", ...shrimp },
  { name: "anne red sauce shrimp", ...shrimp },
  { name: "lentils", protein: true },
  { name: "roasted sausages with grapes & onions", protein: true },
  { name: "pesto turkey burgers", protein: true },
  { name: "chicken", protein: true },
  { name: "new seasons chicken kebab", protein: true },
  { name: "shakshuka, maybe with sausage", protein: true },
  { name: "chicken & rice soup with garlicky chile oil", protein: true },
  { name: "lentisl casero", protein: true },
  {
    name: "easy ground chicken noodle soup",
    protein: true,
    veggies: true,
    sides: [bread],
  },
];

const combos: Food[] = [
  { name: "fajita bowl", protein: true, veggies: true, carbs: true },
  { name: "sheet pan greek chicken", protein: true, veggies: true },
  { name: "crispy tortellini", protein: true, carbs: true },
  { name: "chicken gyro salad", protein: true, carbs: true, veggies: true },
  { name: "carnitas tacos", protein: true, carbs: true, veggies: true },
  { name: "martha stewart one-pan pasta", protein: true, carbs: true },
  {
    name: "creamy pappardelle with leeks & bacon",
    protein: true,
    carbs: true,
  },
  {
    name: "spicy squash salad with lentils & goat cheese",
    protein: true,
    carbs: true,
    veggies: true,
  },
  {
    name: "easiest chicken noodle soup",
    protein: true,
    veggies: true,
    carbs: true,
  },
  {
    name: "oven braised beef with tomato & garlic",
    protein: true,
    carbs: true,
    sides: [polenta],
  },
  { name: "white chili", protein: true, carbs: true },
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

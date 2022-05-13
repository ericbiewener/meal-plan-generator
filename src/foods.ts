export type Food = {
  protein?: boolean;
  carb?: boolean;
  veggie?: boolean;
  weight: number;
  sides?: Food[];
};

export type FoodWithName = Food & { name: string };

const rice: Food = { carb: true, weight: 100 };
const polenta: Food = { carb: true, weight: 0 };
const shrimp: Food = { protein: true, weight: 75, sides: [rice] };

const veggies: Record<string, Food> = {
  salad: { veggie: true, weight: 100 },
  broccoli: { veggie: true, weight: 50 },
  "green beans": { veggie: true, weight: 50 },
  asparagus: { veggie: true, weight: 75 },
  "wilted chard": { veggie: true, weight: 10 },
  "wilted kale": { veggie: true, weight: 10 },
  "wilted spinach": { veggie: true, weight: 10 },
};

const carbs: Record<string, Food> = {
  rice,
  "crusty bread": { carb: true, weight: 10 },
};

const proteins: Record<string, Food> = {
  "rotisserie chicken": { protein: true, weight: 100 },
  salmon: { protein: true, weight: 100 },
  steak: { protein: true, weight: 50 },
  "garlic shrimp": shrimp,
  "anne red sauce shrimp": shrimp,
  lentils: { protein: true, weight: 50 },
  "pesto turkey burgers": { protein: true, weight: 100 },
  chicken: { protein: true, weight: 100 },
};

const combos: Record<string, Food> = {
  "fajita bowl": { protein: true, veggie: true, carb: true, weight: 100 },
  "sheet pan greek chicken": { protein: true, veggie: true, weight: 50 },
  "crispy tortellini": { protein: true, carb: true, weight: 50 },
  "spicy squash salad with lentils and goat cheese": {
    protein: true,
    carb: true,
    veggie: true,
    weight: 50,
  },
  "easiest chicken noodle soup": {
    protein: true,
    veggie: true,
    carb: true,
    weight: 50,
  },
  "oven braised beef with tomato and garlic": {
    protein: true,
    carb: true,
    weight: 50,
    sides: [polenta],
  },
  "white chili": { protein: true, carb: true, weight: 50 },
};

export const foods = {
  ...veggies,
  ...carbs,
  ...proteins,
  ...combos,
};

export const getFoodsByType = () => {
  const proteins: FoodWithName[] = [];
  const carbs: FoodWithName[] = [];
  const veggies: FoodWithName[] = [];

  Object.entries(foods).forEach(([k, v]) => {
    const val = { ...v, name: k };
    if (v.protein) {
      proteins.push(val);
    } else if (v.veggie) {
      veggies.push(val);
    } else if (v.carb) {
      carbs.push(val);
    }
  });

  return { proteins, carbs, veggies };
};

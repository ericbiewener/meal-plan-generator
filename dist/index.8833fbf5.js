const rice = {
    carb: true,
    weight: 100
};
const polenta = {
    carb: true,
    weight: 0
};
const shrimp = {
    protein: true,
    weight: 75,
    sides: [
        rice
    ]
};
const veggies = {
    salad: {
        veggie: true,
        weight: 100
    },
    broccoli: {
        veggie: true,
        weight: 50
    },
    "green beans": {
        veggie: true,
        weight: 50
    },
    asparagus: {
        veggie: true,
        weight: 75
    },
    "wilted chard": {
        veggie: true,
        weight: 10
    },
    "wilted kale": {
        veggie: true,
        weight: 10
    },
    "wilted spinach": {
        veggie: true,
        weight: 10
    }
};
const carbs = {
    rice,
    "crusty bread": {
        carb: true,
        weight: 10
    }
};
const proteins = {
    "rotisserie chicken": {
        protein: true,
        weight: 100
    },
    salmon: {
        protein: true,
        weight: 100
    },
    steak: {
        protein: true,
        weight: 50
    },
    "garlic shrimp": shrimp,
    "anne red sauce shrimp": shrimp,
    lentils: {
        protein: true,
        weight: 50
    },
    "pesto turkey burgers": {
        protein: true,
        weight: 100
    },
    chicken: {
        protein: true,
        weight: 100
    },
    chicken: {
        protein: true,
        weight: 100
    },
    chicken: {
        protein: true,
        weight: 100
    },
    chicken: {
        protein: true,
        weight: 100
    },
    chicken: {
        protein: true,
        weight: 100
    }
};
const combos = {
    "fajita bowl": {
        protein: true,
        veggie: true,
        carb: true,
        weight: 100
    },
    "sheet pan greek chicken": {
        protein: true,
        veggie: true,
        weight: 50
    },
    "crispy tortellini": {
        protein: true,
        carb: true,
        weight: 50
    },
    "spicy squash salad with lentils and goat cheese": {
        protein: true,
        carb: true,
        veggie: true,
        weight: 50
    },
    "easiest chicken noodle soup": {
        protein: true,
        veggie: true,
        carb: true,
        weight: 50
    },
    "oven braised beef with tomato and garlic": {
        protein: true,
        carb: true,
        weight: 50,
        sides: [
            polenta
        ]
    },
    "white chili": {
        protein: true,
        carb: true,
        weight: 50
    }
};
window.foods = {
    ...veggies,
    ...carbs,
    ...proteins,
    ...combos
};

//# sourceMappingURL=index.8833fbf5.js.map

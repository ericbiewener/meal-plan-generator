const foodsByType = { protein: [], carb: [], veggie: [] }

Object.entries(window.foods, ([k, v]) => {
  if (v.protein) {
    protein.push(k)
  } else if (v.veggie) {
    protein.push(k)
    if (v.carb) protein.push(k)
  }
})

const generateMeal = () => {

}

$(document).ready(() => {
  $("#submit").on("click", () => {
    console.info("::", "submitting!");
  });
});

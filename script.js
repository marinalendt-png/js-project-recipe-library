//2 types of buttons, change color when active//
function makesButtonInteractive(groupClass) {
  const buttons = document.querySelectorAll(groupClass)

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      buttons.forEach(b => b.classList.remove("active"))
      btn.classList.add("active")
    })
  })
}
//The function runs on both groups// 
makesButtonInteractive(".btn-kitchen")
makesButtonInteractive(".btn-sorting")

//When clicking a kitchen-button, a text appears in card-1//
// const card = document.getElementById("card-1")
// const filterButtons = document.querySelectorAll(".btn-kitchen")

// filterButtons.forEach(button => {
//   button.addEventListener("click", () => {
//     let textToAdd = ""

//     if (button.innerText === "All") {
//       textToAdd = "You eat everything, maybe liver then?"
//     } else if (button.innerText === "Asian") {
//       textToAdd = "Sushi, pad Thai, noodles or dumplings?"
//     } else if (button.innerText === "Italian") {
//       textToAdd = "Pasta or pizza?"
//     } else if (button.innerText === "Mexican") {
//       textToAdd = "I love TACOS"
//     }
//     card.innerHTML += "<p>" + textToAdd + "</p>"
//   })
// })

// CARDS with recipes//
const container = document.getElementById("container")

const recipes = [
  {
    image: "images/pizza.jpg",
    title: "Pizza Napoletana",
    cuisine: "Italian",
    time: "30 min",
    ingredients: [
      "yeast",
      "mozzarella",
      "prosciutto",
      "fresh basil"
    ]
  },
  {
    image: "images/padthai.jpg",
    title: "Pad Thai",
    cuisine: "Asian",
    time: "20 min",
    ingredients: [
      "yeast",
      "mozzarella",
      "prosciutto",
      "fresh basil"
    ]
  },

  {
    image: "images/tacos.jpg",
    title: "Tacos",
    cuisine: "Mexican",
    time: "30 min",
    ingredients: [
      "yeast",
      "mozzarella",
      "prosciutto",
      "fresh basil"
    ]
  },
  {
    image: "images/risotto.jpg",
    title: "Risotto ala Milanese",
    cuisine: "Italian",
    time: "45 min",
    ingredients: [
      "yeast",
      "mozzarella",
      "prosciutto",
      "fresh basil"
    ]
  }
]

const showRecipe = (recipeArray) => {
  container.innerHTML = ""

  recipeArray.forEach(recipe => {
    container.innerHTML += `
      <div class="card">
        <img src="${recipe.image}" alt="${recipe.title}">
        <p><strong>${recipe.title}</strong></p>
        <hr class="divider">
        <div class="info-row">
          <span><strong>Cuisine:</strong> ${recipe.cuisine}</span>
          <span><strong>Time: </strong> ${recipe.time}</span>
        </div>
        <hr class="divider">
        <p><strong>Ingredients:</strong></p> 
        <ul>${recipe.ingredients.map(ingredient => `<li>${ingredient}</li>`).join("")}
        </ul>
      </div>
    `;
  });
};

showRecipe(recipes)
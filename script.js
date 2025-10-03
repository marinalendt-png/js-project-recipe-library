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

// CARDS//
const container = document.getElementById("container")
//Recipes//
const recipes = [
  {
    image: "images/pizza.jpg",
    title: "Pizza Napoletana",
    cuisine: "Italian",
    time: "30 min",
    ingredients: [
      "Yeast",
      "Mozzarella",
      "Prosciutto",
      "Fresh basil"
    ]
  },
  {
    image: "images/padthai.jpg",
    title: "Pad Thai",
    cuisine: "Asian",
    time: "20 min",
    ingredients: [
      "Noodles",
      "Chicken",
      "Onions",
      "Soy"
    ]
  },

  {
    image: "images/tacos.jpg",
    title: "Tacos",
    cuisine: "Mexican",
    time: "30 min",
    ingredients: [
      "Tacoshells",
      "Ground beaf",
      "Avocado",
      "Tomatoes"
    ]
  },
  {
    image: "images/risotto.jpg",
    title: "Risotto ala Milanese",
    cuisine: "Italian",
    time: "45 min",
    ingredients: [
      "Risottorice",
      "Chickenstock",
      "White wine",
      "Saffron"
    ]
  }
]

const showRecipe = (recipeArray) => {
  container.innerHTML = "" //Resetting the container before filling it//

  // The content of the CARDS//
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

showRecipe(recipes)                                        //visa alla recept

const buttons = document.querySelectorAll(".btn-kitchen") //hämtar alla knappar som ska filtreras
const sortButtons = document.querySelectorAll(".btn-sorting")

buttons.forEach(button => {
  button.addEventListener("click", () => {                 //vad händer när knappen clickas
    const chosenCuisine = button.textContent.trim()        //trim gör så att mellanslag mm i text html tas bort. 
    if (chosenCuisine === "All") {
      window.currentRecipes = [...recipes]
    } else {
      window.currentRecipes = recipes.filter(recipe => recipe.cuisine === chosenCuisine)
    }
    showRecipe(window.currentRecipes)
  })
})


sortButtons.forEach(button => {
  button.addEventListener("click", () => {
    const chosenSort = button.textContent.trim()
    let sortedRecipes = [...window.currentRecipes]              //kopierar den aktuella listan från filter

    sortedRecipes.sort((a, b) => {                              //sorterar baserat på tiden
      const timeA = parseInt(a.time)                           //plockar ut siffran från 30 min
      const timeB = parseInt(b.time)
      return chosenSort === "Ascending" ? timeA - timeB : timeB - timeA
    })
    showRecipe(sortedRecipes)
  })
})

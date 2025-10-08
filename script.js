//=======GLOBAL VARIABLES=======// 

const apiKey = "f7aa1eb0bfab45cdae5e9f2f21292092"
const container = document.getElementById("container")
const buttons = document.querySelectorAll(".btn-kitchen")
const sortButtons = document.querySelectorAll(".btn-sorting")
const randomButton = document.querySelector(".btn-random")

let selectedCuisine = "All"
let currentRecipes = []

//======= FUNCTIONS for UI =======//

//Buttons, changes color when active//
function makesButtonInteractive(groupClass) {
  const buttons = document.querySelectorAll(groupClass)

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      buttons.forEach(b => b.classList.remove("active"))
      btn.classList.add("active")
    })
  })
}

//Shows recipes in container//
const showRecipe = (recipeArray) => {
  container.innerHTML = "" //Resetting the container before filling it//

  recipeArray.forEach(recipe => {
    //slår ihop alla kök med kommatecken. N/A om arrayen är tom, dvs ingen information tillgänglig. ? betyder om sant, gör detta, annars gör detta. 
    const cuisineText = recipe.cuisines.length ? recipe.cuisines.join(", ") : "N/A"
    const timeText = recipe.readyInMinutes ? `${recipe.readyInMinutes} min` : "N/A"

    container.innerHTML += `
      <div class="card">
        <img src="${recipe.image}" alt="${recipe.title}">
        <p><strong>${recipe.title}</strong></p>
        <hr class="divider">
        <div class="info-row">
          <span><strong>Cuisine:</strong> ${cuisineText}</span>
          <span><strong>Time: </strong> ${timeText}</span>
        </div>
        <hr class="divider">
        <p><strong>Ingredients:</strong></p> 
        <ul>
        ${recipe.extendedIngredients?.map(i => `<li>${i.original}</li>`).join("") || "No ingredients"}
        </ul>
        <p class=showMore>Show details...</p>
      </div>
    `;
  });
};

//======= EVENTLISTENERS =======//

//Filterbuttons//
buttons.forEach(button => {
  button.addEventListener("click", () => {
    selectedCuisine = button.textContent.trim() //trim gör så att mellanslag mm i text html tas bort. 
    fetchRecipes()
  })
})

//Sortingbuttons//
sortButtons.forEach(button => {
  button.addEventListener("click", () => {
    const chosenSort = button.textContent.trim() //Ascending/descending//
    if (!currentRecipes.length) return

    const sortedRecipes = [...currentRecipes] //kopierar den senaste listan från API:t

    sortedRecipes.sort((a, b) => {
      const timeA = a.readyInMinutes || 0
      const timeB = b.readyInMinutes || 0
      return chosenSort === "Ascending" ? timeA - timeB : timeB - timeA
    })

    showRecipe(sortedRecipes)
  })
})

//Randombutton//
randomButton.addEventListener("click", () => {
  if (!currentRecipes.length) {
    container.innerHTML = "<p> No recipes to show for this cuisine right now...</p>"
    return
  }

  const randomIndex = Math.floor(Math.random() * currentRecipes.length)
  const randomRecipe = currentRecipes[randomIndex]

  showRecipe([randomRecipe])
})

//======= FETCH from API =======//

async function fetchRecipes() {
  container.innerHTML = "<p>Loading recipes...</p>"

  try {
    let url = `https://api.spoonacular.com/recipes/random?number=30&apiKey=${apiKey}&addRecipeInformation=true&addRecipeInstructions=true
    `//vi väntar på svar från API:t och hämtar 20 recept

    if (selectedCuisine !== "All") {
      url += `&cuisine=${selectedCuisine}` //Use cuisines here instead of tags, to get sorted by cuisines//
    }

    const response = await fetch(url)
    if (!response.ok) throw new Error("API-limit reached or network error")

    const data = await response.json()

    currentRecipes = data.recipes
      .filter(recipe => recipe.cuisines && recipe.cuisines.length > 0) //Takes away recipes without cuisine
      .filter(recipe => selectedCuisine === "All" || recipe.cuisines.includes(selectedCuisine)) //Filter on chosen cuisine

    if (currentRecipes.length === 0) {
      container.innerHTML = `<p No recipes was found for this "${selectedCuisine}"😕</p>`
    } else {
      showRecipe(currentRecipes)
    }

    showRecipe(currentRecipes)

  } catch (err) {
    container.innerHTML = `<p>⚠️ ${err.message}</p>`
  }
}

//======= SETUP =======//

makesButtonInteractive(".btn-kitchen") //The function runs on both groups// 
makesButtonInteractive(".btn-sorting")
fetchRecipes() //fetches all recipes when page loads

// This JavaScript was built with the support of AI-generated suggestions.
// All logic is original and intended for educational and non-commercial use.


// Load cocktail data from JSON file
let cocktails = [];

fetch("cocktails.json")
  .then(response => response.json())
  .then(data => {
    cocktails = data;
  })
  .catch(error => {
    console.error("❌ Error loading cocktail data:", error);
  });

// Main function: triggered by button click
function findCocktail() {
  const input = document.getElementById("ingredients").value;
  const ingredients = input.split(",").map(i => i.trim().toLowerCase());

  const matchedCocktails = cocktails.filter(cocktail => {
    return ingredients.every(ingredient =>
      cocktail.ingredients.map(i => i.toLowerCase()).includes(ingredient)
    );
  });

  const resultDiv = document.getElementById("result");
  const image = document.getElementById("cocktailImage");
  const background = document.body;

  const cheersSound = document.getElementById("cheersSound");
  const shakeSound = document.getElementById("shakeSound");

  shakeSound.play();

  if (matchedCocktails.length > 0) {
    const chosen = matchedCocktails[Math.floor(Math.random() * matchedCocktails.length)];

    resultDiv.innerText = `🍹 ${chosen.name}`;
    image.src = chosen.image;
    background.style.backgroundImage = `url('${chosen.background}')`;

    setTimeout(() => {
      cheersSound.play();
    }, 2000);
  } else {
    resultDiv.innerText = "😞 No cocktail matches your ingredients. Try something else";
    image.src = "";
    background.style.backgroundImage = "url('static/images/bar.webp')";
  }
}

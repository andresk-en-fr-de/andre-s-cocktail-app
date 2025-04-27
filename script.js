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

 const resultDiv = document.getElementById("cocktailName");
  const image = document.getElementById("cocktailImage");
  const background = document.body;
  const cheersMessage = document.getElementById("cheersMessage"); // Get the cheersMessage element

  const cheersSound = document.getElementById("cheersSound");
  const shakeSound = document.getElementById("shakeSound");

  shakeSound.play();

  if (matchedCocktails.length > 0) {
    const chosen = matchedCocktails[Math.floor(Math.random() * matchedCocktails.length)];

    resultDiv.innerText = `🍹 ${chosen.name}`;
    image.src = chosen.image;
    background.style.backgroundImage = `url('${chosen.background}')`;
	cheersMessage.innerText = chosen.cheers; // Update the cheers message

    setTimeout(() => {
      cheersSound.play();
    }, 2000);
  } else {
    resultDiv.innerText = "😞 No cocktail matches your ingredients. Try something else";
    image.src = "";
    background.style.backgroundImage = "url('static/images/bar.webp')";
	cheersMessage.innerText = ""; // Clear the cheers message if no match is found
  }
}

// Open/close the list when clicking the button
function toggleList(id) {
    const list = document.getElementById(id);
    
    if (list.style.display === "block") {
        list.style.display = "none";
        document.removeEventListener("click", outsideClickListener);
    } else {
        list.style.display = "block";
        setTimeout(() => { // slight delay so it doesn't trigger immediately
            document.addEventListener("click", outsideClickListener);
        }, 50);
    }

    function outsideClickListener(event) {
        const button = document.querySelector(`button[onclick="toggleList('${id}')"]`);
        
        if (!list.contains(event.target) && !button.contains(event.target)) {
            list.style.display = "none";
            document.removeEventListener("click", outsideClickListener);
        }
    }
}

// Trigger the findCocktail function when the Enter key is pressed
document.getElementById("ingredients").addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    findCocktail();
  }
});

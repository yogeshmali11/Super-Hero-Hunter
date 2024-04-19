// Function to add to favourites..
function addToFav(){
    // Retrieve superhero details
    const heroName = sessionStorage.getItem("superheroName");
    const heroImage = document.querySelector("#superhero-details img").src;

    // Create an object with superhero details
    const superhero = {
        name: heroName,
        image: heroImage
    };

    // Retrieve existing superheroes from local storage or initialize an empty array
    let favList = JSON.parse(localStorage.getItem('superheroes')) || [];

    // Check if the superhero is already in the favorites list
    const isAlreadyAdded = favList.some(item => item.name === superhero.name);

    // If not already added, add the new superhero object to the favList array
    if (!isAlreadyAdded) {
        favList.push(superhero);

        // Store the updated favList array back into local storage
        localStorage.setItem('superheroes', JSON.stringify(favList));
    } else {
        console.log("Superhero is already in favorites list.");
    }
        
}

// Function to remove the item from the fav list
function removeFromFav(name){
    // Retrieve the array of superheroes from local storage
    let favList = JSON.parse(localStorage.getItem('superheroes')) || [];

    // Find the index of the superhero object with the given name
    const index = favList.findIndex(superhero => superhero.name === name);

    // If the superhero is found, remove it from the array
    if (index !== -1) {
        favList.splice(index, 1); // Remove the superhero object at the found index
    }

    // Update the local storage with the modified array
    localStorage.setItem('superheroes', JSON.stringify(favList));

    // Refresh the display of favorites
    displayFav();
}

// Function to display the fav page with fav items
function displayFav(){
    const favList = JSON.parse(localStorage.getItem('superheroes'));

    if (!favList || favList.length === 0) {
        favContainer.innerHTML = `<h3>No favorites added yet!</h3>`;
    } else {
        // Clear existing content in  favContainer
        favContainer.innerHTML = '';

        // Iterate over the favList array and display each superhero
        favList.forEach(superhero => {
            favContainer.innerHTML += `
                <div class="card">
                    <h2>${superhero.name}</h2>
                    <img src="${superhero.image}">
                    <button onclick="removeFromFav('${superhero.name}')">Remove</button>
                </div>
            `
        });
    }
}

window.onload = displayFav();
// Function to retrieve the superhero name from sessionStorage on the superHeroDetails page
function getSuperHeroDetails() {
    
    const heroName = sessionStorage.getItem("superheroName");
    if(heroName.length<=0){
        result.innerHTML = `<h3>Please enter a super hero name!!</h3>`;
    }else{
        displayDetails(heroName);
    }
}

// Function to display the details of the super hero
function displayDetails(heroName){
    const publicKey = '694c0a50ad318690615098d7095c185e';
    const privateKey = 'c82c0af50d84265c0fe064cdc301393595cf38cd';
    const ts = new Date().getTime();
    const hash = calculateMD5(ts + privateKey + publicKey);
    const apiUrl = `https://gateway.marvel.com:443/v1/public/characters?ts=${ts}&apikey=${publicKey}&hash=${hash}&nameStartsWith=${heroName}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if(data.data.results.length<=0){
                result.innerHTML = `<h3>Super Hero not found!!</h3>`
            }else{
                let output = data.data.results[0];
            result.innerHTML = `
            <h2>${output.name}</h2>
            <div id="superhero-details">
                <img src="${output.thumbnail.path}.${output.thumbnail.extension}">
                <div>
                    <p>Comics: ${output.comics.available}</p>
                    <p>Events: ${output.events.available}</p>
                    <p>Series: ${output.series.available}</p>
                    <p>Stories: ${output.stories.available}</p>
                    <div id="desc">
                        <p>Description: ${output.description}</p>
                    </div>
                </div>
            </div>
            <button onclick="addToFav()">Add to Favourites</button>
        `;
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}

// Call the function to get superhero details when the page loads
window.onload = getSuperHeroDetails();
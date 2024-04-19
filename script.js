// home page..
const result = document.getElementById("detailsContainer");
const favContainer = document.getElementById("favContainer");

//function to calculate md5
function calculateMD5(input) {
    return CryptoJS.MD5(input).toString();
}

// Function to handle searching for a superhero
function searchSuperHero() {
    const input = document.getElementById("superHeroName").value;

    // Store the superhero name in sessionStorage
    sessionStorage.setItem("superheroName", input);

    // Redirect to the superHeroDetails page
    window.location.href = 'superHeroDetails.html';
}

// Function to display the suggestions with respect to the input for superhero
function displayList(){
    let value = document.getElementById("superHeroName").value;
    suggestionList.innerHTML = '';
    if(value.length>0){
        let suggestionList = document.getElementById("suggestionList");
    const publicKey = '694c0a50ad318690615098d7095c185e';
    const privateKey = 'c82c0af50d84265c0fe064cdc301393595cf38cd';
    const ts = new Date().getTime();
    const hash = calculateMD5(ts + privateKey + publicKey);
    fetch(`https://gateway.marvel.com:443/v1/public/characters?ts=${ts}&apikey=${publicKey}&hash=${hash}&nameStartsWith=${value}`)
    .then(response => response.json())
        .then(data => {
            data.data.results.forEach(item => {
                let listItem = document.createElement('li');
                listItem.addEventListener('click', function() {
                    let inputField = document.getElementById("superHeroName");
                    inputField.value=item.name;
                });
                listItem.textContent = item.name;
                suggestionList.appendChild(listItem);
              });
        })
    }
    
}

// Function to return to home page from the other pages
function returnHomePage(){
    window.location.href = "index.html";
}

// Function to go to favourites page from the home page
function favPage(){
    window.location.href = "fav.html";
}
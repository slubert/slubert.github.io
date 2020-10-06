const searchBox = document.getElementById("searchBox")
const infoBox = document.getElementById("infoBox")
const search = document.getElementById("form");
const input = document.getElementById("input")

const pokemonName = document.getElementById("name");
const pokemonHight = document.getElementById("hight");
const pokemonWeight = document.getElementById("weight");
const pokemonType = document.getElementById("type")
const pokemonImg1 = document.getElementById("img1");
const pokemonImg2 = document.getElementById("img2")
const shinyPokemon = document.getElementById("shiny pokemon")

search.addEventListener("submit", onSearch);

infoBox.style.display = "none"

function onSearch(link){
    link.preventDefault()

    searchBox.style.display = "none"
    
    let pokemon = input.value
    
    fetch("https://pokeapi.co/api/v2/pokemon/" + pokemon)
        .then(res => res.json())
        .then(whenLoaded)
    
    function whenLoaded(data){
        infoBox.style.display = null

        pokemonName.textContent = "name: " + data.name
        pokemonHight.textContent = "Height: " + data.height
        pokemonWeight.textContent = "Weight: " + data.weight
        pokemonType.textContent = "Type: " + data.types[0].type.name
        
        pokemonImg1.src = data.sprites.front_default
        pokemonImg2.src = data.sprites.back_default
        shinyPokemon.src = data.sprites.front_shiny

        console.log(data.name);
        console.log(data.height);
        console.log(data.weight)
        console.log(data.types[0].type.name);
        console.log(data);
    }
}


// Information som ska visas:
// - Namnet för pokemon
// - Höjd
// - Vikt
// - Typ av pokemon (t.ex. electric för pikachu)
// - 2 bilder av pokemonen (framifrån och bakifrån)
// https://pokeapi.co/

// pikachu
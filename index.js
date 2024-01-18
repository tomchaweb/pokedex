const pokemonSprite = document.getElementById("pokemon-sprite");
const shinySprite = document.getElementById("shiny-sprite");
const userInput = document.getElementById("user-input");
const searchButton = document.getElementById("search");
const nameHeading = document.getElementById("pokemon-name");
const typeHeading = document.getElementById("pokemon-type");
const pokedexNumHeading = document.getElementById("pokedex-num");

userInput.value="charizard";
GetPokemon();

async function GetPokemon(){
    let pokemon = userInput.value;
    pokemon = pokemon.toLowerCase();
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
    if (!response.ok){
        throw new error("Fetch Unsuccessful")
    }

    const data = await response.json();

    const pokemonSpriteLink = data.sprites["front_default"];
    const shinySpriteLink = data.sprites["front_shiny"];
    const pokemonName = data.name;
    const pokedexNum = data.order;
    let pokemonType = data.types[0].type.name;

    if (data.types.length === 2){
        pokemonType = `${data.types[0].type.name}/${data.types[1].type.name}`;
    }
    console.log(pokemonSpriteLink);
    pokemonSprite.setAttribute("src", pokemonSpriteLink);
    shinySprite.setAttribute("src", shinySpriteLink);
    nameHeading.textContent = pokemonName;

    if (pokedexNum < 10) {
        pokedexNumHeading.textContent = `#00${pokedexNum}`;
    }
    else if (pokedexNum < 100){
        pokedexNumHeading.textContent = `#0${pokedexNum}`;
    }
    else{
        pokedexNumHeading.textContent = `#${pokedexNum}`;
    }

    typeHeading.textContent = pokemonType;
    
    searchButton.addEventListener("click", GetPokemon);
    document.addEventListener("keydown", (event) => {
        if(event["key"] === "Enter"){
            GetPokemon();
        }
    });
    
}
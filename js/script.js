//This is the start of my script

// This is my IIFE
let pokemonRepository = (function () {
  let pokemonList = [
    { name: "Charmander", height: 0.6, type: ["Fire"] },
    { name: "Squirtle", height: 0.5, type: ["Water"] },
    { name: "Nidoqueen", height: 1.3, type: ["Ground", "Poison"] },
    { name: "Venomoth", height: 1.5, type: ["Bug", "Poison"] },
    { name: "Girafarig", height: 1.5, type: ["Psychic", "Normal"] },
  ];

  // add funtion
  function add(pokemon) {
    if (
      typeof pokemon === "object" &&
      "name" in pokemon &&
      "height" in pokemon &&
      "type" in pokemon
    ) {
      pokemonList.push(pokemon);
    } else {
      console.log("Failed to add pokemon!");
    }
  }

  // getAll function
  function getAll() {
    return pokemonList;
  }

  // addListItem function
  function addListItem(pokemon) {
    let pokemonList = document.querySelector(".pokemon-list");
    let listPokemon = document.createElement("li");
    let button = document.createElement("button");
    button.innerText = pokemon.name;
    button.classList.add("button-class");
    listPokemon.appendChild(button);
    pokemonList.appendChild(listPokemon);
    button.addEventListener("click", () => showDetails(pokemon));
  }

  // showDetails function
  function showDetails(pokemon) {
    console.log(pokemon);
  }

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
  };
})();

// forEach loop
pokemonRepository.getAll().forEach(function (pokemon) {
  pokemonRepository.addListItem(pokemon);
});

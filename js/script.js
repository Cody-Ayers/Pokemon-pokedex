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

  function add(pokemon) {
    pokemonList.push(pokemon);
  }

  function getAll() {
    return pokemonList;
  }

  return {
    add: add,
    getAll: getAll,
  };
})();

//for loop to print name and height

pokemonRepository.getAll().forEach(function (pokemonList) {
  if (pokemonList.height > 1.0) {
    document.write(
      "<p>" +
        pokemonList.name +
        " is " +
        pokemonList.height +
        "-Wow that's huge!",
      "</p>"
    );
  } else {
    document.write(
      "<p>" + pokemonList.name + " is " + pokemonList.height + "</p>"
    );
  }
});

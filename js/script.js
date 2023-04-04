//This is the start of my script

let pokemonList = [
  { name: "Charmander", height: 0.6, type: ["Fire"] },
  { name: "Squirtle", height: 0.5, type: ["Water"] },
  { name: "Nidoqueen", height: 1.3, type: ["Ground", "Poison"] },
  { name: "Venomoth", height: 1.5, type: ["Bug", "Poison"] },
  { name: "Girafarig", height: 1.5, type: ["Psychic", "Normal"] },
];

//for loop to print name and height

for (let i = 0; i < pokemonList.length; i++) {
  if (pokemonList[i].height > 1.0) {
    document.write(
      "<p>" +
        pokemonList[i].name +
        " " +
        pokemonList[i].height +
        "- Wow that's huge!",
      "</p>"
    );
  } else {
    document.write(
      "<p>" + pokemonList[i].name + " " + pokemonList[i].height + "</p>"
    );
  }
}

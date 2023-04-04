//This is the start of my script

let pokemonList = [
  { name: "Charmander", height: 0.6, type: ["Fire"] },
  { name: "Squirtle", height: 0.5, type: ["Water"] },
  { name: "Nidoqueen", height: 1.3, type: ["Ground", "Poison"] },
  { name: "Venomoth", height: 1.5, type: ["Bug", "Poison"] },
  { name: "Girafarig", height: 1.5, type: ["Psychic", "Normal"] },
];

for (let i = 0; i < pokemonList.length; i++) {
  document.write(
    "<p> " + pokemonList[i].name + " " + pokemonList[i].height + "</p>"
  );
}

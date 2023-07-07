//This is the start of my script

// This is my IIFE
let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";
  let modalContainer = document.querySelector("#modal-container");

  // add function
  function add(pokemon) {
    if (typeof pokemon === "object" && "name" in pokemon) {
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
    let pokemonList = document.querySelector(".list-group");
    let listPokemon = document.createElement("li");
    listPokemon.classList.add("list-group-item");
    let button = document.createElement("btn");
    button.setAttribute("data-toggle", "modal");
    button.setAttribute("data-target", "#exampleModal");
    button.innerText =
      pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
    button.classList.add("btn", "btn-block");
    listPokemon.appendChild(button);
    pokemonList.appendChild(listPokemon);
    button.addEventListener("click", function () {
      showDetails(pokemon);
    });
  }

  // loadList function
  function loadList() {
    return fetch(apiUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        json.results.forEach(function (item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url,
          };
          add(pokemon);
        });
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  // loadDetails function
  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (details) {
        // Now we add the details to the item
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.weight = details.weight;
        item.types = details.types;
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  // showDetails function
  function showDetails(item) {
    loadDetails(item).then(function () {
      showModal(item);
    });
  }

  // Modal
  // This function opens a modal to display the information of the pokemon that is clicked
  function showModal(item) {
    let modalBody = $(".modal-body");
    let modalTitle = $(".modal-title");

    //clear all existing modal content
    modalTitle.empty();
    modalBody.empty();

    // Set the new modal content
    let titleElement = $(
      "<h1>" + item.name.charAt(0).toUpperCase() + item.name.slice(1) + "</h1>"
    );

    let pokemonImage = $("<img class='modal-img' style='width:50%';>");
    pokemonImage.attr("src", item.imageUrl);

    let heightElement = $("<p>" + "Height: " + item.height + "</p>");

    let weightElement = $("<p>" + "Weight: " + item.weight + "</p>");

    let typesElement = $(
      `<p>Type(s): ${item.types.map(getAllTypes).join(", ")}</p>`
    );
    function getAllTypes(item) {
      console.log(item.type.name);
      return [item.type.name];
    }

    //Add modal Content to the modal
    modalTitle.append(titleElement);
    modalBody.append(pokemonImage);
    modalBody.append(heightElement);
    modalBody.append(weightElement);
    modalBody.append(typesElement);
  }

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails,
    showModal: showModal,
  };
})();

// forEach loop
pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});

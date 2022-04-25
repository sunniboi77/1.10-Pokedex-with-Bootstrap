

let pokemonRepository = (function () {

  let pokemonList = [];
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=10";
  let modalContainer = document.querySelector("#modal-container");

  function getAll() {
    return pokemonList;
  }

  function add(pokemon) {
    pokemonList.push(pokemon);
  }

  function showLoadingMessage() {
    let loadingMessage = document.querySelector(".loading-pokedex");
    loadingMessage.classList.remove("hidden");
  }

  //  Hides loading message by adding "hidden"
  function hideLoadingMessage() {
    let loadingMessage = document.querySelector(".loading-pokedex");
    loadingMessage.classList.add("hidden");
  }

  function addListItem(pokemon) {
    let pokemonList = document.querySelector(".pokemon-list");
    let listpokemon = document.createElement("li");
    listpokemon.classList.add("list-group-item");

    let button = document.createElement("button");
    button.innerText = pokemon.name;
    button.classList.add("pokeButton-class", "btn", "btn-info", "btn-lg", "w-100");
    button.setAttribute("data-toggle", "modal"); // copy
    button.setAttribute("data-target", "#pokemonModal"); //copy 
    listpokemon.appendChild(button);
    pokemonList.appendChild(listpokemon);

    button.addEventListener("click", function (event) {
      showDetails(pokemon);
    });
  }
  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      showModal(pokemon);
    });
  }
  // Load List function

  function loadList() {
    return fetch(apiUrl)
    .then(function (response) { // promise -> response which is a promise
      return response.json(); // response to json 
    }).then(function (json) {
      json.results.forEach(function (item) { // json results os from API 
        let pokemon = {
          name: item.name,
          detailsUrl: item.url,
          height: item.height,
        };
        add(pokemon);
      });
    })
    .catch(function (e) {
      console.error(e);
    });
  }
  // "Promise function" fetch function

  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      // Now we add the details to the item
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types;
    })
    .catch(function (e) {
      console.error(e);
    });
  }
  //CONTROLLED 
  function showModal(pokemon) {

    // let closeButton = document.querySelector('#close-modal');
    // closeButton.addEventListener('click', function() {
    //   document.querySelector('#modal-container').style.display = 'none';
    // });
    
    // modalBody.classList.add("is-visible");
    // document.querySelector('#modal-container').style.display = "block";
    

    let modalBody = $(".modal-body");
    let modalTitle = $(".modal-title");

    modalTitle.empty();
    modalBody.empty();
    //modalBody.append(imageElement);

    let titleElement = document.createElement("h1");
    titleElement.innerText = pokemon.name;


    let imageElement = document.createElement("img");
    imageElement.classList.add("modal-image");
    imageElement.src = pokemon.imageUrl;

    let heightElement = document.createElement("p");
    heightElement.innerText = ("Height :" + pokemon.height  );

    
    let typeElement = document.createElement("p");
    typeElement.innerText = "Types: " + pokemon.types;

    pokemon.types.forEach((type, numberOfTypes) => {
      numberOfTypes = pokemon.types.pokemon;

      if (numberOfTypes === 1) {
        typeElement.innerText += type.type.name;
      } else {
        typeElement.innerText += type.type.name;
      }
    });

    
//escape key down 
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' ) {
      document.querySelector('#modal-container').style.display = 'none';  
    }
  });

   
    modalTitle.append(titleElement);

    modalBody.append(imageElement);
    modalBody.append(typeElement);
    modalBody.append(heightElement);
    modalBody.append(closeButton);
    modalBody.append(modalTitle);
    modalContainer.appendChild(modalBody);

  }


  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails,
  };

})();

pokemonRepository.loadList().then(function () {
  // Now the data is loaded!
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});



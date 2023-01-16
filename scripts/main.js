

// funcion para seleccionar elementos del DOM
function $(param) {
  return document.querySelector(param);
}
function $All(param) {
  return document.querySelectorAll(param);
}

// Función para atacar a la api
async function atackApi(url) {
  let res = await fetch(url)
  let data = res.json()
  return data
}



// Funcion con condiciones para busqueda de pokemon 
async function conexionApi(URI, namePoke) {

  try {
    if(namePoke == undefined) throw new Error("Escribe algo")
    return await atackApi(URI + namePoke)

  } catch (e) {

    let { results } = await atackApi("https://pokeapi.co/api/v2/pokemon/?offset=0&limit=2100")

    try {
      console.log(namePoke)
      const resultSearch = results.filter(e => e.name.includes(namePoke))
      if (resultSearch.length == 0) throw new Error("No hay conincidencia")
      console.log(resultSearch)
      return resultSearch
    } catch (e) {
      try {
        let palabra = namePoke.substring(0, 2)
        if (palabra.length < 3) throw new Error("Tienes que meter una palabra con al menos 3 letras")
        const newSearch = results.filter(e => e.name.startsWith(palabra))
        console.log("Quizá querías decir: " + newSearch[0].name + " " + newSearch[1].name)
        return newSearch

      } catch (e) {
        console.log("No hay ningún pokemon con el nombre indicado")
      }
    }
  }

}

async function selectCard (id){
  resulTag.innerHTML = ""
  let pokemon = await atackApi(url+id)
  resulTag.innerHTML = `<article class="card">
        <p>Nombre: ${pokemon.name}</p>
        <p>Peso: ${pokemon.weight}</p>
        <p>Altura: ${pokemon.height}</p>
        <p>Order: ${pokemon.order}</p>
        <p>Tipo: ${pokemon.types[0].type.name}</p>
        <p>Ataque: ${pokemon.stats[1].base_stat}</p>
        <p>Defensa: ${pokemon.stats[2].base_stat}</p>
        <p>Velocidad: ${pokemon.stats[5].base_stat}</p>
        <p>Puntos de vida: ${pokemon.types[0].slot}</p>
      </article>`;
  
  articleRight.innerHTML = `
      <h1>Pokemon</h1>
      <figure>
          <img src=${pokemon.sprites.front_default}>
          <img src=${pokemon.sprites.back_default}>
          </figure>
      `
}


//Seleccionamos el elemento input/buscador del DOM y lo metemos en la variable
//  search

const search = $("#name");
const resulTag = $("#result");
const resultsSection = $(".results")
const fullCard = $(".full-card")
const buttonSearch = $(".searchButton");
const url = "https://pokeapi.co/api/v2/pokemon/";
const articleRight = $('.full-card-front');





buttonSearch.addEventListener("click", async(e)=>{
  try{
  resulTag.innerHTML = ""
  articleRight.innerHTML = `<h1> Pokemon </h1>`
  resultsSection.innerHTML = ""
  e.preventDefault();
  if(!search.value == undefined) throw new Error("Escribe algo...")
  
  let resultSearch = await conexionApi(url, search.value);
  if (typeof resultSearch != "object") throw new Error(" No existe el pokemon")
  console.log(resultSearch)
  if (resultSearch.length != undefined) {
    for (let i = 0; i < resultSearch.length; i++) {

      let pokemon = await atackApi(resultSearch[i].url);
      console.log(pokemon)
      resultsSection.innerHTML += `
      <article class="cards" id=${pokemon.id}>
        <div class='cards-container' >
          <div class='cards-front'>
            <p class="cards-name"> ${pokemon.name}</p>
            <div>
              <img src=${pokemon.sprites.front_default}>  
            </div>
            <div class='cards-stats'>
              <p>Peso: ${pokemon.weight}</p>
              <p>Altura: ${pokemon.height}</p>
              <p>Order: ${pokemon.order}</p>
              <p>Tipo: ${pokemon.types[0].type.name}</p>
              <p>Ataque: ${pokemon.stats[1].base_stat}</p>
              <p>Defensa: ${pokemon.stats[2].base_stat}</p>
              <p>Velocidad: ${pokemon.stats[5].base_stat}</p>
              <p>Puntos de vida: ${pokemon.types[0].slot}</p>
            </div>  
          </div>
          <div class='cards-back'>
            <img src=${pokemon.sprites.back_default}>
            
          </div>
        </div>       
      </article>\n`;

    }

    /*  function handleCardClick(e) {
         let card = e;
 
         console.log(card);
       }
       const classResults = document.querySelector(".cards");
       console.log(classResults);
 
       classResults.addEventListener("click", handleCardClick); */

  } else {
    resulTag.innerHTML = `<article class="card">
        <p>Nombre: ${resultSearch.name}</p>
        <p>Peso: ${resultSearch.weight}</p>
        <p>Altura: ${resultSearch.height}</p>
        <p>Order: ${resultSearch.order}</p>
        <p>Tipo: ${resultSearch.types[0].type.name}</p>
        <p>Ataque: ${resultSearch.stats[1].base_stat}</p>
        <p>Defensa: ${resultSearch.stats[2].base_stat}</p>
        <p>Velocidad: ${resultSearch.stats[5].base_stat}</p>
        <p>Puntos de vida: ${resultSearch.types[0].slot}</p>

      </article>`;

    /*  let firstGreen = document.querySelector("button-top div");
     firstGreen.classList.add(".green1");
     console.log (firstGreen); */

    // añadir imagen del pokemon de la parte izquierda hacia la derecha

    articleRight.innerHTML = `
    <h1>Pokemon</h1>
    <figure>
        <img src=${resultSearch.sprites.front_default}>
        <img src=${resultSearch.sprites.back_default}>
        </figure>
    `
  }

  console.log(resultSearch)
  //   fullCard.innerHTML = `<article class="full-card">
  //   <p>Nombre: ${resultSearch.name}</p>
  //   <p>Weight: ${resultSearch.weight}</p>
  //   <p>Height: ${resultSearch.height}</p>
  //   <p>Order: ${resultSearch.order}</p>
  //   <p>Type: ${resultSearch.types[0].type.name}</p>
  //   <img src=${resultSearch.sprites.front_default}>
  //   <img src=${resultSearch.sprites.back_default}>

  // </article>`

      const cards = $All(".cards")
      for(let i=0; i<cards.length; i++){
        let id = cards[i].getAttribute("id")
        cards[i].addEventListener("click",()=>selectCard(id))
      }

  resultSearch = []
  search.value = ""
  }catch(e){
    console.log("Error es : "+ e.message)
  }}

);




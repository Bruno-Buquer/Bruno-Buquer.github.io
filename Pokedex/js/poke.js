const getType = list => list.reduce((acum,type) => acum + `<li>${type}</li>`, "")

const pokeList = document.querySelector("#poke-list-name")
pokeList.innerHTML = pokedex.reduce((acum, pokemon) => {
    return acum + `<option class="poke-${pokemon.id}" value="${pokemon.name.english}">`
}, "")
    
const painel = document.querySelector(".painel")

painel.innerHTML = pokedex.reduce((acum, pokemon) => {
    return acum + `<div class="poke-card">
        <div class="poke-fig">
            <img src="${pokemon.image.sprite}" alt="image of ${pokemon.name.english}" class="poke-img" loading="lazy">
        </div>
        <h2 class="poke-name">${pokemon.name.english}</h2>
        <p class="poke-description">${pokemon.description}</p>
        <h3>Tipos</h3>
        <ul class="poke-attributes">
            ${getType(pokemon.type)}
        </ul>
    </div>`
}, "")


const pokeSearch = document.querySelector("#poke-search")

pokeSearch.addEventListener("click", () =>{
    const pokeEscolhido = pokedex.find(pokemon => {
        return pokemon.name.english.toLowerCase() == pokeSearch.value.toLowerCase() 
    })
    console.log(pokeEscolhido.id)
    const popup = document.querySelector(".popup")
    popup.innerHTML = `<button id="xis">X</button>
    <div class="fig">
            <img src="${pokeEscolhido.image.sprite}" alt="image of ${pokeEscolhido.name.english}" class="img" loading="lazy">
        </div>
        <h2 class="name">${pokeEscolhido.name.english}</h2>
        <p class="description">${pokeEscolhido.description}</p>
        <h3>Tipos</h3>
        <ul class="attributes">
            ${getType(pokeEscolhido.type)}
        </ul>`
    popup.classList.add("popup-aparecer")
})

const popup = document.querySelector(".popup")

popup.addEventListener("click", (ev)=> {
   
    
    if(ev.target.nodeName =="BUTTON") {
        popup.classList.remove("popup-aparecer")
    }
    
})
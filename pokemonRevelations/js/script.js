const API = "https://pokeapi.co/api/v2/"
const listaPokemon = document.querySelector("#listaPokemon")
const inputPokemon = document.querySelector("#pokemonId")
const div = document.querySelector("#pokemon")

async function requisicaoPoke(valor) {
    const respostaAPI = await fetch(API + valor)
    if (!respostaAPI.ok) {
        throw new Error(`Pokémon não encontrado (${respostaAPI.status})`)
    }
    return respostaAPI.json()
}

async function listaDePokemons() {
    const pokemons = await requisicaoPoke("pokemon?limit=100000&offset=0")
    const options = pokemons.results.reduce((options, pkm) => {
        return options + `<option value="${pkm.name}">${pkm.name}</option>`
    }, '')

    listaPokemon.innerHTML = options
}
listaDePokemons()

inputPokemon.addEventListener("change", async () => {
    console.log("xablau")
    const pokemonEscolhido = inputPokemon.value
    if (!pokemonEscolhido || pokemonEscolhido === "0") return

    try {
        const dadosDoPokemon = await requisicaoPoke(`pokemon/${pokemonEscolhido}`)
        console.log(dadosDoPokemon)

        div.innerHTML = `
            <h1>${dadosDoPokemon.name}</h1>
            <img src="${dadosDoPokemon.sprites.front_default}" alt="Imagem do ${dadosDoPokemon.name}">
            <h3>Tipos</h3>
        `
    } catch (err) {

    }
})
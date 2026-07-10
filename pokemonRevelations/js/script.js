const API = "https://pokeapi.co/api/v2/"
const lista = document.querySelector("#listaPoke")
const div = document.querySelector("#pokemon")
const imgPokemon = div?.querySelector("img")

async function requisicaoPoke(valor) {
    const respostaAPI = await fetch(API + valor)
    if (!respostaAPI.ok) {
        throw new Error(`Pokémon não encontrado (${respostaAPI.status})`)
    }
    return respostaAPI.json()
}

function urlDaImagem(dados) {
    const sprites = dados?.sprites
    if (!sprites) return ""

    return (
        sprites.back_default ||
        sprites.front_default ||
        sprites.other?.["official-artwork"]?.front_default ||
        ""
    )
}

async function listaDePokemons() {
    const pokemons = await requisicaoPoke("pokemon?limit=100000&offset=0")
    const options = pokemons.results.reduce((options, pkm) => {
        return options + `<option value="${pkm.name}">${pkm.name}</option>`
    }, '<option value="0">Selecione um pokemon</option>')

    lista.innerHTML = options
}

listaDePokemons().catch((err) => {
    console.error(err)
    lista.innerHTML = '<option value="0">Erro ao carregar lista</option>'
})

lista.addEventListener("change", async () => {
    const pokemonEscolhido = lista.value
    if (!pokemonEscolhido || pokemonEscolhido === "0") return

    try {
        const dadosDoPokemon = await requisicaoPoke(`pokemon/${pokemonEscolhido}`)
        const url = urlDaImagem(dadosDoPokemon)

        if (!imgPokemon) return

        if (!url) {
            imgPokemon.removeAttribute("src")
            imgPokemon.alt = `Sem imagem para ${dadosDoPokemon.name}`
            return
        }

        imgPokemon.onerror = () => {
            imgPokemon.removeAttribute("src")
            imgPokemon.alt = `Imagem indisponível para ${dadosDoPokemon.name}`
        }
        imgPokemon.src = url
        imgPokemon.alt = `Imagem do ${dadosDoPokemon.name}`
    } catch (err) {
        console.error(err)
        if (imgPokemon) {
            imgPokemon.removeAttribute("src")
            imgPokemon.alt = "Não foi possível carregar este Pokémon"
        }
    }
})

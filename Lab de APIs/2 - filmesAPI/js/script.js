const barraPesquisa = document.getElementById('barraPesquisa');
const filtro = document.querySelector("#filtrar");
const botão = document.querySelector("#pesquisar");
const GridResult = document.querySelector("#resultadoPesquisa")

let data = "";

async function loadMovies(searchTerm){
    const URL = `https://omdbapi.com/?s=${searchTerm}&page=1&apikey=fc1fef96`;
    const resposta = await fetch(`${URL}`);
    data = await resposta.json();
    console.log(data)
}

function pegarNomeFilme() {
    let nomeFilme = barraPesquisa.value;
    return nomeFilme;
}

async function MapearFilmes (movies) {
    let filmes = movies.map(function(filme) {
        return {
            poster: filme.Poster, 
            titulo: filme.Title, 
            ano: filme.Year, 
            id: filme.imdbID
        };
    })
    return filmes;
}

function ExibirFilmes (filmes) {
    filmes.forEach(async dado => {

        GridResult.innerHTML += `
            <div class="cardMovie">
                <div class = "movie-poster">
                    <img src = "${(dado.poster != "N/A") ? dado.poster : "https://www.pintarecolorir.com.br/imagem/desenhos-gato-modelo/gato-bola-modelo-desenho.jpg"}" alt = "movie poster">
                </div>
                <div class = "movie-info">
                    <h3 class = "movie-title">${dado.titulo}</h3>
                    <br>
                    <ul class = "movie-misc-info">
                        <li class = "year">Year: ${dado.ano}</li>
                        
                    </ul>
                </div>
            </div>
        `;
    })
}

function filtrarFilmes (movies) {
    let filmesFiltrados = movies.filter(function(movie) {
        return movie.ano >= 2000;
    });
    return filmesFiltrados;
}

function resetarFilmes () {
    GridResult.innerHTML = "";
}

let filmes = [];

botão.addEventListener("click", async () => {
    resetarFilmes();
    let nomeFilme = pegarNomeFilme();
    await loadMovies(nomeFilme);
    filmes = await MapearFilmes(data.Search);
    
    ExibirFilmes(filmes);

    if(filtro.className == 'desligado') {
        filtro.classList.add('ligado')
        filtro.classList.remove('desligado')
    }
})

filtro.addEventListener("click", async () => {

    if(filtro.className == 'ligado') {
        filmes = filtrarFilmes(filmes);
        resetarFilmes();
        alert("Filmes filtrados: acima dos anos 2000")
        ExibirFilmes(filmes);
    } 
    else {
        alert("Erro: Não há nada para filtrar!")
    }

    
})

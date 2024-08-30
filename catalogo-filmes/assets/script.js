const xhttp = new XMLHttpRequest();

const consultar_pokemon = (nome_pokemon) =>{
    const url = `https://pokeapi.co/api/v2/pokemon/${nome_pokemon}`;
    xhttp.onreadystatechange = function(){
        // readyState = 4 => o servidor preparou uma reposta para a requisição
        // status da requisição http = 200 => resposta de Sucesso da requisição
    
        if(this.readyState==4) {
            if(this.status==200){
                console.log(JSON.parse(this.responseText));
        
                const pokemon = JSON.parse(this.response);
        
                const poke_name = document.getElementById('poke_name');
                const poke_fig = document.querySelector('.poke_fig');
        
                poke_name.textContent = pokemon.name;
                // poke_fig.src = pokemon.sprites.front_default;
                document.querySelector(".poke_fig").src = pokemon.sprites.front_default;
            }
            else{
                // Carregar o nome do pokemon no H1
                document.querySelector("#poke_name").textContent = "Não é um pokemon";

                // Carregar a foto do pokemon 
                document.querySelector(".poke_fig").src = 'img/error-404-1.png';
            }
        }
    }

    // Configurando o o objeto de requisição
    xhttp.open("GET", url);

    // Enviando a requisicação
    xhttp.send();
}





const btn = document.querySelector("#pesquisar")

btn.addEventListener("click", () =>{
    // Pegar o valor do Input => Contém o nome do pokemon

    const input = document.querySelector(".poke_search").value;

    // Buscar na Requisição

    consultar_pokemon(input);

    // Exibir o resultado (está na função consultar_pokemon)
});
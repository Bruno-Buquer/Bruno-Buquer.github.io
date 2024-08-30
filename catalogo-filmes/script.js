

// Criando um novo objeto XMLHttpRequest

const xhttp = new XMLHttpRequest();
const gera_ul = (dados) => {
    let lista_lis = ``;
    let ul = ``;
    dados.forEach(dado => {
        lista_lis += `<li>${dado}</li>`;
    });
    ul = lista_lis;
    return ul;
}
const pega_titulos_semelhantes = (dados, titulos_s) =>{
    let titles = '';
    titulos_s.forEach(dado => {
        if((dado - 1) in dados){
            let filme = dados[(dado-1)].titulo;
            titles += `
                <li>
                    ${filme}
                </li>`;
        }
    });
    return titles;
}
const gera_filme_card = (img, nome, generos, elenco, faixa_et, descricao, titulos_sem, opinioes, filmes) =>{
    const generos_ul = gera_ul(generos);
    const elenco_ul = gera_ul(elenco);
    const fe = faixa_et == 0 ? 'Livre' : `${faixa_et} anos`;
    let indicativa = "";
    if(faixa_et >= 0 && faixa_et <= 14) {
        indicativa = "classe-livre";
    };
    if(faixa_et >= 15 && faixa_et <= 17) {
        indicativa = "classe-adolescente";
    };
    if(faixa_et >= 18) {
        indicativa = "classe-adulto";
    };
    const filme_apresentacao = `
                <div class="filme_apresentacao">
                    <img src="${img}" alt="Imagem do filme ${nome} ">
                    <div class="card_infos">
                        <h4 class="nome">${nome}</h4>
                        <p class="faixa-etaria ${indicativa}">Faixa etária: ${fe}</p>
                        <div class="generos">
                            Gêneros:
                            <ul>
                                ${generos_ul}
                            </ul>
                        </div>
                        <div class="elenco">
                            Elenco:
                            <ul>
                                ${elenco_ul}
                            </ul>
                        </div>
                        <p class="descricao">Descrição:<br/><br/>${descricao}</p><br/>
                        <ul class="titulos_semelhantes">Títulos semelhantes:${pega_titulos_semelhantes(filmes, titulos_sem)}</ul>
                    </div>
                </div>`;
    let opinioes_div = ``;
    opinioes.forEach(opiniao => {
        let nota_div = `<div class='nota'>${opiniao.rating}</div>`;
        let comentario_div = `<div class='comentario'>${opiniao.descricao}</div>`;
        let opiniao_div = `
                <div class="opiniao">
                    Nota: ${nota_div}<br/>
                    Comentário: ${comentario_div}<br>
                </div>`;
        opinioes_div += opiniao_div;
    });
    // return filme_apresentacao;
    return `<div class="card">
                ${filme_apresentacao}
                <div class="opinioes">
                    ${opinioes_div}
                </div>
            </div>`;
}

function gerar_catalogo_filmes(){
    const url_filmes = 'https://rafaelescalfoni.github.io/desenv_web/filmes.json';

    xhttp.onreadystatechange = function(){
        if(this.readyState == 4){
            if(this.status==200){
                // console.log(JSON.parse(this.responseText));
                const filmes = JSON.parse(this.response);
                console.log(filmes);

                filmes.forEach(filme => {
                    // console.table(filme);
                    document.querySelector("#catalogo").innerHTML += gera_filme_card(filme.figura, filme.titulo, filme.generos, filme.elenco, filme.classificacao, filme.resumo, filme.titulosSemelhantes, filme.opinioes, filmes);
                });
            }
            else{
                alert("Erro na requisição");
            }
        }
    }

    // CONFIGURANDO O OBJETO DA REQUISIÇÃO
    xhttp.open("GET", url_filmes);
    
    // ENVIANDO A REQUISIÇÃO
    xhttp.send();
}

gerar_catalogo_filmes();
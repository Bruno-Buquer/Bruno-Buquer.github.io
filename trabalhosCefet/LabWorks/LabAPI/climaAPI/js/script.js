const barraPesquisa = document.getElementById('barraPesquisa');
const botão = document.querySelector("#pesquisar");
const filtro = document.querySelector("#filtrar");
const GridResult = document.querySelector("#respAPI")

async function gerarClima (cidade) {
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&units=metric&appid=06251a5ff3cd6797ab6b380526b770c6&lang=pt_br`;
    const resposta = await fetch(`${URL}`);
    const data = await resposta.json();

    console.log(data);

    return data;
}

function pegaCidade () {
    let nomeCidade = barraPesquisa.value;
    return nomeCidade;
}

function exibirClima(data) {
    GridResult.innerHTML = `
        <div class="resultadoPesquisa">
            <div class = "nomeCidade">
                <h3>${data.name} - ${data.sys.country}</h3>
            </div>
            <div class = "condiçõesInfo">
                <p class="temp">Temperatura: ${data.main.temp}ºC</p>
                <p class="umid">Umidade: ${data.main.humidity}</p>
                <p class="clima">Clima</p>
                <ul class = "climaInfo">
                    <li class = "climaTipo">${data.weather[0].main}</li>
                    <li class = "climaDesc">${data.weather[0].description}</li>
                </ul>
            </div>
        </div>
    `;
}

function filtrarExtremo (dado) {
    let extremeConditions = Object.values(dado.main.temp).filter(function(clima) {
        return clima >= 35 || clima <= 5;
    });
    console.log(extremeConditions)
    return extremeConditions;
}

function exibirClimaExtremo (dadoTratado) {
    if(dadoTratado.length != 0) {
        GridResult.innerHTML = `
            <div class="resultadoPesquisa">
                <div class = "nomeCidade">
                    <h3>${pegaCidade()}</h3>
                </div>
                <div class = "condiçõesInfo">
                    <p>Condições extremas: Temperatura ${dadoTratado[0]}</p>
                </div>
            </div>
        `;
    }
    else {
        GridResult.innerHTML = `
            <div class="resultadoPesquisa">
                <div class = "nomeCidade">
                    <h3>${pegaCidade()}</h3>
                </div>
                <div class = "condiçõesInfo">
                    <p>Não possui condições extremas - Tudo normal :)</p>
                </div>
            </div>    
        `;
    }
}

botão.addEventListener("click", async () => {
    let nomeCidade = pegaCidade();
    let conditions = await gerarClima(nomeCidade);

    exibirClima(conditions);
})

filtro.addEventListener("click", async () => {
    let nomeCidade = pegaCidade();
    let conditions = await gerarClima(nomeCidade);

    let conditionsFiltradas = filtrarExtremo(conditions)

    exibirClimaExtremo(conditionsFiltradas)
})
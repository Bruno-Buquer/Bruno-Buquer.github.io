let url = "https://v6.exchangerate-api.com/v6/716f02b667f53224a112fd18/latest/USD";

const seletor = document.querySelector("#moeda-origem");
const resposta = document.querySelector("#reposta");
const botão = document.querySelector("#botao");

let moeda = "";

const gerarSeletor = (dados) => {
    let opções = "";
    for (const taxa in dados.conversion_rates) {
        opções += `<option value="${taxa}" id="${taxa}">${taxa}</option>`;
    }
    seletor.innerHTML = opções;
}

const RequestAPI = async () => {
    let API = await fetch(url);
    moeda = await API.json();
    gerarSeletor(moeda);
}

RequestAPI();

botão.addEventListener("click", async () => {
    const valorDigitado = document.querySelector("#valorDigitado").value;
    const moedaEscolhida = document.querySelector("#moeda-origem").value;

    let taxaConversao = moeda.conversion_rates[moedaEscolhida];
    resposta.innerHTML = taxaConversao * valorDigitado;
})
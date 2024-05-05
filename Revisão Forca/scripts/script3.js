const palavras = ["javascript", "html", "css", "programacao", "computador", "xablau"];
let palavraOculta = palavras[Math.floor(Math.random()*5)]// sorteie uma palavra
console.log(palavraOculta);
let divForca = document.querySelector("#palavra-oculta");
let letrasErradas = [];
let tentativasRestantes = 6;

let i = 0;
let resposta = "";
while(i < palavraOculta.length)
{
    let result = "_";
    resposta = resposta + result;
    i = i + 1;
}
divForca.innerHTML = resposta;
resposta = resposta.split('');//split passou a string para vetor


document.getElementById("adivinhar").addEventListener("click", function() {
    const letra = document.getElementById("letra").value.toLowerCase();
    if (letra.length !== 1 || !/^[a-zA-Z]+$/.test(letra)) {
        alert("Por favor, insira uma letra válida.");
        return;
    }
    if (palavraOculta.includes(letra)) {
        // Atualizar exibição da palavra oculta
        let i = 0;
        while(i < palavraOculta.length)
        {
            if(palavraOculta[i] == letra)
            {
                resposta[i] = letra;
            }
            i++;
        }
        //resposta = resposta.toString().replaceAll(',', ' ');
        divForca.innerHTML = resposta;
    } else {
        letrasErradas.push(letra);
        tentativasRestantes--;
        // Atualizar exibição das letras erradas e tentativas restantes
        let erradaAtua = document.querySelector("#letras-erradas");
        let tentaAtua = document.querySelector("#tentativas");
        erradaAtua.innerHTML = `Letras erradas: ${letrasErradas}`;
        tentaAtua.innerHTML = `Tentativas restantes: ${tentativasRestantes}`;
    }
    // Verificar se o jogador ganhou ou perdeu
    if(tentativasRestantes == 0)
    {
        alert("Você perdeu! Tente novamente");
        location.reload();
    }
    let k = 0;
    let somatorio = 0;
    while(k < resposta.length)
    {
        if(resposta[k] != "_") {
            somatorio++;
        }
        k++;
    }
    if(somatorio == resposta.length) {
        alert("Você ganhou! Parabéns");
        location.reload();
    }
});

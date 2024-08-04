const tabuleiro = document.querySelectorAll(".quadrado");
let QuadradosPreenchidos = [ , , , , , , , , ]
let SequenciaWin = 0;
const botão = document.getElementById("botao");
let QuadradoAleatorio = 0;
const reset = document.getElementById("Reset");

function EscolhaSimbolo() {
    while(1) {
        let escolha = prompt("Escolha o simbolo do P1: X ou O");
        escolha = escolha.toUpperCase();
        if (escolha == "X" || escolha == "O") {
            return escolha;
        } else {
            alert("O simbolo está INCORRETO")
        }
    }
}

let SimboloDaVez = EscolhaSimbolo();
let SimboloP1 = SimboloDaVez;
let SimboloP2 = (SimboloDaVez === "X" ? "O" : "X");

console.log(SimboloP2)

function ChecarGanhar() {
    const combinacoesVencedoras = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];


    //Código para ver quem ganhou aqui
    for (let i = 0; i < combinacoesVencedoras.length; i++) {
        let [a, b, c] = combinacoesVencedoras[i];
        if ((QuadradosPreenchidos[a] && QuadradosPreenchidos[a] === QuadradosPreenchidos[b]) && (QuadradosPreenchidos[a] === QuadradosPreenchidos[c])) {
            return 1; // Vitória
        }
    }

    let SequenciaDraw = 0;
    for(let x = 0; x < 10; x++) {
        if(QuadradosPreenchidos[x] == "X" || QuadradosPreenchidos[x] == "O") {
            SequenciaDraw++;
        } 
    }
    if(SequenciaDraw == 9) {
        return -1;//Empate
    } else {
        return 0;//Jogo continua
    }
}

function ResultadoNaTela(resultado) {
    if(resultado == 1) {
        alert(SimboloDaVez + " venceu! Parabéns!");
    }
    if(resultado == -1) {
        alert("O jogo terminou em EMPATE!")
    }
}

function EscreverNaTela(quadrado) {
    const lugar = quadrado.target;
    let NumQuadrado = lugar.id;
    if (QuadradosPreenchidos[NumQuadrado] != "X" && QuadradosPreenchidos[NumQuadrado] != "O" && ChecarGanhar() == 0) {
        QuadradosPreenchidos[NumQuadrado] = SimboloDaVez;
        lugar.innerHTML = SimboloDaVez;
        console.log(ChecarGanhar())
        ResultadoNaTela(ChecarGanhar());
        SimboloDaVez = (SimboloDaVez === "X" ? "O" : "X");
        if(SimboloP2 == SimboloDaVez && botão.className == 'COM' && ChecarGanhar() == 0) {
            do {
                QuadradoAleatorio = Math.abs(Math.trunc(Math.random() * 10) - 1)
            } while(QuadradosPreenchidos[QuadradoAleatorio] == "X" || QuadradosPreenchidos[QuadradoAleatorio] == "O");
            QuadradosPreenchidos[QuadradoAleatorio] = SimboloDaVez;
            let LugarBot = document.getElementById(QuadradoAleatorio);
            LugarBot.innerHTML = SimboloDaVez;
            ResultadoNaTela(ChecarGanhar());
            SimboloDaVez = (SimboloDaVez === "X" ? "O" : "X");
        }
    }
}

botão.addEventListener("click", function() {
    let start = 0;
    for(let i = 0; i < 9; i++) {
        if (QuadradosPreenchidos[i] != "X" && QuadradosPreenchidos[i] != "O") {
            start++;
        }
    }

    if (start == 9) {
        if(botão.className == 'COM') {
            botão.classList.add('P2');
            botão.classList.remove('COM');
            botão.innerHTML = "P1 vs P2";
        } else {
            botão.classList.add('COM');
            botão.classList.remove('P2');
            botão.innerHTML = "P1 vs COM";
        }
    }  
});

reset.addEventListener("click", function() {
    location.reload()
});

tabuleiro.forEach(quadrado => {
    quadrado.addEventListener('click', EscreverNaTela);
});
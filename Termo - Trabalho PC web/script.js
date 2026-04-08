
//Array de palavras que vocês devem utilizar! Caso queiram adicionar mais alguma palavra, fiquem à vontade. 

const BancoDePalavras = ["TERMO","CASAL","LIVRO","PEDRA","PORTA","CARRO","AVIAO","NORTE","SULCO","VERDE","PRETO","BRISA","FORTE","DORES","MENTE","CORPO","TEMPO","SABER","PODER","FALAR","ANDAR","COMER","VIVER","OLHAR","DIZER","LEVES","GRAVE","CLARO","TERRA","PLANO","LINHA","PONTO","FORMA","IDEIA","VALOR","SOMAR","SUBIR","JOGAR","CRIAR","AMIGO","FELIZ","RISOS","CHUVA","SOLAR","VENTO","NUVEM","PEDAL","FONTE","CAMPO","LIMPO","SUAVE","MAGIA","SONHO","LOUCO","CERTO","ERRAR","NIVEL","FRASE", "PENIS", "TEXTO","CONTA","CALMA","LONGE","PERTO","ENTRE","ANTES","TARDE","NOITE","HORAS","FIRME","FRACO","RAPTO","LENTO","NOVOS","VELHO","JOVEM","UNICO","CHEIO","VAZIO","ALTOS","BAIXO","LARGO","FINOS","ABRIR","FECHO","SAIDA","RODAR","GIRAR","PARAR","MEXER","TOCAR","OUVIR","PENSO","AGORA","NUNCA","CERCA","PORTO","PRAIA","ILHAS","PEDIR","PEGAR","SOLTO","BUSCA","ACHAR","PERDA","TENTE", "ERROS", "SABIA"];

//Vamos lá senhores! Ora de montar o Nosso programinha de TERMO! Verifiquem o documento "Guia de montagem do TERMO" para saberem como fazer o joguinho

//Quantatidade de tentativas que o usuário terá
let tentativas = 5;

//Gera um número aleatório entre 0 e 107 (quantidade atual que tem no banco de palavras - 1)
const numeroAleatorio = (Math.trunc(Math.random() * 1000)) % BancoDePalavras.length;

//Seleciona qual será a palavra escolhida para ser advinhada durante o jogo a partir do numero aleatório
const palavraDoJogo = BancoDePalavras[numeroAleatorio]
console.log(palavraDoJogo);

const grid = document.getElementById("grid");

function mostrarMensagem(texto, tipo = "") {
  const msg = document.getElementById("mensagem");
  msg.textContent = texto;
  msg.className = ""; // limpa classes

  if (tipo) {
    msg.classList.add(tipo);
  }
}

let arrayPalavra = [];

function destrinchaPalavra () {
  console.log("Resetando!");
  arrayPalavra = [];
  let jaTem = false;
  for(let i=0; i < palavraDoJogo.length; i++) {
    
    jaTem = false
    for(let j=0; j < arrayPalavra.length; j++) {
      if(palavraDoJogo[i] == arrayPalavra[j][0]) {
        arrayPalavra[j][1]++;
        jaTem = true
      }
    }

    if(!jaTem) arrayPalavra.push([palavraDoJogo[i], 1])

  }
}

function verificaCertos (palavraDigitada) {
  let certos = []
  for(let i=0; i < palavraDigitada.length; i++) {
    if(palavraDigitada[i] == palavraDoJogo[i]) {
      certos.push(i);
      for(let j=0; j < arrayPalavra.length; j++) {
        if(arrayPalavra[j][0] == palavraDigitada[i] && arrayPalavra[j][1] > 0) {
          console.log(arrayPalavra[j][0]);
          arrayPalavra[j][1]--;
          console.log("REMOVI o " + arrayPalavra[j][0]);
        }
      }
    }  
  }
  return certos;
}

function verificaAmarelos (palavraDigitada, certinhos) {
  let amarelos = []
  for(let i=0; i< palavraDigitada.length; i++){
    for(let j=0; j< arrayPalavra.length; j++) {
      if((arrayPalavra[j][0] == palavraDigitada[i]) && (arrayPalavra[j][1] > 0)) {
        if(!(certinhos.includes(i))) {
          amarelos.push(i);
          arrayPalavra[j][1]--;
        } 
      }
    }
  }
  return amarelos;
}

function verificaPalavra (palavraDigitada) {
  let cores = ["-", "-", "-", "-", "-"];
  let certinhos = verificaCertos(palavraDigitada);
  console.log(certinhos);
  let amarelin = verificaAmarelos(palavraDigitada, certinhos);
  console.log(amarelin);

  certinhos.forEach(posCerto => {
    cores[posCerto] = "V";
  });
  amarelin.forEach(posAmarelo  => {
    cores[posAmarelo] = "A";
  });

  console.log(cores)
  return cores;

  // for(let j = 0; j < certinhos.length; j++) {
  //             if(i = certinhos[j]) {
  //                caixaLetra.classList.add("correto");
  //             }
  //           }
}

destrinchaPalavra();
console.log(arrayPalavra);

botao = document.querySelector("#enviar")
botao.addEventListener("click", () => {
    const palavraDigitada = document.getElementById("palavra").value.toUpperCase().trim();
    if(tentativas > 0) {

      if(palavraDigitada.length !== 5) {
        return alert("Digite 5 letras!");
      } else {

        let cores = verificaPalavra(palavraDigitada);
        
        for (let i = 0; i < 5; i++) {
      	  const caixaLetra = document.createElement("div");
      	  caixaLetra.classList.add("caixaLetra");
          caixaLetra.textContent = palavraDigitada[i];

          switch(cores[i]) {
            case "V": caixaLetra.classList.add("correto");
            break;
            case "A": caixaLetra.classList.add("existeMasErrado");
            break 
            case "-": caixaLetra.classList.add("naoTem");
          }
          grid.appendChild(caixaLetra); 
      	}
          
          document.getElementById("palavra").value = "";
          console.log(arrayPalavra);
          destrinchaPalavra();
          
          tentativas--;
          console.log(tentativas)
          
          if (palavraDigitada === palavraDoJogo) {
            mostrarMensagem("Você acertou!", "sucesso");
            tentativas = 0;
          } else if (tentativas <= 0) {
            mostrarMensagem("Fim de jogo! A palavra era " + palavraDoJogo, "erro");
          }
        }
    }
});

document.getElementById("palavra").addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    botao.click();
  }
});

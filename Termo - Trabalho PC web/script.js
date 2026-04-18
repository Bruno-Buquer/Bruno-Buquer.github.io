
//Array de palavras que vocês devem utilizar! Caso queiram adicionar mais alguma palavra, fiquem à vontade. 

const BancoDePalavras = ["TERMO","CASAL","LIVRO","PEDRA","PORTA","CARRO","AVIAO","NORTE","SULCO","VERDE","PRETO","BRISA","FORTE","DORES","MENTE","CORPO","TEMPO","SABER","PODER","FALAR","ANDAR","COMER","VIVER","OLHAR","DIZER","LEVES","GRAVE","CLARO","TERRA","PLANO","LINHA","PONTO","FORMA","IDEIA","VALOR","SOMAR","SUBIR","JOGAR","CRIAR","AMIGO","FELIZ","RISOS","CHUVA","SOLAR","VENTO","NUVEM","PEDAL","FONTE","CAMPO","LIMPO","SUAVE","MAGIA","SONHO","LOUCO","CERTO","ERRAR","NIVEL","FRASE", "PENIS", "TEXTO","CONTA","CALMA","LONGE","PERTO","ENTRE","ANTES","TARDE","NOITE","HORAS","FIRME","FRACO","RAPTO","LENTO","NOVOS","VELHO","JOVEM","UNICO","CHEIO","VAZIO","ALTOS","BAIXO","LARGO","FINOS","ABRIR","FECHO","SAIDA","RODAR","GIRAR","PARAR","MEXER","TOCAR","OUVIR","PENSO","AGORA","NUNCA","CERCA","PORTO","PRAIA","ILHAS","PEDIR","PEGAR","SOLTO","BUSCA","ACHAR","PERDA","TENTE", "ERROS", "SABIA", "BOING", "METAL", "GALOS", "LONGE", "RITMO"];

//Vamos lá senhores! Ora de montar o Nosso programinha de TERMO! Verifiquem o documento "Guia de montagem do TERMO" para saberem como fazer o joguinho

//Quantatidade de tentativas que o usuário terá
let tentativas = 6;

//Gera um número aleatório entre 0 e 110 (quantidade atual que tem no banco de palavras - 1)
const numeroAleatorio = Math.floor(Math.random() * BancoDePalavras.length); //(Math.trunc(Math.random() * 1000)) % BancoDePalavras.length;

//Seleciona qual será a palavra escolhida para ser advinhada durante o jogo a partir do numero aleatório
const palavraDoJogo = BancoDePalavras[numeroAleatorio]
console.log(palavraDoJogo);

//Pega o endereço id da grid em que as letras ficaram
const grid = document.getElementById("grid");

/**
 * Exibe uma mensagem para o usuário indicando se ele perdeu ou ganhou o jogo
 * @param {string} texto - Conteúdo
 * @param {string} tipo - Classe da mensagem
 */
function mostrarMensagem(texto, tipo = "") {
  const mensagem = document.getElementById("mensagem");
  mensagem.textContent = ""; //Primeiro zera o que está escrito
  mensagem.textContent = texto; //Escreve a nova mensagem
  mensagem.className = ""; // limpa classes

  if (tipo) {
    mensagem.classList.add(tipo);
  }
}

//Variavel Global que irá conter as letras e quantas vezes elas se repetem
let arrayPalavra = [];

//Conta a quantas vezes determianda letra se repete e coloca no arrayPalavra
//Exemplo: SABIA
// S -> 1
// A -> 2
// B -> 1
// I -> 1
// A -> 1
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

/**
 * Verifica quais letras estão corretas - Verde do termo
 * @param {string} palavraDigitada  - Palavra digitada pelo usuário
 * @returns Array com as posições das letras que estão corretas - Verdes
 */
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

/**
 * Verifica quais letras existem, mas estão no local errado
 * @param {string} palavraDigitada - Palavra digitada pelo usuário
 * @param {array} certinhos - Array com as posições das letras que já estão corretas - Verdes
 * @returns Array com as posições das letras que devem ser amarelas
 */
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

//Junta as letras verdes (corretas) com as amarelas (existem na palavras, mas em local errado)
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
}

destrinchaPalavra();
console.log(arrayPalavra);
//informa o valor de tentativas para o usuário
mostrarMensagem("Tentativas: " + tentativas);

botao = document.querySelector("#enviar")
botao.addEventListener("click", () => {
    const palavraDigitada = document.getElementById("palavra").value.toUpperCase().trim();
    if(tentativas > 0) {

      //Verifica se a palavra digitada
      if(palavraDigitada.length !== 5) {
        return alert("Digite 5 letras!");
      } else {

        let cores = verificaPalavra(palavraDigitada);
        
        //Adiciona as li na tela juntamente com as cores selecionadas!
        for (let i = 0; i < 5; i++) {
      	  const caixaLetra = document.createElement("li");
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
          //Reseta todas as variaveis para a próxima rodada
          document.getElementById("palavra").value = "";
          console.log(arrayPalavra);
          destrinchaPalavra();
          
          //Diminui 1 das tentativas do usuário e informa o novo valor para o usuário
          tentativas--;
          console.log(tentativas)
          mostrarMensagem("Tentativas: " + tentativas);

          //Se a palavra do jogo ser igual a digitada pelo usuário, então ele venceu!
          //Se não, continua o jogo! A menos que tenha acabado as tentativas dele...
          //Nesse caso, informe que ele perdeu e qual era a palavra do jogo.
          if (palavraDigitada === palavraDoJogo) {
            mostrarMensagem("Você acertou!", "sucesso");
            tentativas = 0;
          } else if (tentativas <= 0) {
            mostrarMensagem("Fim de jogo! A palavra era " + palavraDoJogo, "erro");
          }
        }
    }
});

//Função para conseguir enviar a palavra no input pelo enter
document.getElementById("palavra").addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    botao.click();
  }
});

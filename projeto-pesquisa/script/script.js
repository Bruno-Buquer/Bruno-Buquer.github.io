

async function CarregarDados() {
  try {
    const dados = await fetch("./json/DADOS-CIDADES.json");
    const DadosHospitais = await dados.json();
    return await DadosHospitais;
  } catch (error) {
    console.log("Erro: ", error);
  }
}

function calcularMedia(idades) {
  if (idades.length === 0) return 0;
  const soma = idades.reduce((acc, idade) => acc + idade, 0);
  return (soma / idades.length).toFixed(1);
}

function calcularModa(idades) {
  if (idades.length === 0) return 0;
  
  const frequencia = {};
  let maxFreq = 0;
  let moda = idades[0];
  
  idades.forEach(idade => {
    frequencia[idade] = (frequencia[idade] || 0) + 1;
    if (frequencia[idade] > maxFreq) {
      maxFreq = frequencia[idade];
      moda = idade;
    }
  });
  
  return moda;
}

function calcularMediana(idades) {
  if (idades.length === 0) return 0;
  
  const sorted = [...idades].sort((a, b) => a - b);
  const meio = Math.floor(sorted.length / 2);
  
  if (sorted.length % 2 === 0) {
    return ((sorted[meio - 1] + sorted[meio]) / 2).toFixed(1);
  } else {
    return sorted[meio];
  }
}

function atualizarEstatisticasIdade(idades) {
  document.getElementById('mediaIdade').textContent = calcularMedia(idades);
  document.getElementById('modaIdade').textContent = calcularModa(idades);
  document.getElementById('medianaIdade').textContent = calcularMediana(idades);
}

document.addEventListener("DOMContentLoaded", async () => {
  let dados = await CarregarDados();
  console.log(dados);
  dados = dados['DADOS-PETROPOLIS'];
})

const botaoVacina = document.querySelector("#CheckVacina");
let xablau = 1;
botaoVacina.addEventListener("click", () => {
  if (xablau) {
    xablau = 0;
    document.querySelector("#doseChecks").innerHTML =
      `
      <h3>Vacinas — escolha a(s) dose(s)</h3>
      <div class="checkbox-grid">
        <label class="fancy-check" data-checked="true"><input id="CheckDose1" type="checkbox" data-dose="1" /><div class="box">1</div><span>1ª dose</span></label>
        <label class="fancy-check" data-checked="true"><input id="CheckDose2" type="checkbox" data-dose="2" /><div class="box">2</div><span>2ª dose</span></label>
        <label class="fancy-check" data-checked="true"><input id="CheckDose3" type="checkbox" data-dose="3" /><div class="box">3</div><span>3ª dose</span></label>
        <label class="fancy-check" data-checked="true"><input id="CheckDose4" type="checkbox" data-dose="4" /><div class="box">4</div><span>4ª dose</span></label>
      </div>
      `;
  } else {
    xablau = 1;
    document.querySelector("#doseChecks").innerHTML = "";
  }
})

function HabilitaChecks() {
  document.querySelectorAll('.fancy-check input[type="checkbox"]').forEach(checkbox => {
    // Inicializa o valor baseado no estado inicial
    checkbox.value = checkbox.checked ? 1 : 0;

    checkbox.addEventListener('change', () => {
      // Se estiver marcado, valor = 1, senão valor = 0
      checkbox.value = checkbox.checked ? 1 : 0;
    });
  });
}

function VerficaPermissaoVacina() {
  let soma = 0;
  if (document.querySelector("#CheckDose1") && document.querySelector("#CheckDose1").value == 1) soma += 1;
  if (document.querySelector("#CheckDose2") && document.querySelector("#CheckDose2").value == 1) soma += 2;
  if (document.querySelector("#CheckDose3") && document.querySelector("#CheckDose3").value == 1) soma += 4;
  if (document.querySelector("#CheckDose4") && document.querySelector("#CheckDose4").value == 1) soma += 8;
  return soma;
}

function criarPizza(id, labels, data, cores) {
  const ctx = document.getElementById(id);
  if (!ctx) return;
  if (ctx.chart) ctx.chart.destroy(); // Atualiza caso já exista
  ctx.chart = new Chart(ctx, {
    type: "pie",
    data: {
      labels: labels,
      datasets: [{
        data: data,
        backgroundColor: cores || [
          "#4f46e5", "#ef4444", "#22c55e","#f59e0b","#06b6d4"
        ],
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { position: "bottom" },
        tooltip: { callbacks: { label: ctx => `${ctx.label}: ${ctx.parsed}` } }
      }
    }
  });
}

function pessoaDeveSerIncluida(pessoa, vacinaPermissao) {
  // Verifica filtro de SRAG (COVID/Outros)
  const covidChecked = document.querySelector("#CheckCovidSRAG").checked;
  const outrosChecked = document.querySelector("#CheckOutrosSRAG").checked;
  
  let incluirSRAG = false;
  
  if ((!covidChecked && !outrosChecked) || (covidChecked && outrosChecked)) {
    incluirSRAG = true;
  } else if (covidChecked && pessoa['CLASSI_FIN'] == 5) {
    incluirSRAG = true;
  } else if (outrosChecked && pessoa['CLASSI_FIN'] != 5) {
    incluirSRAG = true;
  }
  
  if (!incluirSRAG) return false;
  
  const curadosChecked = document.querySelector("#CheckCurados").checked;
  const mortosChecked = document.querySelector("#CheckMortos").checked;
  const mortosOutroChecked = document.querySelector("#CheckMortosOutro").checked;
  const taolaChecked = document.querySelector("#CheckTaola").checked;
  
  let incluirCondicao = false;
  
  //Se nenhum marcado, inclui todos
  if (!curadosChecked && !mortosChecked && !mortosOutroChecked && !taolaChecked) {
    incluirCondicao = true;
  } else {
    if (curadosChecked && pessoa['EVOLUCAO'] == 1) incluirCondicao = true;
    if (mortosChecked && pessoa['EVOLUCAO'] == 2) incluirCondicao = true;
    if (mortosOutroChecked && pessoa['EVOLUCAO'] == 3) incluirCondicao = true;
    if (taolaChecked && (pessoa['EVOLUCAO'] == null || pessoa['EVOLUCAO'] == 9)) incluirCondicao = true;
  }
  
  if (!incluirCondicao) return false;
  
  const vacinaChecked = document.querySelector("#CheckVacina").checked;
  
  if (vacinaChecked) {

    if (pessoa['VACINA_COV'] != 1) {
      return true;
    }
    let atendeDoses = false;
    const permissao = vacinaPermissao;
    
    if (permissao === 0) {
      atendeDoses = true;
    } else {
      switch (permissao) {
        case 1: // Apenas dose 1
          atendeDoses = pessoa['DOSE_1_COV'] != null;
          break;
        case 2: // Apenas dose 2
          atendeDoses = pessoa['DOSE_2_COV'] != null;
          break;
        case 3: // Dose 1 + Dose 2
          atendeDoses = pessoa['DOSE_1_COV'] != null && pessoa['DOSE_2_COV'] != null;
          break;
        case 4: // Apenas dose REF
          atendeDoses = pessoa['DOSE_REF'] != null;
          break;
        case 5: // Dose 1 + REF
          atendeDoses = pessoa['DOSE_1_COV'] != null && pessoa['DOSE_REF'] != null;
          break;
        case 6: // Dose 2 + REF
          atendeDoses = pessoa['DOSE_2_COV'] != null && pessoa['DOSE_REF'] != null;
          break;
        case 7: // Dose 1 + Dose 2 + REF
          atendeDoses = pessoa['DOSE_1_COV'] != null && pessoa['DOSE_2_COV'] != null && pessoa['DOSE_REF'] != null;
          break;
        case 8: // Apenas dose 2REF
          atendeDoses = pessoa['DOSE_2REF'] != null;
          break;
        case 9: // Dose 1 + 2REF
          atendeDoses = pessoa['DOSE_1_COV'] != null && pessoa['DOSE_2REF'] != null;
          break;
        case 10: // Dose 2 + 2REF
          atendeDoses = pessoa['DOSE_2_COV'] != null && pessoa['DOSE_2REF'] != null;
          break;
        case 11: // Dose 1 + Dose 2 + 2REF
          atendeDoses = pessoa['DOSE_1_COV'] != null && pessoa['DOSE_2_COV'] != null && pessoa['DOSE_2REF'] != null;
          break;
        case 12: // REF + 2REF
          atendeDoses = pessoa['DOSE_REF'] != null && pessoa['DOSE_2REF'] != null;
          break;
        case 13: // Dose 1 + REF + 2REF
          atendeDoses = pessoa['DOSE_1_COV'] != null && pessoa['DOSE_REF'] != null && pessoa['DOSE_2REF'] != null;
          break;
        case 14: // Dose 2 + REF + 2REF
          atendeDoses = pessoa['DOSE_2_COV'] != null && pessoa['DOSE_REF'] != null && pessoa['DOSE_2REF'] != null;
          break;
        case 15: // Todas as doses
          atendeDoses = pessoa['DOSE_1_COV'] != null && pessoa['DOSE_2_COV'] != null && pessoa['DOSE_REF'] != null && pessoa['DOSE_2REF'] != null;
          break;
        default:
          atendeDoses = false;
      }
    }
    
    return atendeDoses;
  }
  
  // Verifica filtro de sexo
  const mascChecked = document.querySelector("#CheckMasc").checked;
  const femiChecked = document.querySelector("#CheckFemi").checked;
  
  // Se nenhum sexo selecionado, inclui todos
  if (!mascChecked && !femiChecked) {
    return true;
  }
  
  // Verifica sexo específico
  if (mascChecked && pessoa['CS_SEXO'] == "M") return true;
  if (femiChecked && pessoa['CS_SEXO'] == "F") return true;
  
  return false;
}

const botaoAplicar = document.querySelector("#applyBtn");
botaoAplicar.addEventListener("click", async () => {
  HabilitaChecks();

  let dados = await CarregarDados();
  const vacinaPermissao = VerficaPermissaoVacina();

  switch (document.querySelector("#citySelect").value) {
    case "NF": 
      dados = dados['DADOS-NOVA-FRIBURGO']; 
      break;
    case "PR": 
      dados = dados['DADOS-PETROPOLIS']; 
      break;
    case "TR": 
      dados = dados['DADOS-TERESOPOLIS']; 
      break;
  }
  
  //Dados interessantes
  // pessoa['NU_IDADE_N'] -> idade
  // pessoa['DOSE_1_COV'] -> Data que ele tomou a primeira dose
  // pessoa['VACINA_COV'] -> Se ele tomou ou não a vacina
  // pessoa['EVOLUCAO'] -> Se morreu ou foi curado
  // pessoa['CS_SEXO'] -> Sexo da pessoa
  // pessoa['CLASSI_FIN'] -> Se tem covid ou outras doenças (5 para covid)
  // pessoa["NM_UN_INTE"] -> Hospitais

  //Condições
  let curados = 0; 
  let morreu = 0; 
  let morreuDeOutro = 0; 
  let taLa = 0;

  //Médico
  let tomou = 0; 
  let pessoas = 0;

  //Sexo
  let MToma = 0;
  let Mpessoas = 0;
  let FToma = 0;
  let Fpessoas = 0;
  
  //Idade
  let idadesFiltradas = [];

  dados.forEach(pessoa => {
    //Geral
    if (pessoaDeveSerIncluida(pessoa, vacinaPermissao)) {
      if (pessoa['NU_IDADE_N']) {
        idadesFiltradas.push(pessoa['NU_IDADE_N']);
      }
      
      if (pessoa['VACINA_COV'] == 1) tomou++;
      
      //Contagem por condição
      if (document.querySelector("#CheckCurados").value == 1 && pessoa['EVOLUCAO'] == 1) curados++;
      if (document.querySelector("#CheckMortos").value == 1 && pessoa['EVOLUCAO'] == 2) morreu++;
      if (document.querySelector("#CheckMortosOutro").value == 1 && pessoa['EVOLUCAO'] == 3) morreuDeOutro++;
      if (document.querySelector("#CheckTaola").value == 1 && (pessoa['EVOLUCAO'] == null || pessoa['EVOLUCAO'] == 9)) taLa++;

      //Contagem por sexo
      if (pessoa['CS_SEXO'] == "M") {
        Mpessoas++;
        if (pessoa['VACINA_COV'] == 1) MToma++;
      } else if (pessoa['CS_SEXO'] == "F") {
        Fpessoas++;
        if (pessoa['VACINA_COV'] == 1) FToma++;
      }
    }
    pessoas++;
  });

  atualizarEstatisticasIdade(idadesFiltradas);

  // ============================
  // CRIAÇÃO DOS GRÁFICOS
  // ============================

  // Exibir gráficos gerais SEMPRE
  criarPizza("pieCondGeral", ["Curados", "Mortos", "Outras causas", "Tão lá"], [curados, morreu, morreuDeOutro, taLa]);

  // Verifica se o checkbox VACINA está marcado
  const vacinaChecked = document.querySelector("#CheckVacina").checked;

  // Exibir ou ocultar gráficos de vacina geral
  const geralVacDiv = document.getElementById("pieVacinaGeral").closest(".chart-card");
  geralVacDiv.style.display = vacinaChecked ? "flex" : "none";

  if (vacinaChecked) {
    criarPizza("pieVacinaGeral", ["Tomou", "Não tomou"], [tomou, pessoas - tomou]);
  }

  // ============================
  // FEMININO
  // ============================
  const femiChecked = document.querySelector("#CheckFemi").checked;
  const femCondDiv = document.getElementById("femCharts");
  const femVacDiv = document.getElementById("femVac");

  femCondDiv.style.display = femiChecked ? "flex" : "none";
  femVacDiv.style.display = (femiChecked && vacinaChecked) ? "flex" : "none";

  if (femiChecked) {
    criarPizza("pieCondFemi", ["Curadas", "Mortas", "Outras causas", "Tão lá"], [curados, morreu, morreuDeOutro, taLa]);
  }
  if (femiChecked && vacinaChecked) {
    criarPizza("pieVacinaFemi", ["Tomou", "Não tomou"], [FToma, Fpessoas - FToma]);
  }

  // ============================
  // MASCULINO
  // ============================
  const mascChecked = document.querySelector("#CheckMasc").checked;
  const mascCondDiv = document.getElementById("mascCharts");
  const mascVacDiv = document.getElementById("mascVac");

  mascCondDiv.style.display = mascChecked ? "flex" : "none";
  mascVacDiv.style.display = (mascChecked && vacinaChecked) ? "flex" : "none";

  if (mascChecked) {
    criarPizza("pieCondMasc", ["Curados", "Mortos", "Outras causas", "Tão lá"], [curados, morreu, morreuDeOutro, taLa]);
  }
  if (mascChecked && vacinaChecked) {
    criarPizza("pieVacinaMasc", ["Tomou", "Não tomou"], [MToma, Mpessoas - MToma]);
  }

  // ============================
  // HOSPITAIS
  // ============================
  const hospitaisChecked = document.querySelector("#CheckHospitais").checked;
  const hospitaisDiv = document.getElementById("hospitaisChart");

  hospitaisDiv.style.display = hospitaisChecked ? "flex" : "none";

  if (hospitaisChecked) {
    const hospitaisCount = {};
    
    //Conta os hospitais aplicando TODOS os filtros do sistema
    dados.forEach(pessoa => {
      const hospital = pessoa['NM_UN_INTE'];
      if (!hospital) return;

      if (pessoaDeveSerIncluida(pessoa, vacinaPermissao)) {
        if (!hospitaisCount[hospital]) {
          hospitaisCount[hospital] = 0;
        }
        hospitaisCount[hospital]++;
      }
    });

    //Ordena e pega os 4 hospitais mais foda entre os casos filtrados
    const hospitaisTop = Object.entries(hospitaisCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 4);

    const nomes = hospitaisTop.map(([nome]) => nome);
    const data = hospitaisTop.map(([_, count]) => count);

    criarPizza("pieHospitais", nomes, data);
  }
  
  console.log("Tomou vacina: " + tomou);
  console.log("Morreu: " + morreu);
  console.log("Morreu de outro: " + morreuDeOutro);
  console.log("Curado: " + curados);
  console.log("Tá lá: " + taLa);
  console.log("Total de pessoas nos filtros: " + idadesFiltradas.length);
  console.log("Média de idade: " + calcularMedia(idadesFiltradas));
  console.log("Moda de idade: " + calcularModa(idadesFiltradas));
  console.log("Mediana de idade: " + calcularMediana(idadesFiltradas));
});

const botaoReset = document.querySelector("#resetBtn");
botaoReset.addEventListener("click", resetarDashboard);

function resetarDashboard() {
  // Resetar todos os checkboxes para o estado inicial (marcados)
  document.querySelectorAll('.fancy-check input[type="checkbox"]').forEach(checkbox => {
    checkbox.checked = false;
    checkbox.value = 0;
  });

  // Resetar o select de cidade
  document.getElementById('citySelect').value = 'NF';

  // Limpar a área de doses
  document.getElementById('doseChecks').innerHTML = '';
  xablau = 1; // Resetar a variável de controle das doses

  // Destruir todos os gráficos
  const chartIds = [
    'pieCondGeral', 'pieVacinaGeral', 'pieHospitais',
    'pieCondFemi', 'pieVacinaFemi', 
    'pieCondMasc', 'pieVacinaMasc'
  ];

  chartIds.forEach(id => {
    const canvas = document.getElementById(id);
    if (canvas && canvas.chart) {
      canvas.chart.destroy();
      canvas.chart = null;
    }
  });

  // Esconder todos os gráficos opcionais
  document.getElementById('femCharts').style.display = 'none';
  document.getElementById('femVac').style.display = 'none';
  document.getElementById('mascCharts').style.display = 'none';
  document.getElementById('mascVac').style.display = 'none';

  // Mostrar os gráficos gerais padrão
  document.querySelectorAll('.chart-card').forEach(card => {
    if (card.id !== 'femCharts' && card.id !== 'femVac' && 
        card.id !== 'mascCharts' && card.id !== 'mascVac') {
      card.style.display = 'flex';
    }
  });

  // Resetar as estatísticas de idade
  document.getElementById('mediaIdade').textContent = '0';
  document.getElementById('modaIdade').textContent = '0';
  document.getElementById('medianaIdade').textContent = '0';

  console.log("Dashboard resetado para os valores padrão");
}
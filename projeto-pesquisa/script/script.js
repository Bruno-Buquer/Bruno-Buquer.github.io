

async function CarregarDados() {
  try {
    const dados = await fetch("./json/DADOS-CIDADES.json");
    const DadosHospitais = await dados.json();
    return await DadosHospitais;
  } catch (error) {
    console.log("Erro: ", error);
  }
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

    // Adiciona listener de mudança
    checkbox.addEventListener('change', () => {
      // Se estiver marcado, valor = 1, senão valor = 0
      checkbox.value = checkbox.checked ? 1 : 0;
    });
  });
}

function VerficaPermissaoVacina() {
  let soma = 0;
  if (document.querySelector("#CheckDose1").value == 1) soma += 1;
  if (document.querySelector("#CheckDose2").value == 1) soma += 2;
  if (document.querySelector("#CheckDose3").value == 1) soma += 4;
  if (document.querySelector("#CheckDose4").value == 1) soma += 8;
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


const botaoAplicar = document.querySelector("#applyBtn");
botaoAplicar.addEventListener("click", async () => {
  HabilitaChecks();

  let dados = await CarregarDados();

  //alert(document.querySelector("#CheckDose1").value);

  switch (document.querySelector("#citySelect").value) {
    case "NF": dados = dados['DADOS-NOVA-FRIBURGO'];
      break;
    case "PR": dados = dados['DADOS-PETROPOLIS'];
      break;
    case "TR": dados = dados['DADOS-TERESOPOLIS'];
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
  let pessoas = 0

  //Sexo
  let MToma = 0;
  let Mpessoas = 0;
  let FToma = 0;
  let Fpessoas = 0;


  dados.forEach(pessoa => {
    //Geral
    if(document.querySelector("#CheckCovidSRAG").value == 1 && document.querySelector("#CheckOutrosSRAG").value == 0 && pessoa['CLASSI_FIN'] == 5) {
      if (document.querySelector("#CheckVacina").value == 1 && pessoa['VACINA_COV'] == 1) {
        switch (VerficaPermissaoVacina()) { 
          case 0:
            tomou++;
            if (document.querySelector("#CheckCurados").value == 1 && pessoa['EVOLUCAO'] == 1) curados++;
            if (document.querySelector("#CheckMortos").value == 1 && pessoa['EVOLUCAO'] == 2) morreu++;
            if (document.querySelector("#CheckMortosOutro").value == 1 && pessoa['EVOLUCAO'] == 3) morreuDeOutro++;
            if (document.querySelector("#CheckTaola").value == 1 && (pessoa['EVOLUCAO'] == null || pessoa['EVOLUCAO'] == 9)) taLa++;
            break;

          case 1: // Dose 1
            if (pessoa['DOSE_1_COV'] != null) {
              tomou++;
              if (document.querySelector("#CheckCurados").value == 1 && pessoa['EVOLUCAO'] == 1) curados++;
              if (document.querySelector("#CheckMortos").value == 1 && pessoa['EVOLUCAO'] == 2) morreu++;
              if (document.querySelector("#CheckMortosOutro").value == 1 && pessoa['EVOLUCAO'] == 3) morreuDeOutro++;
              if (document.querySelector("#CheckTaola").value == 1 && (pessoa['EVOLUCAO'] == null || pessoa['EVOLUCAO'] == 9)) taLa++;
            }
            break;

          case 2: // Dose 2
            if (pessoa['DOSE_2_COV'] != null) {
              tomou++;
              if (document.querySelector("#CheckCurados").value == 1 && pessoa['EVOLUCAO'] == 1) curados++;
              if (document.querySelector("#CheckMortos").value == 1 && pessoa['EVOLUCAO'] == 2) morreu++;
              if (document.querySelector("#CheckMortosOutro").value == 1 && pessoa['EVOLUCAO'] == 3) morreuDeOutro++;
              if (document.querySelector("#CheckTaola").value == 1 && (pessoa['EVOLUCAO'] == null || pessoa['EVOLUCAO'] == 9)) taLa++;
            }
            break;

          case 4: // REF
            if (pessoa['DOSE_REF'] != null) {
              tomou++;
              if (document.querySelector("#CheckCurados").value == 1 && pessoa['EVOLUCAO'] == 1) curados++;
              if (document.querySelector("#CheckMortos").value == 1 && pessoa['EVOLUCAO'] == 2) morreu++;
              if (document.querySelector("#CheckMortosOutro").value == 1 && pessoa['EVOLUCAO'] == 3) morreuDeOutro++;
              if (document.querySelector("#CheckTaola").value == 1 && (pessoa['EVOLUCAO'] == null || pessoa['EVOLUCAO'] == 9)) taLa++;
            }
            break;

          case 8: // 2REF
            if (pessoa['DOSE_2REF'] != null) {
              tomou++;
              if (document.querySelector("#CheckCurados").value == 1 && pessoa['EVOLUCAO'] == 1) curados++;
              if (document.querySelector("#CheckMortos").value == 1 && pessoa['EVOLUCAO'] == 2) morreu++;
              if (document.querySelector("#CheckMortosOutro").value == 1 && pessoa['EVOLUCAO'] == 3) morreuDeOutro++;
              if (document.querySelector("#CheckTaola").value == 1 && (pessoa['EVOLUCAO'] == null || pessoa['EVOLUCAO'] == 9)) taLa++;
            }
            break;

          case 3: // Dose1 + Dose2
            if (pessoa['DOSE_1_COV'] != null && pessoa['DOSE_2_COV'] != null) {
              tomou++;
              if (document.querySelector("#CheckCurados").value == 1 && pessoa['EVOLUCAO'] == 1) curados++;
              if (document.querySelector("#CheckMortos").value == 1 && pessoa['EVOLUCAO'] == 2) morreu++;
              if (document.querySelector("#CheckMortosOutro").value == 1 && pessoa['EVOLUCAO'] == 3) morreuDeOutro++;
              if (document.querySelector("#CheckTaola").value == 1 && (pessoa['EVOLUCAO'] == null || pessoa['EVOLUCAO'] == 9)) taLa++;
            }
            break;

          case 5: // Dose1 + REF
            if (pessoa['DOSE_1_COV'] != null && pessoa['DOSE_REF'] != null) {
              tomou++;
              if (document.querySelector("#CheckCurados").value == 1 && pessoa['EVOLUCAO'] == 1) curados++;
              if (document.querySelector("#CheckMortos").value == 1 && pessoa['EVOLUCAO'] == 2) morreu++;
              if (document.querySelector("#CheckMortosOutro").value == 1 && pessoa['EVOLUCAO'] == 3) morreuDeOutro++;
              if (document.querySelector("#CheckTaola").value == 1 && (pessoa['EVOLUCAO'] == null || pessoa['EVOLUCAO'] == 9)) taLa++;
            }
            break;

          case 9: // Dose1 + 2REF
            if (pessoa['DOSE_1_COV'] != null && pessoa['DOSE_2REF'] != null) {
              tomou++;
              if (document.querySelector("#CheckCurados").value == 1 && pessoa['EVOLUCAO'] == 1) curados++;
              if (document.querySelector("#CheckMortos").value == 1 && pessoa['EVOLUCAO'] == 2) morreu++;
              if (document.querySelector("#CheckMortosOutro").value == 1 && pessoa['EVOLUCAO'] == 3) morreuDeOutro++;
              if (document.querySelector("#CheckTaola").value == 1 && (pessoa['EVOLUCAO'] == null || pessoa['EVOLUCAO'] == 9)) taLa++;
            }
            break;

          case 6: // Dose2 + REF
            if (pessoa['DOSE_2_COV'] != null && pessoa['DOSE_REF'] != null) {
              tomou++;
              if (document.querySelector("#CheckCurados").value == 1 && pessoa['EVOLUCAO'] == 1) curados++;
              if (document.querySelector("#CheckMortos").value == 1 && pessoa['EVOLUCAO'] == 2) morreu++;
              if (document.querySelector("#CheckMortosOutro").value == 1 && pessoa['EVOLUCAO'] == 3) morreuDeOutro++;
              if (document.querySelector("#CheckTaola").value == 1 && (pessoa['EVOLUCAO'] == null || pessoa['EVOLUCAO'] == 9)) taLa++;
            }
            break;

          case 10: // Dose2 + 2REF
            if (pessoa['DOSE_2_COV'] != null && pessoa['DOSE_2REF'] != null) {
              tomou++;
              if (document.querySelector("#CheckCurados").value == 1 && pessoa['EVOLUCAO'] == 1) curados++;
              if (document.querySelector("#CheckMortos").value == 1 && pessoa['EVOLUCAO'] == 2) morreu++;
              if (document.querySelector("#CheckMortosOutro").value == 1 && pessoa['EVOLUCAO'] == 3) morreuDeOutro++;
              if (document.querySelector("#CheckTaola").value == 1 && (pessoa['EVOLUCAO'] == null || pessoa['EVOLUCAO'] == 9)) taLa++;
            }
            break;

          case 12: // REF + 2REF
            if (pessoa['DOSE_REF'] != null && pessoa['DOSE_2REF'] != null) {
              tomou++;
              if (document.querySelector("#CheckCurados").value == 1 && pessoa['EVOLUCAO'] == 1) curados++;
              if (document.querySelector("#CheckMortos").value == 1 && pessoa['EVOLUCAO'] == 2) morreu++;
              if (document.querySelector("#CheckMortosOutro").value == 1 && pessoa['EVOLUCAO'] == 3) morreuDeOutro++;
              if (document.querySelector("#CheckTaola").value == 1 && (pessoa['EVOLUCAO'] == null || pessoa['EVOLUCAO'] == 9)) taLa++;
            }
            break;

          case 7: // Dose1 + Dose2 + REF
            if (pessoa['DOSE_1_COV'] != null && pessoa['DOSE_2_COV'] != null && pessoa['DOSE_REF'] != null) {
              tomou++;
              if (document.querySelector("#CheckCurados").value == 1 && pessoa['EVOLUCAO'] == 1) curados++;
              if (document.querySelector("#CheckMortos").value == 1 && pessoa['EVOLUCAO'] == 2) morreu++;
              if (document.querySelector("#CheckMortosOutro").value == 1 && pessoa['EVOLUCAO'] == 3) morreuDeOutro++;
              if (document.querySelector("#CheckTaola").value == 1 && (pessoa['EVOLUCAO'] == null || pessoa['EVOLUCAO'] == 9)) taLa++;
            }
            break;

          case 11: // Dose1 + Dose2 + 2REF
            if (pessoa['DOSE_1_COV'] != null && pessoa['DOSE_2_COV'] != null && pessoa['DOSE_2REF'] != null) {
              tomou++;
              if (document.querySelector("#CheckCurados").value == 1 && pessoa['EVOLUCAO'] == 1) curados++;
              if (document.querySelector("#CheckMortos").value == 1 && pessoa['EVOLUCAO'] == 2) morreu++;
              if (document.querySelector("#CheckMortosOutro").value == 1 && pessoa['EVOLUCAO'] == 3) morreuDeOutro++;
              if (document.querySelector("#CheckTaola").value == 1 && (pessoa['EVOLUCAO'] == null || pessoa['EVOLUCAO'] == 9)) taLa++;
            }
            break;

          case 13: // Dose1 + REF + 2REF
            if (pessoa['DOSE_1_COV'] != null && pessoa['DOSE_REF'] != null && pessoa['DOSE_2REF'] != null) {
              tomou++;
              if (document.querySelector("#CheckCurados").value == 1 && pessoa['EVOLUCAO'] == 1) curados++;
              if (document.querySelector("#CheckMortos").value == 1 && pessoa['EVOLUCAO'] == 2) morreu++;
              if (document.querySelector("#CheckMortosOutro").value == 1 && pessoa['EVOLUCAO'] == 3) morreuDeOutro++;
              if (document.querySelector("#CheckTaola").value == 1 && (pessoa['EVOLUCAO'] == null || pessoa['EVOLUCAO'] == 9)) taLa++;
            }
            break;

          case 14: // Dose2 + REF + 2REF
            if (pessoa['DOSE_2_COV'] != null && pessoa['DOSE_REF'] != null && pessoa['DOSE_2REF'] != null) {
              tomou++;
              if (document.querySelector("#CheckCurados").value == 1 && pessoa['EVOLUCAO'] == 1) curados++;
              if (document.querySelector("#CheckMortos").value == 1 && pessoa['EVOLUCAO'] == 2) morreu++;
              if (document.querySelector("#CheckMortosOutro").value == 1 && pessoa['EVOLUCAO'] == 3) morreuDeOutro++;
              if (document.querySelector("#CheckTaola").value == 1 && (pessoa['EVOLUCAO'] == null || pessoa['EVOLUCAO'] == 9)) taLa++;
            }
            break;

          case 15: // Todas as doses
            if (pessoa['DOSE_1_COV'] != null && pessoa['DOSE_2_COV'] != null && pessoa['DOSE_REF'] != null && pessoa['DOSE_2REF'] != null) {
              tomou++;
              if (document.querySelector("#CheckCurados").value == 1 && pessoa['EVOLUCAO'] == 1) curados++;
              if (document.querySelector("#CheckMortos").value == 1 && pessoa['EVOLUCAO'] == 2) morreu++;
              if (document.querySelector("#CheckMortosOutro").value == 1 && pessoa['EVOLUCAO'] == 3) morreuDeOutro++;
              if (document.querySelector("#CheckTaola").value == 1 && (pessoa['EVOLUCAO'] == null || pessoa['EVOLUCAO'] == 9)) taLa++;
            }
            break;
        }
      } else {
        if(document.querySelector("#CheckVacina").value == 0) {
          if(document.querySelector("#CheckCurados").value == 1 && pessoa['EVOLUCAO'] == 1) curados++;
          if(document.querySelector("#CheckMortos").value == 1 && pessoa['EVOLUCAO'] == 2) morreu++;
          if(document.querySelector("#CheckMortosOutro").value == 1 && pessoa['EVOLUCAO'] == 3) morreuDeOutro++;
          if(document.querySelector("#CheckTaola").value == 1 && (pessoa['EVOLUCAO'] == null || pessoa['EVOLUCAO'] == 9)) taLa++;
        }
      }
    } else {
      if(document.querySelector("#CheckCovidSRAG").value == 0 && document.querySelector("#CheckOutrosSRAG").value == 1 && pessoa['CLASSI_FIN'] != 5) {
        if (document.querySelector("#CheckVacina").value == 1 && pessoa['VACINA_COV'] == 1) {
          switch (VerficaPermissaoVacina()) { 
            case 0:
              tomou++;
              if (document.querySelector("#CheckCurados").value == 1 && pessoa['EVOLUCAO'] == 1) curados++;
              if (document.querySelector("#CheckMortos").value == 1 && pessoa['EVOLUCAO'] == 2) morreu++;
              if (document.querySelector("#CheckMortosOutro").value == 1 && pessoa['EVOLUCAO'] == 3) morreuDeOutro++;
              if (document.querySelector("#CheckTaola").value == 1 && (pessoa['EVOLUCAO'] == null || pessoa['EVOLUCAO'] == 9)) taLa++;
              break;

            case 1: // Dose 1
              if (pessoa['DOSE_1_COV'] != null) {
                tomou++;
                if (document.querySelector("#CheckCurados").value == 1 && pessoa['EVOLUCAO'] == 1) curados++;
                if (document.querySelector("#CheckMortos").value == 1 && pessoa['EVOLUCAO'] == 2) morreu++;
                if (document.querySelector("#CheckMortosOutro").value == 1 && pessoa['EVOLUCAO'] == 3) morreuDeOutro++;
                if (document.querySelector("#CheckTaola").value == 1 && (pessoa['EVOLUCAO'] == null || pessoa['EVOLUCAO'] == 9)) taLa++;
              }
              break;

            case 2: // Dose 2
              if (pessoa['DOSE_2_COV'] != null) {
                tomou++;
                if (document.querySelector("#CheckCurados").value == 1 && pessoa['EVOLUCAO'] == 1) curados++;
                if (document.querySelector("#CheckMortos").value == 1 && pessoa['EVOLUCAO'] == 2) morreu++;
                if (document.querySelector("#CheckMortosOutro").value == 1 && pessoa['EVOLUCAO'] == 3) morreuDeOutro++;
                if (document.querySelector("#CheckTaola").value == 1 && (pessoa['EVOLUCAO'] == null || pessoa['EVOLUCAO'] == 9)) taLa++;
              }
              break;

            case 4: // REF
              if (pessoa['DOSE_REF'] != null) {
                tomou++;
                if (document.querySelector("#CheckCurados").value == 1 && pessoa['EVOLUCAO'] == 1) curados++;
                if (document.querySelector("#CheckMortos").value == 1 && pessoa['EVOLUCAO'] == 2) morreu++;
                if (document.querySelector("#CheckMortosOutro").value == 1 && pessoa['EVOLUCAO'] == 3) morreuDeOutro++;
                if (document.querySelector("#CheckTaola").value == 1 && (pessoa['EVOLUCAO'] == null || pessoa['EVOLUCAO'] == 9)) taLa++;
              }
              break;

            case 8: // 2REF
              if (pessoa['DOSE_2REF'] != null) {
                tomou++;
                if (document.querySelector("#CheckCurados").value == 1 && pessoa['EVOLUCAO'] == 1) curados++;
                if (document.querySelector("#CheckMortos").value == 1 && pessoa['EVOLUCAO'] == 2) morreu++;
                if (document.querySelector("#CheckMortosOutro").value == 1 && pessoa['EVOLUCAO'] == 3) morreuDeOutro++;
                if (document.querySelector("#CheckTaola").value == 1 && (pessoa['EVOLUCAO'] == null || pessoa['EVOLUCAO'] == 9)) taLa++;
              }
              break;

            case 3: // Dose1 + Dose2
              if (pessoa['DOSE_1_COV'] != null && pessoa['DOSE_2_COV'] != null) {
                tomou++;
                if (document.querySelector("#CheckCurados").value == 1 && pessoa['EVOLUCAO'] == 1) curados++;
                if (document.querySelector("#CheckMortos").value == 1 && pessoa['EVOLUCAO'] == 2) morreu++;
                if (document.querySelector("#CheckMortosOutro").value == 1 && pessoa['EVOLUCAO'] == 3) morreuDeOutro++;
                if (document.querySelector("#CheckTaola").value == 1 && (pessoa['EVOLUCAO'] == null || pessoa['EVOLUCAO'] == 9)) taLa++;
              }
              break;

            case 5: // Dose1 + REF
              if (pessoa['DOSE_1_COV'] != null && pessoa['DOSE_REF'] != null) {
                tomou++;
                if (document.querySelector("#CheckCurados").value == 1 && pessoa['EVOLUCAO'] == 1) curados++;
                if (document.querySelector("#CheckMortos").value == 1 && pessoa['EVOLUCAO'] == 2) morreu++;
                if (document.querySelector("#CheckMortosOutro").value == 1 && pessoa['EVOLUCAO'] == 3) morreuDeOutro++;
                if (document.querySelector("#CheckTaola").value == 1 && (pessoa['EVOLUCAO'] == null || pessoa['EVOLUCAO'] == 9)) taLa++;
              }
              break;

            case 9: // Dose1 + 2REF
              if (pessoa['DOSE_1_COV'] != null && pessoa['DOSE_2REF'] != null) {
                tomou++;
                if (document.querySelector("#CheckCurados").value == 1 && pessoa['EVOLUCAO'] == 1) curados++;
                if (document.querySelector("#CheckMortos").value == 1 && pessoa['EVOLUCAO'] == 2) morreu++;
                if (document.querySelector("#CheckMortosOutro").value == 1 && pessoa['EVOLUCAO'] == 3) morreuDeOutro++;
                if (document.querySelector("#CheckTaola").value == 1 && (pessoa['EVOLUCAO'] == null || pessoa['EVOLUCAO'] == 9)) taLa++;
              }
              break;

            case 6: // Dose2 + REF
              if (pessoa['DOSE_2_COV'] != null && pessoa['DOSE_REF'] != null) {
                tomou++;
                if (document.querySelector("#CheckCurados").value == 1 && pessoa['EVOLUCAO'] == 1) curados++;
                if (document.querySelector("#CheckMortos").value == 1 && pessoa['EVOLUCAO'] == 2) morreu++;
                if (document.querySelector("#CheckMortosOutro").value == 1 && pessoa['EVOLUCAO'] == 3) morreuDeOutro++;
                if (document.querySelector("#CheckTaola").value == 1 && (pessoa['EVOLUCAO'] == null || pessoa['EVOLUCAO'] == 9)) taLa++;
              }
              break;

            case 10: // Dose2 + 2REF
              if (pessoa['DOSE_2_COV'] != null && pessoa['DOSE_2REF'] != null) {
                tomou++;
                if (document.querySelector("#CheckCurados").value == 1 && pessoa['EVOLUCAO'] == 1) curados++;
                if (document.querySelector("#CheckMortos").value == 1 && pessoa['EVOLUCAO'] == 2) morreu++;
                if (document.querySelector("#CheckMortosOutro").value == 1 && pessoa['EVOLUCAO'] == 3) morreuDeOutro++;
                if (document.querySelector("#CheckTaola").value == 1 && (pessoa['EVOLUCAO'] == null || pessoa['EVOLUCAO'] == 9)) taLa++;
              }
              break;

            case 12: // REF + 2REF
              if (pessoa['DOSE_REF'] != null && pessoa['DOSE_2REF'] != null) {
                tomou++;
                if (document.querySelector("#CheckCurados").value == 1 && pessoa['EVOLUCAO'] == 1) curados++;
                if (document.querySelector("#CheckMortos").value == 1 && pessoa['EVOLUCAO'] == 2) morreu++;
                if (document.querySelector("#CheckMortosOutro").value == 1 && pessoa['EVOLUCAO'] == 3) morreuDeOutro++;
                if (document.querySelector("#CheckTaola").value == 1 && (pessoa['EVOLUCAO'] == null || pessoa['EVOLUCAO'] == 9)) taLa++;
              }
              break;

            case 7: // Dose1 + Dose2 + REF
              if (pessoa['DOSE_1_COV'] != null && pessoa['DOSE_2_COV'] != null && pessoa['DOSE_REF'] != null) {
                tomou++;
                if (document.querySelector("#CheckCurados").value == 1 && pessoa['EVOLUCAO'] == 1) curados++;
                if (document.querySelector("#CheckMortos").value == 1 && pessoa['EVOLUCAO'] == 2) morreu++;
                if (document.querySelector("#CheckMortosOutro").value == 1 && pessoa['EVOLUCAO'] == 3) morreuDeOutro++;
                if (document.querySelector("#CheckTaola").value == 1 && (pessoa['EVOLUCAO'] == null || pessoa['EVOLUCAO'] == 9)) taLa++;
              }
              break;

            case 11: // Dose1 + Dose2 + 2REF
              if (pessoa['DOSE_1_COV'] != null && pessoa['DOSE_2_COV'] != null && pessoa['DOSE_2REF'] != null) {
                tomou++;
                if (document.querySelector("#CheckCurados").value == 1 && pessoa['EVOLUCAO'] == 1) curados++;
                if (document.querySelector("#CheckMortos").value == 1 && pessoa['EVOLUCAO'] == 2) morreu++;
                if (document.querySelector("#CheckMortosOutro").value == 1 && pessoa['EVOLUCAO'] == 3) morreuDeOutro++;
                if (document.querySelector("#CheckTaola").value == 1 && (pessoa['EVOLUCAO'] == null || pessoa['EVOLUCAO'] == 9)) taLa++;
              }
              break;

            case 13: // Dose1 + REF + 2REF
              if (pessoa['DOSE_1_COV'] != null && pessoa['DOSE_REF'] != null && pessoa['DOSE_2REF'] != null) {
                tomou++;
                if (document.querySelector("#CheckCurados").value == 1 && pessoa['EVOLUCAO'] == 1) curados++;
                if (document.querySelector("#CheckMortos").value == 1 && pessoa['EVOLUCAO'] == 2) morreu++;
                if (document.querySelector("#CheckMortosOutro").value == 1 && pessoa['EVOLUCAO'] == 3) morreuDeOutro++;
                if (document.querySelector("#CheckTaola").value == 1 && (pessoa['EVOLUCAO'] == null || pessoa['EVOLUCAO'] == 9)) taLa++;
              }
              break;

            case 14: // Dose2 + REF + 2REF
              if (pessoa['DOSE_2_COV'] != null && pessoa['DOSE_REF'] != null && pessoa['DOSE_2REF'] != null) {
                tomou++;
                if (document.querySelector("#CheckCurados").value == 1 && pessoa['EVOLUCAO'] == 1) curados++;
                if (document.querySelector("#CheckMortos").value == 1 && pessoa['EVOLUCAO'] == 2) morreu++;
                if (document.querySelector("#CheckMortosOutro").value == 1 && pessoa['EVOLUCAO'] == 3) morreuDeOutro++;
                if (document.querySelector("#CheckTaola").value == 1 && (pessoa['EVOLUCAO'] == null || pessoa['EVOLUCAO'] == 9)) taLa++;
              }
              break;

            case 15: // Todas as doses
              if (pessoa['DOSE_1_COV'] != null && pessoa['DOSE_2_COV'] != null && pessoa['DOSE_REF'] != null && pessoa['DOSE_2REF'] != null) {
                tomou++;
                if (document.querySelector("#CheckCurados").value == 1 && pessoa['EVOLUCAO'] == 1) curados++;
                if (document.querySelector("#CheckMortos").value == 1 && pessoa['EVOLUCAO'] == 2) morreu++;
                if (document.querySelector("#CheckMortosOutro").value == 1 && pessoa['EVOLUCAO'] == 3) morreuDeOutro++;
                if (document.querySelector("#CheckTaola").value == 1 && (pessoa['EVOLUCAO'] == null || pessoa['EVOLUCAO'] == 9)) taLa++;
              }
              break;
          }
        } else {
          if(document.querySelector("#CheckVacina").value == 0) {
            if(document.querySelector("#CheckCurados").value == 1 && pessoa['EVOLUCAO'] == 1) curados++;
            if(document.querySelector("#CheckMortos").value == 1 && pessoa['EVOLUCAO'] == 2) morreu++;
            if(document.querySelector("#CheckMortosOutro").value == 1 && pessoa['EVOLUCAO'] == 3) morreuDeOutro++;
            if(document.querySelector("#CheckTaola").value == 1 && (pessoa['EVOLUCAO'] == null || pessoa['EVOLUCAO'] == 9)) taLa++;
          }
        }
      } else {
        if((document.querySelector("#CheckCovidSRAG").value == 1 && document.querySelector("#CheckOutrosSRAG").value == 1) || (document.querySelector("#CheckCovidSRAG").value == 0 && document.querySelector("#CheckOutrosSRAG").value == 0)) {
          if (document.querySelector("#CheckVacina").value == 1 && pessoa['VACINA_COV'] == 1) {
            switch (VerficaPermissaoVacina()) { 
              case 0:
                tomou++;
                if (document.querySelector("#CheckCurados").value == 1 && pessoa['EVOLUCAO'] == 1) curados++;
                if (document.querySelector("#CheckMortos").value == 1 && pessoa['EVOLUCAO'] == 2) morreu++;
                if (document.querySelector("#CheckMortosOutro").value == 1 && pessoa['EVOLUCAO'] == 3) morreuDeOutro++;
                if (document.querySelector("#CheckTaola").value == 1 && (pessoa['EVOLUCAO'] == null || pessoa['EVOLUCAO'] == 9)) taLa++;
                break;

              case 1: // Dose 1
                if (pessoa['DOSE_1_COV'] != null) {
                  tomou++;
                  if (document.querySelector("#CheckCurados").value == 1 && pessoa['EVOLUCAO'] == 1) curados++;
                  if (document.querySelector("#CheckMortos").value == 1 && pessoa['EVOLUCAO'] == 2) morreu++;
                  if (document.querySelector("#CheckMortosOutro").value == 1 && pessoa['EVOLUCAO'] == 3) morreuDeOutro++;
                  if (document.querySelector("#CheckTaola").value == 1 && (pessoa['EVOLUCAO'] == null || pessoa['EVOLUCAO'] == 9)) taLa++;
                }
                break;

              case 2: // Dose 2
                if (pessoa['DOSE_2_COV'] != null) {
                  tomou++;
                  if (document.querySelector("#CheckCurados").value == 1 && pessoa['EVOLUCAO'] == 1) curados++;
                  if (document.querySelector("#CheckMortos").value == 1 && pessoa['EVOLUCAO'] == 2) morreu++;
                  if (document.querySelector("#CheckMortosOutro").value == 1 && pessoa['EVOLUCAO'] == 3) morreuDeOutro++;
                  if (document.querySelector("#CheckTaola").value == 1 && (pessoa['EVOLUCAO'] == null || pessoa['EVOLUCAO'] == 9)) taLa++;
                }
                break;

              case 4: // REF
                if (pessoa['DOSE_REF'] != null) {
                  tomou++;
                  if (document.querySelector("#CheckCurados").value == 1 && pessoa['EVOLUCAO'] == 1) curados++;
                  if (document.querySelector("#CheckMortos").value == 1 && pessoa['EVOLUCAO'] == 2) morreu++;
                  if (document.querySelector("#CheckMortosOutro").value == 1 && pessoa['EVOLUCAO'] == 3) morreuDeOutro++;
                  if (document.querySelector("#CheckTaola").value == 1 && (pessoa['EVOLUCAO'] == null || pessoa['EVOLUCAO'] == 9)) taLa++;
                }
                break;

              case 8: // 2REF
                if (pessoa['DOSE_2REF'] != null) {
                  tomou++;
                  if (document.querySelector("#CheckCurados").value == 1 && pessoa['EVOLUCAO'] == 1) curados++;
                  if (document.querySelector("#CheckMortos").value == 1 && pessoa['EVOLUCAO'] == 2) morreu++;
                  if (document.querySelector("#CheckMortosOutro").value == 1 && pessoa['EVOLUCAO'] == 3) morreuDeOutro++;
                  if (document.querySelector("#CheckTaola").value == 1 && (pessoa['EVOLUCAO'] == null || pessoa['EVOLUCAO'] == 9)) taLa++;
                }
                break;

              case 3: // Dose1 + Dose2
                if (pessoa['DOSE_1_COV'] != null && pessoa['DOSE_2_COV'] != null) {
                  tomou++;
                  if (document.querySelector("#CheckCurados").value == 1 && pessoa['EVOLUCAO'] == 1) curados++;
                  if (document.querySelector("#CheckMortos").value == 1 && pessoa['EVOLUCAO'] == 2) morreu++;
                  if (document.querySelector("#CheckMortosOutro").value == 1 && pessoa['EVOLUCAO'] == 3) morreuDeOutro++;
                  if (document.querySelector("#CheckTaola").value == 1 && (pessoa['EVOLUCAO'] == null || pessoa['EVOLUCAO'] == 9)) taLa++;
                }
                break;

              case 5: // Dose1 + REF
                if (pessoa['DOSE_1_COV'] != null && pessoa['DOSE_REF'] != null) {
                  tomou++;
                  if (document.querySelector("#CheckCurados").value == 1 && pessoa['EVOLUCAO'] == 1) curados++;
                  if (document.querySelector("#CheckMortos").value == 1 && pessoa['EVOLUCAO'] == 2) morreu++;
                  if (document.querySelector("#CheckMortosOutro").value == 1 && pessoa['EVOLUCAO'] == 3) morreuDeOutro++;
                  if (document.querySelector("#CheckTaola").value == 1 && (pessoa['EVOLUCAO'] == null || pessoa['EVOLUCAO'] == 9)) taLa++;
                }
                break;

              case 9: // Dose1 + 2REF
                if (pessoa['DOSE_1_COV'] != null && pessoa['DOSE_2REF'] != null) {
                  tomou++;
                  if (document.querySelector("#CheckCurados").value == 1 && pessoa['EVOLUCAO'] == 1) curados++;
                  if (document.querySelector("#CheckMortos").value == 1 && pessoa['EVOLUCAO'] == 2) morreu++;
                  if (document.querySelector("#CheckMortosOutro").value == 1 && pessoa['EVOLUCAO'] == 3) morreuDeOutro++;
                  if (document.querySelector("#CheckTaola").value == 1 && (pessoa['EVOLUCAO'] == null || pessoa['EVOLUCAO'] == 9)) taLa++;
                }
                break;

              case 6: // Dose2 + REF
                if (pessoa['DOSE_2_COV'] != null && pessoa['DOSE_REF'] != null) {
                  tomou++;
                  if (document.querySelector("#CheckCurados").value == 1 && pessoa['EVOLUCAO'] == 1) curados++;
                  if (document.querySelector("#CheckMortos").value == 1 && pessoa['EVOLUCAO'] == 2) morreu++;
                  if (document.querySelector("#CheckMortosOutro").value == 1 && pessoa['EVOLUCAO'] == 3) morreuDeOutro++;
                  if (document.querySelector("#CheckTaola").value == 1 && (pessoa['EVOLUCAO'] == null || pessoa['EVOLUCAO'] == 9)) taLa++;
                }
                break;

              case 10: // Dose2 + 2REF
                if (pessoa['DOSE_2_COV'] != null && pessoa['DOSE_2REF'] != null) {
                  tomou++;
                  if (document.querySelector("#CheckCurados").value == 1 && pessoa['EVOLUCAO'] == 1) curados++;
                  if (document.querySelector("#CheckMortos").value == 1 && pessoa['EVOLUCAO'] == 2) morreu++;
                  if (document.querySelector("#CheckMortosOutro").value == 1 && pessoa['EVOLUCAO'] == 3) morreuDeOutro++;
                  if (document.querySelector("#CheckTaola").value == 1 && (pessoa['EVOLUCAO'] == null || pessoa['EVOLUCAO'] == 9)) taLa++;
                }
                break;

              case 12: // REF + 2REF
                if (pessoa['DOSE_REF'] != null && pessoa['DOSE_2REF'] != null) {
                  tomou++;
                  if (document.querySelector("#CheckCurados").value == 1 && pessoa['EVOLUCAO'] == 1) curados++;
                  if (document.querySelector("#CheckMortos").value == 1 && pessoa['EVOLUCAO'] == 2) morreu++;
                  if (document.querySelector("#CheckMortosOutro").value == 1 && pessoa['EVOLUCAO'] == 3) morreuDeOutro++;
                  if (document.querySelector("#CheckTaola").value == 1 && (pessoa['EVOLUCAO'] == null || pessoa['EVOLUCAO'] == 9)) taLa++;
                }
                break;

              case 7: // Dose1 + Dose2 + REF
                if (pessoa['DOSE_1_COV'] != null && pessoa['DOSE_2_COV'] != null && pessoa['DOSE_REF'] != null) {
                  tomou++;
                  if (document.querySelector("#CheckCurados").value == 1 && pessoa['EVOLUCAO'] == 1) curados++;
                  if (document.querySelector("#CheckMortos").value == 1 && pessoa['EVOLUCAO'] == 2) morreu++;
                  if (document.querySelector("#CheckMortosOutro").value == 1 && pessoa['EVOLUCAO'] == 3) morreuDeOutro++;
                  if (document.querySelector("#CheckTaola").value == 1 && (pessoa['EVOLUCAO'] == null || pessoa['EVOLUCAO'] == 9)) taLa++;
                }
                break;

              case 11: // Dose1 + Dose2 + 2REF
                if (pessoa['DOSE_1_COV'] != null && pessoa['DOSE_2_COV'] != null && pessoa['DOSE_2REF'] != null) {
                  tomou++;
                  if (document.querySelector("#CheckCurados").value == 1 && pessoa['EVOLUCAO'] == 1) curados++;
                  if (document.querySelector("#CheckMortos").value == 1 && pessoa['EVOLUCAO'] == 2) morreu++;
                  if (document.querySelector("#CheckMortosOutro").value == 1 && pessoa['EVOLUCAO'] == 3) morreuDeOutro++;
                  if (document.querySelector("#CheckTaola").value == 1 && (pessoa['EVOLUCAO'] == null || pessoa['EVOLUCAO'] == 9)) taLa++;
                }
                break;

              case 13: // Dose1 + REF + 2REF
                if (pessoa['DOSE_1_COV'] != null && pessoa['DOSE_REF'] != null && pessoa['DOSE_2REF'] != null) {
                  tomou++;
                  if (document.querySelector("#CheckCurados").value == 1 && pessoa['EVOLUCAO'] == 1) curados++;
                  if (document.querySelector("#CheckMortos").value == 1 && pessoa['EVOLUCAO'] == 2) morreu++;
                  if (document.querySelector("#CheckMortosOutro").value == 1 && pessoa['EVOLUCAO'] == 3) morreuDeOutro++;
                  if (document.querySelector("#CheckTaola").value == 1 && (pessoa['EVOLUCAO'] == null || pessoa['EVOLUCAO'] == 9)) taLa++;
                }
                break;

              case 14: // Dose2 + REF + 2REF
                if (pessoa['DOSE_2_COV'] != null && pessoa['DOSE_REF'] != null && pessoa['DOSE_2REF'] != null) {
                  tomou++;
                  if (document.querySelector("#CheckCurados").value == 1 && pessoa['EVOLUCAO'] == 1) curados++;
                  if (document.querySelector("#CheckMortos").value == 1 && pessoa['EVOLUCAO'] == 2) morreu++;
                  if (document.querySelector("#CheckMortosOutro").value == 1 && pessoa['EVOLUCAO'] == 3) morreuDeOutro++;
                  if (document.querySelector("#CheckTaola").value == 1 && (pessoa['EVOLUCAO'] == null || pessoa['EVOLUCAO'] == 9)) taLa++;
                }
                break;

              case 15: // Todas as doses
                if (pessoa['DOSE_1_COV'] != null && pessoa['DOSE_2_COV'] != null && pessoa['DOSE_REF'] != null && pessoa['DOSE_2REF'] != null) {
                  tomou++;
                  if (document.querySelector("#CheckCurados").value == 1 && pessoa['EVOLUCAO'] == 1) curados++;
                  if (document.querySelector("#CheckMortos").value == 1 && pessoa['EVOLUCAO'] == 2) morreu++;
                  if (document.querySelector("#CheckMortosOutro").value == 1 && pessoa['EVOLUCAO'] == 3) morreuDeOutro++;
                  if (document.querySelector("#CheckTaola").value == 1 && (pessoa['EVOLUCAO'] == null || pessoa['EVOLUCAO'] == 9)) taLa++;
                }
                break;
            }
          } else {
            if(document.querySelector("#CheckVacina").value == 0) {
              if(document.querySelector("#CheckCurados").value == 1 && pessoa['EVOLUCAO'] == 1) curados++;
              if(document.querySelector("#CheckMortos").value == 1 && pessoa['EVOLUCAO'] == 2) morreu++;
              if(document.querySelector("#CheckMortosOutro").value == 1 && pessoa['EVOLUCAO'] == 3) morreuDeOutro++;
              if(document.querySelector("#CheckTaola").value == 1 && (pessoa['EVOLUCAO'] == null || pessoa['EVOLUCAO'] == 9)) taLa++;
            }
          }
        }
      }
    }
    pessoas++;

    //Feminino
    if(document.querySelector("#CheckFemi").value == 1 && pessoa['CS_SEXO'] == "F") {
      if(document.querySelector("#CheckCovidSRAG").value == 1 && document.querySelector("#CheckOutrosSRAG").value == 0 && pessoa['CLASSI_FIN'] == 5) {
        if (document.querySelector("#CheckVacina").value == 1 && pessoa['VACINA_COV'] == 1) {
          switch (VerficaPermissaoVacina()) { 
            case 0:
              FToma++;
              if (document.querySelector("#CheckCurados").value == 1 && pessoa['EVOLUCAO'] == 1) curados++;
              if (document.querySelector("#CheckMortos").value == 1 && pessoa['EVOLUCAO'] == 2) morreu++;
              if (document.querySelector("#CheckMortosOutro").value == 1 && pessoa['EVOLUCAO'] == 3) morreuDeOutro++;
              if (document.querySelector("#CheckTaola").value == 1 && (pessoa['EVOLUCAO'] == null || pessoa['EVOLUCAO'] == 9)) taLa++;
              break;

            case 1: // Dose 1
              if (pessoa['DOSE_1_COV'] != null) {
                FToma++;
                if (document.querySelector("#CheckCurados").value == 1 && pessoa['EVOLUCAO'] == 1) curados++;
                if (document.querySelector("#CheckMortos").value == 1 && pessoa['EVOLUCAO'] == 2) morreu++;
                if (document.querySelector("#CheckMortosOutro").value == 1 && pessoa['EVOLUCAO'] == 3) morreuDeOutro++;
                if (document.querySelector("#CheckTaola").value == 1 && (pessoa['EVOLUCAO'] == null || pessoa['EVOLUCAO'] == 9)) taLa++;
              }
              break;

            case 2: // Dose 2
              if (pessoa['DOSE_2_COV'] != null) {
                FToma++;
                if (document.querySelector("#CheckCurados").value == 1 && pessoa['EVOLUCAO'] == 1) curados++;
                if (document.querySelector("#CheckMortos").value == 1 && pessoa['EVOLUCAO'] == 2) morreu++;
                if (document.querySelector("#CheckMortosOutro").value == 1 && pessoa['EVOLUCAO'] == 3) morreuDeOutro++;
                if (document.querySelector("#CheckTaola").value == 1 && (pessoa['EVOLUCAO'] == null || pessoa['EVOLUCAO'] == 9)) taLa++;
              }
              break;

            case 4: // REF
              if (pessoa['DOSE_REF'] != null) {
                FToma++;
                if (document.querySelector("#CheckCurados").value == 1 && pessoa['EVOLUCAO'] == 1) curados++;
                if (document.querySelector("#CheckMortos").value == 1 && pessoa['EVOLUCAO'] == 2) morreu++;
                if (document.querySelector("#CheckMortosOutro").value == 1 && pessoa['EVOLUCAO'] == 3) morreuDeOutro++;
                if (document.querySelector("#CheckTaola").value == 1 && (pessoa['EVOLUCAO'] == null || pessoa['EVOLUCAO'] == 9)) taLa++;
              }
              break;

            case 8: // 2REF
              if (pessoa['DOSE_2REF'] != null) {
                FToma++;
                if (document.querySelector("#CheckCurados").value == 1 && pessoa['EVOLUCAO'] == 1) curados++;
                if (document.querySelector("#CheckMortos").value == 1 && pessoa['EVOLUCAO'] == 2) morreu++;
                if (document.querySelector("#CheckMortosOutro").value == 1 && pessoa['EVOLUCAO'] == 3) morreuDeOutro++;
                if (document.querySelector("#CheckTaola").value == 1 && (pessoa['EVOLUCAO'] == null || pessoa['EVOLUCAO'] == 9)) taLa++;
              }
              break;

            case 3: // Dose1 + Dose2
              if (pessoa['DOSE_1_COV'] != null && pessoa['DOSE_2_COV'] != null) {
                FToma++;
                if (document.querySelector("#CheckCurados").value == 1 && pessoa['EVOLUCAO'] == 1) curados++;
                if (document.querySelector("#CheckMortos").value == 1 && pessoa['EVOLUCAO'] == 2) morreu++;
                if (document.querySelector("#CheckMortosOutro").value == 1 && pessoa['EVOLUCAO'] == 3) morreuDeOutro++;
                if (document.querySelector("#CheckTaola").value == 1 && (pessoa['EVOLUCAO'] == null || pessoa['EVOLUCAO'] == 9)) taLa++;
              }
              break;

            case 5: // Dose1 + REF
              if (pessoa['DOSE_1_COV'] != null && pessoa['DOSE_REF'] != null) {
                FToma++;
                if (document.querySelector("#CheckCurados").value == 1 && pessoa['EVOLUCAO'] == 1) curados++;
                if (document.querySelector("#CheckMortos").value == 1 && pessoa['EVOLUCAO'] == 2) morreu++;
                if (document.querySelector("#CheckMortosOutro").value == 1 && pessoa['EVOLUCAO'] == 3) morreuDeOutro++;
                if (document.querySelector("#CheckTaola").value == 1 && (pessoa['EVOLUCAO'] == null || pessoa['EVOLUCAO'] == 9)) taLa++;
              }
              break;

            case 9: // Dose1 + 2REF
              if (pessoa['DOSE_1_COV'] != null && pessoa['DOSE_2REF'] != null) {
                FToma++;
                if (document.querySelector("#CheckCurados").value == 1 && pessoa['EVOLUCAO'] == 1) curados++;
                if (document.querySelector("#CheckMortos").value == 1 && pessoa['EVOLUCAO'] == 2) morreu++;
                if (document.querySelector("#CheckMortosOutro").value == 1 && pessoa['EVOLUCAO'] == 3) morreuDeOutro++;
                if (document.querySelector("#CheckTaola").value == 1 && (pessoa['EVOLUCAO'] == null || pessoa['EVOLUCAO'] == 9)) taLa++;
              }
              break;

            case 6: // Dose2 + REF
              if (pessoa['DOSE_2_COV'] != null && pessoa['DOSE_REF'] != null) {
                FToma++;
                if (document.querySelector("#CheckCurados").value == 1 && pessoa['EVOLUCAO'] == 1) curados++;
                if (document.querySelector("#CheckMortos").value == 1 && pessoa['EVOLUCAO'] == 2) morreu++;
                if (document.querySelector("#CheckMortosOutro").value == 1 && pessoa['EVOLUCAO'] == 3) morreuDeOutro++;
                if (document.querySelector("#CheckTaola").value == 1 && (pessoa['EVOLUCAO'] == null || pessoa['EVOLUCAO'] == 9)) taLa++;
              }
              break;

            case 10: // Dose2 + 2REF
              if (pessoa['DOSE_2_COV'] != null && pessoa['DOSE_2REF'] != null) {
                FToma++;
                if (document.querySelector("#CheckCurados").value == 1 && pessoa['EVOLUCAO'] == 1) curados++;
                if (document.querySelector("#CheckMortos").value == 1 && pessoa['EVOLUCAO'] == 2) morreu++;
                if (document.querySelector("#CheckMortosOutro").value == 1 && pessoa['EVOLUCAO'] == 3) morreuDeOutro++;
                if (document.querySelector("#CheckTaola").value == 1 && (pessoa['EVOLUCAO'] == null || pessoa['EVOLUCAO'] == 9)) taLa++;
              }
              break;

            case 12: // REF + 2REF
              if (pessoa['DOSE_REF'] != null && pessoa['DOSE_2REF'] != null) {
                FToma++;
                if (document.querySelector("#CheckCurados").value == 1 && pessoa['EVOLUCAO'] == 1) curados++;
                if (document.querySelector("#CheckMortos").value == 1 && pessoa['EVOLUCAO'] == 2) morreu++;
                if (document.querySelector("#CheckMortosOutro").value == 1 && pessoa['EVOLUCAO'] == 3) morreuDeOutro++;
                if (document.querySelector("#CheckTaola").value == 1 && (pessoa['EVOLUCAO'] == null || pessoa['EVOLUCAO'] == 9)) taLa++;
              }
              break;

            case 7: // Dose1 + Dose2 + REF
              if (pessoa['DOSE_1_COV'] != null && pessoa['DOSE_2_COV'] != null && pessoa['DOSE_REF'] != null) {
                FToma++;
                if (document.querySelector("#CheckCurados").value == 1 && pessoa['EVOLUCAO'] == 1) curados++;
                if (document.querySelector("#CheckMortos").value == 1 && pessoa['EVOLUCAO'] == 2) morreu++;
                if (document.querySelector("#CheckMortosOutro").value == 1 && pessoa['EVOLUCAO'] == 3) morreuDeOutro++;
                if (document.querySelector("#CheckTaola").value == 1 && (pessoa['EVOLUCAO'] == null || pessoa['EVOLUCAO'] == 9)) taLa++;
              }
              break;

            case 11: // Dose1 + Dose2 + 2REF
              if (pessoa['DOSE_1_COV'] != null && pessoa['DOSE_2_COV'] != null && pessoa['DOSE_2REF'] != null) {
                FToma++;
                if (document.querySelector("#CheckCurados").value == 1 && pessoa['EVOLUCAO'] == 1) curados++;
                if (document.querySelector("#CheckMortos").value == 1 && pessoa['EVOLUCAO'] == 2) morreu++;
                if (document.querySelector("#CheckMortosOutro").value == 1 && pessoa['EVOLUCAO'] == 3) morreuDeOutro++;
                if (document.querySelector("#CheckTaola").value == 1 && (pessoa['EVOLUCAO'] == null || pessoa['EVOLUCAO'] == 9)) taLa++;
              }
              break;

            case 13: // Dose1 + REF + 2REF
              if (pessoa['DOSE_1_COV'] != null && pessoa['DOSE_REF'] != null && pessoa['DOSE_2REF'] != null) {
                FToma++;
                if (document.querySelector("#CheckCurados").value == 1 && pessoa['EVOLUCAO'] == 1) curados++;
                if (document.querySelector("#CheckMortos").value == 1 && pessoa['EVOLUCAO'] == 2) morreu++;
                if (document.querySelector("#CheckMortosOutro").value == 1 && pessoa['EVOLUCAO'] == 3) morreuDeOutro++;
                if (document.querySelector("#CheckTaola").value == 1 && (pessoa['EVOLUCAO'] == null || pessoa['EVOLUCAO'] == 9)) taLa++;
              }
              break;

            case 14: // Dose2 + REF + 2REF
              if (pessoa['DOSE_2_COV'] != null && pessoa['DOSE_REF'] != null && pessoa['DOSE_2REF'] != null) {
                FToma++;
                if (document.querySelector("#CheckCurados").value == 1 && pessoa['EVOLUCAO'] == 1) curados++;
                if (document.querySelector("#CheckMortos").value == 1 && pessoa['EVOLUCAO'] == 2) morreu++;
                if (document.querySelector("#CheckMortosOutro").value == 1 && pessoa['EVOLUCAO'] == 3) morreuDeOutro++;
                if (document.querySelector("#CheckTaola").value == 1 && (pessoa['EVOLUCAO'] == null || pessoa['EVOLUCAO'] == 9)) taLa++;
              }
              break;

            case 15: // Todas as doses
              if (pessoa['DOSE_1_COV'] != null && pessoa['DOSE_2_COV'] != null && pessoa['DOSE_REF'] != null && pessoa['DOSE_2REF'] != null) {
                FToma++;
                if (document.querySelector("#CheckCurados").value == 1 && pessoa['EVOLUCAO'] == 1) curados++;
                if (document.querySelector("#CheckMortos").value == 1 && pessoa['EVOLUCAO'] == 2) morreu++;
                if (document.querySelector("#CheckMortosOutro").value == 1 && pessoa['EVOLUCAO'] == 3) morreuDeOutro++;
                if (document.querySelector("#CheckTaola").value == 1 && (pessoa['EVOLUCAO'] == null || pessoa['EVOLUCAO'] == 9)) taLa++;
              }
              break;
          }
        } else {
          if(document.querySelector("#CheckVacina").value == 0) {
            if(document.querySelector("#CheckCurados").value == 1 && pessoa['EVOLUCAO'] == 1) curados++;
            if(document.querySelector("#CheckMortos").value == 1 && pessoa['EVOLUCAO'] == 2) morreu++;
            if(document.querySelector("#CheckMortosOutro").value == 1 && pessoa['EVOLUCAO'] == 3) morreuDeOutro++;
            if(document.querySelector("#CheckTaola").value == 1 && (pessoa['EVOLUCAO'] == null || pessoa['EVOLUCAO'] == 9)) taLa++;
          }
        }
      } else {
        if(document.querySelector("#CheckCovidSRAG").value == 0 && document.querySelector("#CheckOutrosSRAG").value == 1 && pessoa['CLASSI_FIN'] != 5) {
          if (document.querySelector("#CheckVacina").value == 1 && pessoa['VACINA_COV'] == 1) {
            switch (VerficaPermissaoVacina()) { 
              case 0:
                FToma++;
                if (document.querySelector("#CheckCurados").value == 1 && pessoa['EVOLUCAO'] == 1) curados++;
                if (document.querySelector("#CheckMortos").value == 1 && pessoa['EVOLUCAO'] == 2) morreu++;
                if (document.querySelector("#CheckMortosOutro").value == 1 && pessoa['EVOLUCAO'] == 3) morreuDeOutro++;
                if (document.querySelector("#CheckTaola").value == 1 && (pessoa['EVOLUCAO'] == null || pessoa['EVOLUCAO'] == 9)) taLa++;
                break;

              case 1: // Dose 1
                if (pessoa['DOSE_1_COV'] != null) {
                  FToma++;
                  if (document.querySelector("#CheckCurados").value == 1 && pessoa['EVOLUCAO'] == 1) curados++;
                  if (document.querySelector("#CheckMortos").value == 1 && pessoa['EVOLUCAO'] == 2) morreu++;
                  if (document.querySelector("#CheckMortosOutro").value == 1 && pessoa['EVOLUCAO'] == 3) morreuDeOutro++;
                  if (document.querySelector("#CheckTaola").value == 1 && (pessoa['EVOLUCAO'] == null || pessoa['EVOLUCAO'] == 9)) taLa++;
                }
                break;

              case 2: // Dose 2
                if (pessoa['DOSE_2_COV'] != null) {
                  FToma++;
                  if (document.querySelector("#CheckCurados").value == 1 && pessoa['EVOLUCAO'] == 1) curados++;
                  if (document.querySelector("#CheckMortos").value == 1 && pessoa['EVOLUCAO'] == 2) morreu++;
                  if (document.querySelector("#CheckMortosOutro").value == 1 && pessoa['EVOLUCAO'] == 3) morreuDeOutro++;
                  if (document.querySelector("#CheckTaola").value == 1 && (pessoa['EVOLUCAO'] == null || pessoa['EVOLUCAO'] == 9)) taLa++;
                }
                break;

              case 4: // REF
                if (pessoa['DOSE_REF'] != null) {
                  FToma++;
                  if (document.querySelector("#CheckCurados").value == 1 && pessoa['EVOLUCAO'] == 1) curados++;
                  if (document.querySelector("#CheckMortos").value == 1 && pessoa['EVOLUCAO'] == 2) morreu++;
                  if (document.querySelector("#CheckMortosOutro").value == 1 && pessoa['EVOLUCAO'] == 3) morreuDeOutro++;
                  if (document.querySelector("#CheckTaola").value == 1 && (pessoa['EVOLUCAO'] == null || pessoa['EVOLUCAO'] == 9)) taLa++;
                }
                break;

              case 8: // 2REF
                if (pessoa['DOSE_2REF'] != null) {
                  FToma++;
                  if (document.querySelector("#CheckCurados").value == 1 && pessoa['EVOLUCAO'] == 1) curados++;
                  if (document.querySelector("#CheckMortos").value == 1 && pessoa['EVOLUCAO'] == 2) morreu++;
                  if (document.querySelector("#CheckMortosOutro").value == 1 && pessoa['EVOLUCAO'] == 3) morreuDeOutro++;
                  if (document.querySelector("#CheckTaola").value == 1 && (pessoa['EVOLUCAO'] == null || pessoa['EVOLUCAO'] == 9)) taLa++;
                }
                break;

              case 3: // Dose1 + Dose2
                if (pessoa['DOSE_1_COV'] != null && pessoa['DOSE_2_COV'] != null) {
                  FToma++;
                  if (document.querySelector("#CheckCurados").value == 1 && pessoa['EVOLUCAO'] == 1) curados++;
                  if (document.querySelector("#CheckMortos").value == 1 && pessoa['EVOLUCAO'] == 2) morreu++;
                  if (document.querySelector("#CheckMortosOutro").value == 1 && pessoa['EVOLUCAO'] == 3) morreuDeOutro++;
                  if (document.querySelector("#CheckTaola").value == 1 && (pessoa['EVOLUCAO'] == null || pessoa['EVOLUCAO'] == 9)) taLa++;
                }
                break;

              case 5: // Dose1 + REF
                if (pessoa['DOSE_1_COV'] != null && pessoa['DOSE_REF'] != null) {
                  FToma++;
                  if (document.querySelector("#CheckCurados").value == 1 && pessoa['EVOLUCAO'] == 1) curados++;
                  if (document.querySelector("#CheckMortos").value == 1 && pessoa['EVOLUCAO'] == 2) morreu++;
                  if (document.querySelector("#CheckMortosOutro").value == 1 && pessoa['EVOLUCAO'] == 3) morreuDeOutro++;
                  if (document.querySelector("#CheckTaola").value == 1 && (pessoa['EVOLUCAO'] == null || pessoa['EVOLUCAO'] == 9)) taLa++;
                }
                break;

              case 9: // Dose1 + 2REF
                if (pessoa['DOSE_1_COV'] != null && pessoa['DOSE_2REF'] != null) {
                  FToma++;
                  if (document.querySelector("#CheckCurados").value == 1 && pessoa['EVOLUCAO'] == 1) curados++;
                  if (document.querySelector("#CheckMortos").value == 1 && pessoa['EVOLUCAO'] == 2) morreu++;
                  if (document.querySelector("#CheckMortosOutro").value == 1 && pessoa['EVOLUCAO'] == 3) morreuDeOutro++;
                  if (document.querySelector("#CheckTaola").value == 1 && (pessoa['EVOLUCAO'] == null || pessoa['EVOLUCAO'] == 9)) taLa++;
                }
                break;

              case 6: // Dose2 + REF
                if (pessoa['DOSE_2_COV'] != null && pessoa['DOSE_REF'] != null) {
                  FToma++;
                  if (document.querySelector("#CheckCurados").value == 1 && pessoa['EVOLUCAO'] == 1) curados++;
                  if (document.querySelector("#CheckMortos").value == 1 && pessoa['EVOLUCAO'] == 2) morreu++;
                  if (document.querySelector("#CheckMortosOutro").value == 1 && pessoa['EVOLUCAO'] == 3) morreuDeOutro++;
                  if (document.querySelector("#CheckTaola").value == 1 && (pessoa['EVOLUCAO'] == null || pessoa['EVOLUCAO'] == 9)) taLa++;
                }
                break;

              case 10: // Dose2 + 2REF
                if (pessoa['DOSE_2_COV'] != null && pessoa['DOSE_2REF'] != null) {
                  FToma++;
                  if (document.querySelector("#CheckCurados").value == 1 && pessoa['EVOLUCAO'] == 1) curados++;
                  if (document.querySelector("#CheckMortos").value == 1 && pessoa['EVOLUCAO'] == 2) morreu++;
                  if (document.querySelector("#CheckMortosOutro").value == 1 && pessoa['EVOLUCAO'] == 3) morreuDeOutro++;
                  if (document.querySelector("#CheckTaola").value == 1 && (pessoa['EVOLUCAO'] == null || pessoa['EVOLUCAO'] == 9)) taLa++;
                }
                break;

              case 12: // REF + 2REF
                if (pessoa['DOSE_REF'] != null && pessoa['DOSE_2REF'] != null) {
                  FToma++;
                  if (document.querySelector("#CheckCurados").value == 1 && pessoa['EVOLUCAO'] == 1) curados++;
                  if (document.querySelector("#CheckMortos").value == 1 && pessoa['EVOLUCAO'] == 2) morreu++;
                  if (document.querySelector("#CheckMortosOutro").value == 1 && pessoa['EVOLUCAO'] == 3) morreuDeOutro++;
                  if (document.querySelector("#CheckTaola").value == 1 && (pessoa['EVOLUCAO'] == null || pessoa['EVOLUCAO'] == 9)) taLa++;
                }
                break;

              case 7: // Dose1 + Dose2 + REF
                if (pessoa['DOSE_1_COV'] != null && pessoa['DOSE_2_COV'] != null && pessoa['DOSE_REF'] != null) {
                  FToma++;
                  if (document.querySelector("#CheckCurados").value == 1 && pessoa['EVOLUCAO'] == 1) curados++;
                  if (document.querySelector("#CheckMortos").value == 1 && pessoa['EVOLUCAO'] == 2) morreu++;
                  if (document.querySelector("#CheckMortosOutro").value == 1 && pessoa['EVOLUCAO'] == 3) morreuDeOutro++;
                  if (document.querySelector("#CheckTaola").value == 1 && (pessoa['EVOLUCAO'] == null || pessoa['EVOLUCAO'] == 9)) taLa++;
                }
                break;

              case 11: // Dose1 + Dose2 + 2REF
                if (pessoa['DOSE_1_COV'] != null && pessoa['DOSE_2_COV'] != null && pessoa['DOSE_2REF'] != null) {
                  FToma++;
                  if (document.querySelector("#CheckCurados").value == 1 && pessoa['EVOLUCAO'] == 1) curados++;
                  if (document.querySelector("#CheckMortos").value == 1 && pessoa['EVOLUCAO'] == 2) morreu++;
                  if (document.querySelector("#CheckMortosOutro").value == 1 && pessoa['EVOLUCAO'] == 3) morreuDeOutro++;
                  if (document.querySelector("#CheckTaola").value == 1 && (pessoa['EVOLUCAO'] == null || pessoa['EVOLUCAO'] == 9)) taLa++;
                }
                break;

              case 13: // Dose1 + REF + 2REF
                if (pessoa['DOSE_1_COV'] != null && pessoa['DOSE_REF'] != null && pessoa['DOSE_2REF'] != null) {
                  FToma++;
                  if (document.querySelector("#CheckCurados").value == 1 && pessoa['EVOLUCAO'] == 1) curados++;
                  if (document.querySelector("#CheckMortos").value == 1 && pessoa['EVOLUCAO'] == 2) morreu++;
                  if (document.querySelector("#CheckMortosOutro").value == 1 && pessoa['EVOLUCAO'] == 3) morreuDeOutro++;
                  if (document.querySelector("#CheckTaola").value == 1 && (pessoa['EVOLUCAO'] == null || pessoa['EVOLUCAO'] == 9)) taLa++;
                }
                break;

              case 14: // Dose2 + REF + 2REF
                if (pessoa['DOSE_2_COV'] != null && pessoa['DOSE_REF'] != null && pessoa['DOSE_2REF'] != null) {
                  FToma++;
                  if (document.querySelector("#CheckCurados").value == 1 && pessoa['EVOLUCAO'] == 1) curados++;
                  if (document.querySelector("#CheckMortos").value == 1 && pessoa['EVOLUCAO'] == 2) morreu++;
                  if (document.querySelector("#CheckMortosOutro").value == 1 && pessoa['EVOLUCAO'] == 3) morreuDeOutro++;
                  if (document.querySelector("#CheckTaola").value == 1 && (pessoa['EVOLUCAO'] == null || pessoa['EVOLUCAO'] == 9)) taLa++;
                }
                break;

              case 15: // Todas as doses
                if (pessoa['DOSE_1_COV'] != null && pessoa['DOSE_2_COV'] != null && pessoa['DOSE_REF'] != null && pessoa['DOSE_2REF'] != null) {
                  FToma++;
                  if (document.querySelector("#CheckCurados").value == 1 && pessoa['EVOLUCAO'] == 1) curados++;
                  if (document.querySelector("#CheckMortos").value == 1 && pessoa['EVOLUCAO'] == 2) morreu++;
                  if (document.querySelector("#CheckMortosOutro").value == 1 && pessoa['EVOLUCAO'] == 3) morreuDeOutro++;
                  if (document.querySelector("#CheckTaola").value == 1 && (pessoa['EVOLUCAO'] == null || pessoa['EVOLUCAO'] == 9)) taLa++;
                }
                break;
            }
          } else {
            if(document.querySelector("#CheckVacina").value == 0) {
              if(document.querySelector("#CheckCurados").value == 1 && pessoa['EVOLUCAO'] == 1) curados++;
              if(document.querySelector("#CheckMortos").value == 1 && pessoa['EVOLUCAO'] == 2) morreu++;
              if(document.querySelector("#CheckMortosOutro").value == 1 && pessoa['EVOLUCAO'] == 3) morreuDeOutro++;
              if(document.querySelector("#CheckTaola").value == 1 && (pessoa['EVOLUCAO'] == null || pessoa['EVOLUCAO'] == 9)) taLa++;
            }
          }
        } else {
          if((document.querySelector("#CheckCovidSRAG").value == 1 && document.querySelector("#CheckOutrosSRAG").value == 1) || (document.querySelector("#CheckCovidSRAG").value == 0 && document.querySelector("#CheckOutrosSRAG").value == 0)) {
            if (document.querySelector("#CheckVacina").value == 1 && pessoa['VACINA_COV'] == 1) {
              switch (VerficaPermissaoVacina()) { 
                case 0:
                  FToma++;
                  if (document.querySelector("#CheckCurados").value == 1 && pessoa['EVOLUCAO'] == 1) curados++;
                  if (document.querySelector("#CheckMortos").value == 1 && pessoa['EVOLUCAO'] == 2) morreu++;
                  if (document.querySelector("#CheckMortosOutro").value == 1 && pessoa['EVOLUCAO'] == 3) morreuDeOutro++;
                  if (document.querySelector("#CheckTaola").value == 1 && (pessoa['EVOLUCAO'] == null || pessoa['EVOLUCAO'] == 9)) taLa++;
                  break;

                case 1: // Dose 1
                  if (pessoa['DOSE_1_COV'] != null) {
                    FToma++;
                    if (document.querySelector("#CheckCurados").value == 1 && pessoa['EVOLUCAO'] == 1) curados++;
                    if (document.querySelector("#CheckMortos").value == 1 && pessoa['EVOLUCAO'] == 2) morreu++;
                    if (document.querySelector("#CheckMortosOutro").value == 1 && pessoa['EVOLUCAO'] == 3) morreuDeOutro++;
                    if (document.querySelector("#CheckTaola").value == 1 && (pessoa['EVOLUCAO'] == null || pessoa['EVOLUCAO'] == 9)) taLa++;
                  }
                  break;

                case 2: // Dose 2
                  if (pessoa['DOSE_2_COV'] != null) {
                    FToma++;
                    if (document.querySelector("#CheckCurados").value == 1 && pessoa['EVOLUCAO'] == 1) curados++;
                    if (document.querySelector("#CheckMortos").value == 1 && pessoa['EVOLUCAO'] == 2) morreu++;
                    if (document.querySelector("#CheckMortosOutro").value == 1 && pessoa['EVOLUCAO'] == 3) morreuDeOutro++;
                    if (document.querySelector("#CheckTaola").value == 1 && (pessoa['EVOLUCAO'] == null || pessoa['EVOLUCAO'] == 9)) taLa++;
                  }
                  break;

                case 4: // REF
                  if (pessoa['DOSE_REF'] != null) {
                    FToma++;
                    if (document.querySelector("#CheckCurados").value == 1 && pessoa['EVOLUCAO'] == 1) curados++;
                    if (document.querySelector("#CheckMortos").value == 1 && pessoa['EVOLUCAO'] == 2) morreu++;
                    if (document.querySelector("#CheckMortosOutro").value == 1 && pessoa['EVOLUCAO'] == 3) morreuDeOutro++;
                    if (document.querySelector("#CheckTaola").value == 1 && (pessoa['EVOLUCAO'] == null || pessoa['EVOLUCAO'] == 9)) taLa++;
                  }
                  break;

                case 8: // 2REF
                  if (pessoa['DOSE_2REF'] != null) {
                    FToma++;
                    if (document.querySelector("#CheckCurados").value == 1 && pessoa['EVOLUCAO'] == 1) curados++;
                    if (document.querySelector("#CheckMortos").value == 1 && pessoa['EVOLUCAO'] == 2) morreu++;
                    if (document.querySelector("#CheckMortosOutro").value == 1 && pessoa['EVOLUCAO'] == 3) morreuDeOutro++;
                    if (document.querySelector("#CheckTaola").value == 1 && (pessoa['EVOLUCAO'] == null || pessoa['EVOLUCAO'] == 9)) taLa++;
                  }
                  break;

                case 3: // Dose1 + Dose2
                  if (pessoa['DOSE_1_COV'] != null && pessoa['DOSE_2_COV'] != null) {
                    FToma++;
                    if (document.querySelector("#CheckCurados").value == 1 && pessoa['EVOLUCAO'] == 1) curados++;
                    if (document.querySelector("#CheckMortos").value == 1 && pessoa['EVOLUCAO'] == 2) morreu++;
                    if (document.querySelector("#CheckMortosOutro").value == 1 && pessoa['EVOLUCAO'] == 3) morreuDeOutro++;
                    if (document.querySelector("#CheckTaola").value == 1 && (pessoa['EVOLUCAO'] == null || pessoa['EVOLUCAO'] == 9)) taLa++;
                  }
                  break;

                case 5: // Dose1 + REF
                  if (pessoa['DOSE_1_COV'] != null && pessoa['DOSE_REF'] != null) {
                    FToma++;
                    if (document.querySelector("#CheckCurados").value == 1 && pessoa['EVOLUCAO'] == 1) curados++;
                    if (document.querySelector("#CheckMortos").value == 1 && pessoa['EVOLUCAO'] == 2) morreu++;
                    if (document.querySelector("#CheckMortosOutro").value == 1 && pessoa['EVOLUCAO'] == 3) morreuDeOutro++;
                    if (document.querySelector("#CheckTaola").value == 1 && (pessoa['EVOLUCAO'] == null || pessoa['EVOLUCAO'] == 9)) taLa++;
                  }
                  break;

                case 9: // Dose1 + 2REF
                  if (pessoa['DOSE_1_COV'] != null && pessoa['DOSE_2REF'] != null) {
                    FToma++;
                    if (document.querySelector("#CheckCurados").value == 1 && pessoa['EVOLUCAO'] == 1) curados++;
                    if (document.querySelector("#CheckMortos").value == 1 && pessoa['EVOLUCAO'] == 2) morreu++;
                    if (document.querySelector("#CheckMortosOutro").value == 1 && pessoa['EVOLUCAO'] == 3) morreuDeOutro++;
                    if (document.querySelector("#CheckTaola").value == 1 && (pessoa['EVOLUCAO'] == null || pessoa['EVOLUCAO'] == 9)) taLa++;
                  }
                  break;

                case 6: // Dose2 + REF
                  if (pessoa['DOSE_2_COV'] != null && pessoa['DOSE_REF'] != null) {
                    FToma++;
                    if (document.querySelector("#CheckCurados").value == 1 && pessoa['EVOLUCAO'] == 1) curados++;
                    if (document.querySelector("#CheckMortos").value == 1 && pessoa['EVOLUCAO'] == 2) morreu++;
                    if (document.querySelector("#CheckMortosOutro").value == 1 && pessoa['EVOLUCAO'] == 3) morreuDeOutro++;
                    if (document.querySelector("#CheckTaola").value == 1 && (pessoa['EVOLUCAO'] == null || pessoa['EVOLUCAO'] == 9)) taLa++;
                  }
                  break;

                case 10: // Dose2 + 2REF
                  if (pessoa['DOSE_2_COV'] != null && pessoa['DOSE_2REF'] != null) {
                    FToma++;
                    if (document.querySelector("#CheckCurados").value == 1 && pessoa['EVOLUCAO'] == 1) curados++;
                    if (document.querySelector("#CheckMortos").value == 1 && pessoa['EVOLUCAO'] == 2) morreu++;
                    if (document.querySelector("#CheckMortosOutro").value == 1 && pessoa['EVOLUCAO'] == 3) morreuDeOutro++;
                    if (document.querySelector("#CheckTaola").value == 1 && (pessoa['EVOLUCAO'] == null || pessoa['EVOLUCAO'] == 9)) taLa++;
                  }
                  break;

                case 12: // REF + 2REF
                  if (pessoa['DOSE_REF'] != null && pessoa['DOSE_2REF'] != null) {
                    FToma++;
                    if (document.querySelector("#CheckCurados").value == 1 && pessoa['EVOLUCAO'] == 1) curados++;
                    if (document.querySelector("#CheckMortos").value == 1 && pessoa['EVOLUCAO'] == 2) morreu++;
                    if (document.querySelector("#CheckMortosOutro").value == 1 && pessoa['EVOLUCAO'] == 3) morreuDeOutro++;
                    if (document.querySelector("#CheckTaola").value == 1 && (pessoa['EVOLUCAO'] == null || pessoa['EVOLUCAO'] == 9)) taLa++;
                  }
                  break;

                case 7: // Dose1 + Dose2 + REF
                  if (pessoa['DOSE_1_COV'] != null && pessoa['DOSE_2_COV'] != null && pessoa['DOSE_REF'] != null) {
                    FToma++;
                    if (document.querySelector("#CheckCurados").value == 1 && pessoa['EVOLUCAO'] == 1) curados++;
                    if (document.querySelector("#CheckMortos").value == 1 && pessoa['EVOLUCAO'] == 2) morreu++;
                    if (document.querySelector("#CheckMortosOutro").value == 1 && pessoa['EVOLUCAO'] == 3) morreuDeOutro++;
                    if (document.querySelector("#CheckTaola").value == 1 && (pessoa['EVOLUCAO'] == null || pessoa['EVOLUCAO'] == 9)) taLa++;
                  }
                  break;

                case 11: // Dose1 + Dose2 + 2REF
                  if (pessoa['DOSE_1_COV'] != null && pessoa['DOSE_2_COV'] != null && pessoa['DOSE_2REF'] != null) {
                    FToma++;
                    if (document.querySelector("#CheckCurados").value == 1 && pessoa['EVOLUCAO'] == 1) curados++;
                    if (document.querySelector("#CheckMortos").value == 1 && pessoa['EVOLUCAO'] == 2) morreu++;
                    if (document.querySelector("#CheckMortosOutro").value == 1 && pessoa['EVOLUCAO'] == 3) morreuDeOutro++;
                    if (document.querySelector("#CheckTaola").value == 1 && (pessoa['EVOLUCAO'] == null || pessoa['EVOLUCAO'] == 9)) taLa++;
                  }
                  break;

                case 13: // Dose1 + REF + 2REF
                  if (pessoa['DOSE_1_COV'] != null && pessoa['DOSE_REF'] != null && pessoa['DOSE_2REF'] != null) {
                    FToma++;
                    if (document.querySelector("#CheckCurados").value == 1 && pessoa['EVOLUCAO'] == 1) curados++;
                    if (document.querySelector("#CheckMortos").value == 1 && pessoa['EVOLUCAO'] == 2) morreu++;
                    if (document.querySelector("#CheckMortosOutro").value == 1 && pessoa['EVOLUCAO'] == 3) morreuDeOutro++;
                    if (document.querySelector("#CheckTaola").value == 1 && (pessoa['EVOLUCAO'] == null || pessoa['EVOLUCAO'] == 9)) taLa++;
                  }
                  break;

                case 14: // Dose2 + REF + 2REF
                  if (pessoa['DOSE_2_COV'] != null && pessoa['DOSE_REF'] != null && pessoa['DOSE_2REF'] != null) {
                    FToma++;
                    if (document.querySelector("#CheckCurados").value == 1 && pessoa['EVOLUCAO'] == 1) curados++;
                    if (document.querySelector("#CheckMortos").value == 1 && pessoa['EVOLUCAO'] == 2) morreu++;
                    if (document.querySelector("#CheckMortosOutro").value == 1 && pessoa['EVOLUCAO'] == 3) morreuDeOutro++;
                    if (document.querySelector("#CheckTaola").value == 1 && (pessoa['EVOLUCAO'] == null || pessoa['EVOLUCAO'] == 9)) taLa++;
                  }
                  break;

                case 15: // Todas as doses
                  if (pessoa['DOSE_1_COV'] != null && pessoa['DOSE_2_COV'] != null && pessoa['DOSE_REF'] != null && pessoa['DOSE_2REF'] != null) {
                    FToma++;
                    if (document.querySelector("#CheckCurados").value == 1 && pessoa['EVOLUCAO'] == 1) curados++;
                    if (document.querySelector("#CheckMortos").value == 1 && pessoa['EVOLUCAO'] == 2) morreu++;
                    if (document.querySelector("#CheckMortosOutro").value == 1 && pessoa['EVOLUCAO'] == 3) morreuDeOutro++;
                    if (document.querySelector("#CheckTaola").value == 1 && (pessoa['EVOLUCAO'] == null || pessoa['EVOLUCAO'] == 9)) taLa++;
                  }
                  break;
              }
            } else {
              if(document.querySelector("#CheckVacina").value == 0) {
                if(document.querySelector("#CheckCurados").value == 1 && pessoa['EVOLUCAO'] == 1) curados++;
                if(document.querySelector("#CheckMortos").value == 1 && pessoa['EVOLUCAO'] == 2) morreu++;
                if(document.querySelector("#CheckMortosOutro").value == 1 && pessoa['EVOLUCAO'] == 3) morreuDeOutro++;
                if(document.querySelector("#CheckTaola").value == 1 && (pessoa['EVOLUCAO'] == null || pessoa['EVOLUCAO'] == 9)) taLa++;
              }
            }
          }
        }
      }
      Mpessoas++;
    }

    //Masculino
    if(document.querySelector("#CheckMasc").value == 1 && pessoa['CS_SEXO'] == "M") {
      if(document.querySelector("#CheckCovidSRAG").value == 1 && document.querySelector("#CheckOutrosSRAG").value == 0 && pessoa['CLASSI_FIN'] == 5) {
        if (document.querySelector("#CheckVacina").value == 1 && pessoa['VACINA_COV'] == 1) {
          switch (VerficaPermissaoVacina()) { 
            case 0:
              MToma++;
              if (document.querySelector("#CheckCurados").value == 1 && pessoa['EVOLUCAO'] == 1) curados++;
              if (document.querySelector("#CheckMortos").value == 1 && pessoa['EVOLUCAO'] == 2) morreu++;
              if (document.querySelector("#CheckMortosOutro").value == 1 && pessoa['EVOLUCAO'] == 3) morreuDeOutro++;
              if (document.querySelector("#CheckTaola").value == 1 && (pessoa['EVOLUCAO'] == null || pessoa['EVOLUCAO'] == 9)) taLa++;
              break;

            case 1: // Dose 1
              if (pessoa['DOSE_1_COV'] != null) {
                MToma++;
                if (document.querySelector("#CheckCurados").value == 1 && pessoa['EVOLUCAO'] == 1) curados++;
                if (document.querySelector("#CheckMortos").value == 1 && pessoa['EVOLUCAO'] == 2) morreu++;
                if (document.querySelector("#CheckMortosOutro").value == 1 && pessoa['EVOLUCAO'] == 3) morreuDeOutro++;
                if (document.querySelector("#CheckTaola").value == 1 && (pessoa['EVOLUCAO'] == null || pessoa['EVOLUCAO'] == 9)) taLa++;
              }
              break;

            case 2: // Dose 2
              if (pessoa['DOSE_2_COV'] != null) {
                MToma++;
                if (document.querySelector("#CheckCurados").value == 1 && pessoa['EVOLUCAO'] == 1) curados++;
                if (document.querySelector("#CheckMortos").value == 1 && pessoa['EVOLUCAO'] == 2) morreu++;
                if (document.querySelector("#CheckMortosOutro").value == 1 && pessoa['EVOLUCAO'] == 3) morreuDeOutro++;
                if (document.querySelector("#CheckTaola").value == 1 && (pessoa['EVOLUCAO'] == null || pessoa['EVOLUCAO'] == 9)) taLa++;
              }
              break;

            case 4: // REF
              if (pessoa['DOSE_REF'] != null) {
                MToma++;
                if (document.querySelector("#CheckCurados").value == 1 && pessoa['EVOLUCAO'] == 1) curados++;
                if (document.querySelector("#CheckMortos").value == 1 && pessoa['EVOLUCAO'] == 2) morreu++;
                if (document.querySelector("#CheckMortosOutro").value == 1 && pessoa['EVOLUCAO'] == 3) morreuDeOutro++;
                if (document.querySelector("#CheckTaola").value == 1 && (pessoa['EVOLUCAO'] == null || pessoa['EVOLUCAO'] == 9)) taLa++;
              }
              break;

            case 8: // 2REF
              if (pessoa['DOSE_2REF'] != null) {
                MToma++;
                if (document.querySelector("#CheckCurados").value == 1 && pessoa['EVOLUCAO'] == 1) curados++;
                if (document.querySelector("#CheckMortos").value == 1 && pessoa['EVOLUCAO'] == 2) morreu++;
                if (document.querySelector("#CheckMortosOutro").value == 1 && pessoa['EVOLUCAO'] == 3) morreuDeOutro++;
                if (document.querySelector("#CheckTaola").value == 1 && (pessoa['EVOLUCAO'] == null || pessoa['EVOLUCAO'] == 9)) taLa++;
              }
              break;

            case 3: // Dose1 + Dose2
              if (pessoa['DOSE_1_COV'] != null && pessoa['DOSE_2_COV'] != null) {
                MToma++;
                if (document.querySelector("#CheckCurados").value == 1 && pessoa['EVOLUCAO'] == 1) curados++;
                if (document.querySelector("#CheckMortos").value == 1 && pessoa['EVOLUCAO'] == 2) morreu++;
                if (document.querySelector("#CheckMortosOutro").value == 1 && pessoa['EVOLUCAO'] == 3) morreuDeOutro++;
                if (document.querySelector("#CheckTaola").value == 1 && (pessoa['EVOLUCAO'] == null || pessoa['EVOLUCAO'] == 9)) taLa++;
              }
              break;

            case 5: // Dose1 + REF
              if (pessoa['DOSE_1_COV'] != null && pessoa['DOSE_REF'] != null) {
                MToma++;
                if (document.querySelector("#CheckCurados").value == 1 && pessoa['EVOLUCAO'] == 1) curados++;
                if (document.querySelector("#CheckMortos").value == 1 && pessoa['EVOLUCAO'] == 2) morreu++;
                if (document.querySelector("#CheckMortosOutro").value == 1 && pessoa['EVOLUCAO'] == 3) morreuDeOutro++;
                if (document.querySelector("#CheckTaola").value == 1 && (pessoa['EVOLUCAO'] == null || pessoa['EVOLUCAO'] == 9)) taLa++;
              }
              break;

            case 9: // Dose1 + 2REF
              if (pessoa['DOSE_1_COV'] != null && pessoa['DOSE_2REF'] != null) {
                MToma++;
                if (document.querySelector("#CheckCurados").value == 1 && pessoa['EVOLUCAO'] == 1) curados++;
                if (document.querySelector("#CheckMortos").value == 1 && pessoa['EVOLUCAO'] == 2) morreu++;
                if (document.querySelector("#CheckMortosOutro").value == 1 && pessoa['EVOLUCAO'] == 3) morreuDeOutro++;
                if (document.querySelector("#CheckTaola").value == 1 && (pessoa['EVOLUCAO'] == null || pessoa['EVOLUCAO'] == 9)) taLa++;
              }
              break;

            case 6: // Dose2 + REF
              if (pessoa['DOSE_2_COV'] != null && pessoa['DOSE_REF'] != null) {
                MToma++;
                if (document.querySelector("#CheckCurados").value == 1 && pessoa['EVOLUCAO'] == 1) curados++;
                if (document.querySelector("#CheckMortos").value == 1 && pessoa['EVOLUCAO'] == 2) morreu++;
                if (document.querySelector("#CheckMortosOutro").value == 1 && pessoa['EVOLUCAO'] == 3) morreuDeOutro++;
                if (document.querySelector("#CheckTaola").value == 1 && (pessoa['EVOLUCAO'] == null || pessoa['EVOLUCAO'] == 9)) taLa++;
              }
              break;

            case 10: // Dose2 + 2REF
              if (pessoa['DOSE_2_COV'] != null && pessoa['DOSE_2REF'] != null) {
                MToma++;
                if (document.querySelector("#CheckCurados").value == 1 && pessoa['EVOLUCAO'] == 1) curados++;
                if (document.querySelector("#CheckMortos").value == 1 && pessoa['EVOLUCAO'] == 2) morreu++;
                if (document.querySelector("#CheckMortosOutro").value == 1 && pessoa['EVOLUCAO'] == 3) morreuDeOutro++;
                if (document.querySelector("#CheckTaola").value == 1 && (pessoa['EVOLUCAO'] == null || pessoa['EVOLUCAO'] == 9)) taLa++;
              }
              break;

            case 12: // REF + 2REF
              if (pessoa['DOSE_REF'] != null && pessoa['DOSE_2REF'] != null) {
                MToma++;
                if (document.querySelector("#CheckCurados").value == 1 && pessoa['EVOLUCAO'] == 1) curados++;
                if (document.querySelector("#CheckMortos").value == 1 && pessoa['EVOLUCAO'] == 2) morreu++;
                if (document.querySelector("#CheckMortosOutro").value == 1 && pessoa['EVOLUCAO'] == 3) morreuDeOutro++;
                if (document.querySelector("#CheckTaola").value == 1 && (pessoa['EVOLUCAO'] == null || pessoa['EVOLUCAO'] == 9)) taLa++;
              }
              break;

            case 7: // Dose1 + Dose2 + REF
              if (pessoa['DOSE_1_COV'] != null && pessoa['DOSE_2_COV'] != null && pessoa['DOSE_REF'] != null) {
                MToma++;
                if (document.querySelector("#CheckCurados").value == 1 && pessoa['EVOLUCAO'] == 1) curados++;
                if (document.querySelector("#CheckMortos").value == 1 && pessoa['EVOLUCAO'] == 2) morreu++;
                if (document.querySelector("#CheckMortosOutro").value == 1 && pessoa['EVOLUCAO'] == 3) morreuDeOutro++;
                if (document.querySelector("#CheckTaola").value == 1 && (pessoa['EVOLUCAO'] == null || pessoa['EVOLUCAO'] == 9)) taLa++;
              }
              break;

            case 11: // Dose1 + Dose2 + 2REF
              if (pessoa['DOSE_1_COV'] != null && pessoa['DOSE_2_COV'] != null && pessoa['DOSE_2REF'] != null) {
                MToma++;
                if (document.querySelector("#CheckCurados").value == 1 && pessoa['EVOLUCAO'] == 1) curados++;
                if (document.querySelector("#CheckMortos").value == 1 && pessoa['EVOLUCAO'] == 2) morreu++;
                if (document.querySelector("#CheckMortosOutro").value == 1 && pessoa['EVOLUCAO'] == 3) morreuDeOutro++;
                if (document.querySelector("#CheckTaola").value == 1 && (pessoa['EVOLUCAO'] == null || pessoa['EVOLUCAO'] == 9)) taLa++;
              }
              break;

            case 13: // Dose1 + REF + 2REF
              if (pessoa['DOSE_1_COV'] != null && pessoa['DOSE_REF'] != null && pessoa['DOSE_2REF'] != null) {
                MToma++;
                if (document.querySelector("#CheckCurados").value == 1 && pessoa['EVOLUCAO'] == 1) curados++;
                if (document.querySelector("#CheckMortos").value == 1 && pessoa['EVOLUCAO'] == 2) morreu++;
                if (document.querySelector("#CheckMortosOutro").value == 1 && pessoa['EVOLUCAO'] == 3) morreuDeOutro++;
                if (document.querySelector("#CheckTaola").value == 1 && (pessoa['EVOLUCAO'] == null || pessoa['EVOLUCAO'] == 9)) taLa++;
              }
              break;

            case 14: // Dose2 + REF + 2REF
              if (pessoa['DOSE_2_COV'] != null && pessoa['DOSE_REF'] != null && pessoa['DOSE_2REF'] != null) {
                MToma++;
                if (document.querySelector("#CheckCurados").value == 1 && pessoa['EVOLUCAO'] == 1) curados++;
                if (document.querySelector("#CheckMortos").value == 1 && pessoa['EVOLUCAO'] == 2) morreu++;
                if (document.querySelector("#CheckMortosOutro").value == 1 && pessoa['EVOLUCAO'] == 3) morreuDeOutro++;
                if (document.querySelector("#CheckTaola").value == 1 && (pessoa['EVOLUCAO'] == null || pessoa['EVOLUCAO'] == 9)) taLa++;
              }
              break;

            case 15: // Todas as doses
              if (pessoa['DOSE_1_COV'] != null && pessoa['DOSE_2_COV'] != null && pessoa['DOSE_REF'] != null && pessoa['DOSE_2REF'] != null) {
                MToma++;
                if (document.querySelector("#CheckCurados").value == 1 && pessoa['EVOLUCAO'] == 1) curados++;
                if (document.querySelector("#CheckMortos").value == 1 && pessoa['EVOLUCAO'] == 2) morreu++;
                if (document.querySelector("#CheckMortosOutro").value == 1 && pessoa['EVOLUCAO'] == 3) morreuDeOutro++;
                if (document.querySelector("#CheckTaola").value == 1 && (pessoa['EVOLUCAO'] == null || pessoa['EVOLUCAO'] == 9)) taLa++;
              }
              break;
          }
        } else {
          if(document.querySelector("#CheckVacina").value == 0) {
            if(document.querySelector("#CheckCurados").value == 1 && pessoa['EVOLUCAO'] == 1) curados++;
            if(document.querySelector("#CheckMortos").value == 1 && pessoa['EVOLUCAO'] == 2) morreu++;
            if(document.querySelector("#CheckMortosOutro").value == 1 && pessoa['EVOLUCAO'] == 3) morreuDeOutro++;
            if(document.querySelector("#CheckTaola").value == 1 && (pessoa['EVOLUCAO'] == null || pessoa['EVOLUCAO'] == 9)) taLa++;
          }
        }
      } else {
        if(document.querySelector("#CheckCovidSRAG").value == 0 && document.querySelector("#CheckOutrosSRAG").value == 1 && pessoa['CLASSI_FIN'] != 5) {
          if (document.querySelector("#CheckVacina").value == 1 && pessoa['VACINA_COV'] == 1) {
            switch (VerficaPermissaoVacina()) { 
              case 0:
                MToma++;
                if (document.querySelector("#CheckCurados").value == 1 && pessoa['EVOLUCAO'] == 1) curados++;
                if (document.querySelector("#CheckMortos").value == 1 && pessoa['EVOLUCAO'] == 2) morreu++;
                if (document.querySelector("#CheckMortosOutro").value == 1 && pessoa['EVOLUCAO'] == 3) morreuDeOutro++;
                if (document.querySelector("#CheckTaola").value == 1 && (pessoa['EVOLUCAO'] == null || pessoa['EVOLUCAO'] == 9)) taLa++;
                break;

              case 1: // Dose 1
                if (pessoa['DOSE_1_COV'] != null) {
                  MToma++;
                  if (document.querySelector("#CheckCurados").value == 1 && pessoa['EVOLUCAO'] == 1) curados++;
                  if (document.querySelector("#CheckMortos").value == 1 && pessoa['EVOLUCAO'] == 2) morreu++;
                  if (document.querySelector("#CheckMortosOutro").value == 1 && pessoa['EVOLUCAO'] == 3) morreuDeOutro++;
                  if (document.querySelector("#CheckTaola").value == 1 && (pessoa['EVOLUCAO'] == null || pessoa['EVOLUCAO'] == 9)) taLa++;
                }
                break;

              case 2: // Dose 2
                if (pessoa['DOSE_2_COV'] != null) {
                  MToma++;
                  if (document.querySelector("#CheckCurados").value == 1 && pessoa['EVOLUCAO'] == 1) curados++;
                  if (document.querySelector("#CheckMortos").value == 1 && pessoa['EVOLUCAO'] == 2) morreu++;
                  if (document.querySelector("#CheckMortosOutro").value == 1 && pessoa['EVOLUCAO'] == 3) morreuDeOutro++;
                  if (document.querySelector("#CheckTaola").value == 1 && (pessoa['EVOLUCAO'] == null || pessoa['EVOLUCAO'] == 9)) taLa++;
                }
                break;

              case 4: // REF
                if (pessoa['DOSE_REF'] != null) {
                  MToma++;
                  if (document.querySelector("#CheckCurados").value == 1 && pessoa['EVOLUCAO'] == 1) curados++;
                  if (document.querySelector("#CheckMortos").value == 1 && pessoa['EVOLUCAO'] == 2) morreu++;
                  if (document.querySelector("#CheckMortosOutro").value == 1 && pessoa['EVOLUCAO'] == 3) morreuDeOutro++;
                  if (document.querySelector("#CheckTaola").value == 1 && (pessoa['EVOLUCAO'] == null || pessoa['EVOLUCAO'] == 9)) taLa++;
                }
                break;

              case 8: // 2REF
                if (pessoa['DOSE_2REF'] != null) {
                  MToma++;
                  if (document.querySelector("#CheckCurados").value == 1 && pessoa['EVOLUCAO'] == 1) curados++;
                  if (document.querySelector("#CheckMortos").value == 1 && pessoa['EVOLUCAO'] == 2) morreu++;
                  if (document.querySelector("#CheckMortosOutro").value == 1 && pessoa['EVOLUCAO'] == 3) morreuDeOutro++;
                  if (document.querySelector("#CheckTaola").value == 1 && (pessoa['EVOLUCAO'] == null || pessoa['EVOLUCAO'] == 9)) taLa++;
                }
                break;

              case 3: // Dose1 + Dose2
                if (pessoa['DOSE_1_COV'] != null && pessoa['DOSE_2_COV'] != null) {
                  MToma++;
                  if (document.querySelector("#CheckCurados").value == 1 && pessoa['EVOLUCAO'] == 1) curados++;
                  if (document.querySelector("#CheckMortos").value == 1 && pessoa['EVOLUCAO'] == 2) morreu++;
                  if (document.querySelector("#CheckMortosOutro").value == 1 && pessoa['EVOLUCAO'] == 3) morreuDeOutro++;
                  if (document.querySelector("#CheckTaola").value == 1 && (pessoa['EVOLUCAO'] == null || pessoa['EVOLUCAO'] == 9)) taLa++;
                }
                break;

              case 5: // Dose1 + REF
                if (pessoa['DOSE_1_COV'] != null && pessoa['DOSE_REF'] != null) {
                  MToma++;
                  if (document.querySelector("#CheckCurados").value == 1 && pessoa['EVOLUCAO'] == 1) curados++;
                  if (document.querySelector("#CheckMortos").value == 1 && pessoa['EVOLUCAO'] == 2) morreu++;
                  if (document.querySelector("#CheckMortosOutro").value == 1 && pessoa['EVOLUCAO'] == 3) morreuDeOutro++;
                  if (document.querySelector("#CheckTaola").value == 1 && (pessoa['EVOLUCAO'] == null || pessoa['EVOLUCAO'] == 9)) taLa++;
                }
                break;

              case 9: // Dose1 + 2REF
                if (pessoa['DOSE_1_COV'] != null && pessoa['DOSE_2REF'] != null) {
                  MToma++;
                  if (document.querySelector("#CheckCurados").value == 1 && pessoa['EVOLUCAO'] == 1) curados++;
                  if (document.querySelector("#CheckMortos").value == 1 && pessoa['EVOLUCAO'] == 2) morreu++;
                  if (document.querySelector("#CheckMortosOutro").value == 1 && pessoa['EVOLUCAO'] == 3) morreuDeOutro++;
                  if (document.querySelector("#CheckTaola").value == 1 && (pessoa['EVOLUCAO'] == null || pessoa['EVOLUCAO'] == 9)) taLa++;
                }
                break;

              case 6: // Dose2 + REF
                if (pessoa['DOSE_2_COV'] != null && pessoa['DOSE_REF'] != null) {
                  MToma++;
                  if (document.querySelector("#CheckCurados").value == 1 && pessoa['EVOLUCAO'] == 1) curados++;
                  if (document.querySelector("#CheckMortos").value == 1 && pessoa['EVOLUCAO'] == 2) morreu++;
                  if (document.querySelector("#CheckMortosOutro").value == 1 && pessoa['EVOLUCAO'] == 3) morreuDeOutro++;
                  if (document.querySelector("#CheckTaola").value == 1 && (pessoa['EVOLUCAO'] == null || pessoa['EVOLUCAO'] == 9)) taLa++;
                }
                break;

              case 10: // Dose2 + 2REF
                if (pessoa['DOSE_2_COV'] != null && pessoa['DOSE_2REF'] != null) {
                  MToma++;
                  if (document.querySelector("#CheckCurados").value == 1 && pessoa['EVOLUCAO'] == 1) curados++;
                  if (document.querySelector("#CheckMortos").value == 1 && pessoa['EVOLUCAO'] == 2) morreu++;
                  if (document.querySelector("#CheckMortosOutro").value == 1 && pessoa['EVOLUCAO'] == 3) morreuDeOutro++;
                  if (document.querySelector("#CheckTaola").value == 1 && (pessoa['EVOLUCAO'] == null || pessoa['EVOLUCAO'] == 9)) taLa++;
                }
                break;

              case 12: // REF + 2REF
                if (pessoa['DOSE_REF'] != null && pessoa['DOSE_2REF'] != null) {
                  MToma++;
                  if (document.querySelector("#CheckCurados").value == 1 && pessoa['EVOLUCAO'] == 1) curados++;
                  if (document.querySelector("#CheckMortos").value == 1 && pessoa['EVOLUCAO'] == 2) morreu++;
                  if (document.querySelector("#CheckMortosOutro").value == 1 && pessoa['EVOLUCAO'] == 3) morreuDeOutro++;
                  if (document.querySelector("#CheckTaola").value == 1 && (pessoa['EVOLUCAO'] == null || pessoa['EVOLUCAO'] == 9)) taLa++;
                }
                break;

              case 7: // Dose1 + Dose2 + REF
                if (pessoa['DOSE_1_COV'] != null && pessoa['DOSE_2_COV'] != null && pessoa['DOSE_REF'] != null) {
                  MToma++;
                  if (document.querySelector("#CheckCurados").value == 1 && pessoa['EVOLUCAO'] == 1) curados++;
                  if (document.querySelector("#CheckMortos").value == 1 && pessoa['EVOLUCAO'] == 2) morreu++;
                  if (document.querySelector("#CheckMortosOutro").value == 1 && pessoa['EVOLUCAO'] == 3) morreuDeOutro++;
                  if (document.querySelector("#CheckTaola").value == 1 && (pessoa['EVOLUCAO'] == null || pessoa['EVOLUCAO'] == 9)) taLa++;
                }
                break;

              case 11: // Dose1 + Dose2 + 2REF
                if (pessoa['DOSE_1_COV'] != null && pessoa['DOSE_2_COV'] != null && pessoa['DOSE_2REF'] != null) {
                  MToma++;
                  if (document.querySelector("#CheckCurados").value == 1 && pessoa['EVOLUCAO'] == 1) curados++;
                  if (document.querySelector("#CheckMortos").value == 1 && pessoa['EVOLUCAO'] == 2) morreu++;
                  if (document.querySelector("#CheckMortosOutro").value == 1 && pessoa['EVOLUCAO'] == 3) morreuDeOutro++;
                  if (document.querySelector("#CheckTaola").value == 1 && (pessoa['EVOLUCAO'] == null || pessoa['EVOLUCAO'] == 9)) taLa++;
                }
                break;

              case 13: // Dose1 + REF + 2REF
                if (pessoa['DOSE_1_COV'] != null && pessoa['DOSE_REF'] != null && pessoa['DOSE_2REF'] != null) {
                  MToma++;
                  if (document.querySelector("#CheckCurados").value == 1 && pessoa['EVOLUCAO'] == 1) curados++;
                  if (document.querySelector("#CheckMortos").value == 1 && pessoa['EVOLUCAO'] == 2) morreu++;
                  if (document.querySelector("#CheckMortosOutro").value == 1 && pessoa['EVOLUCAO'] == 3) morreuDeOutro++;
                  if (document.querySelector("#CheckTaola").value == 1 && (pessoa['EVOLUCAO'] == null || pessoa['EVOLUCAO'] == 9)) taLa++;
                }
                break;

              case 14: // Dose2 + REF + 2REF
                if (pessoa['DOSE_2_COV'] != null && pessoa['DOSE_REF'] != null && pessoa['DOSE_2REF'] != null) {
                  MToma++;
                  if (document.querySelector("#CheckCurados").value == 1 && pessoa['EVOLUCAO'] == 1) curados++;
                  if (document.querySelector("#CheckMortos").value == 1 && pessoa['EVOLUCAO'] == 2) morreu++;
                  if (document.querySelector("#CheckMortosOutro").value == 1 && pessoa['EVOLUCAO'] == 3) morreuDeOutro++;
                  if (document.querySelector("#CheckTaola").value == 1 && (pessoa['EVOLUCAO'] == null || pessoa['EVOLUCAO'] == 9)) taLa++;
                }
                break;

              case 15: // Todas as doses
                if (pessoa['DOSE_1_COV'] != null && pessoa['DOSE_2_COV'] != null && pessoa['DOSE_REF'] != null && pessoa['DOSE_2REF'] != null) {
                  MToma++;
                  if (document.querySelector("#CheckCurados").value == 1 && pessoa['EVOLUCAO'] == 1) curados++;
                  if (document.querySelector("#CheckMortos").value == 1 && pessoa['EVOLUCAO'] == 2) morreu++;
                  if (document.querySelector("#CheckMortosOutro").value == 1 && pessoa['EVOLUCAO'] == 3) morreuDeOutro++;
                  if (document.querySelector("#CheckTaola").value == 1 && (pessoa['EVOLUCAO'] == null || pessoa['EVOLUCAO'] == 9)) taLa++;
                }
                break;
            }
          } else {
            if(document.querySelector("#CheckVacina").value == 0) {
              if(document.querySelector("#CheckCurados").value == 1 && pessoa['EVOLUCAO'] == 1) curados++;
              if(document.querySelector("#CheckMortos").value == 1 && pessoa['EVOLUCAO'] == 2) morreu++;
              if(document.querySelector("#CheckMortosOutro").value == 1 && pessoa['EVOLUCAO'] == 3) morreuDeOutro++;
              if(document.querySelector("#CheckTaola").value == 1 && (pessoa['EVOLUCAO'] == null || pessoa['EVOLUCAO'] == 9)) taLa++;
            }
          }
        } else {
          if((document.querySelector("#CheckCovidSRAG").value == 1 && document.querySelector("#CheckOutrosSRAG").value == 1) || (document.querySelector("#CheckCovidSRAG").value == 0 && document.querySelector("#CheckOutrosSRAG").value == 0)) {
            if (document.querySelector("#CheckVacina").value == 1 && pessoa['VACINA_COV'] == 1) {
              switch (VerficaPermissaoVacina()) { 
                case 0:
                  MToma++;
                  if (document.querySelector("#CheckCurados").value == 1 && pessoa['EVOLUCAO'] == 1) curados++;
                  if (document.querySelector("#CheckMortos").value == 1 && pessoa['EVOLUCAO'] == 2) morreu++;
                  if (document.querySelector("#CheckMortosOutro").value == 1 && pessoa['EVOLUCAO'] == 3) morreuDeOutro++;
                  if (document.querySelector("#CheckTaola").value == 1 && (pessoa['EVOLUCAO'] == null || pessoa['EVOLUCAO'] == 9)) taLa++;
                  break;

                case 1: // Dose 1
                  if (pessoa['DOSE_1_COV'] != null) {
                    MToma++;
                    if (document.querySelector("#CheckCurados").value == 1 && pessoa['EVOLUCAO'] == 1) curados++;
                    if (document.querySelector("#CheckMortos").value == 1 && pessoa['EVOLUCAO'] == 2) morreu++;
                    if (document.querySelector("#CheckMortosOutro").value == 1 && pessoa['EVOLUCAO'] == 3) morreuDeOutro++;
                    if (document.querySelector("#CheckTaola").value == 1 && (pessoa['EVOLUCAO'] == null || pessoa['EVOLUCAO'] == 9)) taLa++;
                  }
                  break;

                case 2: // Dose 2
                  if (pessoa['DOSE_2_COV'] != null) {
                    MToma++;
                    if (document.querySelector("#CheckCurados").value == 1 && pessoa['EVOLUCAO'] == 1) curados++;
                    if (document.querySelector("#CheckMortos").value == 1 && pessoa['EVOLUCAO'] == 2) morreu++;
                    if (document.querySelector("#CheckMortosOutro").value == 1 && pessoa['EVOLUCAO'] == 3) morreuDeOutro++;
                    if (document.querySelector("#CheckTaola").value == 1 && (pessoa['EVOLUCAO'] == null || pessoa['EVOLUCAO'] == 9)) taLa++;
                  }
                  break;

                case 4: // REF
                  if (pessoa['DOSE_REF'] != null) {
                    MToma++;
                    if (document.querySelector("#CheckCurados").value == 1 && pessoa['EVOLUCAO'] == 1) curados++;
                    if (document.querySelector("#CheckMortos").value == 1 && pessoa['EVOLUCAO'] == 2) morreu++;
                    if (document.querySelector("#CheckMortosOutro").value == 1 && pessoa['EVOLUCAO'] == 3) morreuDeOutro++;
                    if (document.querySelector("#CheckTaola").value == 1 && (pessoa['EVOLUCAO'] == null || pessoa['EVOLUCAO'] == 9)) taLa++;
                  }
                  break;

                case 8: // 2REF
                  if (pessoa['DOSE_2REF'] != null) {
                    MToma++;
                    if (document.querySelector("#CheckCurados").value == 1 && pessoa['EVOLUCAO'] == 1) curados++;
                    if (document.querySelector("#CheckMortos").value == 1 && pessoa['EVOLUCAO'] == 2) morreu++;
                    if (document.querySelector("#CheckMortosOutro").value == 1 && pessoa['EVOLUCAO'] == 3) morreuDeOutro++;
                    if (document.querySelector("#CheckTaola").value == 1 && (pessoa['EVOLUCAO'] == null || pessoa['EVOLUCAO'] == 9)) taLa++;
                  }
                  break;

                case 3: // Dose1 + Dose2
                  if (pessoa['DOSE_1_COV'] != null && pessoa['DOSE_2_COV'] != null) {
                    MToma++;
                    if (document.querySelector("#CheckCurados").value == 1 && pessoa['EVOLUCAO'] == 1) curados++;
                    if (document.querySelector("#CheckMortos").value == 1 && pessoa['EVOLUCAO'] == 2) morreu++;
                    if (document.querySelector("#CheckMortosOutro").value == 1 && pessoa['EVOLUCAO'] == 3) morreuDeOutro++;
                    if (document.querySelector("#CheckTaola").value == 1 && (pessoa['EVOLUCAO'] == null || pessoa['EVOLUCAO'] == 9)) taLa++;
                  }
                  break;

                case 5: // Dose1 + REF
                  if (pessoa['DOSE_1_COV'] != null && pessoa['DOSE_REF'] != null) {
                    MToma++;
                    if (document.querySelector("#CheckCurados").value == 1 && pessoa['EVOLUCAO'] == 1) curados++;
                    if (document.querySelector("#CheckMortos").value == 1 && pessoa['EVOLUCAO'] == 2) morreu++;
                    if (document.querySelector("#CheckMortosOutro").value == 1 && pessoa['EVOLUCAO'] == 3) morreuDeOutro++;
                    if (document.querySelector("#CheckTaola").value == 1 && (pessoa['EVOLUCAO'] == null || pessoa['EVOLUCAO'] == 9)) taLa++;
                  }
                  break;

                case 9: // Dose1 + 2REF
                  if (pessoa['DOSE_1_COV'] != null && pessoa['DOSE_2REF'] != null) {
                    MToma++;
                    if (document.querySelector("#CheckCurados").value == 1 && pessoa['EVOLUCAO'] == 1) curados++;
                    if (document.querySelector("#CheckMortos").value == 1 && pessoa['EVOLUCAO'] == 2) morreu++;
                    if (document.querySelector("#CheckMortosOutro").value == 1 && pessoa['EVOLUCAO'] == 3) morreuDeOutro++;
                    if (document.querySelector("#CheckTaola").value == 1 && (pessoa['EVOLUCAO'] == null || pessoa['EVOLUCAO'] == 9)) taLa++;
                  }
                  break;

                case 6: // Dose2 + REF
                  if (pessoa['DOSE_2_COV'] != null && pessoa['DOSE_REF'] != null) {
                    MToma++;
                    if (document.querySelector("#CheckCurados").value == 1 && pessoa['EVOLUCAO'] == 1) curados++;
                    if (document.querySelector("#CheckMortos").value == 1 && pessoa['EVOLUCAO'] == 2) morreu++;
                    if (document.querySelector("#CheckMortosOutro").value == 1 && pessoa['EVOLUCAO'] == 3) morreuDeOutro++;
                    if (document.querySelector("#CheckTaola").value == 1 && (pessoa['EVOLUCAO'] == null || pessoa['EVOLUCAO'] == 9)) taLa++;
                  }
                  break;

                case 10: // Dose2 + 2REF
                  if (pessoa['DOSE_2_COV'] != null && pessoa['DOSE_2REF'] != null) {
                    MToma++;
                    if (document.querySelector("#CheckCurados").value == 1 && pessoa['EVOLUCAO'] == 1) curados++;
                    if (document.querySelector("#CheckMortos").value == 1 && pessoa['EVOLUCAO'] == 2) morreu++;
                    if (document.querySelector("#CheckMortosOutro").value == 1 && pessoa['EVOLUCAO'] == 3) morreuDeOutro++;
                    if (document.querySelector("#CheckTaola").value == 1 && (pessoa['EVOLUCAO'] == null || pessoa['EVOLUCAO'] == 9)) taLa++;
                  }
                  break;

                case 12: // REF + 2REF
                  if (pessoa['DOSE_REF'] != null && pessoa['DOSE_2REF'] != null) {
                    MToma++;
                    if (document.querySelector("#CheckCurados").value == 1 && pessoa['EVOLUCAO'] == 1) curados++;
                    if (document.querySelector("#CheckMortos").value == 1 && pessoa['EVOLUCAO'] == 2) morreu++;
                    if (document.querySelector("#CheckMortosOutro").value == 1 && pessoa['EVOLUCAO'] == 3) morreuDeOutro++;
                    if (document.querySelector("#CheckTaola").value == 1 && (pessoa['EVOLUCAO'] == null || pessoa['EVOLUCAO'] == 9)) taLa++;
                  }
                  break;

                case 7: // Dose1 + Dose2 + REF
                  if (pessoa['DOSE_1_COV'] != null && pessoa['DOSE_2_COV'] != null && pessoa['DOSE_REF'] != null) {
                    MToma++;
                    if (document.querySelector("#CheckCurados").value == 1 && pessoa['EVOLUCAO'] == 1) curados++;
                    if (document.querySelector("#CheckMortos").value == 1 && pessoa['EVOLUCAO'] == 2) morreu++;
                    if (document.querySelector("#CheckMortosOutro").value == 1 && pessoa['EVOLUCAO'] == 3) morreuDeOutro++;
                    if (document.querySelector("#CheckTaola").value == 1 && (pessoa['EVOLUCAO'] == null || pessoa['EVOLUCAO'] == 9)) taLa++;
                  }
                  break;

                case 11: // Dose1 + Dose2 + 2REF
                  if (pessoa['DOSE_1_COV'] != null && pessoa['DOSE_2_COV'] != null && pessoa['DOSE_2REF'] != null) {
                    MToma++;
                    if (document.querySelector("#CheckCurados").value == 1 && pessoa['EVOLUCAO'] == 1) curados++;
                    if (document.querySelector("#CheckMortos").value == 1 && pessoa['EVOLUCAO'] == 2) morreu++;
                    if (document.querySelector("#CheckMortosOutro").value == 1 && pessoa['EVOLUCAO'] == 3) morreuDeOutro++;
                    if (document.querySelector("#CheckTaola").value == 1 && (pessoa['EVOLUCAO'] == null || pessoa['EVOLUCAO'] == 9)) taLa++;
                  }
                  break;

                case 13: // Dose1 + REF + 2REF
                  if (pessoa['DOSE_1_COV'] != null && pessoa['DOSE_REF'] != null && pessoa['DOSE_2REF'] != null) {
                    MToma++;
                    if (document.querySelector("#CheckCurados").value == 1 && pessoa['EVOLUCAO'] == 1) curados++;
                    if (document.querySelector("#CheckMortos").value == 1 && pessoa['EVOLUCAO'] == 2) morreu++;
                    if (document.querySelector("#CheckMortosOutro").value == 1 && pessoa['EVOLUCAO'] == 3) morreuDeOutro++;
                    if (document.querySelector("#CheckTaola").value == 1 && (pessoa['EVOLUCAO'] == null || pessoa['EVOLUCAO'] == 9)) taLa++;
                  }
                  break;

                case 14: // Dose2 + REF + 2REF
                  if (pessoa['DOSE_2_COV'] != null && pessoa['DOSE_REF'] != null && pessoa['DOSE_2REF'] != null) {
                    MToma++;
                    if (document.querySelector("#CheckCurados").value == 1 && pessoa['EVOLUCAO'] == 1) curados++;
                    if (document.querySelector("#CheckMortos").value == 1 && pessoa['EVOLUCAO'] == 2) morreu++;
                    if (document.querySelector("#CheckMortosOutro").value == 1 && pessoa['EVOLUCAO'] == 3) morreuDeOutro++;
                    if (document.querySelector("#CheckTaola").value == 1 && (pessoa['EVOLUCAO'] == null || pessoa['EVOLUCAO'] == 9)) taLa++;
                  }
                  break;

                case 15: // Todas as doses
                  if (pessoa['DOSE_1_COV'] != null && pessoa['DOSE_2_COV'] != null && pessoa['DOSE_REF'] != null && pessoa['DOSE_2REF'] != null) {
                    MToma++;
                    if (document.querySelector("#CheckCurados").value == 1 && pessoa['EVOLUCAO'] == 1) curados++;
                    if (document.querySelector("#CheckMortos").value == 1 && pessoa['EVOLUCAO'] == 2) morreu++;
                    if (document.querySelector("#CheckMortosOutro").value == 1 && pessoa['EVOLUCAO'] == 3) morreuDeOutro++;
                    if (document.querySelector("#CheckTaola").value == 1 && (pessoa['EVOLUCAO'] == null || pessoa['EVOLUCAO'] == 9)) taLa++;
                  }
                  break;
              }
            } else {
              if(document.querySelector("#CheckVacina").value == 0) {
                if(document.querySelector("#CheckCurados").value == 1 && pessoa['EVOLUCAO'] == 1) curados++;
                if(document.querySelector("#CheckMortos").value == 1 && pessoa['EVOLUCAO'] == 2) morreu++;
                if(document.querySelector("#CheckMortosOutro").value == 1 && pessoa['EVOLUCAO'] == 3) morreuDeOutro++;
                if(document.querySelector("#CheckTaola").value == 1 && (pessoa['EVOLUCAO'] == null || pessoa['EVOLUCAO'] == 9)) taLa++;
              }
            }
          }
        }
      }
      Fpessoas++;
    }
  });

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
const femCondDiv = document.getElementById("pieCondFemi").closest(".chart-card");
const femVacDiv = document.getElementById("pieVacinaFemi").closest(".chart-card");

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
const mascCondDiv = document.getElementById("pieCondMasc").closest(".chart-card");
const mascVacDiv = document.getElementById("pieVacinaMasc").closest(".chart-card");

mascCondDiv.style.display = mascChecked ? "flex" : "none";
mascVacDiv.style.display = (mascChecked && vacinaChecked) ? "flex" : "none";

if (mascChecked) {
  criarPizza("pieCondMasc", ["Curados", "Mortos", "Outras causas", "Tão lá"], [curados, morreu, morreuDeOutro, taLa]);
}
if (mascChecked && vacinaChecked) {
  criarPizza("pieVacinaMasc", ["Tomou", "Não tomou"], [MToma, Mpessoas - MToma]);
}



  console.log("FToma =" + tomou)
  console.log("Morreu: " + morreu);
  console.log("Morreu de outro: " + morreuDeOutro);
  console.log("Curado: " + curados);
  console.log("Tá lá: " + taLa);
})
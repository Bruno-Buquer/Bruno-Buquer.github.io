const addBtn = document.querySelector(".btn")

const categoryList = [{name:"Lazer", type:"despesa"},
    {name:"Alimentação", type:"despesa"},
                        {name:"Estudos", type:"despesa"}, 
                        {name:"Pessoais", type:"despesa"}, 
                        {name:"Saúde", type:"despesa"}, 
                        {name: "Pet", type:"despesa"},
                        {name: "Família", type:"despesa"},
                        {name: "Outros", type:"despesa"},
                        {name: "Salário", type:"receita"},
                        {name: "Bolsa", type:"receita"},
                        {name: "Mesada", type:"receita"},
                        {name: "Auxílio", type:"receita"}]

const getTypeTransactionByName = (transaction,list) => {
    transaction = transaction.toLowerCase()
    const category = (list.find(elem => elem.name.toLowerCase() == transaction))
    return category.type
}

// carregar as categorias na página...
const loadCategory = (lista, seletor) => {
    // carregando o datalist 
    document.querySelector(seletor).innerHTML = lista.reduce(
        (acum, elem)=> acum + `<option value="${elem.name}">`, "")
}

loadCategory(categoryList, "#category-list")

const localStorageTransactions = JSON.parse(localStorage.getItem('transactions'))

let transactions = localStorage.getItem('transactions') !== null ? localStorageTransactions : []

const addToTransactionsArray = (TransactionID, TransactionName, TransactionAmount, TransactionCategoryName, TransactionCategoryType) => {
    transactions.push({
        id: TransactionID,
        name: TransactionName,
        amount: TransactionAmount,
        category: {
            name: TransactionCategoryName,
            type: TransactionCategoryType
        }
    })
}

const removeTransaction = ID => {
    transactions = transactions.filter(transaction => transaction.id !== ID)
    updateLocalStorage()
    document.querySelector("#transactions").innerHTML = "";
    init()
}

const getFormValues = () => {
    //dados da nova entrada
    const transactionName = document.querySelector("#transaction-name").value
    const transactionAmount = parseFloat(document.querySelector("#amount").value)
    //categoria da nova entrada
    const categoryName = document.querySelector("#category").value
    const categoryType = getTypeTransactionByName(categoryName,categoryList)

    /*
    //valor total 
    let total = document.querySelector("#balance").textContent
    total = parseFloat(total.substring(3,total.length))
    
    // Identificar o valor da despesa/receita
    total = (categoryType=="receita")? amount + total : total - amount
    */

    return {
        id: Math.round(Math.random() * 1000),
        name:transactionName,
        amount: transactionAmount,
        category: {
            name:categoryName, 
            type: categoryType
        }
    }
}

const getBalanceValues = () => {

    let transactionsAmountsPositive = transactions.filter(function(transaction) {
        return transaction.category.type === "receita";
    });

    let transactionsAmountsNegative = transactions.filter(function(transaction) {
        return transaction.category.type === "despesa";
    });
   
    let ValorPositivo = transactionsAmountsPositive.reduce((accumulator, transaction) => accumulator + transaction.amount, 0);
    let ValorNegativo = transactionsAmountsNegative.reduce((accumulator, transaction) => accumulator + transaction.amount, 0);
    let Valortotal = ValorPositivo - ValorNegativo;

    return {
        total: Valortotal,
        receita: ValorPositivo,
        despesa: ValorNegativo
    }
}

/**
 * Converts a currency to number type
 * @param {currency} value 
 * @returns {Number} value 
 */

const currencyToNumber = value => parseFloat(("" + value).substring(4,value.length))

/**
 * Converts a string to currency type
 * @param {String} value 
 * @returns currency+++
 */
const stringToCurrency = value => `R$ ${value.toFixed(2)}`

const clearForm = () => {
    document.querySelector("#transaction-name").value = ""
    document.querySelector("#amount").value = ""
    document.querySelector("#category").value = ""
}

const updateLocalStorage = () => {
    localStorage.setItem('transactions', JSON.stringify(transactions))
}

const updateBalance = () => {
    const balanceValues = getBalanceValues();
    document.querySelector("#balance").textContent = stringToCurrency(balanceValues.total);

    //adicionar a transacao em despesa (#money-minus) ou receita (#money-plus)
    //se for receita
      // soma o valor ao #money-plus
        document.querySelector("#money-plus").textContent = stringToCurrency(balanceValues.receita);
        document.querySelector("#money-minus").textContent = stringToCurrency(balanceValues.despesa);
}

const addTranscationIntoDOM = (transaction) => {
    updateBalance();
    //adicionar a transação na lista #transactions
        const ulTransaction = document.querySelector(".transactions");
        const transactionClass = (transaction.category.type=="receita")?"plus": "minus";
        const operator = (transaction.category.type=="receita")?"+": "-";

        ulTransaction.innerHTML += 
            `<li class="${transactionClass}" id="${transaction.id}">
                ${transaction.name} <span>${operator}${stringToCurrency(transaction.amount)}</span>
                <button class="delete-btn" onClick="removeTransaction(${transaction.id})">x</button>
            </li>`;
}

const loadBalance = () => {
    //a. Recuperar os valores digitados
    const formData = getFormValues()
    addToTransactionsArray(formData.id,formData.name, formData.amount, formData.category.name, formData.category.type);
    //atualizar o DOM
    addTranscationIntoDOM(formData);
    updateBalance();
    // salvar as transações no localStorage
    updateLocalStorage()

    //Limpar o formulário
    clearForm()
}

const init = () => {
    console.log(transactions)
    transactions.forEach(function(transaction){
        addTranscationIntoDOM(transaction);
    })
    updateBalance();

}

init()

addBtn.addEventListener("click", () => {
    loadBalance();
})
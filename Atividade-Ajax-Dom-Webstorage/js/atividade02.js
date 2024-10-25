//função construtora de objetos Produto
var Produto = function(id, nome, categoria, img, valorUnitario, quantidade){
    this.id = id;
    this.nome = nome;
    this.categoria = categoria;
    this.foto = img;
    this.valorUnitario = valorUnitario;
    this.quantidade = quantidade;
}

const pesquisaPorId = (vetor, objId) => vetor.find(item => item.id == objId)

// carregamento de cardápio de exemplo
var cardapio = [new Produto(1, "Capuccino", "Bebidas Quentes", "https://rafaelescalfoni.github.io/desenv_web/img/capuccino.png",7,1)
			, new Produto(2, "Espresso", "Bebidas Quentes", "https://rafaelescalfoni.github.io/desenv_web/img/espresso.png",4,1)
			, new Produto(3, "Frapuccino", "Bebidas Quentes", "https://rafaelescalfoni.github.io/desenv_web/img/frapuccino.png",8,1)
			, new Produto(4, "Chococcino", "Bebidas Quentes", "https://rafaelescalfoni.github.io/desenv_web/img/chococcino.png",7,1)
			, new Produto(5, "Chocolate Quente", "Bebidas Quentes", "https://rafaelescalfoni.github.io/desenv_web/img/chocolate_quente.png",10,1)
			, new Produto(6, "Frapê", "Bebidas Frias", "https://rafaelescalfoni.github.io/desenv_web/img/frape.png",12,1)
			, new Produto(7, "Suco de Laranja", "Bebidas Frias", "https://rafaelescalfoni.github.io/desenv_web/img/suco_laranja.png",10,1)
            , new Produto(8, "Açaí", "Doces", "https://rafaelescalfoni.github.io/desenv_web/img/acai.png",12,1)
            , new Produto(9, "Bolo de Laranja", "Doces", "https://rafaelescalfoni.github.io/desenv_web/img/bolo_laranja.png",8,1)];
		

const carregarCardapio = (lista,id) => {
    const listaObj = document.querySelector(id)
    lista.forEach(produto => {
        listaObj.innerHTML += `<li id="${produto.id}"><figure>
                                    <img src="${produto.foto}" alt="${produto.nome}">
                                    <figcaption>
                                        ${produto.nome} - R$ <strong>${produto.valorUnitario},00</strong>
                                    </figcaption>
                                    </figure>
                                </li>`
    }); 
}

const carregarPedido = (lista,id) => {
    const listaObj = document.querySelector(id)
    lista.forEach(produto => {
        listaObj.innerHTML += `<li id="${produto.id}"><figure>
                                    <p>Quantidade:${produto.quantidade}</p>
                                    <img src="${produto.foto}" alt="${produto.nome}">
                                    <figcaption>
                                        ${produto.nome} - R$ <strong>${produto.valorUnitario * produto.quantidade},00</strong>
                                    </figcaption>
                                    </figure>
                                </li>`
    }); 
}

function apagarPedidos (id) {
    const ulPedido = document.querySelector(id);
    ulPedido.innerHTML = "";    
}

function calculaTotal (lista) {
    const Totaltela = document.querySelector("#valorTotal");
    let total = 0;
    lista.forEach(function(produto) {
        total = total + (produto.quantidade * produto.valorUnitario);
    })

    Totaltela.innerHTML = `Total - R$${total},00`
}

carregarCardapio(cardapio,"#cardapio")

let cestaCompras = [];

const updateLocalStorage = () => {
    cardapio.forEach(function(produto) {
        let pedido = JSON.parse(localStorage.getItem(produto.id))
        if(pedido) {
            produto.quantidade = pedido.quantidade;
            cestaCompras.push(produto)
        }
    })
}
console.log(cestaCompras);
updateLocalStorage();

carregarPedido(cestaCompras,"#pedidos")
calculaTotal(cestaCompras)

const item = document.querySelector("#cardapio")

item.addEventListener("click", function(ev){
    // ev PointerEvent => ponteiro para o evento
    if(ev.target.nodeName == "IMG" ||
        ev.target.nodeName == "FIGCAPTION") {
            let produto = pesquisaPorId(cardapio, ev.target.parentNode.parentNode.id)
            let temProdutoNaCesta = cestaCompras.some (function (item) {
                return item === produto
            })
            
            if(!(temProdutoNaCesta)){
                cestaCompras.push(produto)
            }
            else {
                produto.quantidade++;
                // let pedido = JSON.parse(localStorage.getItem(produto.id))
                // console.log(pedido)
            }
            let pedidoInfo = {nome: produto.nome, quantidade: produto.quantidade}
            localStorage.setItem(produto.id, JSON.stringify(pedidoInfo))
            apagarPedidos("#pedidos");
            carregarPedido(cestaCompras,"#pedidos")
            calculaTotal(cestaCompras)
    }
})

// const localStorageTransactions = JSON.parse(localStorage.getItem('transactions'))

// let transactions = localStorage.getItem('transactions') !== null ? localStorageTransactions : []

// const updateLocalStorage = () => {
//     localStorage.setItem('transactions', JSON.stringify(transactions))
// }
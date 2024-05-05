const produtos = [
    { nome: 'Laptop', preco: 1000, quantidade: 5 },
    { nome: 'Mouse', preco: 20, quantidade: 10 },
    { nome: 'Teclado', preco: 30, quantidade: 8 }
   ];
   function calcularValorTotalEstoque(produtos) {
    let valorTotal = 0;
    for(let i = 0; i < 3; i++) {
        let precoTotal = produtos[i].preco * produtos[i].quantidade;
        valorTotal = valorTotal + precoTotal;
    }
    return valorTotal;
   }
   const valorTotal = calcularValorTotalEstoque(produtos);
   console.log('Valor total do estoque:', valorTotal);
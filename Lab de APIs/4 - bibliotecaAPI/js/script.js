const tabelaLivros = document.querySelector("#books")
const bntDisponivel = document.querySelector("#bntDisponivel");
const bntEmprestimo = document.querySelector("#bntEmprestimo");
const bntAdicionar = document.querySelector("#add-button");
const bntEmprestar = document.querySelector("#emp-button");

const localStorageBooks = JSON.parse(localStorage.getItem('livros')) !== null ? JSON.parse(localStorage.getItem('livros')) : [];
console.log(localStorageBooks)

let livros = [];

/* Criação do Livro */
class Livro {
    constructor (nome, autor, disponivel, emprestimo) {
        this.nome = nome;
        this.autor = autor;
        this.disponivel = disponivel;
        this.emprestimo = emprestimo;
    }
    
    atualizarDisponibilidade() {
        this.disponivel = this.disponivel == true ? false : true;
    }

    atualizarEmprestimos() {
        this.emprestimo++;
    }
}

/* Ações do livro */
function AdicionarLivro (nome, autor, disponivel, emprestimo) {
    let jaTem = false;
    livros.forEach(element => {
        if (element.nome == nome && element.autor == autor) {
            jaTem = true
        }
    })
    if (!jaTem) {
        let livrito = new Livro (nome, autor, disponivel, emprestimo);
        livros.push(livrito);
    }
    return jaTem;
}

function PegarEmprestado (nome, autor) {
    let livroExiste = false;
    livros.forEach(element => {
        if((element.nome == nome && element.autor == autor) && element.disponivel == true) {
            element.atualizarDisponibilidade();
            element.atualizarEmprestimos();
            console.log("achou")
            livroExiste = true;
        }
    });

    return livroExiste;
}

/* Organização do livro */
function arrayLivrosDisponiveis (array) {
    return array.filter(element => {
        return element.disponivel == true;
    })
}

function arrayLivrosEmprestados (array) {
    let titulosEmprestados = array.filter(element => {
        return element.disponivel == false;
    })

    titulosEmprestados = titulosEmprestados.map(element => {
        return element.nome;
    })

    let lista = `
        <h2>Títulos Emprestados</h2>
        <div class="nomes-livros-emprestados">
            <hr>`
    titulosEmprestados.forEach(element => {
        lista += `<p>${element}</p><hr>`
    })

    lista += `</div>`
    tabelaLivros.innerHTML = lista;
}

/* Exibição do livro */
function ListarLivros (array) {
    let tabela = `
        <table>
            <thead>
                <tr>
                    <th>Nome</th>
                    <th>Autor</th>
                    <th>Disponibilidade</th>
                    <th>Número de vezes emprestado</th>
                </tr>
            </thead>
            <tbody>`;
    
    array.forEach(element => {
        tabela += `
            <tr>
                <td>${element.nome}</td>
                <td>${element.autor}</td>
                <td class="${element.disponivel == true ? "disponibilidade-pos" + "\">Diponível" : "disponibilidade-neg" + "\">Indiponível"}</td>
                <td>${element.emprestimo}</td>
            </tr>`;
    });
    
    tabela += `</tbody></table>`;

    tabelaLivros.innerHTML = tabela;
}

/* Salbar o livro */
function addLocalStorage () {
    localStorage.setItem('livros', JSON.stringify(livros));
}

/*Recuperar os livros salvos */
function recuperaLivros () {
    localStorageBooks.forEach(element => {
        AdicionarLivro(element.nome, element.autor, element.disponivel, element.emprestimo);
    })
}

recuperaLivros();

ListarLivros(livros);

bntAdicionar.addEventListener("click", () => {
    let nomeDigitado = document.querySelector("#book-name").value;
    let autorDigitado = document.querySelector("#book-author").value;

    if(nomeDigitado == "" || autorDigitado == "") {
        alert("Preencha todos os campos!")
    } else {
        let jaTem = AdicionarLivro(nomeDigitado, autorDigitado, true, 0);

        if (!jaTem) {
            alert("Livro Adicionado com suecesso!")

            nomeDigitado.value = "";
            autorDigitado.value = "";
    
            addLocalStorage();
            ListarLivros(livros);
        } else {
            alert("Esse livro já foi cadastrado no sitema!")
        }
    }
});

bntEmprestar.addEventListener("click", () => {
    let nomeDigitado = document.querySelector("#book-name").value;
    let autorDigitado = document.querySelector("#book-author").value;

    if(nomeDigitado == "" || autorDigitado == "") {
        alert("Preencha todos os campos!")
    } else {
        let livroExiste = PegarEmprestado(nomeDigitado, autorDigitado);

        if(livroExiste) {

            alert("Livro emprestado com sucesso!")

            nomeDigitado.value = "";
            autorDigitado.value = "";

            addLocalStorage();
            ListarLivros(livros);

        } else {
            alert("Esse livro não existe ou já foi alugado, verifique a escrita...")
        }
    }

    ListarLivros(livros)
});

bntDisponivel.addEventListener("click", () => {
    let LivrosDisponiveis = arrayLivrosDisponiveis(livros);
    ListarLivros(LivrosDisponiveis);
});

bntEmprestimo.addEventListener("click", () => {
    arrayLivrosEmprestados(livros);
});
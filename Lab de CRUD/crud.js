const TituloDigitado = document.querySelector("#titulo");
const AutorDigitado = document.querySelector("#autor");
const AnoDigitado = document.querySelector("#ano");

const IdDigitadoAtt = document.querySelector("#ID");
const TituloDigitadoAtt = document.querySelector("#titulo2");
const AutorDigitadoAtt = document.querySelector("#autor2");
const AnoDigitadoAtt = document.querySelector("#ano2");

const IdDigitadoDel = document.querySelector("#id3");

const botãoAdd = document.querySelector("#add");
const botãoAtt = document.querySelector("#att");
const botãoDel = document.querySelector("#del");

const resp = document.querySelector("#reps");

const localStorageBooks = JSON.parse(localStorage.getItem('books')) !== null ? JSON.parse(localStorage.getItem('books')) : [];

let idAtual = 0;
function gerarID () {
    idAtual++; 
    return idAtual;
}

class Biblioteca {
    constructor() {
        this.livros = [];
    }

    adicionarLivro (livro) {
        this.livros.push(livro);
    }

    listarLivros() {
        resp.innerHTML = "";
        this.livros.forEach((livro) => {
            resp.innerHTML += `<p>${livro.detalhes()}</P>`
        });
    }

    atualizarLivro (id, titulo, autor, anoPublicaco) {
        this.livros.map((livro) => {
            if(livro.id == id) {
                livro.titulo = titulo;
                livro.autor = autor;
                livro.anoPublicaco = anoPublicaco;
            }
        })
    }

    removerLivro (id) {
        this.livros = this.livros.filter((livro) => {
            return livro.id != id;
        })
    }

    salvarDados () {
        localStorage.setItem('books', JSON.stringify(this.livros));
    }

    carregarDados () {
        localStorageBooks.forEach(element => {
            this.adicionarLivro(new Livro(element.titulo, element.autor, element.anoPublicaco));
        })
    }
}

class Livro {
    constructor (titulo, autor, anoPublicaco) {
        this.id = gerarID();
        this.titulo = titulo;
        this.autor = autor;
        this.anoPublicaco = anoPublicaco;
        this.disponivel = true;
    }

    detalhes () {
        return `Livro ${this.titulo}, escrito por ${this.autor} em ${this.anoPublicaco}. Com o id ${this.id}, estando ${this.disponivel ? "disponivel" : "indisponivel"} para empréstimo`;
    }
}

function apagarInput () {
    TituloDigitado.value = "";
    AutorDigitado.value = "";
    AnoDigitado.value = "";
    IdDigitadoAtt.value = "";
    TituloDigitadoAtt.value = "";
    AutorDigitadoAtt.value = "";
    AnoDigitadoAtt.value = "";
    IdDigitadoDel.value = "";
}

const biblioteca = new Biblioteca();
biblioteca.carregarDados();
biblioteca.listarLivros();

botãoAdd.addEventListener("click", function () {
    alert("Livro Adicionado!")
    let livro = new Livro(TituloDigitado.value, AutorDigitado.value, AnoDigitado.value);
    biblioteca.adicionarLivro(livro);
    biblioteca.salvarDados();
    biblioteca.listarLivros();
    apagarInput();

    console.log(biblioteca.livros)
});

botãoAtt.addEventListener("click", function () {
    alert("Livro Atualizado!")
    biblioteca.atualizarLivro(IdDigitadoAtt.value, TituloDigitadoAtt.value, AutorDigitadoAtt.value, AnoDigitadoAtt.value);
    biblioteca.salvarDados();
    biblioteca.listarLivros();
    apagarInput();

    console.log(biblioteca.livros)
});

botãoDel.addEventListener("click", function () {
    alert("Livro Removido!")
    biblioteca.removerLivro(IdDigitadoDel.value)
    biblioteca.salvarDados();
    biblioteca.listarLivros();
    apagarInput();

    console.log(biblioteca.livros)
});
// let livro = new Livro("1984", "George Orwell", 1949);
// biblioteca.adicionarLivro(livro);
// biblioteca.listarLivros();
// biblioteca.atualizarLivro(1, "Xablau", "George Orwell", 1949)
// biblioteca.listarLivros();
// biblioteca.removerLivro(1);
// biblioteca.listarLivros();
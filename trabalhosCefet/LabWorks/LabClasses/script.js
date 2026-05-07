/* --------------------------------------------------------------------------------------------------------------------------- 
1. Classe Pessoa e Herança*/ console.log("--------------------------------------------------------------------------")

class Pessoa {
    constructor (nome, idade, sexo) {
        this.nome = nome;
        this.idade = idade;
        this.sexo = sexo;
    }

    apresentar () {
        return "Olá, meu nome é " + this.nome + ", tenho " + this.idade + " anos e sou " + this.sexo + "."
    }
}

const PessoaDeBem = new Pessoa("Escalfoni", 18, "homem");
console.log(PessoaDeBem.apresentar());

class Aluno extends Pessoa {
    constructor(nome, idade, sexo, matricula, curso) {
        super(nome, idade, sexo);
        this.matricula = matricula;
        this.curso = curso;
    }

    apresentar() {
        return "Olá, meu nome é " + this.nome + ", tenho " + this.idade + " anos e sou " + this.sexo + ". Dessa forma, eu possuo a matricula " + this.matricula + " e estou no curso " + this.curso + ".";
    }
}

const AlunoHumilde = new Aluno ("Bruno", 17, "homem", "40028922", "informática");
console.log(AlunoHumilde.apresentar());

/* --------------------------------------------------------------------------------------------------------------------------- 
2. Classe Conta bancaria*/ console.log("--------------------------------------------------------------------------")

class ContaBancaria {
    constructor (titular, saldo) {
        this.titular = titular;
        this.saldo = saldo;
    }

    depositar (valor) {
        this.saldo += valor;
    }

    sacar (valor) {
        if(this.saldo >= valor) {
            this.saldo -= valor;
        } else {
            console.log("ERRO: Não foi possivel sacar, pois você é pobre!");
        }
    }

    mostrarSaldo () {
        console.log(this.saldo);
    }
}

class ContaCorrente extends ContaBancaria {
    constructor (titular, saldo, limite) {
        super(titular, saldo);
        this.limite = limite;
    }

    sacar (valor) {
        if(this.limite >= valor) {
            this.saldo -= valor;
        } else {
            console.log("Você passou do seu limite!");
        }
    }
}

const ContaCorrenteAtual = new ContaCorrente ("Bruno", 20000, 1000);
console.log(ContaCorrenteAtual.limite)
ContaCorrenteAtual.mostrarSaldo();
ContaCorrenteAtual.sacar(200);
ContaCorrenteAtual.mostrarSaldo();
ContaCorrenteAtual.sacar(2000);
ContaCorrenteAtual.mostrarSaldo();

/* --------------------------------------------------------------------------------------------------------------------------- 
3. Sistema de Gerenciamento de Produtos*/ console.log("--------------------------------------------------------------------------")

class Produto {
    constructor (nome, preco, qtdEstoque) {
        this.nome = nome;
        this.preco = preco;
        this.qtdEstoque = qtdEstoque;
    }

    atualizarEstoque(quantidade) {
        this.qtdEstoque += quantidade;
    }

    calcularValorEstoque () {
        return this.preco * this.qtdEstoque;
    }
}

class ProdutoPerecivel extends Produto {
    constructor (nome, preco, qtdEstoque, dataDeValidade) {
        super (nome, preco, qtdEstoque);
        this.dataDeValidade = dataDeValidade
    }

    verificarValidade(dataAtual) {
        const validade = new Date(this.dataDeValidade);
        const atual = new Date(dataAtual);
        if (validade > atual) {
            return "O produto ainda está valido! Vencendo apenas em " + this.dataDeValidade; 
        } else {
            return "O produto já venceu! Eca, não pode consumir. Venceu em " + this.dataDeValidade; 
        }
    }
}

const ProdutoLegal = new Produto ("Arroz", 8.99, 1000);
console.log(ProdutoLegal.qtdEstoque);
ProdutoLegal.atualizarEstoque(200);
console.log(ProdutoLegal.qtdEstoque);
console.log(ProdutoLegal.calcularValorEstoque());

const ProdutoGelado = new ProdutoPerecivel ("Picolé", 2.50, 1000, "26/08/2021")
console.log(ProdutoGelado.verificarValidade("07/01/2025"));

/* --------------------------------------------------------------------------------------------------------------------------- 
4. Classe Veiculo */ console.log("--------------------------------------------------------------------------") 

class Veiculo {
    constructor (marca, modelo, ano) {
        this.marca = marca;
        this.modelo = modelo;
        this.ano = ano;
    }

    descrever () {
        return "Marca: " + this.marca + ", Modelo: " + this.modelo + ", Ano: " + this.ano;
    }
}

class Carro extends Veiculo {
    constructor (marca, modelo, ano, portas) {
        super (marca, modelo, ano);
        this.portas = portas;
    }

    descrever () {
        return "Marca: " + this.marca + ", Modelo: " + this.modelo + ", Ano: " + this.ano + ", Portas: " + this.portas;
    }
}

class Moto extends Veiculo {
    constructor (marca, modelo, ano, cilindradas) {
        super (marca, modelo, ano);
        this.cilindradas = cilindradas;
    }

    descrever () {
        return "Marca: " + this.marca + ", Modelo: " + this.modelo + ", Ano: " + this.ano + ", Cilindradas: " + this.cilindradas;
    }
}

const carroSimples = new Veiculo ("Volksvagem", "Rápido", 2001);
console.log(carroSimples.descrever());
const carroComplexo = new Carro ("Chevrolet", "Onix", 2019, 4);
console.log(carroComplexo.descrever());
const motoca = new Moto ("Yamaha", "Crosser 150", 2014, 150);
console.log(motoca.descrever());

/* --------------------------------------------------------------------------------------------------------------------------- 
5. Classe de Gerenciamento de Funcionários */ console.log("--------------------------------------------------------------------------")

class Funcionario {
    constructor (nome, salario) {
        this.nome = nome;
        this.salario = salario;
    }

    aumentarSalario (percentual) {
        let aumentoSalario = (this.salario * percentual)/100;
        this.salario += aumentoSalario;
    }

    mostrarInformações () {
        return "Nome: " + this.nome + ", tendo um salário de " + this.salario;
    }
}

class Gerente extends Funcionario {
    constructor (nome, salario, departamento) {
        super (nome, salario);
        this.departamento = departamento;
    }

    mostrarInformações () {
        return "Nome: " + this.nome + ", tendo um salário de " + this.salario + ". Gerente no departamento " + this.departamento;
    }
}

class Estagiario extends Funcionario {
    constructor (nome, salario) {
        super (nome, salario);
    }

    aumentarSalario (percentual) {
        let aumentoSalario = 0;
        if(percentual <= 10) {
            aumentoSalario = (this.salario * percentual)/100;
        } else {
            console.log("Aumento muito alto, limitando para 10%");
            aumentoSalario = (this.salario * 10)/100;
        }
        this.salario += aumentoSalario;
    }
}

const funcionarioSimples = new Funcionario("Alanzoka", 5000);
console.log(funcionarioSimples.mostrarInformações());
funcionarioSimples.aumentarSalario(15);
console.log(funcionarioSimples.mostrarInformações());

const gerente = new Gerente("Escalfoni", 15000, "Compras");
console.log(gerente.mostrarInformações());
gerente.aumentarSalario(20);
console.log(gerente.mostrarInformações());

const estagiado = new Estagiario("Bruno", 1500);
console.log(estagiado.mostrarInformações());
estagiado.aumentarSalario(12);
console.log(estagiado.mostrarInformações());

/* --------------------------------------------------------------------------------------------------------------------------- 
6. Sistema de Biblioteca */ console.log("--------------------------------------------------------------------------")

class Livro {
    constructor (titulo, autor) {
        this.titulo = titulo;
        this.autor = autor;
        this.disponivel = true;
    }
    
    emprestar() {
        this.disponivel = false;
    }

    devolver() {
        this.disponivel = true;
    }

    status() {
        return "O livro \"" + this.titulo + "\" está " + (this.disponivel == true ? "disponivel." : "emprestado."); 
    }
}

class Biblioteca {
    constructor() {
        this.livros = [];
    }

    adicionarLivro (livro) {
        this.livros.push(livro);
    }

    listarDisponiveis() {
        console.log("Livros disponíveis:");
        this.livros.forEach((livro) => {
            if (livro.disponivel) {
                console.log(" - Livro: " + livro.titulo + ", Autor: " + livro.autor);
            }
        });
    }

    buscarPorTitulo (titulo) {
        const livroEncontrado = this.livros.find((livro) => 
            livro.titulo == titulo
        );

        if (livroEncontrado) {
            console.log("Livro encontrado: Livro: " + livroEncontrado.titulo + ", Autor: " + livroEncontrado.autor);
            livroEncontrado.status();
        } else {
            console.log(`Livro com o título "${titulo}" não encontrado.`);
        }
    }
}

const book = new Livro ("1984", "George Orwell");
const book2 = new Livro("Hamlet", "William Shakespere");
const book3 = new Livro("Jujutsu Kaisen", "Gege Akutami");
book3.emprestar();

const biblioteca = new Biblioteca;
biblioteca.adicionarLivro(book);
biblioteca.adicionarLivro(book2);
biblioteca.adicionarLivro(book3);

biblioteca.listarDisponiveis();
biblioteca.buscarPorTitulo("Jujutsu Kaisen")

/* --------------------------------------------------------------------------------------------------------------------------- 
7. Classe Jogador para Jogos Online */ console.log("--------------------------------------------------------------------------")

class Jogador {
    constructor (nome, nivel, experiencia) {
        this.nome = nome;
        this.nivel = nivel;
        this.experiencia = experiencia;
    }

    ganharExperiencia (pontos) {
        this.experiencia += pontos;
    }

    subirDeNivel() {
        if(this.experiencia >= 100) {
            console.log(`Parabéns, ${this.nome} subiu de nível!`);
            this.nivel++;
            this.experiencia -= 100;
        } else {
            console.log(`${this.nome} ainda não tem experiencia para subir de nível...`);
        }
    }
}

class Guerreiro extends Jogador {
    constructor (nome, nivel, experiencia, forca) {
        super (nome, nivel, experiencia);
        this.forca = forca;
    }

    subirDeNivel() {
        if(this.experiencia >= 100) {
            console.log(`Parabéns, ${this.nome} subiu de nível!`);
            this.nivel++;
            this.forca++;
            this.experiencia -= 100;
        } else {
            console.log(`${this.nome} ainda não tem experiencia para subir de nível...`);
        }
    }
}

const nextage = new Jogador ("Alanzoka", 233, 98);
console.log(`${nextage.nome}, nível: ${nextage.nivel} e exp: ${nextage.experiencia}`);
nextage.ganharExperiencia(18);
nextage.subirDeNivel();
console.log(`${nextage.nome}, nível: ${nextage.nivel} e exp: ${nextage.experiencia}`);

const galagou = new Guerreiro ("Galaxy", 101, 38, 25);
console.log(`${galagou.nome}, com força ${galagou.forca}. Nível: ${galagou.nivel} e exp: ${galagou.experiencia}`);
galagou.ganharExperiencia(90);
galagou.subirDeNivel();
console.log(`${galagou.nome}, com força ${galagou.forca}. Nível: ${galagou.nivel} e exp: ${galagou.experiencia}`);

/* --------------------------------------------------------------------------------------------------------------------------- 
8. Classe Turma e Alunos */ console.log("--------------------------------------------------------------------------")

class Turma {
    constructor (curso) {
        this.curso = curso;
        this.alunos = [];
    }

    adicionarAluno (nome) {
        this.alunos.push(nome);
    }

    removerAluno (nome) {
        this.alunos = this.alunos.filter((aluno) => {
            return aluno != nome;
        })
    }

    listarAlunos () {
        console.log(`Alunos do curso ${this.curso}`)
        this.alunos.forEach (function(aluno) {
            console.log(` - Aluno: ${aluno}`)
        })
    }
}

class TurmaOnline extends Turma {
    constructor (curso, linkDeAcesso) {
        super (curso);
        this.linkDeAcesso = linkDeAcesso;
    }

    listarAlunos () {
        console.log(`Alunos do curso ${this.curso} - Link de acesso ${this.linkDeAcesso}`)
        this.alunos.forEach (function(aluno) {
            console.log(` - Aluno: ${aluno}`)
        })
    }
}

const turmaPresencial = new Turma("Matemática");
turmaPresencial.adicionarAluno("João Pedro");
turmaPresencial.adicionarAluno("Bruno Buquer");
turmaPresencial.listarAlunos();
turmaPresencial.removerAluno("João Pedro");
turmaPresencial.listarAlunos();

const turmaOnline = new TurmaOnline("Física", "AulasXablau.com/twitch.tv");
turmaOnline.adicionarAluno("Lucas");
turmaOnline.adicionarAluno("Gustavo");
turmaPresencial.removerAluno("João Pedro");
turmaOnline.listarAlunos();

/* --------------------------------------------------------------------------------------------------------------------------- 
9. Classe para Gerenciar Tarefas */ console.log("--------------------------------------------------------------------------")

class Tarefa {
    constructor (descricao) {
        this.descricao = descricao;
        this.concluida = false;
    }

    marcarConluida () {
        this.concluida = true
    }

    descrever () {
        console.log(`Status: ${this.concluida ? "Concluida!": "Inacabada"}.`)
        console.log(`Descrição: ${this.descricao}.`)
    }
}

class ListaDeTarefas {
    constructor () {
        this.tarefas = [];
    }

    adicionarTarefa (tarefa) {
        this.tarefas.push(tarefa);
    }

    listarDisponiveis() {
        console.log("Tarefas concluidas: ");
        this.tarefas.forEach((tarefa) => {
            if (tarefa.concluida) {
                tarefa.descrever();
            }
        });
    }
}

const tarefaChata = new Tarefa ("Regar as plantas");
const tarefaLegal = new Tarefa ("Fazer maldade");
tarefaLegal.marcarConluida();
tarefaLegal.descrever();
tarefaChata.descrever();

const lista = new ListaDeTarefas();
lista.adicionarTarefa(tarefaChata);
lista.adicionarTarefa(tarefaLegal);
lista.listarDisponiveis();

/* --------------------------------------------------------------------------------------------------------------------------- 
10. Classe para Controle de Estacionamento */ console.log("--------------------------------------------------------------------------")

class Carro10 {
    constructor (placa, modelo) {
        this.placa = placa;
        this.modelo = modelo;
    }

    descrever () {
        console.log(`Placa: ${this.placa}, Modelo: ${this.modelo}`);
    }
}

class Estacionamento {
    constructor (vagasTotais) {
        this.vagasTotais = vagasTotais;
        this.carros = [];
    }

    adicionarCarro (carro) {
        if(this.carros.length < this.vagasTotais) {
            console.log("Carro Estacionado!")
            this.carros.push(carro);
        } else {
            console.log("O estacionamento está cheio :(")
        }
        
    }

    removerCarro (placa) {
        this.carros = this.carros.filter((carro) => {
            return carro.placa != placa;
        })
    }

    listarCarros () {
        console.log(`Carros do estacionamento`)
        this.carros.forEach (function(carro) {
            carro.descrever();
        })
    }
}

const carroNovo = new Carro10 ("FLW5884", "Onix");
const carroNovo2 = new Carro10 ("HWDHW98", "Agile");
const xablau = new Estacionamento (2);

xablau.adicionarCarro(carroNovo);
xablau.adicionarCarro(carroNovo2);

xablau.listarCarros();
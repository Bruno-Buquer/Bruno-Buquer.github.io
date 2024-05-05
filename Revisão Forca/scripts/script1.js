const lerConteudo = seletor => document.querySelector(seletor).value

/**
 * Função que permite criar elementos HTML
 * @param {*} tagName - o nome do elemento HTML a ser criado
 * @returns void
 */

const criarElemHTML = (tagName, seletorElemPai, conteudoTextual) => {
    const obj = document.createElement(tagName) //cria o elemento
    document.querySelector(seletorElemPai).appendChild(obj) //joga na arvore dom
    obj.textContent = conteudoTextual //adiciona texto nele
}

const botao = document.querySelector("#adicionar")

botao.addEventListener("click", function(){
    const entrada = lerConteudo("#tarefa")// pegar o conteudo textual do input
    //criarElemHTML("li", "#lista-tarefas", entrada) //criar um elemento HMTL
    //se valor digitado no input for vazio, sair da função
    if (entrada) { // "" == false
        //criar o li
        const objLI = document.createElement("li")
        const objP = document.createElement("span")
        // adicionar o texto no li
        objP.textContent = entrada
        objLI.appendChild(objP)
        //criar um link (a)
        const objA = document.createElement("a")
        // adicionar o texto do a
        objA.textContent = "X"
        objA.href = "#"
    
        objLI.appendChild(objA)
        // adicionar na lista
        
        document.querySelector("#lista-tarefas").appendChild(objLI)
       
        document.querySelector("#tarefa").value = "" // apagar o conteúdo textual do input
    }
})

const listaDeLinks = document.querySelector("#lista-tarefas")

listaDeLinks.addEventListener("click", function (evento) {
    console.log(evento)
    if (evento.target.nodeName == "A") {
        alert("Removendo tarefa")
        evento.target.parentElement.remove() // remover o pai (li)
    }
    if (evento.target.nodeName == "SPAN") {
        alert("DALE, GENTE!")
        evento.target.style.color = "red";
    }
})

//DADOS

const proffys = [//cada professor é um objeto, por causa das "{}", dentro de uma lista de objetos, por causa dos "[]", chamada proffys
    {
        name: "Diego Fernandes", 
        avatar: "https://avatars2.githubusercontent.com/u/2254731?s=460&amp;u=0ba16a79456c2f250e7579cb388fa18c5c2d7d65&amp;v=4", 
        whatsapp: "981283274", bio: "Entusiasta das melhores tecnologias de química avançada.<br><br>Apaixonado por explodir coisas em laboratório e por mudar a vida das pessoas através de experiências. Mais de 200.000 pessoas já passaram por uma das minhas explosões.", 
        subject: "Química", 
        cost: "20,00", 
        weekday: [
            0
        ], time_from: [720],
        time_to: [1220]
    },

    {
        name: "Danielle Evangelista", 
        avatar: "https://avatars2.githubusercontent.com/u/2254731?s=460&amp;u=0ba16a79456c2f250e7579cb388fa18c5c2d7d65&amp;v=4", 
        whatsapp: "981283274", bio: "Entusiasta das melhores tecnologias de química avançada.<br><br>Apaixonado por explodir coisas em laboratório e por mudar a vida das pessoas através de experiências. Mais de 200.000 pessoas já passaram por uma das minhas explosões.", 
        subject: "Química", 
        cost: "20,00", 
        weekday: [
            1
        ], time_from: [720],
        time_to: [1220]
    },

    {
        name: "Mayk Brito", 
        avatar: "https://avatars2.githubusercontent.com/u/6643122?s=460&u=1e9e1f04b76fb5374e6a041f5e41dce83f3b5d92&v=4", 
        whatsapp: "981283274", bio: "Entusiasta das melhores tecnologias de química avançada.<br><br>Apaixonado por explodir coisas em laboratório e por mudar a vida das pessoas através de experiências. Mais de 200.000 pessoas já passaram por uma das minhas explosões.", 
        subject: "Química", 
        cost: "20,00", 
        weekday: [
            1
        ], time_from: [720],
        time_to: [1220]
    }
]

const subjects = [
    "Artes", 
    "Biologia", 
    "Ciências", 
    "Educação física", 
    "Física", 
    "Geografia", 
    "História", 
    "Matemática", 
    "Português", 
    "Química", 
]

const weekdays = [
    "Domingo",
    "Segunda-feira",
    "Terça-feira",
    "Quarta-feira",
    "Quinta-feira",
    "Sexta-feira",
    "Sábado",
]
/*
function pageStudy(req, res) {
    return res.sendFile(__dirname + "/views/study.html")
}

function pageGiveClasses(req, res) {
    return res.sendFile(__dirname + "/views/give-classes.html")
}*/

//FUNCIONALIDADES

function getSubject(subjectNumber) {
    const position = +subjectNumber-1
    return subjects[position]
}

function pageLanding(req, res) {
    return res.render("index.html")
}

function pageStudy(req , res) {
    const filters = req.query
    return res.render("study.html", {proffys, filters,subjects, weekdays})
}

function pageGiveClasses(req, res) {
    const data = req.query

    //transformando em um array e verificando quantos elementos tem nesse array
    //se tiver dados
    const isNotEmpty = Object.keys(data).length > 0
    
    if(isNotEmpty) {

        data.subject = getSubject(data.subject)

        //adicionar dados a lista de proffys
        proffys.push(data)

        return res.redirect("/study")//Quando adicionar um novo professor, vai redirecionar para a página study
    }
    //se não, mostrar a página
    return res.render("give-classes.html", {subjects, weekdays})
}

//SERVIDOR

//CONFIGURAR EXPRESS
const express = require('express')
const server = express()


//CONFIGURAR NUNJUCKS
//com o nunjucks eu consigo enviar a lista de objetos, proffys
const nunjucks = require('nunjucks')
nunjucks.configure('src/views', {
    express: server,
    noCache: true,
})

//INICIO E CONFIGURAÇÃO DO SERVIDOR

server

//  CONFIGURAR ARQUIVOS ESTÁTICOS (CSS, SCRIPTS, IMAGENS)
.use(express.static("public"))
//tudo que está na pasta public ssão considerados arquivos static

//tem duas formas de fazer esse ".get", pode ser colocando a função junto com o comando com esta a baixo, ou separando a função como mostrado nas duas páginas seguintes

//ROTAS DA APLICAÇÃO
/*.get("/", (req, res) => {//é uma função que não precisa de nome,então ao invés de eu colocar a palavra "function" antes eu só coloco a setinha depois do parenteses
// // // req = requisição e res = resposta
    return res.sendFile(__dirname + "/views/index.html") //__dirname = C:\NLW\src
})*/

.get("/", pageLanding)

.get("/study", pageStudy)//No ".get" o primeiro campo é sobre como vai estar o html, nessa caso "http://127.0.0.1:5500/study" e o segundo é a função do que vai mostrar quando estiver nessa página

.get("/give-classes", pageGiveClasses)

//START DO SERVIDOR

.listen(5500)//express é uma função por isso precisa dos parenteses
// // //a gente abriu a porta 5500,quando colocamos ali em cima, então se eu tentar acessar com outra porta, tipo 5501, eu não conseguiria

//console.log(__dirname) -> ao colocar o console log, o print vai aparecer noo terminal, não no console log no inspecionar da página.

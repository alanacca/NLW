//SERVIDOR

//CONFIGURAR EXPRESS
const express = require('express')
const server = express()

const {
    pageLanding,
    pageStudy,
    pageGiveClasses,
    saveClasses
} = require('./pages')

//CONFIGURAR NUNJUCKS
//com o nunjucks eu consigo enviar a lista de objetos, proffys
const nunjucks = require('nunjucks')
nunjucks.configure('src/views', {
    express: server,
    noCache: true,
})

//INICIO E CONFIGURAÇÃO DO SERVIDOR

server

//RECEBR OS DADOS DO req.body
.use(express.urlencoded({ extended: true}))

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
.post("/save-classes", saveClasses)

//START DO SERVIDOR

.listen(5500)//express é uma função por isso precisa dos parenteses
// // //a gente abriu a porta 5500,quando colocamos ali em cima, então se eu tentar acessar com outra porta, tipo 5501, eu não conseguiria

//console.log(__dirname) -> ao colocar o console log, o print vai aparecer noo terminal, não no console log no inspecionar da página.

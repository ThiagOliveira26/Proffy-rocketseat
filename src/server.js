//Dados

const proffys = [

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

//funcionalidades

function getSubject(subjectNumber){
    const position = +subjectNumber - 1
    return subjects[position]
}

function pageLanding(req, res){
    return res.render("index.html")
}

function pageStudy(req, res){
    const filters = req.query
    return res.render("study.html", {proffys, filters, subjects, weekdays})
}

function pageGiveClasses(req, res){
    const data = req.query

    //transformou data em array.. e verificou se length = 0
    const isNotEmpty = Object.keys(data).length > 0

    if (isNotEmpty){

        data.subject = getSubject(data.subject)
        //add dados a lista de proffys
        proffys.push(data)

        return res.redirect("/study")
    }
    
    return res.render("give-classes.html", {subjects, weekdays})
}

// Servidor
const express = require('express')
const server = express()

//configurar nunjucks (template engine)
const nunjucks = require('nunjucks')
nunjucks.configure('src/views',{
    express: server,
    noCache: true,
})

//inicio e config servidor
server
//configurar arquivos estaticos (css, scripts, imagens)
.use(express.static("public"))
//rotas de aplicaçao
.get("/", pageLanding)
.get("/study", pageStudy)
.get("/give-classes",pageGiveClasses)

//start listen
.listen(5500)
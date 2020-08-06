// Datas

const proffys = [
    { 
        name: "Diego Fernandes", 
        avatar: "https://avatars2.githubusercontent.com/u/2254731?s=460&amp;u=0ba16a79456c2f250e7579cb388fa18c5c2d7d65&amp;v=4", 
        whatsapp: "899876543", 
        bio: 'Entusiasta das melhores tecnologias de química avançada. Apaixonado por explodir coisas em laboratório e por mudar a vida das pessoas através de experiências. Mais de 200.000 pessoas já passaram por uma das minhas explosões.', 
        subject: "Química", 
        cost: "20", 
        weekday: [0], 
        time_from: [720], 
        time_to: [1220]
    },
    { 
        name: "Mayk Brito", 
        avatar: "https://avatars1.githubusercontent.com/u/6643122?s=60&u=1e9e1f04b76fb5374e6a041f5e41dce83f3b5d92&v=4", 
        whatsapp: "899876543", 
        bio: 'Entusiasta das melhores tecnologias de química avançada. Apaixonado por explodir coisas em laboratório e por mudar a vida das pessoas através de experiências. Mais de 200.000 pessoas já passaram por uma das minhas explosões.', 
        subject: "Artes", 
        cost: "20", 
        weekday: [1], 
        time_from: [720], 
        time_to: [1220]
    },
    { 
        name: "Felipe", 
        avatar: "https://avatars2.githubusercontent.com/u/6643122?s=460&u=1e9e1f04b76fb5374e6a041f5e41dce83f3b5d92&v=4", 
        whatsapp: "899876543", 
        bio: 'Entusiasta das melhores tecnologias de química avançada. Apaixonado por explodir coisas em laboratório e por mudar a vida das pessoas através de experiências. Mais de 200.000 pessoas já passaram por uma das minhas explosões.', 
        subject: "Artes", 
        cost: "20", 
        weekday: [1], 
        time_from: [720], 
        time_to: [1220]
    }
]

const subjects = [
    "Artes",
    "Biologia",
    "Ciências",
    "Educação Física",
    "Física",
    "Geografia",
    "História",
    "Matemática",
    "Portugês",
    "Química"
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

  // functionality

function getSubject(subjectNumber) {
    const position = +subjectNumber - 1
    return subjects[position]
}

function pageLanding(req, res) {
    return res.render("index.html")
}

function pageStudy(req, res) {
    const filters = req.query
    return res.render("study.html", { proffys, filters, subjects, weekdays })
}

function pageGiveClasses(req, res) {
    const data = req.query 
    const isNotEmpty = Object.keys(data).length > 0
    // if has data:
    if (isNotEmpty) {

        data.subject = getSubject(data.subject)
        // add datas to list proffys
        proffys.push(data)

        return res.redirect("/study")

    }

    // else, show page

    return res.render("give-classes.html", {subjects, weekdays})
}

// server

const express = require('express')
const server = express()

// configurar nunjucks (template engine)

const nunjucks = require('nunjucks')
nunjucks.configure('src/views', {
    express: server,
    noCache: true,

})

// start and configurations server

server
// configure folders estatics (css, scripts, images)
.use(express.static("public"))
//
// aplication roots 
.get("/", pageLanding)
.get("/study",pageStudy)
.get("/give-classes", pageGiveClasses)
// start server
.listen(5500)

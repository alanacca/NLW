/*
function pageStudy(req, res) {
    return res.sendFile(__dirname + "/views/study.html")
}

function pageGiveClasses(req, res) {
    return res.sendFile(__dirname + "/views/give-classes.html")
}*/

//FUNCIONALIDADES

const Database = require('./database/db')

const { 
    subjects,
    weekdays,
    getSubject,
    convertHoursToMinutes
} = require('./utils/format')

function pageLanding(req, res) {
    return res.render("index.html")
}

async function pageStudy(req , res) {
    const filters = req.query

    if(!filters.subject || !filters.weekday || !filters.time) {
        return res.render("study.html", {filters, subjects, weekdays})
        //se algume campo estiver vazio, só vai mostrar a página que já tava
    }

    //CONVERTER HORAS EM MINUTOS
    const timeToMinutes = convertHoursToMinutes(filters.time)


    const query = `
        SELECT classes.*, proffys.*
        FROM proffys
        JOIN classes ON (classes.proffy_id = proffys.id)
        WHERE EXISTS(
            SELECT class_schedule.*
            FROM class_schedule
            WHERE class_schedule.class_id = classes.id
            AND class_schedule.weekday = ${filters.weekday}
            AND class_schedule.time_from <= ${timeToMinutes}
            AND class_schedule.time_to > ${timeToMinutes}  
        )
        AND classes.subject = '${filters.subject}'
    `
    //caso haja erro na hora da consulta do banco de dados
    try {
        const db = await Database
        const proffys = await db.all(query)

        proffys.map((proffy) => {
            proffy.subject = getSubject(proffy.subject)
        })

        return res.render('study.html', {proffys, subjects, filters, weekdays})

    } catch (error) {
        console.log(error)
    }


}

function pageGiveClasses(req, res) {
    // TODAS AS INFORMAÇÕES DO FORMULÁRIO SERÃO PEGAS NA FUNÇÃO SAVECLASSES
    // const data = req.query

    // //transformando em um array e verificando quantos elementos tem nesse array
    // //se tiver dados
    // const isNotEmpty = Object.keys(data).length > 0
    
    // if(isNotEmpty) {

    //     data.subject = getSubject(data.subject)

    //     //adicionar dados a lista de proffys
    //     proffys.push(data)

    //     return res.redirect("/study")//Quando adicionar um novo professor, vai redirecionar para a página study
    // }

    return res.render("give-classes.html", {subjects, weekdays})
}

async function saveClasses( req, res) {
    const createProffy = require('./database/createProffy')


    const proffyValue = {// colocamos o req.body no lugar do req.query, para que possamos esconder as informações preenchidas no formulário, de forma a não mostrá-las lá emcima, junto com a url.
        name: req.body.name,
        avatar: req.body.avatar,
        whatsapp: req.body.whatsapp,
        bio: req.body.bio
    }

    const classValue = {
        subject: req.body.subject,
        cost: req.body.cost
    }

    const classScheduleValues = req.body.weekday.map((weekday, index) => {
        return {
            weekday, 
            time_from: convertHoursToMinutes(req.body.time_from[index]),
            time_to: convertHoursToMinutes(req.body.time_to[index])
        }
    })

    try {
        const db = await Database
        await createProffy(db, {proffyValue, classValue, classScheduleValues})

        let queryString = "?subject=" +req.body.subject
        queryString += "&weekday=" + req.body.weekday[0]
        queryString += "&time=" + req.body.time_from[0]

        return res.redirect("/study" + queryString)
    }catch (error) {
        console.log(error)
    }

    


}

module.exports = {
    pageLanding,
    pageStudy,
    pageGiveClasses,
    saveClasses
}
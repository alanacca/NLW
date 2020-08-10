module.exports = async function(db, {proffyValue, classValue, classScheduleValues}) {
    
    //INSERIR DADOS NA TABLE DE TEACHERS
    //preciso criar uma variavél constante para conseguir pegar a chave id do proffy

    //tem que colocar as aspas nos valores, pois esses valores serão strings então é necessário indicar isso.
    const insertedProffy = await db.run(`
        INSERT INTO proffys (
            name, 
            avatar,
            whatsapp,
            bio
        ) VALUES (
            "${proffyValue.name}",
            "${proffyValue.avatar}",
            "${proffyValue.whatsapp}",
            "${proffyValue.bio}"
        );
    `) //a linha vai esperar terminar o db.run para passar para a próxima a linha. Assim o 'await' substitui o  'then'

    //para usar o 'await' em uma função é necessário ter o 'async' escrito antes da declaração da função

    const proffy_id = insertedProffy.lastID

    //INSERIR DADOS NA TABLE CLASSES

    const insertedClass = await db.run(`
            INSERT INTO classes (
                subject,
                cost,
                proffy_id
            ) VALUES (
                "${classValue.subject}",
                "${classValue.cost}",
                "${proffy_id}"
            );
    `)

    const class_id = insertedClass.lastID

    //INSERIR DADOS NA TABLE class_schedule
    //o map vai funcionar como o foreach vai andar de elemento em elemento criando um array com os resultados que serão retornados. Assim se o professor colocar mais de um horario e/ou dia disponível vão ser acumulados todos. 
    const inserteddAllClassScheduleValues = classScheduleValues.map((classScheduleValue) => {
        return  db.run(`
            INSERT INTO class_schedule (
                class_id,
                weekday,
                time_from,
                time_to
            ) VALUES (
                "${class_id}",
                "${classScheduleValue.weekday}",
                "${classScheduleValue.time_from}",
                "${classScheduleValue.time_to}"
            );
        `)
    })

    //aqui vou executar todos os db.runs() da class_schedules
    await Promise.all(inserteddAllClassScheduleValues)//vai pegando cada 'db.run' e vai guardando em um array
}
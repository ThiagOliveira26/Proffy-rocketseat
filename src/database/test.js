const Database = require('./db')
const createProffy = require('./createProffy')


Database.then(async (db) => {
    //inserir dados
    proffyValue = {
        //infos do server para exemplo.. 
        name: "thiago",
        avatar: "afaa",
        whatsapp: "515151",
        bio: "bio",
    }

    classValue = {
        subject: 1,    
        cost: "30",
        //prof id vem pelo bd
    }

    classScheduleValues = [
        {
            weekday: 1,
            time_from: 120,
            time_to: 252
        },
        {
                weekday: 5,
                time_from: 140,
                time_to: 1120
            },
    ]

    //await createProffy(db, {proffyValue, classValue, classScheduleValues})
    
    //consultar dados inseridos

    // todos os proffys
    const selectedProffys = await db.all("SELECT * FROM proffys")
    //console.log(selectedProffys)

    //consultar as classes de um determinado professor
    // trazer junto os dados do professor

    const selectClassesAndProffys = await db.all(`
        SELECT classes.*, proffys.*
        FROM proffys
        JOIN classes ON (classes.proffy_id = proffys.id)
        WHERE classes.proffy_id = 1;
    `)
    //console.log(selectClassesAndProffys)

    /*o horario que a pessoa quer filtrar tem que fazer o time_from ser antes ou igual ao horario solicitado
    e o time_to precisa ser acima.
    em resumo, horário procurado para ter aula precisa estar dentro da janela de horario disponivel para ter a aula
    */
   const selectClassesSchedule = await db.all(`
        SELECT class_schedule.*
        FROM class_schedule
        WHERE class_schedule.class_id = "1"
        AND class_schedule.weekday = "5"
        AND class_schedule.time_from <= "140"
        AND class_schedule.time_to >= 1300
   `)
   console.log(selectClassesSchedule)
})
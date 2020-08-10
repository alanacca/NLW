const Database = require('sqlite-async')


function execute(db) {
    //CRIAR AS TABELAS DO BANCO DE DADOS
    return db.exec(`
        CREATE TABLE IF NOT EXISTS proffys (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            avatar TEXT,
            whatsapp TEXT, 
            bio TEXT
        );

        CREATE TABLE IF NOT EXISTS classes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            subject INTEGER,
            cost TEXT,
            proffy_id INTEGER
        );

        CREATE TABLE IF NOT EXISTS class_schedule (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            class_id INTEGER,
            weekday INTEGER,
            time_from INTEGER,
            time_to INTEGER
        );
    `)
}

//EXPORTANDO O BANCO DE DADOS
module.exports = Database.open(__dirname + '/database.sqlite').then(execute) //o '.then' quer dizer que depois que terminar de abrir o banco de dados então vai rodar o que está dentro do then, no caso a função execute.
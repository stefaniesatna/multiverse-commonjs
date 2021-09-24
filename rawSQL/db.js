const sqlite3 = require('sqlite3')
const sqlite = require('sqlite')

async function run() {
    const db = await sqlite.open({
        filename: './db.sqlite',
        driver: sqlite3.Database
    })
    await dropTables(db)
    await createTables(db)
    await insertValues(db)
}

async function createTables(db){
    await db.exec('CREATE TABLE movies (id INTEGER PRIMARY KEY, title TEXT, durationMins INTEGER)')
    await db.exec('CREATE TABLE cinemas (id INTEGER PRIMARY KEY, location TEXT, numOfScreens INTEGER)')
    await db.exec('CREATE TABLE screenings (id INTEGER PRIMARY KEY, start_time INTEGER, numOfScreens INTEGER, movie_id INTEGER, FOREIGN KEY(movie_id) REFERENCES movies(id))')
}

async function insertValues(db){
    await db.run('INSERT INTO movies(id, title, durationMins) VALUES (1, "No Time To Die", 163')
}

async function dropTables(db){
    await db.exec('DROP TABLE IF EXISTS movies')
    await db.exec('DROP TABLE IF EXISTS cinemas')
    await db.exec('DROP TABLE IF EXISTS screenings')
}


run().then(() => {
    console.log("Exiting!")
}).catch((e) => {
    console.log("Error bubbled up to entrypoint")
    console.error(e)
})
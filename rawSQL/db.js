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
    await db.exec(`CREATE TABLE movies (id INTEGER PRIMARY KEY, title TEXT, durationMins INTEGER)`)
    await db.exec(`CREATE TABLE cinemas (id INTEGER PRIMARY KEY, location TEXT, num_of_screens INTEGER)`)
    await db.exec(`CREATE TABLE screenings (id INTEGER PRIMARY KEY, start_time INTEGER, movie_id INTEGER, cinema_id, FOREIGN KEY(movie_id) REFERENCES movies(id), FOREIGN KEY(cinema_id) REFERENCES cinemas(id))`)
}

async function insertValues(db){
    await db.run(`INSERT INTO movies(id, title, durationMins) VALUES 
    (1, "No Time To Die", 163),
    (2, "Black Widow", 220),
    (3, "MIB", 220)`)

    await db.run(`INSERT INTO cinemas (id, location, num_of_screens) VALUES
    (1, "Kings Cross", 3),
    (2, "Shoreditch", 2),
    (3, "Leister Square", 5)`)

    await db.run(`INSERT INTO screenings (id, start_time, movie_id, cinema_id) VALUES
    (1, 1632486702, 1, 1),
    (2, 1632486702, 1, 2),
    (3, 1632486702, 2, 1)`)

}

async function dropTables(db){
    await db.exec(`DROP TABLE IF EXISTS movies`)
    await db.exec(`DROP TABLE IF EXISTS cinemas`)
    await db.exec(`DROP TABLE IF EXISTS screenings`)
}


run().then(() => {
    console.log("Exiting!")
}).catch((e) => {
    console.log("Error bubbled up to entrypoint")
    console.error(e)
})
const sqlite3 = require('sqlite3')
const sqlite = require('sqlite')
const db = require("./db")

await db.exec('CREATE TABLE tbl (col TEXT)')

// class Movie {
//     constructor(title, durationMins){
//         this.title = title
//         this.durationMins = durationMins
//     }
// }

// const bond = new Movie()
// const str = `CREATE TABLE`
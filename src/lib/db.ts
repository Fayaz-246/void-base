import Database from "better-sqlite3";

const db = new Database("src/sqlite.db");
db.pragma("journal_mode = WAL");

/*----------------TABLES-------------------*/

db.exec(`
    CREATE TABLE IF NOT EXISTS test (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        NAME TEXT NOT NULL,
        uid INTEGER NOT NULL
    )`);

/*------------------------------------------*/

export default db;

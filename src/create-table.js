import { sql } from "./db.js";

async function createTable() {
  await sql`
    CREATE TABLE tasks (
      id TEXT PRIMARY KEY,
      title TEXT,
      status TEXT
    );
  `.then(() => {
    console.log("Table created")
  })
}

createTable()
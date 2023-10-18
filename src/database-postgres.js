import { sql } from "./db.js";
import { randomUUID } from "node:crypto"

export class DatabasePostgres {
  async list(search) {
    let tasks

    if (search) {
      tasks = await sql`SELECT * FROM tasks WHERE title ILIKE ${"%" + search + "%"}`
    } else {
      tasks = await sql`SELECT * FROM tasks`
    }

    return tasks
  }

  async create(task) {
    const taskID = randomUUID()
    const status = "todo"
    const { title } = task

    await sql`INSERT INTO tasks(id, title, status) VALUES (${taskID}, ${title}, ${status})`
  }

  async update(id, task) {
    const { title, status } = task;

    await sql`UPDATE tasks SET title = ${title}, status = ${status} WHERE id = ${id}`
  }

  async delete(id) {
    await sql`DELETE FROM tasks WHERE id = ${id}`
  }
}
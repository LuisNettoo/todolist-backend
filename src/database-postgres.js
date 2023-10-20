import { sql } from "./db.js";

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
    const { id, title, status } = task

    await sql`INSERT INTO tasks(id, title, status) VALUES (${id}, ${title}, ${status})`
  }

  async update(id, task) {
    const { title, status } = task;

    await sql`UPDATE tasks SET title = ${title}, status = ${status} WHERE id = ${id}`
  }

  async delete(id) {
    await sql`DELETE FROM tasks WHERE id = ${id}`
  }
}
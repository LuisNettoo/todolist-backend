import { fastify } from "fastify";
import cors from "@fastify/cors";
import { randomUUID } from "node:crypto"

import { DatabasePostgres } from "./database-postgres.js";

const server = fastify()

await server.register(cors, {
  origin: "*"
})
const database = new DatabasePostgres()

server.get("/api/v1/tasks", async (request) => {
  const search = request.query.search

  const tasks = await database.list(search)

  return tasks
})

server.post("/api/v1/tasks", async (request, reply) => {
  const id = randomUUID()
  const status = "todo"
  const { title } = request.body;

  await database.create({
    id,
    title,
    status
  })

  return reply.status(201).send({task: {id, title, status}})
})

server.put("/api/v1/tasks/:id", async (request, reply) => {
  const taskID = request.params.id
  const {title, status} = request.body

  await database.update(taskID, {
    title,
    status,
  })

  return reply.status(204).send("Task updated sucess!")
})

server.delete("/api/v1/tasks/:id", async (request, reply) => {
  const taskID = request.params.id

  database.delete(taskID)

  return reply.status(204).send("Task deleted sucess!")
})

server.listen({
  host: "0.0.0.0",
  port: process.env.PORT ?? 3030,
})
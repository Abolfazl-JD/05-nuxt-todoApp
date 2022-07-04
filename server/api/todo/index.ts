import { db } from "../../db"
import { v4 as uuid } from "uuid"
import { sendError } from 'h3'
import { TodoType, SentBodyType } from '@/types'

export default defineEventHandler(async (e) => {
    const method = e.req.method

    if (method === "GET") {
        return db.todos
    }

    if (method === "POST") {
        const reqBody: SentBodyType = await useBody(e)

        if (!reqBody.item) {
            const noTodoFound = createError({
                statusCode: 400,
                statusMessage: "no todos found",
                data : {}
            })
            sendError(e, noTodoFound)
        }
        const newTodo: TodoType = {
            id : uuid(),
            item: reqBody.item,
            completed : false
        }

        db.todos.push(newTodo)

        return newTodo
    }
})
import { db } from '../../db'
import { sendError } from 'h3'

export default defineEventHandler((e) => {
    const method = e.req.method
    const context = e.context

    // 1) extract the id
    const reqId = context.params.id

    const findTodoById = (todoId : number | string) => {
        // 2) find the todo with id
        let index : number

        const reqTodo = db.todos.find((todo , todoIndex) => {
            if (todo.id === todoId) {
                index = todoIndex
                return true
            }
            return false
        })
        // 3) throw an error if there wasn't todo with that id
        if (!reqTodo) {
            const noTodoFound = createError({
                statusCode: 404,
                statusMessage: "can't find this todo",
                data : {}
            })
            sendError(e, noTodoFound)
        }
        
        return {
            index, reqTodo
        }
    }

    if (method === "PUT") {
        const { index, reqTodo } = findTodoById(reqId)
        
        // 4) toggle the completed key of todo
        const updatedTodo = {
            ...reqTodo,
            completed : !reqTodo.completed
        }
        // 5) edit db todos array
        db.todos[index] = updatedTodo

        return updatedTodo
    }

    if (method === "DELETE") {
        const { index } = findTodoById(reqId)
        db.todos.splice(index, 1)
        return "item successfully deleted"
    }
})
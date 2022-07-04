import { TodoType } from "@/types"

const useTodos = () => {

    const { data: todos, refresh } = useAsyncData<TodoType[]>("todos", () => {
      return $fetch("/api/todo")
    })

    // const {data : todos} = useFetch(() => "/api/todo")
    
    const addTodo = async (item: string) => {
      if (!item) return null
      await $fetch('/api/todo', {
        method: "post",
        body: { item }
      })
      refresh()
    }
    
    const toggleCompleted = async (id : string | number) => {
      await $fetch(`/api/todo/${id}`, {
        method : "put"
      })
      refresh()
    }
    
    const removeTodo = async (id : string | number) => {
      await $fetch(`/api/todo/${id}`, {
        method : "delete"
      })
      refresh()
    }
    return {
        todos,
        addTodo,
        toggleCompleted,
        removeTodo
    }
}

export default useTodos
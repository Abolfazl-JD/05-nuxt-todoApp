<script setup lang="ts">

const newTodo = ref('')

const { todos, addTodo, removeTodo, toggleCompleted } = useTodos()

const handleNewTodo = () => {
  addTodo(newTodo.value)
  newTodo.value = ''
}
</script>

<template>
  <div class="container">
    <div class="cards">
      <h1>my Todos</h1>
      <div class="add-todo">
        <input 
          type="text" 
          v-model="newTodo"
          placeholder="Add a new todo..."
          @keyup.enter="handleNewTodo"
        >
        <button 
          @click="handleNewTodo"
          class="add-button"
        >
          Add
        </button>
      </div>
      <div v-for="todo in todos" :key="todo.id" class="card">
        <h4
          :class="todo.completed && 'complete-item'" 
          @click="toggleCompleted(todo.id)"
        >
          {{ todo.item }} 
        </h4>
        <p @click="removeTodo(todo.id)">x</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
* {
  font-family:Arial, Helvetica, sans-serif ;
}

.container {
  padding: 2rem;
  margin: 0 auto;
  max-width: 50%;
}

.cards{
  font-weight: 800;
  border: 1px solid #e7e7e7;
  border-radius: 5px;
  padding:0.5rem 2rem 2rem ;
}

.add-todo{
  display: flex;
  justify-content: space-between;
}

input {
  outline: none;
  border: none;
  font-size: 16px;
}

.add-button{
  background-color: white;
  padding: 5px 11px;
  border-radius: 5px;
  border: 1px solid gray;

}

.card {
  padding: 0 0.4rem;
  margin-top: 1rem;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
   border: 1px solid #e7e7e7;
}

.complete-item{
  text-decoration: line-through;
}
</style>

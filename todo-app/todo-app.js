let todos = getSavedTodos()

const filters = {
    searchText: '',
    hideCompleted: false
}

renderTodo(todos, filters)

document.querySelector('#search-to-do').addEventListener('input', (e) => {
    filters.searchText = e.target.value
    renderTodo(todos, filters)
})

document.querySelector('#create-todo').addEventListener('submit', (e) => {
    e.preventDefault()
    todos.unshift({
        id: uuidv4(),
        text: e.target.elements.newTodo.value, 
        completed: false
    })
    saveTodos(todos)
    renderTodo(todos, filters)
    e.target.elements.newTodo.value= ''
})

document.querySelector('#hide-completed').addEventListener('change', (e) => {
    filters.hideCompleted = e.target.checked
    renderTodo(todos, filters)
})
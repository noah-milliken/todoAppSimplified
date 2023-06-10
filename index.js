
//Control
function component() {
    const element = document.createElement('div')
    element.setAttribute('class', 'main-container')
    document.addEventListener('submit', (e) => {
        e.preventDefault()
        const title = document.getElementById('todo-title').value
        const description = document.getElementById('todo-description').value
        const dueDate = document.getElementById('todo-due-date').value
        const priority = document.getElementById('todo-priority').value
        const complete = document.getElementById('todo-completed').value
        TodoModel.addTodo(title, description, dueDate, priority, complete)
        const modal = document.getElementById('form-modal')
        const overlay = document.getElementById('overlay')
        overlay.classList.toggle('closed')
        modal.classList.toggle('closed')

        openModalBtn.classList.toggle('closed')
        document.querySelector('form').reset()

    })

    const openModalBtn = document.createElement('button')
    openModalBtn.textContent = 'Add Item'
    openModalBtn.addEventListener('click', () => {
        const modal = document.getElementById('form-modal')
        const overlay = document.getElementById('overlay')
        overlay.classList.toggle('closed')
        modal.classList.toggle('closed')
        openModalBtn.classList.toggle('closed')
    })

    const todoContainer = DomModel.todoContainer(TodoModel.todos)
    todoContainer.id = 'todo-list'
    element.appendChild(DomModel.overlay())
    element.appendChild(openModalBtn)
    element.appendChild(DomModel.header())
    element.appendChild(DomModel.sidebar())
    element.appendChild(DomModel.form())
    element.appendChild(todoContainer)
    return element
}
//View
const DomModel = (() => {
    const header = () => {
        const headerElement = document.createElement('div')
        headerElement.setAttribute('class', 'header')
        headerElement.textContent = 'Header'
        return headerElement
    }
    const sidebar = () => {
        const sideBarElement = document.createElement('div')
        sideBarElement.classList.add('side-bar')
        sideBarElement.textContent = "sidebar"
        return sideBarElement
    }
    const todoContainer = (todos) => {
        const todoElement = document.createElement('div')
        todoElement.classList.add('todo-element')
        todoElement.innerHTML = ''
        todos.forEach((item, index) => {
            const todoItem = document.createElement('div')
            todoItem.classList.add('todo-item')
            todoItem.innerHTML = `
                <h3>${item.title}</h3>
                <h4>${item.description}</h4>
                <h4>${item.dueDate}</h4>
                <h3>${item.priority}</h3>
                <button class="complete">${item.completed ? 'Completed' : 'Incomplete'}</button>
                <div>
                <button  class="item-delete" data-index="${index}" >X</button>
                <button  class="item-edit" data-index="${index}">edit</button>
                </div>
            `
            const deleteButton = todoItem.querySelector('.item-delete')
            deleteButton.addEventListener('click', () => {
                TodoModel.deleteTodo(index)
            })
            todoElement.appendChild(todoItem)

        });

        return todoElement


    }

    const renderTodos = () => {
        const container = document.getElementById('todo-list')
        const updatedTodoContainer = todoContainer(TodoModel.todos)
        container.innerHTML = ''
        container.appendChild(updatedTodoContainer)


    }

    const form = () => {
        const formElement = document.createElement('form')
        formElement.setAttribute('class', 'todo-form')
        formElement.classList.add('class', 'form-modal')
        formElement.classList.add('class', 'closed')
        formElement.setAttribute('id', 'form-modal')
        formElement.innerHTML = `
            <form class="todo-form">
                
                    <label for="todo-title">To Do Item</label>
                    <input type="text" id="todo-title" name="todo-title" required minlength="4" maxlength="100" size="10" value="Sweep Floors">
                    <label for="description">Description</label>
                    <input type="text" name="description" id="todo-description" minlength="4" maxlength="100" required value="Sweep floors around house">
                    <label for="due-date">Date Due</label>
                    <input type="date" name="due-date" id="todo-due-date" valeu"04-02-1643">
                    <label for="priority">Priority</label>
                    <select id="todo-priority">
                    <option value="high">High</option>
                    <option value="normal">Normal</option>
                    <option value="low">Low</option>
                    </select>
                    <label for="completed">Completed</label>
                    <input type="checkbox" name="completed" id="todo-completed" class="completed-checkbox">
                    <button type="submit" id="btn1">Add todo</button>
                
            </form>
            `

        return formElement
    }
    const overlay = () => {
        const overlayElement = document.createElement('div')
        overlayElement.setAttribute('class', 'overlay')
        overlayElement.setAttribute('id', 'overlay')
        overlayElement.classList.add('closed')
        return overlayElement
    }


    return {
        form,
        sidebar,
        header,
        todoContainer,
        renderTodos,
        overlay,


    }

})()

// Model
const todoFactory = (title, description, dueDate, priority, completed = true) => {
    return { title, description, dueDate, priority, completed }
}
const TodoModel = (() => {
    let todos = [
        {
            title: "Finish homework",
            description: "Complete math assignment",
            dueDate: "2023-06-15",
            priority: "high",
            completed: false
        },
        {
            title: "Buy groceries",
            description: "Get milk, bread, and eggs",
            dueDate: "2023-06-12",
            priority: "medium",
            completed: true
        },
        {
            title: "Clean the house",
            description: "Vacuum the floors and dust the furniture",
            dueDate: "2023-06-10",
            priority: "low",
            completed: false
        },
        {
            title: "Walk the dog",
            description: "Take Sparky for a walk in the park",
            dueDate: "2023-06-11",
            priority: "medium",
            completed: false
        },
        {
            title: "Pay bills",
            description: "Submit monthly utility payments",
            dueDate: "2023-06-17",
            priority: "high",
            completed: false
        },
        {
            title: "Exercise",
            description: "Go for a run or do a workout",
            dueDate: "2023-06-09",
            priority: "high",
            completed: true
        },
        {
            title: "Read a book",
            description: "Spend time reading a novel",
            dueDate: "2023-06-13",
            priority: "low",
            completed: false
        },
        {
            title: "Write a blog post",
            description: "Share thoughts and ideas in a blog article",
            dueDate: "2023-06-14",
            priority: "medium",
            completed: false
        },
        {
            title: "Plan vacation",
            description: "Research and book flights and accommodations",
            dueDate: "2023-06-20",
            priority: "high",
            completed: false
        },
        {
            title: "Organize files",
            description: "Sort and arrange documents and folders",
            dueDate: "2023-06-16",
            priority: "low",
            completed: true
        }]
    const addTodo = (title, description, dueDate, priority, completed = true) => {
        const newTodo = todoFactory(title, description, dueDate, priority, true)
        todos.push(newTodo)
        DomModel.renderTodos()

    }
    const deleteTodo = (index) => {
        console.log('spicy banana')
        todos.splice(index, 1)
        DomModel.renderTodos()

    }
    const orderByPriority = () => {

    }
    const orderByComplete = () => {

    }

    return {
        todos,
        addTodo,
        deleteTodo,
        orderByPriority,
        orderByComplete,
    }
})()




document.body.appendChild(component())






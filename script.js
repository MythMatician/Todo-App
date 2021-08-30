const newTodo = document.querySelector('#newTodo');
const todoContainer = document.querySelector('#todo-container');
const contentContainer = document.querySelector('#content-container');
const buttonContainer = document.querySelector('#button-container');
const allButton = document.querySelector('#all');
const activeButton = document.querySelector('#active');
const completedButton = document.querySelector('#completed');
const clearButton = document.querySelector('#clear-completed');
const items = document.querySelector('#items');
const bottom = document.querySelector('.bottom');
const toggler = document.querySelector('#toggler');
const todos = [];

// Creating and removing the todo logic
const createTodoDark = (val) => {
    todos.push(val);
    const div = document.createElement('div');
    div.innerHTML = `
        <p>${val}</p>
        <svg xmlns="http://www.w3.org/2000/svg" class="remove"><path fill="lightgray" fill-rule="evenodd" d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"/></svg>
    `;
    div.classList.add('todo', 'active');
    div.setAttribute('draggable', 'true');
    todoContainer.append(div);
    const removeTodo = () => {
        const remove = document.querySelectorAll('.remove');
        remove.forEach(element => {
            element.addEventListener('click', (e) => {
                e.target.parentElement.remove();
                items.textContent = todoContainer.children.length;
            })
        })
    }
    removeTodo();
}

// Event for marking todos as complete
 todoContainer.addEventListener('click', (e) => {
    e.target.classList.toggle('completed');
    e.target.classList.toggle('active');
});

// Input event for making new todos
newTodo.addEventListener('keyup', (e) => {
    e.preventDefault();
    if(e.key === 'Enter' && newTodo.value) {
      const todo = newTodo.value;
      createTodoDark(todo);
      items.textContent = todoContainer.children.length;
      newTodo.value = '';
    }
})

// Event for toggling between night and day theme
toggler.addEventListener('click', (e) => {
    toggler.classList.toggle('toggled');
    if(toggler.classList == 'toggled') {
        toggler.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26"><path fill="#FFF" fill-rule="evenodd" d="M13 0c.81 0 1.603.074 2.373.216C10.593 1.199 7 5.43 7 10.5 7 16.299 11.701 21 17.5 21c2.996 0 5.7-1.255 7.613-3.268C23.22 22.572 18.51 26 13 26 5.82 26 0 20.18 0 13S5.82 0 13 0z"/></svg>';
        toggleColor([newTodo, contentContainer, bottom], '#fff', 'hsl(233, 14%, 35%)');
    } else {
        toggler.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26"><path fill="#FFF" fill-rule="evenodd" d="M13 21a1 1 0 011 1v3a1 1 0 11-2 0v-3a1 1 0 011-1zm-5.657-2.343a1 1 0 010 1.414l-2.121 2.121a1 1 0 01-1.414-1.414l2.12-2.121a1 1 0 011.415 0zm12.728 0l2.121 2.121a1 1 0 01-1.414 1.414l-2.121-2.12a1 1 0 011.414-1.415zM13 8a5 5 0 110 10 5 5 0 010-10zm12 4a1 1 0 110 2h-3a1 1 0 110-2h3zM4 12a1 1 0 110 2H1a1 1 0 110-2h3zm18.192-8.192a1 1 0 010 1.414l-2.12 2.121a1 1 0 01-1.415-1.414l2.121-2.121a1 1 0 011.414 0zm-16.97 0l2.121 2.12A1 1 0 015.93 7.344L3.808 5.222a1 1 0 011.414-1.414zM13 0a1 1 0 011 1v3a1 1 0 11-2 0V1a1 1 0 011-1z"/></svg>'
        toggleColor([newTodo, contentContainer, bottom], 'hsl(233, 14%, 35%)', 'lightgray');
    }
})

// Sub function for toggle event
const toggleColor = (arr, bgcolor, color) => {
    arr.forEach(item => {
        item.style.backgroundColor = bgcolor;
        item.style.color = color;
    })
}

// Filter all todos event
allButton.addEventListener('click', (e) => {
    for(let todo of todoContainer.children) {
        todo.style.display = 'flex';
    }
})

// Base filter function
const filter = (classname) => {
    for(let todo of todoContainer.children) {
        if(todo.classList[1] == `${classname}`) {
            todo.style.display = 'flex';
        } else {
            todo.style.display = 'none';
        }
    } 
}

// Filter completed todos event
completedButton.addEventListener('click', (e) => {
    filter('completed');  
})

// Filter active todos event
activeButton.addEventListener('click', (e) => {
    filter('active'); 
})

// Clear completed todos event
clearButton.addEventListener('click', (e) => {
    for(let todo of todoContainer.children) {
        if(todo.classList[1] == 'completed') {
            todo.remove();
            items.textContent--;
        }
    }
})





















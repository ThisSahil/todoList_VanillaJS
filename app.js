// selectors

const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');


// event listeners

document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);


// functions


function addTodo(event) {

    event.preventDefault();   // prevent form from submitting


    // todo DIV
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');   // added class name to the above created div

    // create LI

    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);


    // add todo to local storage

    saveLocalTodos(todoInput.value);

    // check mark button

    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class = "fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);


    // delete button

    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = '<i class = "fas fa-trash"></i>';
    deleteButton.classList.add("delete-btn");
    todoDiv.appendChild(deleteButton);


    // append to list
    todoList.appendChild(todoDiv);

    // clear todoInput value
    todoInput.value = "";

}


function deleteCheck(e) {

    const item = e.target    // this e.target gives that particular item on which we are clicking

    // delete todo

    if (item.classList[0] === "delete-btn") {

        const todo = item.parentElement;

        todo.classList.add('fall');  // animation class
        removeLocalTodos(todo);

        todo.addEventListener('transitionend', function () {    // this transitionend event listener occurs when CSS transition is completed
            todo.remove();
        })


    }

    if (item.classList[0] === "complete-btn") {

        const todo = item.parentElement;
        todo.classList.toggle("completed");

    }

}


function filterTodo(e) {

    const todos = todoList.childNodes;

    todos.forEach(function (todo) {

        switch (e.target.value) {

            case "all":
                todo.style.display = "flex";
                break;


            case "completed":
                if (todo.classList.contains('completed')) {
                    todo.style.display = "flex";
                }
                else {
                    todo.style.display = "none";
                }
                break;


            case "uncompleted":
                if(!todo.classList.contains('completed')){
                    todo.style.display = "flex";
                }
                else{
                    todo.style.display = "none";
                }
                break;
        }
    });
}

function saveLocalTodos(todo){


    let todos;
    if(localStorage.getItem("todos") === null){

        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));

}


function getTodos(){

    let todos;

    if(localStorage.getItem("todos") === null){
        todos = [];
    }

    else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    todos.forEach(function(todo){

        
    // todo DIV
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');   // added class name to the above created div

    // create LI

    const newTodo = document.createElement('li');
    newTodo.innerText = todo;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);


    // check mark button

    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class = "fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);


    // delete button

    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = '<i class = "fas fa-trash"></i>';
    deleteButton.classList.add("delete-btn");
    todoDiv.appendChild(deleteButton);


    // append to list
    todoList.appendChild(todoDiv);

    });

}



function removeLocalTodos(todo){


    let todos;

    if(localStorage.getItem("todos") === null){
        todos = [];
    }

    else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    const todoIndex = todo.children[0].innerText;

    todos.splice(todos.indexOf(todoIndex),1);
    localStorage.setItem("todos", JSON.stringify(todos));

}




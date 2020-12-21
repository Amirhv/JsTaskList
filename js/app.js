const form = document.querySelector('#task-form');
const newTaskInput = document.querySelector('#new-task');
const filter = document.querySelector('#filter');
const listGroupUl = document.querySelector('.list-group');
const clearTasksBtn = document.querySelector('#clear-tasks');

document.addEventListener('DOMContentLoaded', getTasks);
form.addEventListener('submit', addTask);
listGroupUl.addEventListener('click', removeTask);
clearTasksBtn.addEventListener('click', clearTasks);
filter.addEventListener('keyup', filterTasks);


// ----- ADDING NEW TASK -----
function addTask(e) {
    if (newTaskInput.value === '') {
        alert('Add a task');
    } else {
        // Creating li
        let li = document.createElement('li');
        li.className = 'list-group-item';
        li.appendChild(document.createTextNode(newTaskInput.value));
    
        // Creating a(link)
        let link = document.createElement('a');
        link.className = 'delete-item float-right text-warning';
        link.innerHTML = '<i class="far fa-times-circle"></i>';

        li.appendChild(link);

        listGroupUl.appendChild(li);

        // Store To Local Storage
        storeTaskToLocalStorage(newTaskInput.value);

        // Reseting The Value of newTaskInput
        newTaskInput.value = '';
    }

    e.preventDefault();
}

// Function For Storing Task To Local Storage
function storeTaskToLocalStorage(task) {
    let tasks;
    if (localStorage.getItem('item') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('item'));
    }

    tasks.push(task);

    localStorage.setItem('item', JSON.stringify(tasks));
}

// ----- GETTING TASKS WHEN WE LOAD THE PAGE -----
function getTasks(e) {
    let tasks;
    if (localStorage.getItem('item') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('item'));
    }

    tasks.forEach(task => {
        // Creating li
        let li = document.createElement('li');
        li.className = 'list-group-item';
        li.appendChild(document.createTextNode(task));
    
        // Creating a(link)
        let link = document.createElement('a');
        link.className = 'delete-item float-right text-warning';
        link.innerHTML = '<i class="far fa-times-circle"></i>';

        li.appendChild(link);

        listGroupUl.appendChild(li);

        e.preventDefault();
    });
}

// ----- REMOVING TASK -----
function removeTask(e) {
    if (e.target.parentElement.classList.contains('delete-item')) {
        if (confirm('Are you sure?')) {
            e.target.parentElement.parentElement.remove();
            removeTaskFromLocalStorage(e.target.parentElement.parentElement);
        }
    }
}

// Function For Removing Task From Local Storage
function removeTaskFromLocalStorage(taskItem) {
    let tasks;
    if (localStorage.getItem('item') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('item'));
    }

    tasks.forEach(function(task, index) {
        if (taskItem.textContent === task) {
            tasks.splice(index, 1);
        }
    });

    localStorage.setItem('item', JSON.stringify(tasks));
}

// ----- Clear All Tasks -----
function clearTasks(e) {
    // Not Recommended (it's slow)
    listGroupUl.innerHTML = '';

    // Faster Way    
    while (listGroupUl.firstChild) {
        listGroupUl.removeChild(listGroupUl.firstChild);
    }

    clearTasksFromLocalStorage();
}


// Function For Clearing All The Tasks From Local Storage
function clearTasksFromLocalStorage() {
    localStorage.clear();
}

// ----- FITLER TASKS -----
function filterTasks(e) {
    // let text = filter.value.toLowerCase();
    // Or
    let text = e.target.value.toLowerCase();

    let tasks = document.querySelectorAll('.list-group-item');

    tasks.forEach(task => {
        let item = task.textContent.toLowerCase();
        if (item.indexOf(text) == -1) {
            task.style.display = 'none';
        } else {
            task.style.display = 'block';
        }
    });
}
















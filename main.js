const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');

// Tarefas do Local Storage
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
        createTaskElement(task);
    });
}

// Novo elemento de tarefa
function createTaskElement(task) {
    const li = document.createElement('li');
    li.appendChild(document.createTextNode(task));

    const removeBtn = document.createElement('button');
    removeBtn.appendChild(document.createTextNode('Remover'));
    li.appendChild(removeBtn);

    taskList.appendChild(li);

    // Remove 
    removeBtn.addEventListener('click', removeTask);
}

// Adicionar nova tarefa
function addTask(e) {
    e.preventDefault();

    const newTask = taskInput.value.trim();

    // Verificalção de repetição    
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    if (tasks.map(task => task.toLowerCase()).includes(newTask.toLowerCase())) {
        alert('Tarefa já adicionada!');
        taskInput.value = '';
        return;
    }

    createTaskElement(newTask);
    saveTask(newTask);
    taskInput.value = '';
}

// Salvar no Local Storage
function saveTask(task) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Remover uma tarefa
function removeTask(e) {
    const item = e.target.parentElement;
    taskList.removeChild(item);
    removeTaskFromLocalStorage(item.firstChild.textContent);
}
function removeTaskFromLocalStorage(task) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const filteredTasks = tasks.filter(t => t.toLowerCase() !== task.toLowerCase());
    localStorage.setItem('tasks', JSON.stringify(filteredTasks));
}

// Evento de submit ao formulário
taskForm.addEventListener('submit', addTask);

// Carregando tarefas
document.addEventListener('DOMContentLoaded', loadTasks);

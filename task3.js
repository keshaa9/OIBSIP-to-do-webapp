// Get references to the HTML elements
const taskInput = document.getElementById('taskInput');
const pendingTasksList = document.getElementById('pendingTasks');
const completedTasksList = document.getElementById('completedTasks');

// Create an array to store tasks
let tasks = [];

// Function to add a new task
function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText !== '') {
    const task = {
      id: Date.now(),
      text: taskText,
      completed: false,
      createdDate: new Date()
    };
    tasks.push(task);
    renderTasks();
    taskInput.value = '';
  }
}

// Function to render tasks in the respective lists
function renderTasks() {
  // Clear the lists
  pendingTasksList.innerHTML = '';
  completedTasksList.innerHTML = '';

  // Render pending tasks
  tasks.forEach(task => {
    const listItem = document.createElement('li');
    listItem.textContent = task.text;
    if (task.completed) {
      listItem.classList.add('completed');
      completedTasksList.appendChild(listItem);
    } else {
      const completeButton = createButton('Complete', () => markComplete(task.id));
      listItem.appendChild(completeButton);
      const deleteButton = createButton('Delete', () => deleteTask(task.id));
      listItem.appendChild(deleteButton);
      pendingTasksList.appendChild(listItem);
    }
  });
}

// Function to create a button element
function createButton(text, onClick) {
  const button = document.createElement('button');
  button.textContent = text;
  button.addEventListener('click', onClick);
  return button;
}

// Function to mark a task as complete
function markComplete(taskId) {
  const taskIndex = tasks.findIndex(task => task.id === taskId);
  if (taskIndex !== -1) {
    tasks[taskIndex].completed = true;
    renderTasks();
  }
}

// Function to delete a task
function deleteTask(taskId) {
  tasks = tasks.filter(task => task.id !== taskId);
  renderTasks();
}

// Initial rendering of tasks
renderTasks();

// Storing & Displaying the Tasks
document.addEventListener("DOMContentLoaded", () => {
  const tasksStored = JSON.parse(localStorage.getItem("tasks"));

  if (tasksStored) {
    tasksStored.forEach((task) => tasks.push(task));
    updateTasksList();
    updateProgress();
  }
});

let tasks = [];

// Saving Tasks To Local Storage
const save = () => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

// Adding Tasks
const addTask = () => {
  const createTask = document.getElementById("create-task");
  const text = createTask.value.trim();

  if (text) {
    tasks.push({ text: text, completed: false });
    createTask.value = "";
    updateTasksList();
    updateProgress();
    save();
  }
};

// Task Completion Toggle
const toggleTaskComplete = (index) => {
  tasks[index].completed = !tasks[index].completed;
  updateTasksList();
  updateProgress();
  save();
};

// Task Deletion
const deleteTask = (index) => {
  tasks.splice(index, 1);
  updateTasksList();
  updateProgress();
  save();
};

// Task Editing
const editTask = (index) => {
  const createTask = document.getElementById("create-task");
  createTask.value = tasks[index].text;

  tasks.splice(index, 1);
  updateTasksList();
  updateProgress();
  save();
};

// Progress Updation
const updateProgress = () => {
  const completedTasks = tasks.filter((task) => task.completed).length;
  const totalTasks = tasks.length;
  const progress = (completedTasks / totalTasks) * 100;
  const progBar = document.getElementById("progress");

  progBar.style.width = `${progress}%`;

  document.getElementById(
    "counter"
  ).innerText = `${completedTasks} / ${totalTasks}`;
};

// Updating Tasks List
const updateTasksList = () => {
  const taskList = document.getElementById("task-list");
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    const listItem = document.createElement("li");

    listItem.innerHTML = `
    <div class="task-item">
        <div class="task ${task.completed ? "completed" : ""}">
          <input type="checkbox" class="checkbox" ${
            task.completed ? "checked" : ""
          } />
          <p> ${task.text} </p>
        </div>
        <div class="icons">
          <image src="./img/edit-icon-png-3585.png" onClick="editTask(${index})" />
          <image src="./img/bin.png" onClick="deleteTask(${index})" />
        </div>
    </div>
    `;

    listItem.addEventListener("change", () => toggleTaskComplete(index));
    taskList.append(listItem);
  });
};

document.getElementById("new-task").addEventListener("click", function (e) {
  e.preventDefault();

  addTask();
});

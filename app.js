let tasks = [];

// Adding Tasks
const addTask = () => {
  const createTask = document.getElementById("create-task");
  const text = createTask.value.trim();

  if (text) {
    tasks.push({ text: text, completed: false });
    createTask.value = "";
    updateTasksList();
  }
};

// Task Completion Toggle
const toggleTaskComplete = (index) => {
  tasks[index].completed = !tasks[index].completed;
  updateTasksList();
};

// Task Deletion
const deleteTask = (index) => {
  tasks.splice(index, 1);
  updateTasksList();
  updateProgress();
};

// Task Editing
const editTask = (index) => {
  const createTask = document.getElementById("create-task");
  createTask.value = tasks[index].text;

  tasks.splice(index, 1);
  updateTasksList();
  updateProgress();
};

// Progress Updation
const updateProgress = () => {
  const completedTasks = tasks.filter((task) => task.completed).length;
  const totalTasks = tasks.length;
  const progress = (completedTasks / totalTasks) * 100;
  const progBar = document.getElementById("progress");

  progBar.style.widows = `${progress}%`;
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

let tasks = [];

// Adding Tasks
const addTask = () => {
  const createTask = document.getElementById("create-task");
  const text = createTask.value.trim();

  if (text) {
    tasks.push({ text: text, completed: false });

    updateTasksList();
  }
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

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
renderTasks();

addBtn.addEventListener("click", () => {
    const text = taskInput.value.trim();

    if (text === "") return;

    const newTask = {
        id: Date.now(),
        text: text,
        done: false
    };

    tasks.push(newTask);
    taskInput.value = "";

    saveAndRender();
});

function renderTasks() {
    taskList.innerHTML = "";

    tasks.forEach(task => {
        const li = document.createElement("li");

        if (task.done) li.classList.add("done");

        li.innerHTML = `
            <span class="taskText">${task.text}</span>
            <div>
                <button class="doneBtn">✔</button>
                <button class="delete">✖</button>
            </div>
        `;

        li.querySelector(".doneBtn").addEventListener("click", () => {
            task.done = !task.done;
            saveAndRender();
        });

        li.querySelector(".delete").addEventListener("click", () => {
            tasks = tasks.filter(t => t.id !== task.id);
            saveAndRender();
        });

        taskList.appendChild(li);
    });
}

function saveAndRender() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTasks();
}

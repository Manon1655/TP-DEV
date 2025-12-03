let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");

const todoList = document.getElementById("todo");
const doingList = document.getElementById("doing");
const doneList = document.getElementById("done");

renderTasks();

addBtn.addEventListener("click", () => {
    const text = taskInput.value.trim();
    if (text === "") return;

    const newTask = {
        id: Date.now(),
        text: text,
        status: "todo",
        timestamp: getTimestamp()
    };

    tasks.push(newTask);
    taskInput.value = "";

    saveAndRender();
});

function getTimestamp() {
    const now = new Date();
    const days = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];
    const day = days[now.getDay()];
    const date = now.toLocaleDateString();
    const hour = now.toLocaleTimeString();
    return `${day} • ${date} • ${hour}`;
}

function renderTasks() {

    todoList.innerHTML = "";
    doingList.innerHTML = "";
    doneList.innerHTML = "";

    tasks.forEach(task => {
        const li = document.createElement("li");

        li.innerHTML = `
            <div class="task-info">
                <span class="taskText ${task.status === "done" ? "done" : ""}">
                    ${task.text}
                </span>
                <span class="timestamp">Ajouté : ${task.timestamp}</span>
            </div>
        `;

        // Ajouter les boutons seulement si la tâche n'est pas terminée
        if (task.status !== "done") {
            const buttons = document.createElement("div");

            const validateBtn = document.createElement("button");
            validateBtn.className = "validate";
            validateBtn.textContent = "✔";
            validateBtn.addEventListener("click", () => {
                if (task.status === "todo") task.status = "doing";
                else if (task.status === "doing") task.status = "done";
                saveAndRender();
            });

            const deleteBtn = document.createElement("button");
            deleteBtn.className = "delete";
            deleteBtn.textContent = "✖";
            deleteBtn.addEventListener("click", () => {
                tasks = tasks.filter(t => t.id !== task.id);
                saveAndRender();
            });

            buttons.appendChild(validateBtn);
            buttons.appendChild(deleteBtn);
            li.appendChild(buttons);
        }

        if (task.status === "todo") todoList.appendChild(li);
        else if (task.status === "doing") doingList.appendChild(li);
        else if (task.status === "done") doneList.appendChild(li);
    });
}

function saveAndRender() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTasks();
}

renderTasks();

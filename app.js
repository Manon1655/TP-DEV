let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");

const resetBtn = document.createElement("button");
resetBtn.textContent = "Réinitialiser";
resetBtn.style.marginLeft = "10px";
resetBtn.style.padding = "12px 18px";
resetBtn.style.borderRadius = "12px";
resetBtn.style.border = "none";
resetBtn.style.background = "#4a2e07ff";
resetBtn.style.color = "#fff";
resetBtn.style.cursor = "pointer";
resetBtn.style.fontWeight = "700";
addBtn.parentNode.appendChild(resetBtn);

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

resetBtn.addEventListener("click", () => {
    const confirmed = confirm("Voulez-vous vraiment supprimer toutes les tâches terminées ?");
    if (confirmed) {
        tasks = tasks.filter(t => t.status !== "done");
        saveAndRender();
        alert("Les tâches terminées ont été supprimées !");
    }
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

        if (task.status !== "done") {
            const buttons = document.createElement("div");

            const validateBtn = document.createElement("button");
            validateBtn.className = "validate";
            validateBtn.textContent = "✔";
            validateBtn.addEventListener("click", () => {

                if (task.status === "todo" && tasks.some(t => t.status === "doing")) {
                    alert("Vous devez d'abord terminer la tâche en cours !");
                    return;
                }

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

let user = getCurrentUser();

if (!user) {
    window.location.href = "index.html";
}

function handleLogout() {
    logout();
    window.location.href = "index.html";
}

function openTaskModal() {
    let subjects = JSON.parse(localStorage.getItem("subjects_" + user)) || [];

    if (subjects.length === 0) {
        alert("Add a subject first");
        return;
    }

    document.getElementById("taskModal").style.display = "flex";
    loadSubjectsToSelect();
}

function closeTaskModal() {
    document.getElementById("taskModal").style.display = "none";
}

function addSubject() {
    let name = document.getElementById("subjectName").value;

    if (!name) return;

    let subjects = JSON.parse(localStorage.getItem("subjects_" + user)) || [];

    subjects.push({ name: name });

    localStorage.setItem("subjects_" + user, JSON.stringify(subjects));

    document.getElementById("subjectName").value = "";
    closeSubjectModal();
    loadSubjects();
}

function loadSubjects() {
    let subjects = JSON.parse(localStorage.getItem("subjects_" + user)) || [];
    let container = document.getElementById("subjectList");

    container.innerHTML = "";

    for (let i = 0; i < subjects.length; i++) {
        let div = document.createElement("div");

        if (currentFilter === subjects[i].name) {
            div.className = "task-card subject-selected";
        } else {
            div.className = "task-card";
        }

        div.innerText = subjects[i].name;

        div.onclick = function() {
            filterBySubject(subjects[i].name);
        };

        container.appendChild(div);
    }
}

function loadSubjectsToSelect() {
    let subjects = JSON.parse(localStorage.getItem("subjects_" + user)) || [];
    let select = document.getElementById("taskSubject");

    select.innerHTML = "<option value=''>Select Subject</option>";

    for (let i = 0; i < subjects.length; i++) {
        let option = document.createElement("option");
        option.value = subjects[i].name;
        option.innerText = subjects[i].name;
        select.appendChild(option);
    }
}

function addTask() {
    let title = document.getElementById("taskTitle").value;
    let date = document.getElementById("taskDate").value;
    let subject = document.getElementById("taskSubject").value;

    if (!title || !date || !subject) return;

    let tasks = JSON.parse(localStorage.getItem("tasks_" + user)) || [];

    tasks.push({
        id: Date.now(),
        title: title,
        dueDate: date,
        subject: subject,
        completed: false
    });

    localStorage.setItem("tasks_" + user, JSON.stringify(tasks));

    closeTaskModal();
    loadTasks();
}

let currentFilter = null;

function filterBySubject(subject) {
    if (currentFilter === subject) {
        currentFilter = null;
    } else {
        currentFilter = subject;
    }
    loadTasks();
    loadSubjects();
}

function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem("tasks_" + user)) || [];
    let container = document.getElementById("taskList");

    container.innerHTML = "";

    for (let i = 0; i < tasks.length; i++) {

        if (currentFilter && tasks[i].subject !== currentFilter) continue;

        let div = document.createElement("div");
        div.className = "task-card";

        let status = tasks[i].completed ? "Completed" : "Pending";

        div.innerHTML =
            "<div style='display:flex; justify-content:space-between; gap:10px;'>" +
                "<div>" +
                    "<b>" + tasks[i].title + "</b><br>" +
                    tasks[i].subject + "<br>" +
                    tasks[i].dueDate + "<br>" +
                    status +
                "</div>" +
                "<div style='display:flex; flex-direction:column; gap:5px;'>" +
                    "<button onclick='toggleTask(" + tasks[i].id + ")'>Toggle</button>" +
                    "<button onclick='deleteTask(" + tasks[i].id + ")'>Delete</button>" +
                "</div>" +
            "</div>";

        container.appendChild(div);
    }
}

function toggleTask(id) {
    let tasks = JSON.parse(localStorage.getItem("tasks_" + user)) || [];

    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].id === id) {
            tasks[i].completed = !tasks[i].completed;
        }
    }

    localStorage.setItem("tasks_" + user, JSON.stringify(tasks));
    loadTasks();
}

function deleteTask(id) {
    let tasks = JSON.parse(localStorage.getItem("tasks_" + user)) || [];

    tasks = tasks.filter(t => t.id !== id);

    localStorage.setItem("tasks_" + user, JSON.stringify(tasks));
    loadTasks();
}

function openSubjectModal() {
    document.getElementById("subjectModal").style.display = "flex";
}

function closeSubjectModal() {
    document.getElementById("subjectModal").style.display = "none";
}

window.onclick = function(e) {
    let modals = document.getElementsByClassName("modal");
    for (let i = 0; i < modals.length; i++) {
        if (e.target === modals[i]) {
            modals[i].style.display = "none";
        }
    }
}

loadSubjects();
loadTasks();

if (localStorage.getItem("openTaskModal") === "true") {
    openTaskModal();
    localStorage.removeItem("openTaskModal");
}
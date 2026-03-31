let user = getCurrentUser();

if (!user) {
    window.location.href = "index.html";
}

function handleLogout() {
    logout();
    window.location.href = "index.html";
}

function goToStudy() {
    window.location.href = "study.html";
}

function loadGreeting() {
    let users = getUsers();
    let name = user;

    for (let i = 0; i < users.length; i++) {
        if (users[i].userId === user) {
            name = users[i].name;
        }
    }

    let greet = document.getElementById("greeting");
    let dateEl = document.getElementById("date");

    let hours = new Date().getHours();
    let text = "GOOD EVENING";

    if (hours < 12) text = "GOOD MORNING";
    else if (hours < 18) text = "GOOD AFTERNOON";

    greet.innerText = text + ", " + name.toUpperCase();

    let today = new Date();
    dateEl.innerText = today.toDateString().toUpperCase();
}

function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem("tasks_" + user)) || [];
    let container = document.getElementById("urgentTasks");

    container.innerHTML = "";

    let today = new Date();

    let overdue = [];
    let upcoming = [];
    let completed = [];

    for (let i = 0; i < tasks.length; i++) {
        let t = tasks[i];
        let d = new Date(t.dueDate);

        if (t.completed) completed.push(t);
        else if (d < today) overdue.push(t);
        else upcoming.push(t);
    }

    upcoming.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));

    let displayTasks = overdue.concat(upcoming.slice(0, 4));

    for (let i = 0; i < displayTasks.length; i++) {
        let div = document.createElement("div");
        div.className = "task-card";

        div.innerHTML =
            "<b>" + displayTasks[i].title + "</b><br>" +
            displayTasks[i].subject + "<br>" +
            displayTasks[i].dueDate;

        container.appendChild(div);
    }

    drawProgress(tasks, completed.length, upcoming.length, overdue.length);

    document.getElementById("legendCompleted").innerHTML =
    "<span class='dot green'></span> Completed (" + completed.length + ")";

    document.getElementById("legendPending").innerHTML =
        "<span class='dot orange'></span> Pending (" + upcoming.length + ")";

    document.getElementById("legendOverdue").innerHTML =
        "<span class='dot red'></span> Overdue (" + overdue.length + ")";
}

function drawProgress(tasks, completedCount, pendingCount, overdueCount) {
    let canvas = document.getElementById("progressCanvas");
    let ctx = canvas.getContext("2d");

    let total = tasks.length || 1;

    let completed = completedCount / total;
    let pending = pendingCount / total;
    let overdue = overdueCount / total;

    let center = 70;
    let radius = 55;

    let start = -Math.PI / 2;

    ctx.clearRect(0, 0, 140, 140);

    function draw(color, fraction) {
        ctx.beginPath();
        ctx.arc(center, center, radius, start, start + fraction * 2 * Math.PI);
        ctx.strokeStyle = color;
        ctx.lineWidth = 10;
        ctx.stroke();
        start += fraction * 2 * Math.PI;
    }

    draw("green", completed);
    draw("orange", pending);
    draw("red", overdue);

    ctx.font = "16px Arial";
    ctx.fillStyle = "black";
    ctx.fillText(Math.round(completed * 100) + "% done", center - 35, center + 5);
}

function loadEvents() {
    let events = JSON.parse(localStorage.getItem("events_" + user)) || [];
    let container = document.getElementById("eventsList");

    container.innerHTML = "";

    for (let i = 0; i < events.length; i++) {
        if (events[i].completed) continue;

        let div = document.createElement("div");
        div.className = "event-card";

        div.innerHTML = "<b>" + events[i].title + "</b><br>" + events[i].date;

        container.appendChild(div);
    }
}

function openLink(url) {
    window.open(url, "_blank");
}

function goToEvents() {
    window.location.href = "events.html";
}

function goToCalendar() {
    window.location.href = "calendar.html";
}

function quickAddTask() {
    localStorage.setItem("openTaskModal", "true");
    window.location.href = "study.html";
}

function quickAddEvent() {
    localStorage.setItem("openEventModal", "true");
    window.location.href = "events.html";
}

loadGreeting();
loadTasks();
loadEvents();
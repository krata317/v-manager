let user = getCurrentUser();

if (!user) {
    window.location.href = "index.html";
}

function handleLogout() {
    logout();
    window.location.href = "index.html";
}

function loadCalendar() {
    let tasks = JSON.parse(localStorage.getItem("tasks_" + user)) || [];
    let events = JSON.parse(localStorage.getItem("events_" + user)) || [];

    let today = new Date();
    let year = today.getFullYear();
    let month = today.getMonth();

    let firstDay = new Date(year, month, 1).getDay();
    let daysInMonth = new Date(year, month + 1, 0).getDate();

    let grid = document.getElementById("calendarGrid");
    grid.innerHTML = "";

    let title = document.getElementById("calendarTitle");
    let months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    title.innerText = months[month] + " " + year;

    for (let i = 0; i < firstDay; i++) {
        let empty = document.createElement("div");
        grid.appendChild(empty);
    }

    for (let d = 1; d <= daysInMonth; d++) {
        let dateStr = year + "-" + String(month + 1).padStart(2, "0") + "-" + String(d).padStart(2, "0");

        let cell = document.createElement("div");
        cell.className = "calendar-cell";

        let day = document.createElement("div");
        day.innerText = d;
        cell.appendChild(day);

        for (let i = 0; i < tasks.length; i++) {
            if (tasks[i].dueDate === dateStr) {
                let item = document.createElement("div");
                item.className = "calendar-item";
                item.innerText = tasks[i].title + " (" + tasks[i].subject + ")";
                item.onclick = function() {
                    window.location.href = "study.html";
                };
                cell.appendChild(item);
            }
        }

        for (let i = 0; i < events.length; i++) {
            if (events[i].date === dateStr) {
                let item = document.createElement("div");
                item.className = "calendar-item event";

                let text = events[i].title;

                item.innerText = text;

                item.onclick = function() {
                    window.location.href = "events.html";
                };

                cell.appendChild(item);
            }
        }

        grid.appendChild(cell);
    }
}

loadCalendar();
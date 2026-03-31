let user = getCurrentUser();

if (!user) {
    window.location.href = "index.html";
}

function handleLogout() {
    logout();
    window.location.href = "index.html";
}

function openEventModal() {
    document.getElementById("eventModal").style.display = "flex";
}

function closeEventModal() {
    document.getElementById("eventModal").style.display = "none";
}

function addEvent() {
    let title = document.getElementById("eventTitle").value;
    let date = document.getElementById("eventDate").value;
    let desc = document.getElementById("eventDesc").value;
    let club = document.getElementById("eventClub").value;
    let mode = document.getElementById("eventMode").value;
    let location = document.getElementById("eventLocation").value;

    if (!title || !date || !mode) return;

    let events = JSON.parse(localStorage.getItem("events_" + user)) || [];

    events.push({
        id: Date.now(),
        title: title,
        date: date,
        description: desc,
        club: club,
        mode: mode,
        location: location,
        completed: false
    });

    localStorage.setItem("events_" + user, JSON.stringify(events));

    closeEventModal();
    loadEvents();
}

function deleteEvent(id) {
    let events = JSON.parse(localStorage.getItem("events_" + user)) || [];

    events = events.filter(e => e.id !== id);

    localStorage.setItem("events_" + user, JSON.stringify(events));

    loadEvents();
}

function loadEvents() {
    let events = JSON.parse(localStorage.getItem("events_" + user)) || [];
    let container = document.getElementById("eventsContainer");

    container.innerHTML = "";

    events.sort((a, b) => new Date(a.date) - new Date(b.date));

    for (let i = 0; i < events.length; i++) {
        let div = document.createElement("div");
        div.className = "event-card";

        let html =
            "<div style='display:flex; justify-content:space-between; gap:10px;'>" +
                "<div>" +
                    "<b>" + events[i].title + "</b>" +
                    (events[i].completed ? "<br/> Completed" : "<br/> Upcoming") +
                    "<br>" + events[i].date;

        if (events[i].description) html += "<br>" + events[i].description;
        if (events[i].club) html += "<br>Club: " + events[i].club;
        if (events[i].mode) html += "<br>" + events[i].mode;
        if (events[i].location) html += "<br>" + events[i].location;

        html += "</div>";

        html +=
                "<div style='display:flex; flex-direction:column; gap:5px;'>" +
                    "<button onclick='toggleEvent(" + events[i].id + ")'>Toggle</button>" +
                    "<button onclick='deleteEvent(" + events[i].id + ")'>Delete</button>" +
                "</div>" +
            "</div>";

        div.innerHTML = html;

        container.appendChild(div);
    }
}

function toggleEvent(id) {
    let events = JSON.parse(localStorage.getItem("events_" + user)) || [];

    for (let i = 0; i < events.length; i++) {
        if (events[i].id === id) {
            events[i].completed = !events[i].completed;
        }
    }

    localStorage.setItem("events_" + user, JSON.stringify(events));
    loadEvents();
}

window.onclick = function(e) {
    let modals = document.getElementsByClassName("modal");
    for (let i = 0; i < modals.length; i++) {
        if (e.target === modals[i]) {
            modals[i].style.display = "none";
        }
    }
}

loadEvents();

if (localStorage.getItem("openEventModal") === "true") {
    openEventModal();
    localStorage.removeItem("openEventModal");
}
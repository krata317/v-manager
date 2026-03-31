function showRegister() {
    document.getElementById("loginForm").style.display = "none";
    document.getElementById("registerForm").style.display = "block";
}

function showLogin() {
    document.getElementById("registerForm").style.display = "none";
    document.getElementById("loginForm").style.display = "block";
}

function register() {
    let name = document.getElementById("registerName").value;
    let userId = document.getElementById("registerUserId").value;
    let password = document.getElementById("registerPassword").value;

    if (!name || !userId || password.length < 4) {
        alert("Fill all fields properly");
        return;
    }

    let users = getUsers();

    for (let i = 0; i < users.length; i++) {
        if (users[i].userId === userId) {
            alert("User ID already exists");
            return;
        }
    }

    users.push({ name: name, userId: userId, password: password });
    saveUsers(users);

    localStorage.setItem("tasks_" + userId, JSON.stringify([]));
    localStorage.setItem("subjects_" + userId, JSON.stringify([]));
    localStorage.setItem("events_" + userId, JSON.stringify([]));

    alert("Account created");
    showLogin();
}

function login() {
    let userId = document.getElementById("loginUserId").value;
    let password = document.getElementById("loginPassword").value;

    let users = getUsers();

    for (let i = 0; i < users.length; i++) {
        if (users[i].userId === userId && users[i].password === password) {
            setCurrentUser(userId);
            window.location.href = "dashboard.html";
            return;
        }
    }

    alert("Invalid credentials");
}
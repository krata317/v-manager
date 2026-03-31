function getUsers() {
    let users = localStorage.getItem("users");
    if (!users) {
        localStorage.setItem("users", JSON.stringify([]));
        return [];
    }
    return JSON.parse(users);
}

function saveUsers(users) {
    localStorage.setItem("users", JSON.stringify(users));
}

function setCurrentUser(username) {
    localStorage.setItem("currentUser", username);
}

function getCurrentUser() {
    return localStorage.getItem("currentUser");
}

function logout() {
    localStorage.removeItem("currentUser");
}
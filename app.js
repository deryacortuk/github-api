const githubForm = document.getElementById("github-form");
const nameInput = document.getElementById("githubname");
const clearLastUsers = document.getElementById("clear-last-users");

const lastUsers = document.getElementById("last-users");
const github = new GitHub();
const ui = new UI();





eventlisteners();

function eventlisteners() {
    githubForm.addEventListener("submit", getData);
    clearLastUsers.addEventListener("click", clearAllSearch);
    document.addEventListener("DOMContentLoad", getAllSearch);

}

function getData(e) {
    let username = nameInput.value.trim();
    if (username === "") {
        alert("you must enter username");
    } else {
        github.getGithubData(username)
            .then(response => {
                if (response.user.message === "not found") {
                    ui.showError("user was not found");
                } else {
                    ui.addSearchedUserToUI(username);
                    Storage.addSearchedUserToStorage(username);

                    ui.showUserInfo(response.user);
                    ui.showRepoInfo(response.repo);


                }
            })
            .catch(err => ui.showError(err));


    }
    ui.clearInput();
    e.preventDefault();
}

function clearAllSearch() {
    if (confirm("sure???")) {

        Storage.ClearAllSearchedUsersFromStorage();
        ui.clearAllSearchedFromUI();

    }


}

function getAllSearch() {
    let users = Storage.getSearchedUsersFromStorage();
    let result = "";
    users.forEach(user => {

        resul += `
        <li class="list-group-item">${user}</li>
        
        `

    });
    lastUsers.innerHTML = result;

}
let Users = [];

let updateIndex = 0;

const btn = document.getElementById('mybtn');

// CHANGING ADD OR UPDATE
function saveorupdate() {
    if (btn.innerHTML == "Save") {
        addUser();
    }
    else {
        updateUser();
    }
}

// ADDING NEW USER TO THE API
function addUser() {
    const url = "https://baraneedotnetcorewebapi.herokuapp.com/api/Users";

    let userName = document.getElementById('userName');
    let userEmail = document.getElementById('userEmail');

    const newUser = {
        name: userName.value,
        email: userEmail.value
    };

    let xhr = new XMLHttpRequest();

    xhr.open("POST", url, true);

    xhr.setRequestHeader("Content-type", "application/json");

    xhr.send(JSON.stringify(newUser));

    userName.value = "";
    userEmail.value = "";

}

// DELETING AN USER IN THE API
function deleteUser(id) {
    const url = `https://baraneedotnetcorewebapi.herokuapp.com/api/Users/${id}`;

    const item = {
        userId: id,
        userName: document.getElementById("userName").value.trim(),
        userEmail: document.getElementById("userEmail").value.trim(),
    };

    let xhr = new XMLHttpRequest();

    xhr.open("DELETE", url, true);

    xhr.setRequestHeader("Content-type", "application/json");

    xhr.send(JSON.stringify(item));

    getUsers();
}

// EDIT THE USER
function editUser(id) {
    const url = `https://baraneedotnetcorewebapi.herokuapp.com/api/Users/${id}`;

    btn.innerHTML = "Update";

    const item = Users.find((item) => item.id === id);

    document.getElementById("userName").value = item.name;

    document.getElementById("userEmail").value = item.email;

    updateIndex = id;
}

// UPDATE THE USER DETAILS
function updateUser() {
    const url = `https://baraneedotnetcorewebapi.herokuapp.com/api/Users/${updateIndex}`;

    const item = {
        id: updateIndex,
        name: document.getElementById("userName").value.trim(),
        email: document.getElementById("userEmail").value.trim(),
    };

    let xhr = new XMLHttpRequest();

    xhr.open("PUT", url, true);

    xhr.setRequestHeader("Content-type", "application/json");

    xhr.send(JSON.stringify(item));

    btn.innerHTML = "Save";

    document.getElementById("userName").value = "";

    document.getElementById("userEmail").value = "";

    updateIndex = 0;

    getUsers();
}

// READ ALL USERS
function getUsers() {
    const url = "https://baraneedotnetcorewebapi.herokuapp.com/api/Users";
    let xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            displayUsers(JSON.parse(xhr.responseText));
        }
    };
    xhr.open("GET", url, true);
    xhr.send();
}


// COUNTING TOTAL COUNTRIES
function getCount(itemCount) {

    let counter = document.getElementById('counter');

    let name = 'user';

    if (itemCount) {
        if (itemCount > 1) {
            name = 'users';
        }
        counter.innerHTML = itemCount + ' ' + name;
    }
    else {
        counter.innerHTML = 'No ' + name;
    }
}


// DISPLAY ALL USERS
function displayUsers(data) {
    const tBody = document.getElementById('users');

    tBody.innerHTML = "";

    getCount(data.length);

    const button = document.createElement("button");

    data.forEach((user) => {

        // EDIT BUTTON
        let editButton = button.cloneNode(false);
        editButton.innerText = "Edit";
        editButton.setAttribute("onclick", `editUser(${user.id})`);
        editButton.setAttribute("class", "btn btn-warning");

        // DELETE BUTTON
        let deleteButton = button.cloneNode(false);
        deleteButton.innerText = "Delete";
        deleteButton.setAttribute("onclick", `deleteUser(${user.id})`);
        deleteButton.setAttribute("class", "btn btn-danger");

        // Creating a row in the table
        let tr = tBody.insertRow();

        // Adding data to the table columns
        let td1 = tr.insertCell(0);
        let userID = document.createTextNode(user.id);
        td1.appendChild(userID);

        let td2 = tr.insertCell(1);
        let userName = document.createTextNode(user.name);
        td2.appendChild(userName);

        let td3 = tr.insertCell(2);
        let userEmail = document.createTextNode(user.email);
        td3.appendChild(userEmail);

        let td4 = tr.insertCell(3);
        td4.appendChild(editButton);

        let td5 = tr.insertCell(4);
        td5.appendChild(deleteButton);
    });
    Users = data;
}

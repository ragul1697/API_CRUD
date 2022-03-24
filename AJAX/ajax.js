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

    let userName = document.getElementById('userName');
    let userEmail = document.getElementById('userEmail');

    const newUser = {
        name: userName.value,
        email: userEmail.value
    };

    $.ajax({
        type: "POST",
        url: "https://baraneedotnetcorewebapi.herokuapp.com/api/Users",
        data: JSON.stringify(newUser),
        // dataType: 'json',
        contentType: 'application/json',
        success: function () {
            getUsers();
        },
        error: function () {
            alert("ERROR WHILE ADDING NEW USER");
        },
    });

    userName.value = "";
    userEmail.value = "";
}

// DELETING AN USER IN THE API
function deleteUser(id) {

    const deleteUser = {
        userId: id,
        userName: document.getElementById("userName").value.trim(),
        userEmail: document.getElementById("userEmail").value.trim(),
    };

    $.ajax({
        type: "DELETE",
        url: `https://baraneedotnetcorewebapi.herokuapp.com/api/Users/${id}`,
        data: JSON.stringify(deleteUser),
        success: function () {
            getUsers();
        },
        error: function () {
            alert("ERROR WHILE DELETING THE USER");
        },
    });
}

// EDIT THE USER
function editUser(id) {

    btn.innerHTML = "Update";

    const item = Users.find((item) => item.id === id);

    document.getElementById("userName").value = item.name;

    document.getElementById("userEmail").value = item.email;

    updateIndex = id;
}

// UPDATE THE USER DETAILS
function updateUser() {

    const updateUser = {
        id: updateIndex,
        name: document.getElementById("userName").value.trim(),
        email: document.getElementById("userEmail").value.trim(),
    };

    $.ajax({
        type: "PUT",
        url: `https://baraneedotnetcorewebapi.herokuapp.com/api/Users/${updateIndex}`,
        data: JSON.stringify(updateUser),
        dataType: 'json',
        contentType: 'application/json',
        success: function () {
            getUsers();
            btn.innerHTML = "Save";

            document.getElementById("userName").value = "";

            document.getElementById("userEmail").value = "";
        },
        error: function () {
            alert("ERROR WHILE UPDATING THE USER");
        },
    });
}

// READ ALL USERS
function getUsers() {
    $.ajax({
        type: "GET",
        url: "https://baraneedotnetcorewebapi.herokuapp.com/api/Users",
        dataType: "json",
        success: function (result) {
            displayUsers(result);
        },
        error: function (result) {
            alert("ERROR WHILE GETTING THE USER");
        },
    });
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
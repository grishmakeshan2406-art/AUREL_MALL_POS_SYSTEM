document.addEventListener("DOMContentLoaded", function () {


    let users =
        JSON.parse(localStorage.getItem("users")) || [];


    const userForm =
        document.getElementById("userForm");

    const usersContainer =
        document.getElementById("usersContainer");

    const emptyUsers =
        document.getElementById("emptyUsers");

    const searchInput =
        document.getElementById("userSearch");

    const roleFilter =
        document.getElementById("roleFilter");

    const statusFilter =
        document.getElementById("statusFilter");


    // ===============================
    // SAMPLE USERS
    // ===============================

    if (users.length === 0) {

        users = [

            {
                id: Date.now() + 1,
                name: "Customer 01",
                email: "customer01@gmail.com",
                role: "Customer",
                status: "Active"
            },

            {
                id: Date.now() + 2,
                name: "Customer 02",
                email: "customer02@gmail.com",
                role: "Customer",
                status: "Active"
            },

            {
                id: Date.now() + 3,
                name: "Customer 03",
                email: "customer03@gmail.com",
                role: "Customer",
                status: "Inactive"
            },

            {
                id: Date.now() + 4,
                name: "Rahul Sharma",
                email: "rahul@smartgen.com",
                role: "Shop Owner",
                status: "Active"
            },

            {
                id: Date.now() + 5,
                name: "Priya Singh",
                email: "priya@smartgen.com",
                role: "Shop Owner",
                status: "Active"
            }

        ];


        saveUsers();

    }


    loadUsers();


    // ===============================
    // ADD USER
    // ===============================

    userForm.addEventListener("submit", function (event) {

        event.preventDefault();


        const name =
            document.getElementById("userName")
                .value.trim();


        const email =
            document.getElementById("userEmail")
                .value.trim();


        const role =
            document.getElementById("userRole")
                .value;


        if (!name || !email || !role) {

            alert("Please fill in all user details.");

            return;

        }


        const existingUser =
            users.find(
                user =>
                    user.email.toLowerCase() ===
                    email.toLowerCase()
            );


        if (existingUser) {

            alert("A user with this email already exists.");

            return;

        }


        const user = {

            id: Date.now(),

            name: name,

            email: email,

            role: role,

            status: "Active"

        };


        users.push(user);


        saveUsers();


        userForm.reset();


        alert("User added successfully.");

    });


    // ===============================
    // SAVE USERS
    // ===============================

    function saveUsers() {

        localStorage.setItem(
            "users",
            JSON.stringify(users)
        );

        loadUsers();

    }


    // ===============================
    // LOAD USERS
    // ===============================

    function loadUsers() {

        usersContainer.innerHTML = "";


        updateSummary();


        const search =
            searchInput.value
                .trim()
                .toLowerCase();


        const selectedRole =
            roleFilter.value;


        const selectedStatus =
            statusFilter.value;


        const filteredUsers =
            users.filter(function (user) {


                const matchesSearch =
                    user.name
                        .toLowerCase()
                        .includes(search) ||

                    user.email
                        .toLowerCase()
                        .includes(search);


                const matchesRole =
                    selectedRole === "All" ||
                    user.role === selectedRole;


                const matchesStatus =
                    selectedStatus === "All" ||
                    user.status === selectedStatus;


                return (
                    matchesSearch &&
                    matchesRole &&
                    matchesStatus
                );

            });


        document.getElementById("userCount")
            .textContent =
                filteredUsers.length +
                (
                    filteredUsers.length === 1
                        ? " user"
                        : " users"
                );


        if (filteredUsers.length === 0) {

            emptyUsers.style.display = "block";

            return;

        }


        emptyUsers.style.display = "none";


        filteredUsers.forEach(function (user) {

            createUserCard(user);

        });

    }


    // ===============================
    // CREATE USER CARD
    // ===============================

    function createUserCard(user) {

        const card =
            document.createElement("div");

        card.className = "user-card";


        const statusClass =
            user.status === "Active"
                ? "status-active"
                : "status-inactive";


        card.innerHTML = `

            <div class="user-card-header">

                <div>

                    <h3>
                        ${user.name}
                    </h3>

                    <p class="user-email">
                        ${user.email}
                    </p>

                </div>

                <span class="user-role">
                    ${user.role}
                </span>

            </div>


            <div class="user-info">

                <div>

                    <p>
                        USER ID
                    </p>

                    <strong>
                        SGU-${user.id.toString().slice(-5)}
                    </strong>

                </div>


                <div>

                    <p>
                        STATUS
                    </p>

                    <strong>
                        <span class="user-status ${statusClass}">
                            ${user.status}
                        </span>
                    </strong>

                </div>

            </div>


            <div class="user-actions">

                <button
                    class="toggle-button"
                    onclick="toggleUser(${user.id})"
                >
                    ${
                        user.status === "Active"
                            ? "Deactivate"
                            : "Activate"
                    }
                </button>


                <button
                    class="delete-button"
                    onclick="deleteUser(${user.id})"
                >
                    Delete
                </button>

            </div>

        `;


        usersContainer.appendChild(card);

    }


    // ===============================
    // SUMMARY
    // ===============================

    function updateSummary() {

        const total =
            users.length;


        const customers =
            users.filter(
                user => user.role === "Customer"
            ).length;


        const owners =
            users.filter(
                user => user.role === "Shop Owner"
            ).length;


        const active =
            users.filter(
                user => user.status === "Active"
            ).length;


        document.getElementById("totalUsers")
            .textContent = total;


        document.getElementById("totalCustomers")
            .textContent = customers;


        document.getElementById("totalOwners")
            .textContent = owners;


        document.getElementById("activeUsers")
            .textContent = active;

    }


    // ===============================
    // TOGGLE USER
    // ===============================

    window.toggleUser = function (id) {

        const user =
            users.find(
                user => user.id === id
            );


        if (!user) {

            return;

        }


        if (user.status === "Active") {

            user.status = "Inactive";

        } else {

            user.status = "Active";

        }


        saveUsers();

    };


    // ===============================
    // DELETE USER
    // ===============================

    window.deleteUser = function (id) {

        const user =
            users.find(
                user => user.id === id
            );


        if (!user) {

            return;

        }


        const confirmDelete =
            confirm(
                `Delete ${user.name}?`
            );


        if (!confirmDelete) {

            return;

        }


        users =
            users.filter(
                user => user.id !== id
            );


        saveUsers();

    };


    // ===============================
    // SEARCH
    // ===============================

    searchInput.addEventListener(
        "input",
        function () {

            loadUsers();

        }
    );


    // ===============================
    // ROLE FILTER
    // ===============================

    roleFilter.addEventListener(
        "change",
        function () {

            loadUsers();

        }
    );


    // ===============================
    // STATUS FILTER
    // ===============================

    statusFilter.addEventListener(
        "change",
        function () {

            loadUsers();

        }
    );

});
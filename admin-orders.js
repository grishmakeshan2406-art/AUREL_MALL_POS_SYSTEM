document.addEventListener("DOMContentLoaded", function () {


    let orders =
        JSON.parse(localStorage.getItem("orders")) || [];


    const ordersContainer =
        document.getElementById("ordersContainer");

    const emptyOrders =
        document.getElementById("emptyOrders");

    const searchInput =
        document.getElementById("orderSearch");

    const statusFilter =
        document.getElementById("statusFilter");


    // ===============================
    // SAMPLE ORDERS
    // ===============================

    if (orders.length === 0) {

        orders = [

            {
                id: "SGM-82453121",
                customer: "Customer 01",
                shop: "Style Studio",
                amount: 2899,
                items: 2,
                date: "18 Aug 2026",
                status: "Completed"
            },

            {
                id: "SGM-82453122",
                customer: "Customer 02",
                shop: "Tech World",
                amount: 1999,
                items: 1,
                date: "18 Aug 2026",
                status: "Processing"
            },

            {
                id: "SGM-82453123",
                customer: "Customer 03",
                shop: "Home & Living",
                amount: 4250,
                items: 3,
                date: "18 Aug 2026",
                status: "Completed"
            },

            {
                id: "SGM-82453124",
                customer: "Customer 04",
                shop: "Style Studio",
                amount: 799,
                items: 1,
                date: "18 Aug 2026",
                status: "Pending"
            }

        ];


        saveOrders();

    }


    loadOrders();


    // ===============================
    // SAVE ORDERS
    // ===============================

    function saveOrders() {

        localStorage.setItem(
            "orders",
            JSON.stringify(orders)
        );

    }


    // ===============================
    // LOAD ORDERS
    // ===============================

    function loadOrders() {

        ordersContainer.innerHTML = "";

        updateSummary();


        const search =
            searchInput.value
                .trim()
                .toLowerCase();


        const filter =
            statusFilter.value;


        const filteredOrders =
            orders.filter(function (order) {

                const matchesSearch =
                    order.id
                        .toLowerCase()
                        .includes(search) ||

                    order.customer
                        .toLowerCase()
                        .includes(search) ||

                    order.shop
                        .toLowerCase()
                        .includes(search);


                const matchesStatus =
                    filter === "All" ||
                    order.status === filter;


                return matchesSearch && matchesStatus;

            });


        document.getElementById("orderCount")
            .textContent =
                filteredOrders.length +
                (
                    filteredOrders.length === 1
                        ? " order"
                        : " orders"
                );


        if (filteredOrders.length === 0) {

            emptyOrders.style.display = "block";

            return;

        }


        emptyOrders.style.display = "none";


        filteredOrders.forEach(function (order) {

            createOrderCard(order);

        });

    }


    // ===============================
    // CREATE ORDER CARD
    // ===============================

    function createOrderCard(order) {

        const card =
            document.createElement("div");

        card.className = "order-card";


        let statusClass = "";

        if (order.status === "Pending") {

            statusClass = "status-pending";

        } else if (order.status === "Processing") {

            statusClass = "status-processing";

        } else if (order.status === "Completed") {

            statusClass = "status-completed";

        } else {

            statusClass = "status-cancelled";

        }


        card.innerHTML = `

            <div class="order-header">

                <div>

                    <h3>
                        ${order.id}
                    </h3>

                    <p class="order-customer">
                        ${order.customer}
                    </p>

                </div>


                <span class="order-status ${statusClass}">
                    ${order.status}
                </span>

            </div>


            <div class="order-info">

                <div>

                    <p>
                        SHOP
                    </p>

                    <strong>
                        ${order.shop}
                    </strong>

                </div>


                <div>

                    <p>
                        ITEMS
                    </p>

                    <strong>
                        ${order.items}
                    </strong>

                </div>


                <div>

                    <p>
                        AMOUNT
                    </p>

                    <strong>
                        ₹${Number(order.amount).toLocaleString("en-IN")}
                    </strong>

                </div>


                <div>

                    <p>
                        DATE
                    </p>

                    <strong>
                        ${order.date}
                    </strong>

                </div>

            </div>


            <div class="order-actions">

                <button
                    class="status-button"
                    onclick="changeOrderStatus('${order.id}')"
                >
                    Change Status
                </button>


                <button
                    class="delete-button"
                    onclick="deleteOrder('${order.id}')"
                >
                    Delete
                </button>

            </div>

        `;


        ordersContainer.appendChild(card);

    }


    // ===============================
    // UPDATE SUMMARY
    // ===============================

    function updateSummary() {

        const total =
            orders.length;


        const pending =
            orders.filter(
                order => order.status === "Pending"
            ).length;


        const processing =
            orders.filter(
                order => order.status === "Processing"
            ).length;


        const completed =
            orders.filter(
                order => order.status === "Completed"
            ).length;


        document.getElementById("totalOrders")
            .textContent = total;


        document.getElementById("pendingOrders")
            .textContent = pending;


        document.getElementById("processingOrders")
            .textContent = processing;


        document.getElementById("completedOrders")
            .textContent = completed;

    }


    // ===============================
    // CHANGE STATUS
    // ===============================

    window.changeOrderStatus = function (id) {

        const order =
            orders.find(
                order => order.id === id
            );


        if (!order) {

            return;

        }


        const statuses = [

            "Pending",

            "Processing",

            "Completed",

            "Cancelled"

        ];


        const currentIndex =
            statuses.indexOf(order.status);


        const nextIndex =
            (currentIndex + 1) % statuses.length;


        order.status =
            statuses[nextIndex];


        saveOrders();

        loadOrders();

    };


    // ===============================
    // DELETE ORDER
    // ===============================

    window.deleteOrder = function (id) {

        const order =
            orders.find(
                order => order.id === id
            );


        if (!order) {

            return;

        }


        const confirmDelete =
            confirm(
                `Delete order ${order.id}?`
            );


        if (!confirmDelete) {

            return;

        }


        orders =
            orders.filter(
                order => order.id !== id
            );


        saveOrders();

        loadOrders();

    };


    // ===============================
    // SEARCH
    // ===============================

    searchInput.addEventListener(
        "input",
        function () {

            loadOrders();

        }
    );


    // ===============================
    // FILTER
    // ===============================

    statusFilter.addEventListener(
        "change",
        function () {

            loadOrders();

        }
    );

});
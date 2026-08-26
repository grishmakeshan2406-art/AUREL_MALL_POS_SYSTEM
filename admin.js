// ==========================================
// SMARTGEN MALL - ADMIN DASHBOARD
// ==========================================


// ==========================================
// ADMIN SEARCH
// ==========================================

function searchAdmin() {

    const input =
        document.getElementById("adminSearch");

    if (!input) {
        return;
    }

    const search =
        input.value.toLowerCase().trim();

    const sections =
        document.querySelectorAll(".data-section");


    if (search === "") {

        sections.forEach(function(section) {

            section.style.display = "";

        });

        return;
    }


    sections.forEach(function(section) {

        const content =
            section.textContent.toLowerCase();


        if (content.includes(search)) {

            section.style.display = "";

        } else {

            section.style.display = "none";

        }

    });

}


// ==========================================
// ENTER KEY FOR SEARCH
// ==========================================

document.addEventListener(
    "DOMContentLoaded",
    function() {

        const searchInput =
            document.getElementById("adminSearch");


        if (searchInput) {

            searchInput.addEventListener(
                "keydown",
                function(event) {

                    if (event.key === "Enter") {

                        searchAdmin();

                    }

                }
            );

        }

    }
);


// ==========================================
// MANAGE SHOPS
// ==========================================

function manageShops() {

    window.location.href =
        "admin-shops.html";

}


// ==========================================
// MANAGE PRODUCTS
// ==========================================

function manageProducts() {

    window.location.href =
        "admin-products.html";

}


// ==========================================
// VIEW ORDERS
// ==========================================

function viewOrders() {

    window.location.href =
        "admin-orders.html";

}


// ==========================================
// VIEW REPORTS
// ==========================================

function viewReports() {

    window.location.href =
        "admin-reports.html";

}


// ==========================================
// VIEW INVENTORY
// ==========================================

function viewInventory() {

    window.location.href =
        "admin-inventory.html";

}


// ==========================================
// VIEW USERS
// ==========================================

function viewUsers() {

    window.location.href =
        "admin-users.html";

}


// ==========================================
// GET LOCAL STORAGE DATA
// ==========================================

function getStorageData(key) {

    try {

        const data =
            JSON.parse(
                localStorage.getItem(key)
            );

        return Array.isArray(data)
            ? data
            : [];

    }

    catch (error) {

        console.error(
            "Error reading " + key + ":",
            error
        );

        return [];

    }

}


// ==========================================
// UPDATE SHOP COUNT
// ==========================================

function updateShopCount() {

    const shops =
        getStorageData("shops");


    const activeShops =
        shops.filter(function(shop) {

            return shop.status === "Active";

        }).length;


    const element =
        document.getElementById("totalShops");


    if (element) {

        element.textContent =
            activeShops;

    }

}


// ==========================================
// UPDATE PRODUCT COUNT
// ==========================================

function updateProductCount() {

    const products =
        getStorageData("products");


    const element =
        document.getElementById("totalProducts");


    if (element) {

        element.textContent =
            products.length;

    }

}


// ==========================================
// UPDATE ORDER COUNT
// ==========================================

function updateOrderCount() {

    const orders =
        getStorageData("orders");


    const element =
        document.getElementById("todayOrders");


    if (element) {

        element.textContent =
            orders.length;

    }

}


// ==========================================
// UPDATE REVENUE
// ==========================================

function updateRevenue() {

    const orders =
        getStorageData("orders");


    let totalRevenue = 0;


    orders.forEach(function(order) {

        let amount = 0;


        if (order.amount !== undefined) {

            amount =
                Number(order.amount);

        }

        else if (order.total !== undefined) {

            amount =
                Number(order.total);

        }

        else if (
            order.totalAmount !== undefined
        ) {

            amount =
                Number(order.totalAmount);

        }


        if (!isNaN(amount)) {

            totalRevenue += amount;

        }

    });


    const element =
        document.getElementById(
            "todayRevenue"
        );


    if (element) {

        element.textContent =
            "₹" +
            totalRevenue.toLocaleString("en-IN");

    }

}


// ==========================================
// ADD ACTIVITY
// ==========================================

function addActivity(title, details) {

    const activityList =
        document.getElementById(
            "activityList"
        );


    if (!activityList) {

        return;

    }


    const activity =
        document.createElement("div");


    activity.className =
        "activity-item";


    activity.innerHTML = `

        <span class="activity-dot"></span>

        <div>

            <strong>
                ${title}
            </strong>

            <p>
                ${details}
            </p>

        </div>

        <small>
            Just now
        </small>

    `;


    activityList.prepend(activity);

}


// ==========================================
// ADMIN PAGE LOAD
// ==========================================

document.addEventListener(
    "DOMContentLoaded",
    function() {

        updateShopCount();

        updateProductCount();

        updateOrderCount();

        updateRevenue();

    }
);
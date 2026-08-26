document.addEventListener("DOMContentLoaded", function () {

    let shops =
        JSON.parse(localStorage.getItem("shops")) || [];


    const shopForm =
        document.getElementById("shopForm");

    const shopsContainer =
        document.getElementById("shopsContainer");

    const emptyShops =
        document.getElementById("emptyShops");


    loadShops();


    // ===============================
    // ADD SHOP
    // ===============================

    shopForm.addEventListener("submit", function (event) {

        event.preventDefault();


        const shopName =
            document.getElementById("shopName").value.trim();

        const category =
            document.getElementById("shopCategory").value;

        const owner =
            document.getElementById("shopOwner").value.trim();


        if (!shopName || !category || !owner) {

            alert("Please fill in all shop details.");

            return;
        }


        const shop = {

            id: Date.now(),

            name: shopName,

            category: category,

            owner: owner,

            products: 0,

            sales: 0,

            status: "Active"

        };


        shops.push(shop);


        saveShops();


        shopForm.reset();


        alert("Shop added successfully.");

    });


    // ===============================
    // SAVE SHOPS
    // ===============================

    function saveShops() {

        localStorage.setItem(
            "shops",
            JSON.stringify(shops)
        );

        loadShops();

    }


    // ===============================
    // LOAD SHOPS
    // ===============================

    function loadShops() {

        shopsContainer.innerHTML = "";


        updateSummary();


        if (shops.length === 0) {

            emptyShops.style.display = "block";

            return;

        }


        emptyShops.style.display = "none";


        shops.forEach(function (shop) {

            const card =
                document.createElement("div");

            card.className = "shop-card";


            const statusClass =
                shop.status === "Active"
                    ? "status-active"
                    : "status-inactive";


            card.innerHTML = `

                <div class="shop-card-header">

                    <div>

                        <h3>
                            ${shop.name}
                        </h3>

                        <p class="shop-category">
                            ${shop.category}
                        </p>

                    </div>

                    <span class="shop-status ${statusClass}">
                        ${shop.status}
                    </span>

                </div>


                <div class="shop-info">

                    <div>

                        <p>
                            OWNER
                        </p>

                        <strong>
                            ${shop.owner}
                        </strong>

                    </div>


                    <div>

                        <p>
                            PRODUCTS
                        </p>

                        <strong>
                            ${shop.products}
                        </strong>

                    </div>


                    <div>

                        <p>
                            SALES
                        </p>

                        <strong>
                            ₹${Number(shop.sales).toLocaleString("en-IN")}
                        </strong>

                    </div>


                    <div>

                        <p>
                            SHOP ID
                        </p>

                        <strong>
                            SG-${shop.id.toString().slice(-5)}
                        </strong>

                    </div>

                </div>


                <div class="shop-actions">

                    <button
                        class="toggle-button"
                        onclick="toggleShop(${shop.id})"
                    >
                        ${
                            shop.status === "Active"
                                ? "Deactivate"
                                : "Activate"
                        }
                    </button>


                    <button
                        class="delete-button"
                        onclick="deleteShop(${shop.id})"
                    >
                        Delete
                    </button>

                </div>

            `;


            shopsContainer.appendChild(card);

        });

    }


    // ===============================
    // SUMMARY
    // ===============================

    function updateSummary() {

        const total =
            shops.length;


        const active =
            shops.filter(
                shop => shop.status === "Active"
            ).length;


        const inactive =
            shops.filter(
                shop => shop.status === "Inactive"
            ).length;


        document.getElementById("totalShops")
            .textContent = total;


        document.getElementById("activeShops")
            .textContent = active;


        document.getElementById("inactiveShops")
            .textContent = inactive;


        document.getElementById("shopCount")
            .textContent =
                total +
                (total === 1 ? " shop" : " shops");

    }


    // ===============================
    // TOGGLE SHOP
    // ===============================

    window.toggleShop = function (id) {

        const shop =
            shops.find(
                shop => shop.id === id
            );


        if (!shop) {
            return;
        }


        if (shop.status === "Active") {

            shop.status = "Inactive";

        } else {

            shop.status = "Active";

        }


        saveShops();

    };


    // ===============================
    // DELETE SHOP
    // ===============================

    window.deleteShop = function (id) {

        const shop =
            shops.find(
                shop => shop.id === id
            );


        if (!shop) {
            return;
        }


        const confirmDelete =
            confirm(
                `Delete ${shop.name}?`
            );


        if (!confirmDelete) {
            return;
        }


        shops =
            shops.filter(
                shop => shop.id !== id
            );


        saveShops();

    };

});
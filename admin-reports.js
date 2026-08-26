document.addEventListener("DOMContentLoaded", function () {


    // ==========================================
    // DATA
    // ==========================================

    let shops =
        JSON.parse(localStorage.getItem("shops")) || [];


    let products =
        JSON.parse(localStorage.getItem("products")) || [];


    let orders =
        JSON.parse(localStorage.getItem("orders")) || [];



    // ==========================================
    // LOAD REPORTS
    // ==========================================

    loadReports();



    // ==========================================
    // MAIN REPORT FUNCTION
    // ==========================================

    function loadReports() {

        shops =
            JSON.parse(localStorage.getItem("shops")) || [];


        products =
            JSON.parse(localStorage.getItem("products")) || [];


        orders =
            JSON.parse(localStorage.getItem("orders")) || [];


        updateSummary();

        updateOrderAnalytics();

        updateInventoryAnalytics();

        loadShopReports();

        loadTopProducts();

        loadCategoryReports();

    }



    // ==========================================
    // SUMMARY
    // ==========================================

    function updateSummary() {

        let totalRevenue = 0;


        orders.forEach(function (order) {

            totalRevenue += getOrderAmount(order);

        });


        const totalOrders =
            orders.length;


        const averageOrder =
            totalOrders > 0
                ? totalRevenue / totalOrders
                : 0;



        document.getElementById("totalRevenue")
            .textContent =
                "₹" +
                totalRevenue.toLocaleString("en-IN");


        document.getElementById("totalOrders")
            .textContent =
                totalOrders;


        document.getElementById("averageOrder")
            .textContent =
                "₹" +
                Math.round(averageOrder)
                    .toLocaleString("en-IN");


        document.getElementById("totalProducts")
            .textContent =
                products.length;

    }



    // ==========================================
    // GET ORDER AMOUNT
    // ==========================================

    function getOrderAmount(order) {

        if (!order) {
            return 0;
        }


        if (typeof order.amount === "number") {
            return order.amount;
        }


        if (typeof order.total === "number") {
            return order.total;
        }


        if (typeof order.totalAmount === "number") {
            return order.totalAmount;
        }


        if (typeof order.amount === "string") {
            return Number(
                order.amount.replace(/[₹,]/g, "")
            ) || 0;
        }


        if (typeof order.total === "string") {
            return Number(
                order.total.replace(/[₹,]/g, "")
            ) || 0;
        }


        if (typeof order.totalAmount === "string") {
            return Number(
                order.totalAmount.replace(/[₹,]/g, "")
            ) || 0;
        }


        return 0;

    }



    // ==========================================
    // ORDER ANALYTICS
    // ==========================================

    function updateOrderAnalytics() {

        let completed = 0;

        let processing = 0;

        let pending = 0;

        let cancelled = 0;



        orders.forEach(function (order) {

            const status =
                String(
                    order.status || ""
                ).toLowerCase();


            if (status === "completed") {

                completed++;

            }

            else if (status === "processing") {

                processing++;

            }

            else if (status === "pending") {

                pending++;

            }

            else if (
                status === "cancelled" ||
                status === "canceled"
            ) {

                cancelled++;

            }

        });



        document.getElementById("completedOrders")
            .textContent = completed;


        document.getElementById("processingOrders")
            .textContent = processing;


        document.getElementById("pendingOrders")
            .textContent = pending;


        document.getElementById("cancelledOrders")
            .textContent = cancelled;

    }



    // ==========================================
    // INVENTORY ANALYTICS
    // ==========================================

    function updateInventoryAnalytics() {

        let inStock = 0;

        let lowStock = 0;

        let outOfStock = 0;

        let inventoryValue = 0;



        products.forEach(function (product) {

            const stock =
                Number(product.stock) || 0;


            const price =
                Number(product.price) || 0;


            inventoryValue +=
                stock * price;



            if (stock === 0) {

                outOfStock++;

            }

            else if (stock <= 10) {

                lowStock++;

            }

            else {

                inStock++;

            }

        });



        document.getElementById("reportInStock")
            .textContent = inStock;


        document.getElementById("reportLowStock")
            .textContent = lowStock;


        document.getElementById("reportOutStock")
            .textContent = outOfStock;


        document.getElementById("reportInventoryValue")
            .textContent =
                "₹" +
                inventoryValue.toLocaleString("en-IN");

    }



    // ==========================================
    // SHOP REPORTS
    // ==========================================

    function loadShopReports() {

        const container =
            document.getElementById("shopReports");


        const empty =
            document.getElementById("emptyShopReports");


        container.innerHTML = "";


        if (shops.length === 0) {

            empty.style.display = "block";

            return;

        }


        empty.style.display = "none";



        shops.forEach(function (shop) {

            const shopProducts =
                products.filter(function (product) {

                    return String(product.shopId) ===
                        String(shop.id);

                });


            let inventoryValue = 0;


            shopProducts.forEach(function (product) {

                inventoryValue +=
                    (Number(product.price) || 0) *
                    (Number(product.stock) || 0);

            });



            const card =
                document.createElement("div");


            card.className =
                "shop-report-card";


            const statusClass =
                shop.status === "Active"
                    ? "active"
                    : "inactive";



            card.innerHTML = `

                <div class="shop-report-header">

                    <div>

                        <h3>
                            ${shop.name}
                        </h3>

                        <p class="shop-report-category">
                            ${shop.category}
                        </p>

                    </div>

                    <span class="shop-report-status ${statusClass}">
                        ${shop.status}
                    </span>

                </div>


                <div class="shop-report-info">

                    <div>

                        <p>
                            PRODUCTS
                        </p>

                        <strong>
                            ${shopProducts.length}
                        </strong>

                    </div>


                    <div>

                        <p>
                            SALES
                        </p>

                        <strong>
                            ₹${Number(shop.sales || 0)
                                .toLocaleString("en-IN")}
                        </strong>

                    </div>


                    <div>

                        <p>
                            INVENTORY VALUE
                        </p>

                        <strong>
                            ₹${inventoryValue
                                .toLocaleString("en-IN")}
                        </strong>

                    </div>

                </div>

            `;


            container.appendChild(card);

        });

    }



    // ==========================================
    // TOP PRODUCTS
    // ==========================================

    function loadTopProducts() {

        const container =
            document.getElementById("topProducts");


        const empty =
            document.getElementById("emptyTopProducts");


        container.innerHTML = "";


        if (products.length === 0) {

            empty.style.display = "block";

            return;

        }


        empty.style.display = "none";



        const sortedProducts =
            [...products].sort(function (a, b) {

                return (
                    (Number(b.price) || 0) *
                    (Number(b.stock) || 0)
                ) -
                (
                    (Number(a.price) || 0) *
                    (Number(a.stock) || 0)
                );

            });



        const topProducts =
            sortedProducts.slice(0, 6);



        topProducts.forEach(function (product) {

            const shop =
                shops.find(function (item) {

                    return String(item.id) ===
                        String(product.shopId);

                });


            const shopName =
                shop
                    ? shop.name
                    : "Unknown Shop";


            const inventoryValue =
                (Number(product.price) || 0) *
                (Number(product.stock) || 0);



            const card =
                document.createElement("div");


            card.className =
                "top-product-card";


            card.innerHTML = `

                <div class="top-product-info">

                    <h3>
                        ${product.name}
                    </h3>

                    <p>
                        ${shopName} • ${product.category}
                    </p>

                </div>


                <div class="top-product-value">

                    <strong>
                        ₹${Number(product.price)
                            .toLocaleString("en-IN")}
                    </strong>

                    <span>
                        ${product.stock} in stock
                    </span>

                </div>

            `;


            container.appendChild(card);

        });

    }



    // ==========================================
    // CATEGORY REPORTS
    // ==========================================

    function loadCategoryReports() {

        const container =
            document.getElementById("categoryReports");


        const empty =
            document.getElementById(
                "emptyCategoryReports"
            );


        container.innerHTML = "";


        if (products.length === 0) {

            empty.style.display = "block";

            return;

        }


        empty.style.display = "none";



        const categories = {};



        products.forEach(function (product) {

            const category =
                product.category || "Other";


            if (!categories[category]) {

                categories[category] = {

                    products: 0,

                    stock: 0,

                    value: 0

                };

            }


            categories[category].products++;


            categories[category].stock +=
                Number(product.stock) || 0;


            categories[category].value +=
                (
                    Number(product.price) || 0
                ) *
                (
                    Number(product.stock) || 0
                );

        });



        Object.keys(categories).forEach(
            function (category) {

                const data =
                    categories[category];


                const card =
                    document.createElement("div");


                card.className =
                    "category-card";


                card.innerHTML = `

                    <h3>
                        ${category}
                    </h3>


                    <div class="category-stat">

                        <span>
                            Products
                        </span>

                        <strong>
                            ${data.products}
                        </strong>

                    </div>


                    <div class="category-stat">

                        <span>
                            Total Stock
                        </span>

                        <strong>
                            ${data.stock}
                        </strong>

                    </div>


                    <div class="category-stat">

                        <span>
                            Inventory Value
                        </span>

                        <strong>
                            ₹${data.value
                                .toLocaleString("en-IN")}
                        </strong>

                    </div>

                `;


                container.appendChild(card);

            }
        );

    }



    // ==========================================
    // REFRESH REPORTS
    // ==========================================

    window.refreshReports = function () {

        const button =
            document.querySelector(".refresh-button");


        button.textContent =
            "Refreshing...";


        setTimeout(function () {

            loadReports();


            button.textContent =
                "✓ Reports Updated";


            setTimeout(function () {

                button.textContent =
                    "↻ Refresh Reports";

            }, 1500);


        }, 500);

    };

});
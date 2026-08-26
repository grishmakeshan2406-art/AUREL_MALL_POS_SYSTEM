document.addEventListener("DOMContentLoaded", function () {


    // ==========================================
    // DATA
    // ==========================================

    let products =
        JSON.parse(localStorage.getItem("products")) || [];


    let shops =
        JSON.parse(localStorage.getItem("shops")) || [];


    // ==========================================
    // ELEMENTS
    // ==========================================

    const inventoryContainer =
        document.getElementById("inventoryContainer");

    const emptyInventory =
        document.getElementById("emptyInventory");

    const searchInput =
        document.getElementById("inventorySearch");

    const stockFilter =
        document.getElementById("stockFilter");

    const shopFilter =
        document.getElementById("shopFilter");



    // ==========================================
    // LOAD PAGE
    // ==========================================

    loadShopFilter();

    loadInventory();

    updateSummary();



    // ==========================================
    // FIND SHOP NAME
    // ==========================================

    function getShopName(shopId) {

        const shop =
            shops.find(function (item) {

                return String(item.id) ===
                    String(shopId);

            });


        return shop
            ? shop.name
            : "Unknown Shop";

    }



    // ==========================================
    // LOAD SHOP FILTER
    // ==========================================

    function loadShopFilter() {

        shopFilter.innerHTML = `

            <option value="all">
                All Shops
            </option>

        `;


        shops.forEach(function (shop) {

            const option =
                document.createElement("option");


            option.value =
                shop.id;


            option.textContent =
                shop.name;


            shopFilter.appendChild(option);

        });

    }



    // ==========================================
    // GET STOCK STATUS
    // ==========================================

    function getStockStatus(stock) {


        if (stock === 0) {

            return {
                text: "Out of Stock",
                className: "stock-out"
            };

        }


        if (stock <= 10) {

            return {
                text: "Low Stock",
                className: "stock-low"
            };

        }


        return {
            text: "In Stock",
            className: "stock-in"
        };

    }



    // ==========================================
    // LOAD INVENTORY
    // ==========================================

    function loadInventory() {


        inventoryContainer.innerHTML = "";


        const search =
            searchInput.value
                .toLowerCase()
                .trim();


        const selectedStock =
            stockFilter.value;


        const selectedShop =
            shopFilter.value;



        const filteredProducts =
            products.filter(function (product) {


                const shopName =
                    getShopName(product.shopId);


                // SEARCH

                const matchesSearch =
                    product.name
                        .toLowerCase()
                        .includes(search) ||

                    shopName
                        .toLowerCase()
                        .includes(search);



                // SHOP FILTER

                const matchesShop =
                    selectedShop === "all" ||

                    String(product.shopId) ===
                    String(selectedShop);



                // STOCK STATUS

                const stockStatus =
                    getStockStatus(product.stock);


                const matchesStock =
                    selectedStock === "all" ||

                    stockStatus.text ===
                    selectedStock;



                return (
                    matchesSearch &&
                    matchesShop &&
                    matchesStock
                );

            });



        // ======================================
        // COUNT
        // ======================================

        document.getElementById("productCount")
            .textContent =
                filteredProducts.length +
                (
                    filteredProducts.length === 1
                        ? " product"
                        : " products"
                );



        // ======================================
        // EMPTY STATE
        // ======================================

        if (filteredProducts.length === 0) {

            emptyInventory.style.display =
                "block";

            return;

        }


        emptyInventory.style.display =
            "none";



        // ======================================
        // CREATE CARDS
        // ======================================

        filteredProducts.forEach(
            function (product) {


                const shopName =
                    getShopName(product.shopId);


                const stockStatus =
                    getStockStatus(product.stock);


                const inventoryValue =
                    product.price *
                    product.stock;



                const card =
                    document.createElement("div");


                card.className =
                    "inventory-card";



                card.innerHTML = `

                    <div class="inventory-card-header">

                        <div>

                            <h3>
                                ${product.name}
                            </h3>

                            <p class="product-shop">
                                ${shopName}
                            </p>

                        </div>


                        <span
                            class="stock-status ${stockStatus.className}"
                        >
                            ${stockStatus.text}
                        </span>

                    </div>



                    <div class="inventory-info">


                        <div>

                            <p>
                                PRICE
                            </p>

                            <strong>
                                ₹${product.price.toLocaleString("en-IN")}
                            </strong>

                        </div>


                        <div>

                            <p>
                                STOCK
                            </p>

                            <strong class="stock-number">
                                ${product.stock}
                            </strong>

                        </div>


                        <div>

                            <p>
                                STOCK VALUE
                            </p>

                            <strong>
                                ₹${inventoryValue.toLocaleString("en-IN")}
                            </strong>

                        </div>


                    </div>



                    <div class="inventory-actions">


                        <button
                            class="adjust-button"
                            onclick="adjustStock(${product.id})"
                        >
                            Adjust Stock
                        </button>


                        <button
                            class="delete-button"
                            onclick="deleteInventoryProduct(${product.id})"
                        >
                            Delete
                        </button>


                    </div>

                `;


                inventoryContainer.appendChild(card);

            }
        );

    }



    // ==========================================
    // UPDATE SUMMARY
    // ==========================================

    function updateSummary() {


        const total =
            products.length;



        const inStock =
            products.filter(function (product) {

                return product.stock > 10;

            }).length;



        const lowStock =
            products.filter(function (product) {

                return (
                    product.stock > 0 &&
                    product.stock <= 10
                );

            }).length;



        const outOfStock =
            products.filter(function (product) {

                return product.stock === 0;

            }).length;



        const inventoryValue =
            products.reduce(
                function (total, product) {

                    return total +
                        (
                            product.price *
                            product.stock
                        );

                },
                0
            );



        document.getElementById("totalProducts")
            .textContent =
                total;


        document.getElementById("inStock")
            .textContent =
                inStock;


        document.getElementById("lowStock")
            .textContent =
                lowStock;


        document.getElementById("outOfStock")
            .textContent =
                outOfStock;


        document.getElementById("inventoryValue")
            .textContent =
                "₹" +
                inventoryValue.toLocaleString("en-IN");

    }



    // ==========================================
    // ADJUST STOCK
    // ==========================================

    window.adjustStock = function (id) {


        const product =
            products.find(function (item) {

                return item.id === id;

            });


        if (!product) {

            return;

        }



        const newStock =
            prompt(
                `Current stock: ${product.stock}\n\nEnter new stock quantity:`,
                product.stock
            );



        if (newStock === null) {

            return;

        }



        const quantity =
            Number(newStock);



        if (
            !Number.isInteger(quantity) ||
            quantity < 0
        ) {

            alert(
                "Please enter a valid whole number."
            );

            return;

        }



        product.stock =
            quantity;



        saveProducts();



        alert(
            `${product.name} stock updated successfully.`
        );

    };



    // ==========================================
    // DELETE PRODUCT
    // ==========================================

    window.deleteInventoryProduct =
        function (id) {


            const product =
                products.find(function (item) {

                    return item.id === id;

                });


            if (!product) {

                return;

            }



            const confirmed =
                confirm(
                    `Delete ${product.name} from the inventory?`
                );



            if (!confirmed) {

                return;

            }



            products =
                products.filter(function (item) {

                    return item.id !== id;

                });



            saveProducts();

        };



    // ==========================================
    // SAVE PRODUCTS
    // ==========================================

    function saveProducts() {


        localStorage.setItem(
            "products",
            JSON.stringify(products)
        );


        loadInventory();

        updateSummary();

    }



    // ==========================================
    // SEARCH
    // ==========================================

    searchInput.addEventListener(
        "input",
        function () {

            loadInventory();

        }
    );



    // ==========================================
    // STOCK FILTER
    // ==========================================

    stockFilter.addEventListener(
        "change",
        function () {

            loadInventory();

        }
    );



    // ==========================================
    // SHOP FILTER
    // ==========================================

    shopFilter.addEventListener(
        "change",
        function () {

            loadInventory();

        }
    );

});
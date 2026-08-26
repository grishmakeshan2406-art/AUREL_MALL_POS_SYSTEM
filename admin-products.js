document.addEventListener("DOMContentLoaded", function () {

    // ==========================================
    // DATA
    // ==========================================

    let products =
        JSON.parse(localStorage.getItem("products")) || [];


    // ==========================================
    // ELEMENTS
    // ==========================================

    const productForm =
        document.getElementById("productForm");

    const productsContainer =
        document.getElementById("productsContainer");

    const emptyProducts =
        document.getElementById("emptyProducts");

    const productSearch =
        document.getElementById("productSearch");

    const productShop =
        document.getElementById("productShop");

    const shopFilter =
        document.getElementById("shopFilter");

    const categoryFilter =
        document.getElementById("categoryFilter");

    const stockFilter =
        document.getElementById("stockFilter");

    const cancelButton =
        document.getElementById("cancelButton");


    // ==========================================
    // GET SHOPS
    // ==========================================

    function getShops() {

        const savedShops =
            localStorage.getItem("shops");

        if (!savedShops) {
            return [];
        }

        try {

            const shops =
                JSON.parse(savedShops);

            return Array.isArray(shops)
                ? shops
                : [];

        } catch (error) {

            console.error(
                "Error reading shops:",
                error
            );

            return [];

        }

    }


    // ==========================================
    // LOAD PAGE
    // ==========================================

    loadShopOptions();

    loadProducts();

    updateSummary();


    // ==========================================
    // LOAD SHOP OPTIONS
    // ==========================================

    function loadShopOptions() {

        const shops = getShops();


        console.log(
            "Shops found:",
            shops
        );


        // ======================================
        // PRODUCT SHOP DROPDOWN
        // ======================================

        productShop.innerHTML = "";


        const defaultOption =
            document.createElement("option");

        defaultOption.value = "";

        defaultOption.textContent =
            "Select shop";

        productShop.appendChild(
            defaultOption
        );


        // ======================================
        // SHOP FILTER
        // ======================================

        if (shopFilter) {

            shopFilter.innerHTML = `
                <option value="all">
                    All Shops
                </option>
            `;

        }


        // ======================================
        // NO SHOPS
        // ======================================

        if (shops.length === 0) {

            const noShopOption =
                document.createElement("option");

            noShopOption.value = "";

            noShopOption.textContent =
                "No shops available";

            productShop.appendChild(
                noShopOption
            );

            console.log(
                "NO SHOPS FOUND IN LOCAL STORAGE"
            );

            return;

        }


        // ======================================
        // ADD SHOPS
        // ======================================

        shops.forEach(function (shop) {

            const option =
                document.createElement("option");

            option.value =
                String(shop.id);

            option.textContent =
                shop.name;

            productShop.appendChild(
                option
            );


            // SHOP FILTER

            if (shopFilter) {

                const filterOption =
                    document.createElement("option");

                filterOption.value =
                    String(shop.id);

                filterOption.textContent =
                    shop.name;

                shopFilter.appendChild(
                    filterOption
                );

            }

        });

    }


    // ==========================================
    // ADD / EDIT PRODUCT
    // ==========================================

    productForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const name =
                document
                    .getElementById("productName")
                    .value
                    .trim();


            const shopId =
                document
                    .getElementById("productShop")
                    .value;


            const category =
                document
                    .getElementById("productCategory")
                    .value;


            const price =
                Number(
                    document
                        .getElementById("productPrice")
                        .value
                );


            const stock =
                Number(
                    document
                        .getElementById("productStock")
                        .value
                );


            const editingId =
                document
                    .getElementById("editingProductId")
                    .value;


            // ======================================
            // VALIDATION
            // ======================================

            if (
                !name ||
                !shopId ||
                !category ||
                isNaN(price) ||
                isNaN(stock) ||
                price < 0 ||
                stock < 0
            ) {

                alert(
                    "Please enter valid product details."
                );

                return;

            }


            // ======================================
            // CHECK SHOP
            // ======================================

            const shops =
                getShops();


            const selectedShop =
                shops.find(function (shop) {

                    return String(shop.id) ===
                        String(shopId);

                });


            if (!selectedShop) {

                alert(
                    "Selected shop was not found."
                );

                loadShopOptions();

                return;

            }


            // ======================================
            // EDIT
            // ======================================

            if (editingId) {

                const product =
                    products.find(function (item) {

                        return String(item.id) ===
                            String(editingId);

                    });


                if (!product) {

                    alert(
                        "Product not found."
                    );

                    return;

                }


                product.name =
                    name;

                product.shopId =
                    shopId;

                product.category =
                    category;

                product.price =
                    price;

                product.stock =
                    stock;


                alert(
                    "Product updated successfully."
                );

            }


            // ======================================
            // ADD
            // ======================================

            else {

                const product = {

                    id: Date.now(),

                    name: name,

                    shopId: shopId,

                    category: category,

                    price: price,

                    stock: stock

                };


                products.push(product);


                alert(
                    "Product added successfully."
                );

            }


            saveProducts();

            resetForm();

        }
    );


    // ==========================================
    // SAVE PRODUCTS
    // ==========================================

    function saveProducts() {

        localStorage.setItem(
            "products",
            JSON.stringify(products)
        );


        loadProducts();

        updateSummary();

    }


    // ==========================================
    // LOAD PRODUCTS
    // ==========================================

    function loadProducts() {

        productsContainer.innerHTML = "";


        const shops =
            getShops();


        const search =
            productSearch.value
                .toLowerCase()
                .trim();


        const selectedShop =
            shopFilter
                ? shopFilter.value
                : "all";


        const selectedCategory =
            categoryFilter
                ? categoryFilter.value
                : "all";


        const selectedStock =
            stockFilter
                ? stockFilter.value
                : "all";


        const filteredProducts =
            products.filter(function (product) {


                // SEARCH

                const matchesSearch =
                    product.name
                        .toLowerCase()
                        .includes(search);


                // SHOP

                const matchesShop =
                    selectedShop === "all" ||
                    String(product.shopId) ===
                    String(selectedShop);


                // CATEGORY

                const matchesCategory =
                    selectedCategory === "all" ||
                    product.category ===
                    selectedCategory;


                // STOCK

                let stockStatus = "";


                if (product.stock === 0) {

                    stockStatus =
                        "Out of Stock";

                }

                else if (product.stock <= 10) {

                    stockStatus =
                        "Low Stock";

                }

                else {

                    stockStatus =
                        "In Stock";

                }


                const matchesStock =
                    selectedStock === "all" ||
                    stockStatus === selectedStock;


                return (
                    matchesSearch &&
                    matchesShop &&
                    matchesCategory &&
                    matchesStock
                );

            });


        // ======================================
        // EMPTY
        // ======================================

        if (filteredProducts.length === 0) {

            emptyProducts.style.display =
                "block";


            document.getElementById(
                "productCount"
            ).textContent =
                "0 products";


            return;

        }


        emptyProducts.style.display =
            "none";


        // ======================================
        // PRODUCT CARDS
        // ======================================

        filteredProducts.forEach(
            function (product) {


                const shop =
                    shops.find(function (item) {

                        return String(item.id) ===
                            String(product.shopId);

                    });


                const shopName =
                    shop
                        ? shop.name
                        : "Unknown Shop";


                // STOCK STATUS

                let stockClass =
                    "stock-good";

                let stockText =
                    "In Stock";


                if (product.stock === 0) {

                    stockClass =
                        "stock-out";

                    stockText =
                        "Out of Stock";

                }

                else if (product.stock <= 10) {

                    stockClass =
                        "stock-low";

                    stockText =
                        "Low Stock";

                }


                // CARD

                const card =
                    document.createElement("div");


                card.className =
                    "product-card";


                card.innerHTML = `

                    <div class="product-header">

                        <div>

                            <h3>
                                ${product.name}
                            </h3>

                            <p class="product-category">
                                ${product.category}
                            </p>

                        </div>

                        <span
                            class="stock-status ${stockClass}"
                        >
                            ${stockText}
                        </span>

                    </div>


                    <div class="product-info">

                        <div>

                            <p>
                                SHOP
                            </p>

                            <strong>
                                ${shopName}
                            </strong>

                        </div>


                        <div>

                            <p>
                                PRICE
                            </p>

                            <strong>
                                ₹${Number(product.price)
                                    .toLocaleString("en-IN")}
                            </strong>

                        </div>


                        <div>

                            <p>
                                STOCK
                            </p>

                            <strong>
                                ${product.stock}
                            </strong>

                        </div>


                        <div>

                            <p>
                                PRODUCT ID
                            </p>

                            <strong>
                                SG-P-${product.id
                                    .toString()
                                    .slice(-5)}
                            </strong>

                        </div>

                    </div>


                    <div class="product-actions">

                        <button
                            class="edit-button"
                            onclick="editProduct(${product.id})"
                        >
                            Edit
                        </button>


                        <button
                            class="delete-button"
                            onclick="deleteProduct(${product.id})"
                        >
                            Delete
                        </button>

                    </div>

                `;


                productsContainer.appendChild(
                    card
                );

            }
        );


        document.getElementById(
            "productCount"
        ).textContent =
            filteredProducts.length +
            (
                filteredProducts.length === 1
                    ? " product"
                    : " products"
            );

    }


    // ==========================================
    // SUMMARY
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


        document.getElementById(
            "totalProducts"
        ).textContent = total;


        document.getElementById(
            "inStock"
        ).textContent = inStock;


        document.getElementById(
            "lowStock"
        ).textContent = lowStock;


        document.getElementById(
            "outOfStock"
        ).textContent = outOfStock;

    }


    // ==========================================
    // EDIT PRODUCT
    // ==========================================

    window.editProduct = function (id) {

        const product =
            products.find(function (item) {

                return String(item.id) ===
                    String(id);

            });


        if (!product) {
            return;
        }


        // Reload shops before selecting

        loadShopOptions();


        document.getElementById(
            "productName"
        ).value = product.name;


        document.getElementById(
            "productShop"
        ).value = product.shopId;


        document.getElementById(
            "productCategory"
        ).value = product.category;


        document.getElementById(
            "productPrice"
        ).value = product.price;


        document.getElementById(
            "productStock"
        ).value = product.stock;


        document.getElementById(
            "editingProductId"
        ).value = product.id;


        document.getElementById(
            "formTitle"
        ).textContent =
            "Edit Product";


        document.getElementById(
            "submitButton"
        ).textContent =
            "Save Changes";


        cancelButton.style.display =
            "block";


        document
            .querySelector(".add-product-section")
            .scrollIntoView({
                behavior: "smooth"
            });

    };


    // ==========================================
    // DELETE PRODUCT
    // ==========================================

    window.deleteProduct = function (id) {

        const product =
            products.find(function (item) {

                return String(item.id) ===
                    String(id);

            });


        if (!product) {
            return;
        }


        const confirmed =
            confirm(
                `Delete ${product.name}?`
            );


        if (!confirmed) {
            return;
        }


        products =
            products.filter(function (item) {

                return String(item.id) !==
                    String(id);

            });


        saveProducts();

    };


    // ==========================================
    // RESET FORM
    // ==========================================

    function resetForm() {

        productForm.reset();


        document.getElementById(
            "editingProductId"
        ).value = "";


        document.getElementById(
            "formTitle"
        ).textContent =
            "Add New Product";


        document.getElementById(
            "submitButton"
        ).textContent =
            "+ Add Product";


        cancelButton.style.display =
            "none";


        loadShopOptions();

    }


    // ==========================================
    // CANCEL
    // ==========================================

    cancelButton.addEventListener(
        "click",
        function () {

            resetForm();

        }
    );


    // ==========================================
    // SEARCH
    // ==========================================

    productSearch.addEventListener(
        "input",
        function () {

            loadProducts();

        }
    );


    // ==========================================
    // SHOP FILTER
    // ==========================================

    if (shopFilter) {

        shopFilter.addEventListener(
            "change",
            function () {

                loadProducts();

            }
        );

    }


    // ==========================================
    // CATEGORY FILTER
    // ==========================================

    if (categoryFilter) {

        categoryFilter.addEventListener(
            "change",
            function () {

                loadProducts();

            }
        );

    }


    // ==========================================
    // STOCK FILTER
    // ==========================================

    if (stockFilter) {

        stockFilter.addEventListener(
            "change",
            function () {

                loadProducts();

            }
        );

    }

});
let products =
    JSON.parse(localStorage.getItem("smartgenProducts")) || [];


const inventoryList =
    document.getElementById("inventoryList");

const totalProducts =
    document.getElementById("totalProducts");

const totalStock =
    document.getElementById("totalStock");

const lowStock =
    document.getElementById("lowStock");

const outOfStock =
    document.getElementById("outOfStock");


/* DISPLAY INVENTORY */

function displayInventory() {

    inventoryList.innerHTML = "";


    let stockTotal = 0;

    let lowStockCount = 0;

    let outOfStockCount = 0;


    products.forEach(function(product) {

        stockTotal += product.stock;


        if (product.stock === 0) {

            outOfStockCount++;

        }

        else if (product.stock <= 10) {

            lowStockCount++;

        }


        let status = "";


        if (product.stock === 0) {

            status = "Out of Stock";

        }

        else if (product.stock <= 10) {

            status = "Low Stock";

        }

        else {

            status = "In Stock";

        }


        const row =
            document.createElement("div");


        row.className =
            "inventory-row";


        row.innerHTML = `

            <span>
                ${product.name}
            </span>

            <span>
                ${product.category}
            </span>

            <span>
                ₹${product.price}
            </span>

            <span>
                ${product.stock}
            </span>

            <span>
                <span class="stock-status">
                    ${status}
                </span>
            </span>

        `;


        inventoryList.appendChild(row);

    });


    totalProducts.textContent =
        products.length;


    totalStock.textContent =
        stockTotal;


    lowStock.textContent =
        lowStockCount;


    outOfStock.textContent =
        outOfStockCount;const products = document.querySelectorAll(".product-row");

const totalProducts = document.getElementById("total-products");
const inStock = document.getElementById("in-stock");
const lowStock = document.getElementById("low-stock");
const outStock = document.getElementById("out-stock");

const searchInput = document.getElementById("search-product");
const stockFilter = document.getElementById("stock-filter");


function updateStatus(row) {

    const stockElement = row.querySelector(".stock");
    const statusElement = row.querySelector(".status");

    let stock = parseInt(stockElement.textContent);

    statusElement.className = "status";

    if (stock === 0) {

        statusElement.textContent = "Out of Stock";
        statusElement.classList.add("out-stock-status");

    }

    else if (stock <= 10) {

        statusElement.textContent = "Low Stock";
        statusElement.classList.add("low-stock-status");

    }

    else {

        statusElement.textContent = "In Stock";
        statusElement.classList.add("in-stock-status");

    }

}


function updateSummary() {

    let total = 0;
    let inStockCount = 0;
    let lowStockCount = 0;
    let outStockCount = 0;


    products.forEach(row => {

        const stock = parseInt(
            row.querySelector(".stock").textContent
        );

        total++;


        if (stock === 0) {

            outStockCount++;

        }

        else if (stock <= 10) {

            lowStockCount++;

        }

        else {

            inStockCount++;

        }

    });


    totalProducts.textContent = total;
    inStock.textContent = inStockCount;
    lowStock.textContent = lowStockCount;
    outStock.textContent = outStockCount;

}


products.forEach(row => {

    const increaseButton =
        row.querySelector(".increase");

    const decreaseButton =
        row.querySelector(".decrease");


    increaseButton.addEventListener("click", () => {

        const stockElement =
            row.querySelector(".stock");

        let stock =
            parseInt(stockElement.textContent);

        stock++;

        stockElement.textContent = stock;

        updateStatus(row);

        updateSummary();

    });


    decreaseButton.addEventListener("click", () => {

        const stockElement =
            row.querySelector(".stock");

        let stock =
            parseInt(stockElement.textContent);


        if (stock > 0) {

            stock--;

            stockElement.textContent = stock;

        }


        updateStatus(row);

        updateSummary();

    });

});


/* SEARCH */

searchInput.addEventListener("input", () => {

    const search =
        searchInput.value.toLowerCase();


    products.forEach(row => {

        const productName =
            row.children[0].textContent.toLowerCase();


        if (productName.includes(search)) {

            row.style.display = "grid";

        }

        else {

            row.style.display = "none";

        }

    });

});


/* FILTER */

stockFilter.addEventListener("change", () => {

    const filter = stockFilter.value;


    products.forEach(row => {

        const stock =
            parseInt(
                row.querySelector(".stock").textContent
            );


        let status;


        if (stock === 0) {

            status = "out-stock";

        }

        else if (stock <= 10) {

            status = "low-stock";

        }

        else {

            status = "in-stock";

        }


        if (filter === "all" || filter === status) {

            row.style.display = "grid";

        }

        else {

            row.style.display = "none";

        }

    });

});


/* INITIAL DATA */

products.forEach(row => {

    updateStatus(row);

});

updateSummary();


    if (products.length === 0) {

        inventoryList.innerHTML = `

            <div style="padding: 60px; text-align: center; opacity: 0.5;">

                No products available.

                <br><br>

                Add products from the Products section.

            </div>

        `;

    }

}


displayInventory();
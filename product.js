let products = JSON.parse(localStorage.getItem("smartgenProducts")) || [
    {
        id: 1,
        name: "Product 01",
        category: "General",
        price: 600,
        stock: 25
    },
    {
        id: 2,
        name: "Product 02",
        category: "General",
        price: 850,
        stock: 18
    },
    {
        id: 3,
        name: "Product 03",
        category: "General",
        price: 1200,
        stock: 32
    }
];


const productList = document.getElementById("productList");
const productCount = document.getElementById("productCount");
const searchProduct = document.getElementById("searchProduct");

const openAddProduct = document.getElementById("openAddProduct");
const closeProductForm = document.getElementById("closeProductForm");

const productFormContainer =
    document.getElementById("productFormContainer");

const productForm =
    document.getElementById("productForm");

const productName =
    document.getElementById("productName");

const productCategory =
    document.getElementById("productCategory");

const productPrice =
    document.getElementById("productPrice");

const productStock =
    document.getElementById("productStock");


let editingProductId = null;


/* DISPLAY PRODUCTS */

function displayProducts(list = products) {

    productList.innerHTML = "";

    productCount.textContent =
        `${list.length} Product${list.length !== 1 ? "s" : ""}`;


    if (list.length === 0) {

        productList.innerHTML = `
            <div class="empty-products">
                No products found.
            </div>
        `;

        return;
    }


    list.forEach(function(product) {

        const row = document.createElement("div");

        row.className = "product-row";


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

            <span class="action-buttons">

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

            </span>

        `;


        productList.appendChild(row);

    });

}


/* SAVE PRODUCTS */

function saveProducts() {

    localStorage.setItem(
        "smartgenProducts",
        JSON.stringify(products)
    );

}


/* OPEN ADD PRODUCT FORM */

openAddProduct.addEventListener("click", function() {

    editingProductId = null;

    productForm.reset();

    productFormContainer.classList.add("active");

    document.querySelector(".form-header h2").textContent =
        "Add Product";

    document.querySelector(".save-product-button").textContent =
        "Add Product";

    productName.focus();

});


/* CLOSE FORM */

closeProductForm.addEventListener("click", function() {

    productFormContainer.classList.remove("active");

    productForm.reset();

    editingProductId = null;

});


/* ADD / EDIT PRODUCT */

productForm.addEventListener("submit", function(event) {

    event.preventDefault();


    const name = productName.value.trim();

    const category = productCategory.value.trim();

    const price = Number(productPrice.value);

    const stock = Number(productStock.value);


    if (editingProductId === null) {

        const newProduct = {

            id: Date.now(),

            name: name,

            category: category,

            price: price,

            stock: stock

        };


        products.push(newProduct);

    }

    else {

        const product = products.find(function(product) {

            return product.id === editingProductId;

        });


        if (product) {

            product.name = name;

            product.category = category;

            product.price = price;

            product.stock = stock;

        }

    }


    saveProducts();

    displayProducts();

    productForm.reset();

    productFormContainer.classList.remove("active");

    editingProductId = null;

});


/* EDIT PRODUCT */

function editProduct(id) {

    const product = products.find(function(product) {

        return product.id === id;

    });


    if (!product) {
        return;
    }


    editingProductId = id;


    productName.value = product.name;

    productCategory.value = product.category;

    productPrice.value = product.price;

    productStock.value = product.stock;


    document.querySelector(".form-header h2").textContent =
        "Edit Product";

    document.querySelector(".save-product-button").textContent =
        "Save Changes";


    productFormContainer.classList.add("active");

    productName.focus();

}


/* DELETE PRODUCT */

function deleteProduct(id) {

    const confirmDelete =
        confirm("Are you sure you want to delete this product?");


    if (!confirmDelete) {
        return;
    }


    products = products.filter(function(product) {

        return product.id !== id;

    });


    saveProducts();

    displayProducts();

}


/* SEARCH */

searchProduct.addEventListener("input", function() {

    const searchValue =
        searchProduct.value.toLowerCase();


    const filteredProducts =
        products.filter(function(product) {

            return (

                product.name
                    .toLowerCase()
                    .includes(searchValue)

                ||

                product.category
                    .toLowerCase()
                    .includes(searchValue)

            );

        });


    displayProducts(filteredProducts);

});


/* INITIAL DISPLAY */

displayProducts();
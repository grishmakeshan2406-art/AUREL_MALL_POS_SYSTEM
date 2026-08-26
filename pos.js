let products =
    JSON.parse(localStorage.getItem("smartgenProducts")) || [];


let cart = [];


const posProductList =
    document.getElementById("posProductList");

const cartItems =
    document.getElementById("cartItems");

const cartCount =
    document.getElementById("cartCount");

const subtotalElement =
    document.getElementById("subtotal");

const taxElement =
    document.getElementById("tax");

const totalElement =
    document.getElementById("total");

const generateBillButton =
    document.getElementById("generateBill");


/* DISPLAY PRODUCTS */

function displayProducts() {

    posProductList.innerHTML = "";


    if (products.length === 0) {

        posProductList.innerHTML = `
            <p>
                No products available.
                Add products first.
            </p>
        `;

        return;
    }


    products.forEach(function(product) {

        const card =
            document.createElement("div");

        card.className =
            "pos-product-card";


        card.innerHTML = `

            <h3>
                ${product.name}
            </h3>

            <p>
                ${product.category}
            </p>

            <div class="product-price">
                ₹${product.price}
            </div>

            <div class="product-stock">
                Stock: ${product.stock}
            </div>

            <button
                class="add-to-cart"
                onclick="addToCart(${product.id})"
                ${product.stock === 0 ? "disabled" : ""}
            >
                ${product.stock === 0
                    ? "Out of Stock"
                    : "Add to Cart"
                }
            </button>

        `;


        posProductList.appendChild(card);

    });

}


/* ADD TO CART */

function addToCart(productId) {

    const product =
        products.find(function(product) {

            return product.id === productId;

        });


    if (!product) {
        return;
    }


    const existingItem =
        cart.find(function(item) {

            return item.id === productId;

        });


    if (existingItem) {

        if (existingItem.quantity < product.stock) {

            existingItem.quantity++;

        }

        else {

            alert("Not enough stock available.");

            return;

        }

    }

    else {

        cart.push({

            id: product.id,

            name: product.name,

            price: product.price,

            quantity: 1

        });

    }


    displayCart();

}


/* DISPLAY CART */

function displayCart() {

    cartItems.innerHTML = "";


    if (cart.length === 0) {

        cartItems.innerHTML = `
            <div class="empty-cart">
                Your cart is empty.
            </div>
        `;

    }


    let totalItems = 0;


    cart.forEach(function(item) {

        totalItems += item.quantity;


        const cartItem =
            document.createElement("div");

        cartItem.className =
            "cart-item";


        cartItem.innerHTML = `

            <div>

                <h3>
                    ${item.name}
                </h3>

                <p>
                    ₹${item.price} × ${item.quantity}
                </p>

            </div>


            <div class="cart-controls">

                <button
                    class="quantity-button"
                    onclick="decreaseQuantity(${item.id})"
                >
                    −
                </button>

                <span>
                    ${item.quantity}
                </span>

                <button
                    class="quantity-button"
                    onclick="increaseQuantity(${item.id})"
                >
                    +
                </button>

                <button
                    class="remove-item"
                    onclick="removeFromCart(${item.id})"
                >
                    Remove
                </button>

            </div>

        `;


        cartItems.appendChild(cartItem);

    });


    cartCount.textContent =
        `${totalItems} item${totalItems !== 1 ? "s" : ""}`;


    calculateTotal();

}


/* INCREASE */

function increaseQuantity(id) {

    const item =
        cart.find(function(item) {

            return item.id === id;

        });


    const product =
        products.find(function(product) {

            return product.id === id;

        });


    if (!item || !product) {
        return;
    }


    if (item.quantity >= product.stock) {

        alert("Maximum available stock reached.");

        return;

    }


    item.quantity++;

    displayCart();

}


/* DECREASE */

function decreaseQuantity(id) {

    const item =
        cart.find(function(item) {

            return item.id === id;

        });


    if (!item) {
        return;
    }


    item.quantity--;


    if (item.quantity <= 0) {

        removeFromCart(id);

        return;

    }


    displayCart();

}


/* REMOVE */

function removeFromCart(id) {

    cart =
        cart.filter(function(item) {

            return item.id !== id;

        });


    displayCart();

}


/* CALCULATE TOTAL */

function calculateTotal() {

    let subtotal = 0;


    cart.forEach(function(item) {

        subtotal +=
            item.price * item.quantity;

    });


    const tax =
        subtotal * 0.05;


    const total =
        subtotal + tax;


    subtotalElement.textContent =
        `₹${subtotal.toFixed(2)}`;

    taxElement.textContent =
        `₹${tax.toFixed(2)}`;

    totalElement.textContent =
        `₹${total.toFixed(2)}`;

}


/* GENERATE BILL */

generateBillButton.addEventListener(
    "click",
    function() {

        if (cart.length === 0) {

            alert("Your cart is empty.");

            return;

        }


        let confirmBill =
            confirm(
                "Generate bill for this transaction?"
            );


        if (!confirmBill) {
            return;
        }


        /* UPDATE STOCK */

        cart.forEach(function(item) {

            const product =
                products.find(function(product) {

                    return product.id === item.id;

                });


            if (product) {

                product.stock -= item.quantity;

            }

        });


        /* SAVE UPDATED PRODUCTS */

        localStorage.setItem(
            "smartgenProducts",
            JSON.stringify(products)
        );


        /* SAVE SALE */

        let sales =
            JSON.parse(
                localStorage.getItem("smartgenSales")
            ) || [];


        const subtotal =
            cart.reduce(function(total, item) {

                return total +
                    item.price * item.quantity;

            }, 0);


        const tax =
            subtotal * 0.05;


        const total =
            subtotal + tax;


        const sale = {

            id: Date.now(),

            date: new Date().toLocaleString(),

            items: cart,

            subtotal: subtotal,

            tax: tax,

            total: total

        };


        sales.push(sale);


        localStorage.setItem(
            "smartgenSales",
            JSON.stringify(sales)
        );


        alert(
            `Bill generated successfully!\n\nTotal: ₹${total.toFixed(2)}`
        );


        cart = [];

        displayCart();

        displayProducts();

    }
);


/* INITIAL DISPLAY */

displayProducts();

displayCart();
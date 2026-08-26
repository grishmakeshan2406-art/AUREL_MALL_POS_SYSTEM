// ===============================
// GET CART
// ===============================

let cart = JSON.parse(localStorage.getItem("cart")) || [];


// ===============================
// DISPLAY CART
// ===============================

function displayCart() {

    const cartItems = document.getElementById("cartItems");
    const itemCount = document.getElementById("itemCount");
    const summaryItems = document.getElementById("summaryItems");
    const subtotalElement = document.getElementById("subtotal");
    const totalElement = document.getElementById("total");

    cartItems.innerHTML = "";

    // ===============================
    // EMPTY CART
    // ===============================

    if (cart.length === 0) {

        cartItems.innerHTML = `
            <div class="empty-cart">

                <h3>
                    Your cart is empty
                </h3>

                <p>
                    Explore our shops and add something you like.
                </p>

                <a href="customer.html">
                    Start Shopping →
                </a>

            </div>
        `;

        itemCount.textContent = "0 items";
        summaryItems.textContent = "0";
        subtotalElement.textContent = "₹0";
        totalElement.textContent = "₹0";

        return;
    }


    // ===============================
    // CALCULATE TOTAL
    // ===============================

    let totalItems = 0;
    let subtotal = 0;


    // ===============================
    // DISPLAY PRODUCTS
    // ===============================

    cart.forEach(function (item, index) {

        const quantity = Number(item.quantity) || 1;

        const price = Number(item.price) || 0;

        const itemTotal = price * quantity;


        totalItems += quantity;

        subtotal += itemTotal;


        const cartItem = document.createElement("div");

        cartItem.className = "cart-item";


        cartItem.innerHTML = `

            <div class="cart-item-image">

                ${
                    item.image
                    ? `<img src="${item.image}" alt="${item.name}">`
                    : "Product"
                }

            </div>


            <div class="cart-item-details">

                <h3>
                    ${item.name}
                </h3>

                <p>
                    ${item.category || "SmartGen Mall"}
                </p>

                <strong>
                    ₹${price.toLocaleString("en-IN")}
                </strong>

            </div>


            <div class="quantity-control">

                <button onclick="decreaseQuantity(${index})">
                    −
                </button>

                <span>
                    ${quantity}
                </span>

                <button onclick="increaseQuantity(${index})">
                    +
                </button>

            </div>


            <div class="cart-item-total">

                <strong>
                    ₹${itemTotal.toLocaleString("en-IN")}
                </strong>

                <button
                    class="remove-button"
                    onclick="removeItem(${index})"
                >
                    Remove
                </button>

            </div>

        `;


        cartItems.appendChild(cartItem);

    });


    // ===============================
    // UPDATE SUMMARY
    // ===============================

    itemCount.textContent =
        totalItems +
        (totalItems === 1 ? " item" : " items");


    summaryItems.textContent = totalItems;


    subtotalElement.textContent =
        "₹" + subtotal.toLocaleString("en-IN");


    totalElement.textContent =
        "₹" + subtotal.toLocaleString("en-IN");

}



// ===============================
// INCREASE QUANTITY
// ===============================

function increaseQuantity(index) {

    cart[index].quantity =
        (Number(cart[index].quantity) || 1) + 1;

    saveCart();

}



// ===============================
// DECREASE QUANTITY
// ===============================

function decreaseQuantity(index) {

    const quantity =
        Number(cart[index].quantity) || 1;


    if (quantity > 1) {

        cart[index].quantity = quantity - 1;

    } else {

        cart.splice(index, 1);

    }

    saveCart();

}



// ===============================
// REMOVE ITEM
// ===============================

function removeItem(index) {

    cart.splice(index, 1);

    saveCart();

}



// ===============================
// SAVE CART
// ===============================

function saveCart() {

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    displayCart();

}



// ===============================
// CHECKOUT
// ===============================

function proceedToCheckout() {

    if (cart.length === 0) {

        alert("Your cart is empty.");

        return;

    }

    window.location.href = "checkout.html";

}



// ===============================
// LOAD CART
// ===============================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        displayCart();

    }
);
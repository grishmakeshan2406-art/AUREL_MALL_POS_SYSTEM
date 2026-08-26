document.addEventListener("DOMContentLoaded", function () {

    // ==========================================
    // GET CART
    // ==========================================

    let cart =
        JSON.parse(localStorage.getItem("cart")) || [];


    // ==========================================
    // ELEMENTS
    // ==========================================

    const checkoutItems =
        document.getElementById("checkoutItems");

    const itemCount =
        document.getElementById("itemCount");

    const subtotalElement =
        document.getElementById("subtotal");

    const totalElement =
        document.getElementById("total");

    const checkoutForm =
        document.getElementById("checkoutForm");


    let subtotal = 0;
    let totalQuantity = 0;


    // ==========================================
    // EMPTY CART
    // ==========================================

    if (cart.length === 0) {

        checkoutItems.innerHTML = `
            <p class="empty-message">
                Your cart is empty.
            </p>
        `;

        itemCount.textContent = "0";

        subtotalElement.textContent = "₹0";

        totalElement.textContent = "₹0";

        return;
    }


    // ==========================================
    // DISPLAY CART ITEMS
    // ==========================================

    cart.forEach(function (item) {

        const quantity =
            Number(item.quantity) || 1;

        const price =
            Number(item.price) || 0;

        const itemTotal =
            price * quantity;


        subtotal += itemTotal;

        totalQuantity += quantity;


        const itemElement =
            document.createElement("div");


        itemElement.className =
            "checkout-item";


        itemElement.innerHTML = `

            <div>

                <div class="checkout-item-name">
                    ${item.name}
                </div>

                <div class="checkout-item-info">
                    Quantity: ${quantity}
                </div>

            </div>


            <div class="checkout-item-price">

                ₹${itemTotal.toLocaleString("en-IN")}

            </div>

        `;


        checkoutItems.appendChild(itemElement);

    });


    // ==========================================
    // UPDATE SUMMARY
    // ==========================================

    itemCount.textContent =
        totalQuantity;


    subtotalElement.textContent =
        "₹" + subtotal.toLocaleString("en-IN");


    totalElement.textContent =
        "₹" + subtotal.toLocaleString("en-IN");


    // ==========================================
    // PLACE ORDER
    // ==========================================

    checkoutForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            // ======================================
            // GET DELIVERY DETAILS
            // ======================================

            const name =
                document
                    .getElementById("name")
                    .value
                    .trim();


            const phone =
                document
                    .getElementById("phone")
                    .value
                    .trim();


            const email =
                document
                    .getElementById("email")
                    .value
                    .trim();


            const address =
                document
                    .getElementById("address")
                    .value
                    .trim();


            const city =
                document
                    .getElementById("city")
                    .value
                    .trim();


            const pincode =
                document
                    .getElementById("pincode")
                    .value
                    .trim();


            const paymentInput =
                document.querySelector(
                    'input[name="payment"]:checked'
                );


            const paymentMethod =
                paymentInput
                    ? paymentInput.value
                    : "";


            // ======================================
            // VALIDATION
            // ======================================

            if (
                !name ||
                !phone ||
                !email ||
                !address ||
                !city ||
                !pincode
            ) {

                alert(
                    "Please fill in all delivery details."
                );

                return;

            }


            if (!paymentMethod) {

                alert(
                    "Please select a payment method."
                );

                return;

            }


            // ======================================
            // GET CURRENT PRODUCTS
            // ======================================

            let products =
                JSON.parse(
                    localStorage.getItem("products")
                ) || [];


            // ======================================
            // CHECK STOCK
            // ======================================

            for (let i = 0; i < cart.length; i++) {

                const cartItem =
                    cart[i];


                const quantity =
                    Number(cartItem.quantity) || 1;


                const product =
                    products.find(function (item) {

                        return String(item.id) ===
                            String(cartItem.id);

                    });


                // Product no longer exists

                if (!product) {

                    alert(
                        cartItem.name +
                        " is no longer available."
                    );

                    return;

                }


                // Current stock

                const availableStock =
                    Number(product.stock) || 0;


                // Not enough stock

                if (quantity > availableStock) {

                    alert(
                        "Not enough stock for " +
                        cartItem.name +
                        ".\n\nAvailable stock: " +
                        availableStock +
                        "\nRequested: " +
                        quantity
                    );

                    return;

                }

            }


            // ======================================
            // CREATE ORDER ID
            // ======================================

            const orderId =
                "SGM-" +
                Date.now()
                    .toString()
                    .slice(-8);


            // ======================================
            // UPDATE PRODUCT STOCK
            // ======================================

            cart.forEach(function (cartItem) {

                const quantity =
                    Number(cartItem.quantity) || 1;


                const product =
                    products.find(function (item) {

                        return String(item.id) ===
                            String(cartItem.id);

                    });


                if (product) {

                    product.stock =
                        Number(product.stock) -
                        quantity;

                }

            });


            // ======================================
            // SAVE UPDATED PRODUCTS
            // ======================================

            localStorage.setItem(
                "products",
                JSON.stringify(products)
            );


            // ======================================
            // CREATE ORDER
            // ======================================

            const order = {

                orderId: orderId,

                customer: {

                    name: name,

                    phone: phone,

                    email: email,

                    address: address,

                    city: city,

                    pincode: pincode

                },


                items: cart.map(function (item) {

                    return {

                        id: item.id,

                        name: item.name,

                        category:
                            item.category || "Other",

                        price:
                            Number(item.price) || 0,

                        quantity:
                            Number(item.quantity) || 1,

                        shopId:
                            item.shopId || null

                    };

                }),


                itemCount: totalQuantity,

                subtotal: subtotal,

                total: subtotal,

                paymentMethod: paymentMethod,

                // Order starts as Pending

                status: "Pending",

                date:
                    new Date().toLocaleString()

            };


            // ======================================
            // GET OLD ORDERS
            // ======================================

            let orders =
                JSON.parse(
                    localStorage.getItem("orders")
                ) || [];


            // ======================================
            // ADD NEW ORDER
            // ======================================

            orders.push(order);


            // ======================================
            // SAVE ORDERS
            // ======================================

            localStorage.setItem(
                "orders",
                JSON.stringify(orders)
            );


            // ======================================
            // SAVE LATEST ORDER
            // ======================================

            localStorage.setItem(
                "lastOrder",
                JSON.stringify(order)
            );


            // ======================================
            // CLEAR CART
            // ======================================

            localStorage.removeItem("cart");


            // ======================================
            // SHOW CONFIRMATION
            // ======================================

            const checkoutIntro =
                document.querySelector(
                    ".checkout-intro"
                );


            const checkoutGrid =
                document.querySelector(
                    ".checkout-grid"
                );


            if (checkoutIntro) {

                checkoutIntro.style.display =
                    "none";

            }


            if (checkoutGrid) {

                checkoutGrid.style.display =
                    "none";

            }


            const confirmation =
                document.getElementById(
                    "orderConfirmation"
                );


            if (confirmation) {

                confirmation.style.display =
                    "block";

            }


            const orderIdElement =
                document.getElementById(
                    "orderId"
                );


            if (orderIdElement) {

                orderIdElement.textContent =
                    orderId;

            }


            // ======================================
            // SCROLL TO TOP
            // ======================================

            window.scrollTo({

                top: 0,

                behavior: "smooth"

            });


        }
    );

});
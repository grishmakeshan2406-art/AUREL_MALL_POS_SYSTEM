// ===============================
// SHOP INFORMATION
// ===============================

const params = new URLSearchParams(window.location.search);

const category = params.get("category");

const shopName = document.getElementById("shopName");
const shopDescription = document.getElementById("shopDescription");


const shops = {

    fashion: {
        name: "Fashion",
        description: "Discover clothing, footwear and accessories."
    },

    electronics: {
        name: "Electronics",
        description: "Explore gadgets, devices and electronic accessories."
    },

    lifestyle: {
        name: "Lifestyle",
        description: "Discover products for your everyday lifestyle."
    },

    food: {
        name: "Food & Cafe",
        description: "Explore food, beverages and dining options."
    }

};


if (shops[category]) {

    shopName.textContent =
        shops[category].name;

    shopDescription.textContent =
        shops[category].description;

}



// ===============================
// SORT PRODUCTS
// ===============================

const sortProducts =
    document.getElementById("sortProducts");

const productContainer =
    document.getElementById("productContainer");


if (sortProducts && productContainer) {

    sortProducts.addEventListener(
        "change",
        function () {

            const products =
                Array.from(
                    productContainer.querySelectorAll(
                        ".product-card"
                    )
                );


            if (this.value === "low") {

                products.sort(function (a, b) {

                    return Number(a.dataset.price) -
                           Number(b.dataset.price);

                });

            }


            if (this.value === "high") {

                products.sort(function (a, b) {

                    return Number(b.dataset.price) -
                           Number(a.dataset.price);

                });

            }


            products.forEach(function (product) {

                productContainer.appendChild(product);

            });

        }
    );

}



// ===============================
// ADD TO CART
// ===============================

function addToCart(
    name,
    price,
    image,
    category
) {

    let cart =
        JSON.parse(
            localStorage.getItem("cart")
        ) || [];


    const existingProduct =
        cart.find(function (product) {

            return product.name === name;

        });


    // ===============================
    // PRODUCT ALREADY EXISTS
    // ===============================

    if (existingProduct) {

        existingProduct.quantity =
            (Number(existingProduct.quantity) || 1) + 1;

    }


    // ===============================
    // NEW PRODUCT
    // ===============================

    else {

        cart.push({

            name: name,

            price: Number(price),

            quantity: 1,

            image: image,

            category: category

        });

    }


    // ===============================
    // SAVE CART
    // ===============================

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );


    alert(
        name + " added to cart!"
    );

}
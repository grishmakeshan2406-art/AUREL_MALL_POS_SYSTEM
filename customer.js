// ===============================
// VIEW SHOP
// ===============================

function viewShop(shopName) {

    localStorage.setItem(
        "selectedShop",
        shopName
    );


    if (shopName === "Fashion") {

        window.location.href = "shop.html";

    }

    else if (shopName === "Lifestyle") {

        window.location.href = "lifestyle.html";

    }

    else if (shopName === "Food & Cafe") {

        window.location.href = "cafe.html";

    }

    else if (shopName === "Electronics") {

        window.location.href = "electronic.html";

    }

}



// ===============================
// VIEW PRODUCT
// ===============================

function viewProduct(productName) {

    localStorage.setItem(
        "selectedProduct",
        productName
    );


    if (productName === "Classic T-Shirt") {

        window.location.href = "shop.html";

    }

    else if (productName === "Wireless Earbuds") {

        window.location.href = "electronic.html";

    }

    else if (productName === "Smart Watch") {

        window.location.href = "electronic.html";

    }

    else if (productName === "Tote Bag") {

        window.location.href = "lifestyle.html";

    }

    else if (productName === "Perfume") {

        window.location.href = "lifestyle.html";

    }

    else if (productName === "Caffe Latte") {

        window.location.href = "cafe.html";

    }

}



// ===============================
// SEARCH
// ===============================

function searchItems() {

    const searchInput =
        document.getElementById("searchInput");

    const searchValue =
        searchInput.value.trim();


    if (searchValue === "") {

        alert(
            "Please enter a shop or product to search."
        );

        searchInput.focus();

        return;
    }


    localStorage.setItem(
        "searchQuery",
        searchValue
    );


    window.location.href = "shop.html";

}



// ===============================
// ENTER KEY SEARCH
// ===============================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        const searchInput =
            document.getElementById("searchInput");


        if (searchInput) {

            searchInput.addEventListener(
                "keydown",
                function (event) {

                    if (event.key === "Enter") {

                        searchItems();

                    }

                }
            );

        }


        updateCartCount();

    }
);



// ===============================
// CART COUNT
// ===============================

function updateCartCount() {

    const cartCountElement =
        document.getElementById("cartCount");


    if (!cartCountElement) {

        return;

    }


    let cart =
        JSON.parse(
            localStorage.getItem("cart")
        ) || [];


    if (cart.length === 0) {

        cartCountElement.textContent =
            "Your cart is empty.";

        return;

    }


    let totalItems = 0;


    cart.forEach(function (item) {

        totalItems +=
            item.quantity || 1;

    });


    cartCountElement.textContent =
        totalItems + " item(s) in your cart.";

}
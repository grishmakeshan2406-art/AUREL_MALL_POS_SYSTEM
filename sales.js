let sales =
    JSON.parse(localStorage.getItem("smartgenSales")) || [];


const salesList =
    document.getElementById("salesList");

const totalOrders =
    document.getElementById("totalOrders");

const totalSales =
    document.getElementById("totalSales");

const itemsSold =
    document.getElementById("itemsSold");

const averageOrder =
    document.getElementById("averageOrder");

const billModal =
    document.getElementById("billModal");

const billDetails =
    document.getElementById("billDetails");

const closeModal =
    document.getElementById("closeModal");


/* DISPLAY SALES */

function displaySales() {

    salesList.innerHTML = "";


    let salesTotal = 0;

    let itemTotal = 0;


    sales.forEach(function(sale) {

        salesTotal += sale.total;


        sale.items.forEach(function(item) {

            itemTotal += item.quantity;

        });

    });


    totalOrders.textContent =
        sales.length;


    totalSales.textContent =
        `₹${salesTotal.toFixed(2)}`;


    itemsSold.textContent =
        itemTotal;


    const average =
        sales.length > 0
            ? salesTotal / sales.length
            : 0;


    averageOrder.textContent =
        `₹${average.toFixed(2)}`;


    if (sales.length === 0) {

        salesList.innerHTML = `

            <div class="empty-sales">

                No sales yet.

                <br><br>

                Completed POS transactions will appear here.

            </div>

        `;

        return;

    }


    /* SHOW NEWEST FIRST */

    const newestSales =
        [...sales].reverse();


    newestSales.forEach(function(sale) {

        let numberOfItems = 0;


        sale.items.forEach(function(item) {

            numberOfItems += item.quantity;

        });


        const row =
            document.createElement("div");


        row.className =
            "transaction-row";


        row.innerHTML = `

            <span>
                #${sale.id}
            </span>

            <span>
                ${sale.date}
            </span>

            <span>
                ${numberOfItems}
            </span>

            <span>
                ₹${sale.total.toFixed(2)}
            </span>

            <span>

                <button
                    class="view-button"
                    onclick="viewSale(${sale.id})"
                >
                    View
                </button>

            </span>

        `;


        salesList.appendChild(row);

    });

}


/* VIEW SALE */

function viewSale(id) {

    const sale =
        sales.find(function(sale) {

            return sale.id === id;

        });


    if (!sale) {
        return;
    }


    let productsHTML = "";


    sale.items.forEach(function(item) {

        productsHTML += `

            <div class="bill-product">

                <span>
                    ${item.name} × ${item.quantity}
                </span>

                <span>
                    ₹${(
                        item.price * item.quantity
                    ).toFixed(2)}
                </span>

            </div>

        `;

    });


    billDetails.innerHTML = `

        <p>
            <strong>Order ID:</strong>
            #${sale.id}
        </p>

        <p>
            <strong>Date:</strong>
            ${sale.date}
        </p>


        <br>


        ${productsHTML}


        <div class="bill-summary">

            <div>

                <span>
                    Subtotal
                </span>

                <span>
                    ₹${sale.subtotal.toFixed(2)}
                </span>

            </div>


            <div>

                <span>
                    Tax
                </span>

                <span>
                    ₹${sale.tax.toFixed(2)}
                </span>

            </div>


            <div class="bill-total">

                <span>
                    Total
                </span>

                <span>
                    ₹${sale.total.toFixed(2)}
                </span>

            </div>

        </div>

    `;


    billModal.classList.add("active");

}


/* CLOSE MODAL */

closeModal.addEventListener(
    "click",
    function() {

        billModal.classList.remove("active");

    }
);


/* CLOSE WHEN CLICKING OUTSIDE */

billModal.addEventListener(
    "click",
    function(event) {

        if (event.target === billModal) {

            billModal.classList.remove("active");

        }

    }
);


/* INITIAL DISPLAY */

displaySales();
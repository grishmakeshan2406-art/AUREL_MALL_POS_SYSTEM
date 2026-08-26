const salesData = {
    daily: {
        revenue: 45280,
        orders: 36,
        products: 98
    },

    weekly: {
        revenue: 286450,
        orders: 214,
        products: 642
    },

    monthly: {
        revenue: 1245800,
        orders: 987,
        products: 3245
    }
};


function showSales(period) {

    const data = salesData[period];

    const averageOrder = data.revenue / data.orders;

    document.getElementById("totalRevenue").textContent =
        "₹" + data.revenue.toLocaleString("en-IN");

    document.getElementById("totalOrders").textContent =
        data.orders;

    document.getElementById("productsSold").textContent =
        data.products;

    document.getElementById("averageOrder").textContent =
        "₹" + Math.round(averageOrder).toLocaleString("en-IN");


    document.getElementById("salesResult").innerHTML =

        "<h3>" +
        period.charAt(0).toUpperCase() + period.slice(1) +
        " Sales</h3>" +

        "<p>Total revenue: ₹" +
        data.revenue.toLocaleString("en-IN") +
        "</p>" +

        "<p>Total orders: " +
        data.orders +
        "</p>" +

        "<p>Products sold: " +
        data.products +
        "</p>";
}
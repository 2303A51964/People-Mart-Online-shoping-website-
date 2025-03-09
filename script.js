document.addEventListener("DOMContentLoaded", () => {
    const categories = [
        { name: "clothing", minPrice: 100, maxPrice: 80000 },
        { name: "TV", minPrice: 20000, maxPrice: 150000 },
        { name: "Laptop", minPrice: 30000, maxPrice: 200000 },
        { name: "Fridge", minPrice: 25000, maxPrice: 100000 },
        { name: "AC", minPrice: 30000, maxPrice: 120000 }
    ];

    const productSections = document.getElementById("product-sections");
    const orderList = document.getElementById("order-list");
    const orders = JSON.parse(localStorage.getItem("orders")) || [];

    // Function to generate products
    function generateProducts(category, count) {
        const section = document.createElement("div");
        section.className = "product-section";
        section.innerHTML = <h3>${category.name}s</h3>;
        for (let i = 1; i <= count; i++) {
            const price = Math.floor(Math.random() * (category.maxPrice - category.minPrice) + category.minPrice);
            const product = document.createElement("div");
            product.className = "product";
            product.innerHTML = `
                <img src="images/${category.name.toLowerCase()}${i}.jpg" alt="${category.name} ${i}">
                <h4>${category.name} ${i}</h4>
                <p>₹${price}</p>
                <button onclick="addToOrder('${category.name} ${i}', ${price})">Place Order</button>
            `;
            section.appendChild(product);
        }
        productSections.appendChild(section);
    }

    // Add products for all categories
    if (productSections) {
        categories.forEach((category) => generateProducts(category, 40));
    }

    // Add product to the localStorage and update order list
    window.addToOrder = (name, price) => {
        orders.push({ name, price });
        localStorage.setItem("orders", JSON.stringify(orders));
        alert(`${name} added to your orders!`);
    };

    // Update the orders page
    if (orderList) {
        if (orders.length === 0) {
            orderList.innerHTML = "<p>No orders placed yet.</p>";
        } else {
            orderList.innerHTML = orders
                .map(order => <p>${order.name} - ₹${order.price}</p>)
                .join("");
        }
    }

    // Handle delivery form submission
    const addressForm = document.getElementById("address-form");
    if (addressForm) {
        addressForm.addEventListener("submit", (e) => {
            e.preventDefault();
            alert("Order placed successfully! Thank you.");
            localStorage.removeItem("orders");
            addressForm.reset();
            orders.length = 0;
            if (orderList) orderList.innerHTML = "<p>No orders placed yet.</p>";
        });
    }
});
<script>
        // Function to add product to cart
        function addToCart(productName, productPrice) {
            // Get cart items from local storage or initialize as an empty array
            let cartItems = JSON.parse(localStorage.getItem("cart")) || [];

            // Check if the product is already in the cart
            const existingProductIndex = cartItems.findIndex(item => item.name === productName);

            if (existingProductIndex > -1) {
                // If product already exists, increase quantity
                cartItems[existingProductIndex].quantity += 1;
            } else {
                // Otherwise, add new product to cart
                cartItems.push({ name: productName, price: productPrice, quantity: 1 });
            }

            // Save updated cart to local storage
            localStorage.setItem("cart", JSON.stringify(cartItems));
        }

        // Adding event listeners to the "Add to Cart" buttons
        document.querySelectorAll(".product-item button").forEach((button, index) => {
            button.addEventListener("click", () => {
                const productName = button.previousElementSibling.previousElementSibling.innerText;
                const productPrice = parseInt(button.previousElementSibling.innerText.replace('₹', '').trim());
                addToCart(productName, productPrice);
            });
        });
</script>
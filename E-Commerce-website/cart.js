document.addEventListener("DOMContentLoaded", function() {
    updateCartCount();
    
    if (document.getElementById("cart-items")) {
        updateCartDisplay();
    }
});

function getCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    
    if (document.getElementById("cart-items")) {
        updateCartDisplay();
    }
}

function updateCartCount() {
    const cart = getCart();
    const totalItems = cart.reduce((total, item) => total + (item.quantity || 1), 0);
    const cartCountElements = document.querySelectorAll("#cart-count");
    
    cartCountElements.forEach(element => {
        element.textContent = totalItems;
    });
}

// Add item to cart
function addToCart(id, name, price, image, quantity = 1) {
    let cart = getCart();
    let existingItem = cart.find(item => item.id === id);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            id: id,
            name: name,
            price: price,
            image: image,
            quantity: quantity
        });
    }
    
    saveCart(cart);
    return false;
}

// Remove item from cart
function removeFromCart(id) {
    let cart = getCart();
    cart = cart.filter(item => item.id !== id);
    saveCart(cart);
}

// Update item quantity in cart
function updateQuantity(id, change) {
    let cart = getCart();
    let item = cart.find(item => item.id === id);
    
    if (item) {
        item.quantity += change;
        
        if (item.quantity <= 0) {
            cart = cart.filter(item => item.id !== id);
        }
        
        saveCart(cart);
    }
}

// Update the cart display (for cart.html)
function updateCartDisplay() {
    const cart = getCart();
    const cartContainer = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");
    
    cartContainer.innerHTML = "";
    
    if (cart.length === 0) {
        cartContainer.innerHTML = '<tr><td colspan="5">Your cart is empty</td></tr>';
        cartTotal.textContent = "0";
        return;
    }
    
    // Calculate and display cart items
    let total = 0;
    
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${item.name}</td>
            <td>Rs ${item.price.toLocaleString()}</td>
            <td>
                <button onclick="updateQuantity('${item.id}', -1)">-</button>
                ${item.quantity}
                <button onclick="updateQuantity('${item.id}', 1)">+</button>
            </td>
            <td>Rs ${itemTotal.toLocaleString()}</td>
            <td><button onclick="removeFromCart('${item.id}')">Remove</button></td>
        `;
        cartContainer.appendChild(row);
    });
    
    // Update total
    cartTotal.textContent = total.toLocaleString();
}


window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.updateQuantity = updateQuantity;
window.updateCartCount = updateCartCount;
window.updateCartDisplay = updateCartDisplay;


function checkout() {
    const cart = getCart();
    
    if (cart.length === 0) {
        alert("Your cart is empty. Please add items before checking out.");
        return;
    }
    
    const orderData = {
        items: cart,
        total: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0),
        date: new Date().toISOString()
    };
    
    localStorage.setItem("currentOrder", JSON.stringify(orderData));
    
    window.location.href = "order.html";
}

window.checkout = checkout;


row.innerHTML = `
    <td>
        ${item.name}
        ${item.color ? `<span class="color-chip" style="background-color:${item.color}"></span>` : ''}
    </td>
    <td>Rs ${item.price.toLocaleString()}</td>
    <td>
        <button onclick="updateQuantity('${item.id}', -1, '${item.color}')">-</button>
        ${item.quantity}
        <button onclick="updateQuantity('${item.id}', 1, '${item.color}')">+</button>
    </td>
    <td>Rs ${itemTotal.toLocaleString()}</td>
    <td><button onclick="removeFromCart('${item.id}', '${item.color}')">Remove</button></td>
`;




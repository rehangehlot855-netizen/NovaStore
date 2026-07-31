// High-Fashion Luxury Demo Products with SAR Currency & Unsplash Images
let products = [
    { 
        id: 1, 
        name: "Embroidered Velvet Abaya", 
        price: 450, 
        image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=800&auto=format&fit=crop" 
    },
    { 
        id: 2, 
        name: "Royal Handcrafted Lehenga", 
        price: 1200, 
        image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=800&auto=format&fit=crop" 
    },
    { 
        id: 3, 
        name: "Silk Embellished Kaftan", 
        price: 680, 
        image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800&auto=format&fit=crop" 
    }
];

let cart = [];

// Render Products
function renderProducts() {
    const grid = document.getElementById('product-grid');
    grid.innerHTML = '';
    
    products.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <div class="img-wrapper">
                <img src="${product.image}" alt="${product.name}" onerror="this.src='https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=800&auto=format&fit=crop'">
            </div>
            <h3>${product.name}</h3>
            <p class="price">${product.price} SAR</p>
            <button class="add-to-cart-btn" onclick="addToCart(${product.id})">ADD TO BAG</button>
        `;
        grid.appendChild(card);
    });
}

// Add Item to Cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        cart.push(product);
        updateCartUI();
        toggleCart(); // Auto open drawer
    }
}

// Update Cart Drawer UI
function updateCartUI() {
    document.getElementById('cart-count').innerText = cart.length;
    
    const cartItemsDiv = document.getElementById('cart-items');
    const cartTotalSpan = document.getElementById('cart-total');
    
    if (cart.length === 0) {
        cartItemsDiv.innerHTML = '<p class="empty-msg">Your bag is currently empty.</p>';
        cartTotalSpan.innerText = '0';
        return;
    }
    
    cartItemsDiv.innerHTML = '';
    let total = 0;
    
    cart.forEach((item, index) => {
        total += item.price;
        const itemDiv = document.createElement('div');
        itemDiv.className = 'cart-item';
        itemDiv.innerHTML = `
            <div>
                <strong style="font-size:12px; letter-spacing:0.5px;">${item.name}</strong>
                <p style="font-size:12px; color:#c5a059; margin-top:3px;">${item.price} SAR</p>
            </div>
            <i class="fa-solid fa-trash" style="color:#999; cursor:pointer; font-size:13px;" onclick="removeFromCart(${index})"></i>
        `;
        cartItemsDiv.appendChild(itemDiv);
    });
    
    cartTotalSpan.innerText = total;
}

// Remove Item from Cart
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartUI();
}

// Toggle Cart Sidebar
function toggleCart() {
    document.getElementById('cart-sidebar').classList.toggle('active');
}

// Add New Product via Form
function handleFormSubmit(event) {
    event.preventDefault();
    const name = document.getElementById('p-name').value;
    const price = parseFloat(document.getElementById('p-price').value);
    const image = document.getElementById('p-img').value;

    const newProduct = {
        id: Date.now(),
        name: name,
        price: price,
        image: image
    };

    products.push(newProduct);
    renderProducts();
    document.getElementById('add-product-form').reset();
    alert('Exclusive Product Added to Store!');
}

// WhatsApp Order Integration
function checkoutWhatsApp() {
    if (cart.length === 0) {
        alert('Your shopping bag is empty!');
        return;
    }

    let phone = "966500000000"; // Update with your Saudi / target WhatsApp number
    let message = "Hi Nova Store! I would like to place an order:%0A%0A";
    let total = 0;

    cart.forEach((item, i) => {
        message += `${i + 1}. ${item.name} - ${item.price} SAR%0A`;
        total += item.price;
    });

    message += `%0ATotal Amount: ${total} SAR`;
    
    window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
}

renderProducts();

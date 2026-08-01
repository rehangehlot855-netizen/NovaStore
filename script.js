// Secret Password
const ADMIN_PASSWORD = "nova123";

// Initial Demo Products
let products = [
    {
        title: "Royal Silk Kaftan",
        price: "450 SAR",
        image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=80"
    },
    {
        title: "Velvet Atelier Abaya",
        price: "680 SAR",
        image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=600&q=80"
    }
];

let cartCount = 0;

// Load Products on Page Load
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();

    // Admin Password Protected Form Submission
    const productForm = document.getElementById('add-product-form');
    if (productForm) {
        productForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Ask Password
            let userPass = prompt("🔐 Security Lock: Enter Admin Password to Publish Product:");

            if (userPass === ADMIN_PASSWORD) {
                const title = document.getElementById('p-title').value;
                const price = document.getElementById('p-price').value;
                const image = document.getElementById('p-image').value;

                products.push({
                    title: title,
                    price: price + " SAR",
                    image: image
                });

                renderProducts();
                alert("✅ Success! Product added to store.");
                this.reset();
            } else if (userPass !== null) {
                alert("❌ Incorrect Password! Access Denied.");
            }
        });
    }
});

// Render Products Function
function renderProducts() {
    const grid = document.getElementById('product-grid');
    if (!grid) return;
    
    grid.innerHTML = '';
    products.forEach((p) => {
        grid.innerHTML += `
            <div class="product-card">
                <img src="${p.image}" alt="${p.title}" class="product-image">
                <h3 class="product-title">${p.title}</h3>
                <p class="product-price">${p.price}</p>
                <button class="btn-add" onclick="addToCart()">Add To Bag</button>
            </div>
        `;
    });
}

// Cart Counter
function addToCart() {
    cartCount++;
    document.getElementById('cart-count').innerText = cartCount;
    alert("Item added to bag!");
}
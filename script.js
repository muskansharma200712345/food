// ==========================================
// HUNGER FOOD ORDERING WEBSITE
// JavaScript
// ==========================================

// Owner's WhatsApp number
const OWNER_PHONE = "917337802007";

// Owner's email
const OWNER_EMAIL = "muskansharma.2007123@gmail.com";


// ==========================================
// FOOD MENU
// ==========================================

const menu = [

    {
        id: 1,
        name: "Classic Cheeseburger",
        category: "Burgers",
        price: 149,
        emoji: "🍔",
        desc: "Juicy patty, cheese, lettuce & our special sauce",
        tag: "BESTSELLER"
    },

    {
        id: 2,
        name: "Crispy Chicken Burger",
        category: "Burgers",
        price: 179,
        emoji: "🍗",
        desc: "Crunchy chicken with creamy, tangy sauce",
        tag: "CRUNCHY"
    },

    {
        id: 3,
        name: "Loaded French Fries",
        category: "Sides",
        price: 99,
        emoji: "🍟",
        desc: "Golden fries with a delicious seasoning",
        tag: "SNACK"
    },

    {
        id: 4,
        name: "Cheese Pizza",
        category: "Pizza",
        price: 229,
        emoji: "🍕",
        desc: "Melty cheese and a crispy, yummy crust",
        tag: "CHEESY"
    },

    {
        id: 5,
        name: "Pepperoni Pizza",
        category: "Pizza",
        price: 269,
        emoji: "🍕",
        desc: "Loaded with pepperoni and mozzarella",
        tag: "FAN FAV"
    },

    {
        id: 6,
        name: "Veggie Wrap",
        category: "Wraps",
        price: 129,
        emoji: "🌯",
        desc: "Fresh veggies wrapped with a creamy filling",
        tag: "FRESH"
    },

    {
        id: 7,
        name: "Chocolate Brownie",
        category: "Desserts",
        price: 89,
        emoji: "🍫",
        desc: "Rich, fudgy chocolate goodness",
        tag: "SWEET"
    },

    {
        id: 8,
        name: "Strawberry Shake",
        category: "Drinks",
        price: 119,
        emoji: "🥤",
        desc: "Cool, creamy strawberry milkshake",
        tag: "CHILLED"
    },

    {
        id: 9,
        name: "Iced Coffee",
        category: "Drinks",
        price: 99,
        emoji: "🧋",
        desc: "Smooth coffee, ice and a little happiness",
        tag: "ENERGY"
    },

    {
        id: 10,
        name: "Chicken Nuggets",
        category: "Sides",
        price: 139,
        emoji: "🍿",
        desc: "Bite-sized golden crispy nuggets",
        tag: "10 PIECES"
    },

    {
        id: 11,
        name: "Chocolate Sundae",
        category: "Desserts",
        price: 109,
        emoji: "🍨",
        desc: "Ice cream topped with chocolate sauce",
        tag: "DESSERT"
    },

    {
        id: 12,
        name: "Spicy Paneer Wrap",
        category: "Wraps",
        price: 159,
        emoji: "🌮",
        desc: "Paneer, crunchy veggies and spicy sauce",
        tag: "SPICY"
    }

];


// ==========================================
// CART VARIABLES
// ==========================================

let cart = {};

let activeCategory = "All";

const categories = [
    "All",
    ...new Set(menu.map(item => item.category))
];


// ==========================================
// PRICE FORMAT
// ==========================================

function rupee(amount) {

    return "₹" + amount.toLocaleString("en-IN");

}


// ==========================================
// DISPLAY CATEGORY FILTERS
// ==========================================

function renderFilters() {

    document.getElementById("filters").innerHTML =

        categories.map(category => `

            <button class="filter-btn
                ${category === activeCategory ? "active" : ""}"

                onclick="setCategory('${category}')">

                ${category}

            </button>

        `).join("");

}


// ==========================================
// CHANGE CATEGORY
// ==========================================

function setCategory(category) {

    activeCategory = category;

    renderFilters();

    renderMenu();

}


// ==========================================
// DISPLAY FOOD ITEMS
// ==========================================

function renderMenu() {

    const items = menu.filter(item =>

        activeCategory === "All" ||
        item.category === activeCategory

    );


    document.getElementById("menu-grid").innerHTML =

        items.map(item => `

            <article class="food-card">

                <div class="food-image">

                    <span class="tag">${item.tag}</span>

                    ${item.emoji}

                </div>

                <h3>${item.name}</h3>

                <p>${item.desc}</p>

                <div class="card-bottom">

                    <span class="price">
                        ${rupee(item.price)}
                    </span>

                    <button class="add-btn"
                        onclick="addItem(${item.id})">

                        +

                    </button>

                </div>

            </article>

        `).join("");

}


// ==========================================
// ADD FOOD TO CART
// ==========================================

function addItem(id) {

    cart[id] = (cart[id] || 0) + 1;

    updateCart();

    toast("Added to cart — yummy choice! 😋");

}


// ==========================================
// INCREASE / DECREASE FOOD QUANTITY
// ==========================================

function changeQty(id, delta) {

    cart[id] = (cart[id] || 0) + delta;


    if (cart[id] <= 0) {

        delete cart[id];

    }


    updateCart();

}


// ==========================================
// UPDATE CART AND BILL
// ==========================================

function updateCart() {

    // Total number of items

    const count = Object.values(cart)

        .reduce((total, quantity) => total + quantity, 0);


    document.getElementById("cart-count").textContent = count;


    // Food items in cart

    const entries = menu.filter(item => cart[item.id]);


    // Calculate subtotal

    const subtotal = entries.reduce(

        (sum, item) =>

            sum + item.price * cart[item.id],

        0

    );


    // Delivery charges

    const delivery = count

        ? (subtotal >= 499 ? 0 : 30)

        : 0;


    // Display subtotal

    document.getElementById("subtotal").textContent =

        rupee(subtotal);


    // Display delivery charge

    document.getElementById("delivery").textContent =

        count

            ? (delivery === 0 ? "FREE" : rupee(delivery))

            : rupee(0);


    // Display total bill

    document.getElementById("total").textContent =

        rupee(subtotal + delivery);


    // Display cart items

    document.getElementById("cart-items").innerHTML =

        entries.length

            ? entries.map(item => `

                <div class="cart-item">

                    <span class="cart-emoji">
                        ${item.emoji}
                    </span>

                    <div class="cart-item-info">

                        <strong>${item.name}</strong>

                        <small>${rupee(item.price)} each</small>

                    </div>

                    <div class="qty-controls">

                        <button onclick="changeQty(${item.id}, -1)">
                            −
                        </button>

                        <b>${cart[item.id]}</b>

                        <button onclick="changeQty(${item.id}, 1)">
                            +
                        </button>

                    </div>

                </div>

            `).join("")


            : `

                <div class="empty-cart">

                    Your cart is feeling lonely 🥺

                    <br>

                    Add some yummy food!

                </div>

            `;

}


// ==========================================
// OPEN CART
// ==========================================

function openCart() {

    document.getElementById("cart-overlay")

        .classList.add("show");

}


// ==========================================
// CLOSE CART
// ==========================================

function closeCart() {

    document.getElementById("cart-overlay")

        .classList.remove("show");

}


// ==========================================
// CLOSE CART WHEN OUTSIDE IS CLICKED
// ==========================================

function overlayClose(event) {

    if (event.target.id === "cart-overlay") {

        closeCart();

    }

}


// ==========================================
// PLACE ORDER
// WHATSAPP READY-MADE MESSAGE
// ==========================================

function checkout() {

    // Check whether cart is empty

    if (Object.keys(cart).length === 0) {

        alert("Your cart is empty! Please add food first.");

        return;

    }


    // Prepare food order details

    let orderItems = "";

    let subtotal = 0;


    menu.forEach(item => {

        if (cart[item.id]) {

            let quantity = cart[item.id];

            let itemTotal = item.price * quantity;


            subtotal += itemTotal;


            orderItems +=

                `${item.emoji} ${item.name} x ${quantity} = ₹${itemTotal}\n`;

        }

    });


    // Calculate delivery charge

    let deliveryCharge = subtotal >= 499 ? 0 : 30;


    // Calculate final bill

    let total = subtotal + deliveryCharge;


    // ==========================================
    // READY-MADE WHATSAPP MESSAGE
    // ==========================================

    let message =

`Hello! 👋 I want to place an order from Hunger 🍔

🛒 MY ORDER:

${orderItems}

━━━━━━━━━━━━━━━━━━

Subtotal: ₹${subtotal}

Delivery: ${deliveryCharge === 0 ? "FREE 🎉" : "₹" + deliveryCharge}

💰 TOTAL BILL: ₹${total}

━━━━━━━━━━━━━━━━━━

👤 Customer Name:

📍 Delivery Address:

📞 Contact Number:

💳 Payment Preference:

Please confirm my order.

Thank you! 😊`;


    // Convert message into URL format

    let encodedMessage = encodeURIComponent(message);


    // Create WhatsApp link

    let whatsappLink =

        `https://wa.me/${OWNER_PHONE}?text=${encodedMessage}`;


    // Open WhatsApp with message already typed

    window.open(whatsappLink, "_blank");

}


// ==========================================
// SHOW NOTIFICATION
// ==========================================

function toast(message) {

    let toastElement =

        document.getElementById("toast");


    toastElement.textContent = message;


    toastElement.classList.add("show");


    clearTimeout(window.toastTimer);


    window.toastTimer = setTimeout(() => {

        toastElement.classList.remove("show");

    }, 2200);

}


// ==========================================
// INITIALIZE WEBSITE
// ==========================================

renderFilters();

renderMenu();

updateCart();
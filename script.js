console.log("JS is working");

let MenuItems = document.getElementById("MenuItems");

if(MenuItems){
    MenuItems.style.maxHeight = "0px";
}

function menutoggle(){

    if(!MenuItems){
        return;
    }

    if(MenuItems.style.maxHeight === "0px"){
        MenuItems.style.maxHeight = "200px";
    } else {
        MenuItems.style.maxHeight = "0px";
    }
}
function addToCart(name, price, image){

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let existing = cart.find(item => item.name === name);

    if(existing){
        existing.qty += 1;
    } else {
        cart.push({
            name: name,
            price: price,
            image: image,
            qty: 1
        });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    alert(name + " added to cart");
}

function displayCart(){

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let cartItems = document.getElementById("cart-items");
    let total = document.getElementById("total");

    if(!cartItems || !total){
        return;
    }

    cartItems.innerHTML = "";

    let sum = 0;

    if(cart.length === 0){
        cartItems.innerHTML = "<p>Cart is empty</p>";
        total.innerHTML = "Total: ₹0";
        return;
    }

    cart.forEach(item => {

        let itemTotal = item.price * item.qty;

        sum += itemTotal;

       cartItems.innerHTML += `
    <div class="col-4">

        <img src="${item.image}">
        <h4>${item.name}</h4>
        <p>₹${item.price}</p>

        <div style="display:flex;align-items:center;gap:10px;justify-content:center;">
            
            <button onclick="changeQty('${item.name}', -1)">-</button>

            <span>Qty: ${item.qty}</span>

            <button onclick="changeQty('${item.name}', 1)">+</button>

        </div>

        <button onclick="removeItem('${item.name}')" style="margin-top:10px;background:red;color:white;border:none;padding:5px 10px;cursor:pointer;">
            Remove
        </button>

    </div>
`;
    });

    total.innerHTML = "Total: ₹" + sum;
}

displayCart();
function payNow() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (cart.length === 0) {
        alert("Your cart is empty");
        return;
    }

    document.getElementById("uploadSection").style.display = "block";
}
function changeQty(name, change) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let item = cart.find(i => i.name === name);

    if (!item) return;

    item.qty += change;

    if (item.qty <= 0) {
        cart = cart.filter(i => i.name !== name);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    displayCart();
}
function removeItem(name) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart = cart.filter(i => i.name !== name);

    localStorage.setItem("cart", JSON.stringify(cart));
    displayCart();
}
function submitOrder() {
    let fileInput = document.getElementById("paymentFile");

    if (fileInput.files.length === 0) {
        alert("Please upload a screenshot first");
        return;
    }

    // Save order
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let orders = JSON.parse(localStorage.getItem("orders")) || [];

    let newOrder = {
        id: Date.now(),
        items: cart,
        paymentProof: fileInput.files[0].name,
        date: new Date().toLocaleString(),
        status: "Order Placed"
    };

    orders.push(newOrder);
    localStorage.setItem("orders", JSON.stringify(orders));

    localStorage.removeItem("cart");

    alert("Order placed successfully 🎉");

    window.location.href = "success.html";
}
const payBtn = document.getElementById("payBtn");

if(payBtn){
    payBtn.addEventListener("click", function(){
        document.getElementById("paymentSection").style.display = "block";
    });
}
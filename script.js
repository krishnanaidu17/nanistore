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
        <p>Qty: ${item.qty}</p>
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

    alert("Payment successful 🎉");

    localStorage.removeItem("cart");

    window.location.reload();
}
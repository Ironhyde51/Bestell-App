// ---- Globale Elemente ----
// let mobileCartItems = document.getElementById("mobileCartItems");
// let mobileCartTotalDialog = document.getElementById("mobileCartTotalDialog");
// let mobileCartTotal = document.getElementById("mobileCartTotal");

//Mobile 
function renderMobileCart() {
    let html = buildMobileCartItems(); 
    let total = calculateMobileCartTotal(); 

    if (cart.length === 0) html = "<p>Warenkorb ist leer</p>";

    mobileCartItems.innerHTML = html;
    mobileCartTotalDialog.innerText = total.toFixed(2) + " €";
    mobileCartTotal.innerText = total.toFixed(2) + " €";
}

// Mobile Cart Total 
function calculateMobileCartTotal() {
    let total = 0;
    for (let i = 0; i < cart.length; i++) {
        total += cart[i].price * cart[i].quantity;
    }
    return total;
}

function showOrderMessage() {
    document.getElementById("orderMessage").style.display = "block";
}

function setupMobileCart() {
    let cartToggleBtn = document.getElementById("cartToggleBtn");
    let mobileCartOverlay = document.getElementById("mobileCartOverlay");
    let closeMobileCart = document.getElementById("closeMobileCart");
    let mobileOrderBtn = document.getElementById("mobileOrderBtn");

    cartToggleBtn.onclick = function() {
        renderMobileCart();
        mobileCartOverlay.style.display = "flex";
    };

    closeMobileCart.onclick = function() {
        mobileCartOverlay.style.display = "none";
    };

    mobileOrderBtn.onclick = function() {
        cart = [];
        renderCart();
        renderMobileCart();
        showOrderMessage();
        mobileCartOverlay.style.display = "none";
    };
}

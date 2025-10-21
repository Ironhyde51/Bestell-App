
function renderMobileCart() {
    let html = buildMobileCartItems();
    let total = calculateMobileCartTotal();

    if (cart.length === 0) html = "<p>Warenkorb ist leer</p>";

    mobileCartItems.innerHTML = html;
    mobileCartTotalDialog.innerText = total.toFixed(2) + " €";
    mobileCartTotal.innerText = total.toFixed(2) + " €";
}

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

function openMobileCart() {
    renderMobileCart();
    document.getElementById("mobileCartOverlay").style.display = "flex";
}

function closeMobileCart() {
    document.getElementById("mobileCartOverlay").style.display = "none";
}

function submitMobileOrder() {
    cart = [];
    renderCart();
    renderMobileCart();
    showOrderMessage();
    placeOrder();
    closeMobileCart();
}

function setupMobileCart() {
    document.getElementById("cartToggleBtn").onclick = openMobileCart;
    document.getElementById("closeMobileCart").onclick = closeMobileCart;
    document.getElementById("mobileOrderBtn").onclick = submitMobileOrder;
}

function buildMobileCartItems() {
    let html = "";
    for (let i = 0; i < cart.length; i++) {
        html += mobileCartItemTemplate(cart[i]); 
    }
    return html;
}

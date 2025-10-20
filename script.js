// CART 
let cart = [];

function addItemToCart(item) {
    for (let i = 0; i < cart.length; i++) {
        if (cart[i].name === item.name) {
            cart[i].quantity++;
            return;
        }
    }
    cart.push({ name: item.name, price: item.price, quantity: 1 });
}

function removeItemFromCart(itemName) {
    let index = findCartItemIndex(itemName);
    if (index < 0) return;
    decreaseItemQuantity(index);
    cart = cart.filter(function(item) {
        return item.quantity > 0;
    });
    renderCart();
    renderMobileCart();
}

function findCartItemIndex(itemName) {
    for (let i = 0; i < cart.length; i++) {
        if (cart[i].name === itemName) return i;
    }
    return -1;
}

function decreaseItemQuantity(index) {
    cart[index].quantity--;
    if (cart[index].quantity <= 0) cart.splice(index, 1);
}

function renderCartItems() {
    let html = "";
    for (let i = 0; i < cart.length; i++) {
        html += createCartItemHTML(cart[i]);
    }
    return html;
}

function calculateSubtotal() {
    let subtotal = 0;
    for (let i = 0; i < cart.length; i++) {
        subtotal += cart[i].price * cart[i].quantity;
    }
    return subtotal;
}

function updateCartTotals(subtotal) {
    let delivery = 5.0;
    document.getElementById("subtotal").innerText = subtotal.toFixed(2) + "€";
    document.getElementById("delivery").innerText = delivery.toFixed(2) + "€";
    document.getElementById("total").innerText = (subtotal + delivery).toFixed(2) + "€";
}

function placeOrder() {
    cart = [];
    renderCart();
    renderMobileCart();
    showOrderMessage();
}

function hideMessage() {
    document.getElementById("orderMessage").style.display = "none";
}

function renderCart() {
    let cartDiv = document.getElementById("cartItems");
    let subtotal = calculateSubtotal();
    let html = renderCartItems();

    updateCartTotals(subtotal);
    cartDiv.innerHTML = cart.length === 0 ? "<p>Warenkorb ist leer</p>" : html;
}

// MENU 
function renderMenu(categoryIndex) {
    let list = document.getElementById("menuList");
    let categories = getCategoriesToShow(categoryIndex);
    let html = makeMenuHTML(categories, categoryIndex);
    list.innerHTML = html;

    updateActiveTab(categoryIndex);
    updateCategoryImage(categoryIndex);
}

function makeMenuHTML(categories, categoryIndex) {
    let html = "";
    for (let i = 0; i < categories.length; i++) {
        let index = categoryIndex === 0 ? i : categoryIndex - 1;
        html += renderCategory(categories[i], index);
    }
    return html;
}

function getCategoriesToShow(categoryIndex) {
    return categoryIndex === 0 ? menuData : [menuData[categoryIndex - 1]];
}

function renderCategory(category, categoryIndex) {
    let html = "";
    for (let j = 0; j < category.items.length; j++) {
        html += createDishHTML(category.items[j], j, categoryIndex);
    }
    return html;
}

function addToCart(categoryIndex, itemIndex) {
    let item = menuData[categoryIndex].items[itemIndex];
    addItemToCart(item);
    renderCart();
    renderMobileCart();
}

// UI 
function updateCategoryImage(categoryIndex) {
    let img = document.getElementById("categoryImage");
    let index = (categoryIndex >= 0 && categoryIndex < categoryImages.length) ? categoryIndex : 0;
    img.src = categoryImages[index];
}

function updateActiveTab(activeIndex) {
    let tabsContainer = document.getElementsByClassName("tabs")[0];
    let tabs = tabsContainer.getElementsByClassName("tab");
    for (let i = 0; i < tabs.length; i++) {
        tabs[i].classList.toggle("active", i === activeIndex);
    }
}

function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
}

// INIT 
function init() {
    renderMenu(0);
    renderCart();
    renderMobileCart();
    setupMobileCart();
}

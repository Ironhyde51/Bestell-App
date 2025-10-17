// CART \\
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
  if (index < 0 || index >= cart.length) return;

  decreaseItemQuantity(index);
  cart = cart.filter(function(item) {
    return item.quantity > 0;
  });

  renderCart();
}

function findCartItemIndex(itemName) {
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].name === itemName) {
      return i;
    }
  }
  return -1;
}

function decreaseItemQuantity(index) {
  cart[index].quantity--;
  if (cart[index].quantity <= 0) {
    cart.splice(index, 1);
  }
}

function calculateSubtotal() {
  let subtotal = 0;
  for (let i = 0; i < cart.length; i++) {
    subtotal += cart[i].price * cart[i].quantity;
  }
  return subtotal;
}

function renderCartItems() {
  let html = "";
  for (let i = 0; i < cart.length; i++) {
    html += createCartItemHTML(cart[i]);
  }
  return html;
}

function updateCartTotals(subtotal) {
  let delivery = 5.0;
  document.getElementById("subtotal").innerText = subtotal.toFixed(2) + "€";
  document.getElementById("delivery").innerText = delivery.toFixed(2) + "€";
  document.getElementById("total").innerText = (subtotal + delivery).toFixed(2) + "€";
}

function renderCart() {
  let cartDiv = document.getElementById("cartItems");
  let subtotal = calculateSubtotal();
  let html = renderCartItems();

  updateCartTotals(subtotal);

  cartDiv.innerHTML = cart.length === 0 ? "<p>Warenkorb ist leer</p>" : html;
}


// MENU \\
function renderMenu(categoryIndex) {
  let list = document.getElementById("menuList");
  let html = "";
  let categories = getCategoriesToShow(categoryIndex);
  for (let i = 0; i < categories.length; i++) {
    html += renderCategory(categories[i], categoryIndex === 0 ? i : categoryIndex - 1);
  }
  list.innerHTML = html;
  updateActiveTab(categoryIndex);
  updateCategoryImage(categoryIndex);
}

function getCategoriesToShow(categoryIndex) {
  if (categoryIndex === 0) {
    return menuData;
  } else {
    return [menuData[categoryIndex - 1]];
  }
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
}


// UI \\
function updateCategoryImage(categoryIndex) {
  let img = document.getElementById("categoryImage");
  let index = (categoryIndex >= 0 && categoryIndex < categoryImages.length) ? categoryIndex : 0;
  img.src = categoryImages[index];
}

function updateActiveTab(activeIndex) {
  let tabsContainer = document.getElementsByClassName("tabs")[0];
  let tabs = tabsContainer.getElementsByClassName("tab");
  for (let i = 0; i < tabs.length; i++) {
    if (i === activeIndex) {
      tabs[i].classList.add("active");
    } else {
      tabs[i].classList.remove("active");
    }
  }
}


// MAIN \\
function init() {
  renderMenu(0);
  renderCart();
}


























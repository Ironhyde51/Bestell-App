let cart = [];

function init() {
  renderMenu(0);
  renderCart();
}

function renderMenu(categoryIndex) {
  let list = document.getElementById("menuList");
  let html = "";
  let categories = getCategoriesToShow(categoryIndex);

  for (let i = 0; i < categories.length; i++) {
    html += renderCategory(categories[i], categoryIndex === 0 ? i : categoryIndex - 1);
  }

  list.innerHTML = html;
  updateActiveTab(categoryIndex);
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
  let found = false;

  for (let i = 0; i < cart.length; i++) {
    if (cart[i].name === item.name) {
      cart[i].quantity++;
      found = true;
      break;
    }
  }

  if (!found) {
    cart.push({ name: item.name, price: item.price, quantity: 1 });
  }

  renderCart();
}

function renderCart() {
  let cartDiv = document.getElementById("cartItems");
  let html = "";
  let subtotal = 0;

  for (let i = 0; i < cart.length; i++) {
    let item = cart[i];
    subtotal += item.price * item.quantity;
    html += createCartItemHTML(item);
  }

  let delivery = 5.0;
  document.getElementById("subtotal").innerText = subtotal.toFixed(2) + "€";
  document.getElementById("delivery").innerText = delivery.toFixed(2) + "€";
  document.getElementById("total").innerText = (subtotal + delivery).toFixed(2) + "€";

  if (cart.length === 0) {
    cartDiv.innerHTML = "<p>Warenkorb ist leer</p>";
  } else {
    cartDiv.innerHTML = html;
  }
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

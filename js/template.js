//  Dish HTML 
function createDishHTML(dish, index, categoryIndex) {
  return `
    <li class="menu-item">
      <div class="menu-item-left">
        <h3 class="dish">${dish.name}</h3>
        <p class="meta">${dish.desc}</p>
      </div>
      <div class="menu-item-right">
        <div class="price">${dish.price.toFixed(2)}€</div>
        <button class="add-btn" onclick="addToCart(${categoryIndex}, ${index})">+</button>
      </div>
    </li>
  `;
}

// Desktop Cart Item HTML
function createCartItemHTML(item) {
  return `
    <div class="cart-item">
      <div class="ci-left">
        <div class="ci-name">${item.name}</div>
        <div class="ci-qty">${item.quantity}x</div>
      </div>
      <div class="ci-right">
        <div class="ci-price">${(item.price * item.quantity).toFixed(2)}€</div>
        <button class="remove-btn" onclick="removeItemFromCart('${item.name}')">−</button>
      </div>
    </div>
  `;
}

// Mobile Cart Items HTML
function buildMobileCartItems() {
    let html = "";
    for (let i = 0; i < cart.length; i++) {
        html += `
            <div>
                ${cart[i].name} (${cart[i].quantity}x)
                <button onclick="removeItemFromCart('${cart[i].name}')">−</button>
            </div>
        `;
    }
    return html;
}

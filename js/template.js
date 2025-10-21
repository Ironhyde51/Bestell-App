
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

function createCartItemHTML(item) {
  return `
    <div class="cart-item">
      <div class="ci-left">
        <div class="ci-name">${item.name}</div>
        <div class="ci-qty">
          <button class="add-btn" onclick="decreaseQuantity('${item.name}')">−</button>
          ${item.quantity}x
          <button class="add-btn" onclick="increaseQuantity('${item.name}')">+</button>
        </div>
      </div>
      <div class="ci-right">
        <div class="ci-price">${(item.price * item.quantity).toFixed(2)}€</div>
        <button class="remove-btn" onclick="removeItemFromCart('${item.name}')">🗑</button>
      </div>
    </div>
  `;
}

function mobileCartItemTemplate(item) {
  return `
    <div class="mobile-cart-item">
      <span>${item.name} (${item.quantity}x)</span>
      <div class="mobile-controls">
        <button class="add-btn" onclick="decreaseQuantity('${item.name}')">−</button>
        <button class="add-btn" onclick="increaseQuantity('${item.name}')">+</button>
        <button class="remove-btn" onclick="removeItemFromCart('${item.name}')">🗑</button>
      </div>
    </div>
  `;
}


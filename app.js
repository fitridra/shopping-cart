const productButtons = document.querySelectorAll('.add-to-cart');
const cart = document.getElementById('cart');
const inputPromoCode = document.getElementById('promo-code');
const cartItems = [];

// promo
const promo = [
  {
    label: 'DISC10',
    value: 0.1,
  },
  {
    label: 'DISC50',
    value: 0.5,
  },
  {
    label: 'DISC75',
    value: 0.75,
  },
];

productButtons.forEach((button) => {
  button.addEventListener('click', addToCart);
});

function addToCart(event) {
  const product = event.target;
  const productName = product.getAttribute('data-name');
  const productPrice = parseFloat(product.getAttribute('data-price'));

  // Menambahkan produk ke array cartItems
  cartItems.push({ name: productName, price: productPrice });

  // Menampilkan keranjang belanja
  displayCart();
}

// Menghitung promo code
function applyPromoCode() {
  const promoCode = inputPromoCode.value;
  const discount = promo.find((p) => p.label === promoCode);

  if (discount) {
    // Jika promo code valid, hitung diskon dan tampilkan
    const subtotal = cartItems.reduce((total, item) => total + item.price, 0);
    const discountAmount = subtotal * discount.value;
    const discountElement = document.getElementById('discount');
    discountElement.textContent = 'Discount: Rp. ' + discountAmount;
  } else {
    // Jika promo code tidak valid, tampilkan pesan
    const discountElement = document.getElementById('discount');
    discountElement.textContent = 'Invalid Promo Code';
  }

  // Memanggil fungsi displayCart untuk memperbarui total belanja
  displayCart();
}

function displayCart() {
  const cartList = document.getElementById('cart');

  // Hapus isi keranjang sebelum menampilkan yang baru
  while (cartList.firstChild) {
    cartList.removeChild(cartList.firstChild);
  }

  if (cartItems.length === 0) {
    const cartEmpty = document.createElement('p');
    cartEmpty.textContent = 'Cart is empty';
    cartList.appendChild(cartEmpty);
  } else {
    // Menampilkan produk yang ada di keranjang
    cartItems.forEach((item) => {
      const cartProduct = document.createElement('div');
      cartProduct.textContent = item.name + ' - Price: Rp. ' + item.price;
      cartList.appendChild(cartProduct);
    });
  }

  const subtotal = cartItems.reduce((total, item) => total + item.price, 0);
  const cartSubtotal = document.getElementById('cart-subtotal');
  cartSubtotal.textContent = 'Sub Total: Rp. ' + subtotal;

  // Menghitung total setelah diskon
  const promoCode = inputPromoCode.value;
  const discountValue = promo.find((promo) => promo.label === promoCode);
  const total = discountValue ? subtotal - discountValue.value * subtotal : subtotal;
  const cartTotal = document.getElementById('cart-total');
  cartTotal.textContent = 'Total: Rp. ' + total;
}

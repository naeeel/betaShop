let cart = localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart")) : []

const formatRupiah = (amount) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    }).format(amount);
};

function displayCartProduct() {
    let results = ""
    const cartProduct = document.getElementById("cart-product")
    cart.forEach((item) => {
        results += `
        <tr class="cart-item">
            <td></td>
            <td class="cart-image">
                <img src="${item.img.singleImage}" alt="" data-id=${item.id} class="cart-product-image">
                <i class="bi bi-x delete-cart" data-id=${item.id}></i>
            </td>
            <td>${item.name}</td>
            <td>${formatRupiah(item.price.newPrice.toFixed(2))}</td>
            <td>${item.quantity}</td>
            <td>${formatRupiah((item.price.newPrice * item.quantity).toFixed(2))}</td>
        </tr>
        `
    })
    cartProduct.innerHTML = results
    removeCartItem()
    updateHeaderCartCount()
}

function updateHeaderCartCount() {
    const cartItem = document.querySelector(".header-cart-count")
    if (cartItem) cartItem.innerHTML = cart.length
}

displayCartProduct()

function cartProductRoute() {
    const images = document.querySelectorAll(".cart-product-image")
    images.forEach((image) => {
        image.addEventListener("click", (e) => {
            const imageId = e.target.dataset.id
            localStorage.setItem("productId", Number(imageId))
            window.location.href = "single-product.html"
        })
    })
}

cartProductRoute()


function removeCartItem() {

    const btnDeleteCart = document.querySelectorAll(".delete-cart");
    let cartItem = document.querySelector(".header-cart-count")

    btnDeleteCart.forEach((button) => {
        button.addEventListener("click", (e) => {
            const id = e.target.dataset.id;
            cart = cart.filter((item) => item.id !== Number(id));
            displayCartProduct()
            localStorage.setItem("cart", JSON.stringify(cart))
            cartItem.innerHTML = cart.length
            saveCardValues()
        });
    });
}


function saveCardValues() {
    const cartTotal = document.getElementById("cart-total")
    const subTotal = document.getElementById("subtotal")
    const fastCargo = document.getElementById("fast-cargo")
    const fastCargoPrice = 15000
    let itemsTotal = 0

    cart.length > 0 && cart.map((item) => itemsTotal += item.price.newPrice * item.quantity)
    subTotal.innerHTML = `${formatRupiah(itemsTotal.toFixed(2))}`
    cartTotal.innerHTML = `${formatRupiah(itemsTotal.toFixed(2))}`
    fastCargo.addEventListener("change", (e) => {
        if (e.target.checked) {
            cartTotal.innerHTML = `${formatRupiah((itemsTotal + fastCargoPrice).toFixed(2))}`
        } else {
            cartTotal.innerHTML = `${formatRupiah(itemsTotal.toFixed(2))}`
        }
    })
}

saveCardValues()

// === Modal Checkout Logic ===
const checkoutBtn = document.querySelector('.btn.btn-lg.btn-red')
const modal = document.getElementById('checkout-modal')
const closeModalBtn = document.getElementById('close-checkout-modal')
const confirmPaymentBtn = document.getElementById('confirm-payment')

// Tambahkan pengecekan cart kosong sebelum buka modal checkout
if (checkoutBtn && modal) {
    checkoutBtn.addEventListener('click', function(e) {
        e.preventDefault()
        // Cek cart kosong
        let currentCart = localStorage.getItem("cart")
            ? JSON.parse(localStorage.getItem("cart")) : []
        if (!currentCart.length) {
            alert("Keranjang belanja kosong, silakan belanja terlebih dahulu!");
            window.location.href = "shop.html";
            return;
        }
        modal.style.display = 'block'
    })
}

// Close modal
if (closeModalBtn && modal) {
    closeModalBtn.addEventListener('click', function() {
        modal.style.display = 'none'
    })
}

// Confirm payment
if (confirmPaymentBtn && modal) {
    confirmPaymentBtn.addEventListener('click', function() {
        // Kosongkan cart
        cart = []
        localStorage.setItem("cart", JSON.stringify(cart))
        displayCartProduct()
        saveCardValues()
        updateHeaderCartCount()
        modal.style.display = 'none'
        // Notifikasi sukses
        alert('Pembayaran berhasil! Terima kasih telah berbelanja.')
    })
}

// Tutup modal jika klik di luar modal-content
window.addEventListener('click', function(event) {
    if (modal && event.target === modal) {
        modal.style.display = 'none'
    }
})

// Handler tombol Update Cart
const updateCartBtn = document.querySelector('.btn.btn-red.btn-md')
if (updateCartBtn) {
    updateCartBtn.addEventListener('click', function(e) {
        e.preventDefault()
        alert("Fitur update jumlah barang belum tersedia.")
    })
}
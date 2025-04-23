import { product1, product2 } from "./glide.js"

// Ambil cart dari localStorage atau inisialisasi array kosong
export let cart = localStorage.getItem("cart") 
    ? JSON.parse(localStorage.getItem("cart")) 
    : [];

const formatRupiah = (amount) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    }).format(amount);
};

function addToCart(products) {
    const cartItems = document.querySelector(".header-cart-count");
    const buttons = [...document.getElementsByClassName("add-to-cart")];
    
    buttons.forEach((button) => {
        const productId = Number(button.dataset.id);
        // Cek apakah produk sudah di cart
        const inCart = cart.find(item => item.id === productId);
        
        if (inCart) {
            button.setAttribute("disabled", "disabled");
        } else {
            button.addEventListener("click", function(e) {
                const product = products.find(p => p.id === productId);
                if (product) {
                    cart.push({ ...product, quantity: 1 });
                    localStorage.setItem("cart", JSON.stringify(cart));
                    button.setAttribute("disabled", "disabled");
                    cartItems.innerHTML = cart.length;
                }
            });
        }
    });
}

function productRoute() {
    const productLink = document.getElementsByClassName("product-link")
    Array.from(productLink).forEach((button) => {
        button.addEventListener("click", (e) => {
            e.preventDefault()
            const id = e.target.dataset.id
            localStorage.setItem("productId", JSON.stringify(id))
            window.location.href = "single-product.html"
        })
    })
}


function productImageRoute() {
    const productImageLink = document.querySelectorAll(".product-image a .img2")
    productImageLink.forEach((item) => {
        item.addEventListener("click", (e) => {
            e.preventDefault()
            const id = e.target.dataset.id
            localStorage.setItem("productId", JSON.stringify(id))
            window.location.href = "single-product.html"
        })
    })
}

function renderStars(rating) {
    let starsHTML = "<ul class='product-star'>";
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
  
    // Bintang penuh
    for (let i = 0; i < fullStars; i++) {
      starsHTML += `
        <li><i class="bi bi-star-fill"></i></li>
      `;
    }
  
    // Bintang setengah (jika ada)
    if (hasHalfStar) {
      starsHTML += `
        <li><i class="bi bi-star-half"></i></li>
      `;
    }
  
    // Bintang kosong (untuk melengkapi jadi 5 total)
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
      starsHTML += `
        <li><i class="bi bi-star"></i></li>
      `;
    }
  
    starsHTML += "</ul>";
    return starsHTML;
  }
  

async function productFunc(products) {
    const productsContainer = document.getElementById("product-list");
    const productsContainer2 = document.getElementById("product-list-2");

    if (!products || !Array.isArray(products)) {
        console.error("Invalid products data");
        return;
    }

    const productHTML = products.map(product => `
        <li class="product-item glide__slide">
            <div class="product-image">
                <a href="#">
                    <img src="${product.img.singleImage}" alt="${product.name}" class="img1" />
                    <img src="${product.img.thumbs[1]}" alt="${product.name}" class="img2" data-id="${product.id}" />
                </a>
            </div>
            <div class="product-info">
                <a href="#" class="product-title" data-id="${product.id}">${product.name}</a>
                ${renderStars(product.rating)}
                <div class="product-prices">
                    <strong class="new-price">${formatRupiah(product.price.newPrice)}</strong>
                    <span class="old-price">${formatRupiah(product.price.oldPrice)}</span>
                </div>
                <span class="product-discount">-${product.discount}%</span>
                <div class="product-links">
                    <button class="add-to-cart" data-id="${product.id}">
                        <i class="bi bi-basket-fill"></i>
                    </button>
                    <button>
                        <i class="bi bi-heart-fill"></i>
                    </button>
                    <a href="#" class="product-link" data-id="${product.id}">
                        <i class="bi bi-eye-fill"></i>
                    </a>
                    <a href="#">
                        <i class="bi bi-share-fill"></i>
                    </a>
                </div>
            </div>
        </li>
    `).join('');

    if (productsContainer) productsContainer.innerHTML = productHTML;
    if (productsContainer2) productsContainer2.innerHTML = productHTML;

    addToCart(products);
    product1();
    product2();
    productRoute();
    productImageRoute();
}

export default productFunc;
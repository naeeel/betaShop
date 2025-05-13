import { product3 } from "./glide.js"
import { thumbsActiveFunc } from "./single-product/thumbsActive.js"
import zoomFunc from "./single-product/zoom.js"
import colorsFunc from "./single-product/colors.js"
import valuesFunc from "./single-product/values.js"
import tabsFunc from "./single-product/tabs.js"
import commentsfunc from "./single-product/comments.js"



const productId = localStorage.getItem("productId")
    ? JSON.parse(localStorage.getItem("productId"))
    : localStorage.setItem("productId", JSON.stringify(1), 1);


const products = localStorage.getItem("products")
    ? JSON.parse(localStorage.getItem("products"))
    : localStorage.setItem("products", JSON.stringify([]), []);



const findProduct = products.find((item) => item.id === Number(productId));

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

if(findProduct){
    /* product title */
    const productTitle = document.querySelector(".product-title");
    if (productTitle) productTitle.innerHTML = findProduct.name;

    const productId = document.querySelector(".product-id");
    if (productId) productId.innerHTML = findProduct.id;

    const productDescripsi = document.querySelector(".product-description");
    if (productDescripsi) productDescripsi.innerHTML = findProduct.description;

    const productRating = document.querySelector(".product-star");
    if (productRating) productRating.innerHTML = renderStars(findProduct.rating);

    // Format harga ke dalam Rupiah
    const formatRupiah = (amount) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(amount);
    };

    const productOldPrice = document.querySelector(".old-price");
    if (productOldPrice && findProduct.price?.oldPrice !== undefined)
        productOldPrice.innerHTML = formatRupiah(findProduct.price.oldPrice);

    const productNewPrice = document.querySelector(".new-price");
    if (productNewPrice && findProduct.price?.newPrice !== undefined)
        productNewPrice.innerHTML = formatRupiah(findProduct.price.newPrice);

    /* product gallery */
    const singleImage = document.getElementById("single-image"); 
    if (singleImage && findProduct.img?.singleImage)
        singleImage.src = findProduct.img.singleImage;

    /* gallery thumbs */

    const galleryThumbs = document.querySelector(".gallery-thumbs");
    if (galleryThumbs && Array.isArray(findProduct.img?.thumbs)) {
        let result = "";
        findProduct.img.thumbs.forEach((item) => {
            result += `
                <li class="glide__slide">
                    <img src="${item}" class="img-fluid" alt="">
                </li>
            `;
        });
        galleryThumbs.innerHTML = result;
    }

    thumbsActiveFunc()
    product3()

    /* thumbs active */
    const productThumbs = document.querySelectorAll(".product-thumb .glide__slide img")
    productThumbs[0].classList.add("active")
}else {
    console.error("Produk tidak ditemukan!");
}

//add to cart
const cart = localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart")) : []

const btnAddCart = document.getElementById("add-to-cart")
const quantity = document.getElementById("quantity")
const cartItem = document.querySelector(".header-cart-count")

const findCart = cart.find((item) => item.id === findProduct.id)

if (findCart) {
    btnAddCart.setAttribute("disabled", "disabled")
    btnAddCart.style.opacity = 0.4
    btnAddCart.style.cursor = "no-drop"
} else {
    btnAddCart.addEventListener("click", function () {
        cart.push({ ...findProduct, quantity: Number(quantity.value) })
        btnAddCart.setAttribute("disabled", "disabled")
        btnAddCart.style.opacity = 0.4
        btnAddCart.style.cursor = "no-drop"
        localStorage.setItem("cart", JSON.stringify(cart))
        cartItem.innerHTML = cart.length
    })
}

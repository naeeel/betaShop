import { product1, product2 } from "./glide.js"


export let cart = localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart")) : []


    const formatRupiah = (amount) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(amount);
    };

function addToCart(products) {
    const cartItem = document.querySelector(".header-cart-count")
    const buttons = [...document.getElementsByClassName("add-to-cart")]
    buttons.forEach((button) => {
        const inCart = cart.find((item) => item.id === Number(button.dataset.id))
        if (inCart) {
            button.setAttribute("disabled", "disabled")
        } else {
            button.addEventListener("click", function (e) {
                const id = e.target.dataset.id
                const findProduct = products.find((product) => product.id === Number(id))
                cart.push({ ...findProduct, quantity: 1 })
                localStorage.setItem("cart", JSON.stringify(cart))
                button.setAttribute("disabled", "disabled")
                cartItem.innerHTML = cart.length
            })
        }
    })
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


    const productsContainer = document.getElementById("product-list")
    const productsContainer2 = document.getElementById("product-list-2")
    let results = ""

    products.forEach((product) => {
        results += `
                <li class="product-item glide__slide">
                    <div class="product-image">
                        <a href="" >
                            <img src="${product.img.singleImage}" alt="${product.name}" />
                            <img src="${product.img.thumbs[1]}" alt="${product.name}" />
                        </a>
                    </div>
                    <div class="product-info">
                    <a href="#" class="product-title"> ${product.name} </a>
                    
                    ${renderStars(product.rating)}

                    <div class="product-prices">
                        <strong class="new-price">${formatRupiah(product.price.newPrice)}</strong>
                        <span class="old-price">${formatRupiah(product.price.oldPrice)}</span>
                    </div>
                    <span class="product-discount"> ${product.discount}% </span>
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
        `

    })

    productsContainer ? productsContainer.innerHTML = results : ""
    productsContainer ? productsContainer2.innerHTML = results : ""

    addToCart(products)

    product1()

    product2()

    productRoute()

    productImageRoute()


}



export default productFunc
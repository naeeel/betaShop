import headerFunc from "./header.js"
import productFunc from "./product.js"
import searchFunc from "./search.js"

//! add product to localstorage start

(async function () {
    try {
        const response = await fetch("/produk"); // ambil dari server, bukan dari file lokal
        const data = await response.json(); // convert response ke json

        if (data && Array.isArray(data)) {
            localStorage.setItem("products", JSON.stringify(data));
            const mappedData = data.map(item => ({
                id: item.id,
                name: item.name,
                description: item.description,
                discount: item.discount,
                rating: item.rating,
                price: {
                  newPrice: item.new_price,
                  oldPrice: item.old_price
                },
                img: {
                  singleImage: `/img/products/kerajinan/${encodeURIComponent(item.img1)}`,
                  thumbs: [`/img/products/kerajinan/${encodeURIComponent(item.img1)}`, `http://localhost:3000/img/products/kerajinan/${encodeURIComponent(item.img2)}`]
                }
              }));
            productFunc(mappedData);
            searchFunc(mappedData);
        }
    } catch (error) {
        console.error("Gagal mengambil data produk:", error);
    }
})();



//! add product to localstorage end



//! add cartItem to localstorage start

const cartItem = document.querySelector(".header-cart-count")

cartItem.innerHTML = localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart")).length
    : "0"

//! add cartItem to localstorage end


//! modal dialog start

const modal = document.querySelector(".modal-dialog")
const modalContent = document.querySelector(".modal-dialog .modal-content")
const btnModalClose = document.querySelector(".modal-dialog .modal-close")


if (btnModalClose) {
    btnModalClose.addEventListener("click", () => {
        modal.classList.remove("show")
    })
}


if (modal) {
    document.addEventListener("click", (e) => {
        if (!e.composedPath().includes(modalContent)) {
            modal.classList.remove("show")
        }
    })
}


if (modal) {
    setTimeout(() => {
        modal.classList.add("show")
    }, 3000)
}



//! modal dialog end

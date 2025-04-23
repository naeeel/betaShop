import headerFunc from "./header.js"
import productFunc from "./product.js"
import searchFunc from "./search.js"

//! add product to localstorage start

(async function () {
    try {
        // Coba fetch dari server terlebih dahulu
        const response = await fetch("http://localhost:3000/produk", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();

        if (data && Array.isArray(data)) {
            const mappedProducts = data.map(item => ({
                id: item.id,
                name: item.name,
                description: item.description,
                price: {
                    oldPrice: parseInt(item.old_price),
                    newPrice: parseInt(item.new_price)
                },
                rating: parseInt(item.rating),
                discount: parseInt(item.discount),
                img: {
                    singleImage: `img/products/kerajinan/${item.img1}`,
                    thumbs: [
                        `img/products/kerajinan/${item.img1}`,
                        `img/products/kerajinan/${item.img2}`
                    ]
                }
            }));

            localStorage.setItem("products", JSON.stringify(mappedProducts));
            productFunc(mappedProducts);
            searchFunc(mappedProducts);
        }
    } catch (error) {
        console.warn("Error fetching from server, loading local data:", error);
        // Fallback ke data lokal jika fetch gagal
        const localData = localStorage.getItem("products");
        if (localData) {
            const products = JSON.parse(localData);
            productFunc(products);
            searchFunc(products);
        }
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

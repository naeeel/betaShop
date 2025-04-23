import headerFunc from "./header.js"
import productFunc from "./product_categori.js"
import searchFunc from "./search.js"

//! add product to localstorage start

(async function () {
    // Ambil kategori yang dipilih dari localStorage atau default ke "makanan"
    const selectedCategory = localStorage.getItem("selectedCategory") || "makanan";

    // Tentukan nama file JSON berdasarkan kategori yang dipilih
    const jsonFile = `js/data_${selectedCategory}.json`;

    try {
        const response = await fetch(jsonFile); // Fetch data dari file JSON kategori
        const data = await response.json(); // Konversi ke JSON

        if (data) {
            localStorage.setItem("products", JSON.stringify(data)); // Simpan data ke localStorage
        }

        // Tampilkan produk sesuai kategori
        productFunc(data);
        searchFunc(data);

    } catch (error) {
        console.error("Gagal mengambil data:", error);
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

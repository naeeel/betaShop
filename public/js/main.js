import headerFunc from "./header.js"
import productFunc from "./product.js"
import searchFunc from "./search.js"

//! add product to localstorage start

function getRandomProductsByCategory(products, count) {
    // Group products by category
    const categoryMap = {};
    products.forEach(p => {
        if (!categoryMap[p.category]) categoryMap[p.category] = [];
        categoryMap[p.category].push(p);
    });

    // Ambil satu produk random dari setiap kategori (jika memungkinkan)
    const categories = Object.keys(categoryMap);
    const selected = [];
    const usedIds = new Set();

    // Shuffle categories
    for (let i = categories.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [categories[i], categories[j]] = [categories[j], categories[i]];
    }

    for (let i = 0; i < categories.length && selected.length < count; i++) {
        const cat = categories[i];
        const items = categoryMap[cat];
        if (items.length > 0) {
            const idx = Math.floor(Math.random() * items.length);
            selected.push(items[idx]);
            usedIds.add(items[idx].id);
        }
    }

    // Jika kurang dari count, tambahkan produk random dari sisa
    if (selected.length < count) {
        const remaining = products.filter(p => !usedIds.has(p.id));
        // Shuffle remaining
        for (let i = remaining.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [remaining[i], remaining[j]] = [remaining[j], remaining[i]];
        }
        for (let i = 0; i < remaining.length && selected.length < count; i++) {
            selected.push(remaining[i]);
            usedIds.add(remaining[i].id);
        }
    }

    return selected;
}

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
                size: item.size,
                ulasan: [],
                price: {
                  oldPrice: parseInt(item.old_price),
                  newPrice: parseInt(item.new_price)
                },
                rating: item.average_rating ? parseFloat(item.average_rating) : 0,
                total_reviews: parseInt(item.total_reviews),
                discount: parseInt(item.discount),
                img: {
                  singleImage: `/uploads/${item.img1}`,
                  thumbs: [
                    `/uploads/${item.img1}`,
                    `/uploads/${item.img2}`
                  ]
                },
                category: item.category || "Lainnya"
              }));

            // Pilih 6 produk random dari kategori berbeda untuk Produk Unggulan
            const unggulan = getRandomProductsByCategory(mappedProducts, 6);

            // Pilih 6 produk random lainnya untuk Member Baru (tidak sama dengan unggulan)
            const unggulanIds = new Set(unggulan.map(p => p.id));
            const sisaProduk = mappedProducts.filter(p => !unggulanIds.has(p.id));
            const memberBaru = getRandomProductsByCategory(sisaProduk, 6);

            localStorage.setItem("products", JSON.stringify(mappedProducts));
            productFunc(unggulan, memberBaru);
            searchFunc(mappedProducts);
        }
    } catch (error) {
        console.warn("Error fetching from server, loading local data:", error);
        // Fallback ke data lokal jika fetch gagal
        const localData = localStorage.getItem("products");
        if (localData) {
            const products = JSON.parse(localData);

            // Pilih 6 produk random dari kategori berbeda untuk Produk Unggulan
            const unggulan = getRandomProductsByCategory(products, 6);

            // Pilih 6 produk random lainnya untuk Member Baru (tidak sama dengan unggulan)
            const unggulanIds = new Set(unggulan.map(p => p.id));
            const sisaProduk = products.filter(p => !unggulanIds.has(p.id));
            const memberBaru = getRandomProductsByCategory(sisaProduk, 6);

            productFunc(unggulan, memberBaru);
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

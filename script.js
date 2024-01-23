// ELEMENT VARIABLES
const destName = document.querySelector("#name");
const destLocation = document.getElementById("location");
const destPhoto = document.getElementById("photo");
const destDesc = document.getElementById("description");
const gridContainer = document.querySelector(".grid-card-container");
const submitEl = document.querySelector("#save");

// Mendapatkan data wishlist dari localStorage saat halaman dimuat
document.addEventListener("DOMContentLoaded", function () {
    loadWishlist();
});

submitEl.addEventListener("click", (event) => {
    event.preventDefault();

    // Membuat objek untuk wishlist
    const wishlistItem = {
        name: destName.value,
        location: destLocation.value,
        photo: destPhoto.value || "https://asset.kompas.com/crops/BvFN9Z9CJi3umL6FS_TFXBkehG0=/0x15:977x667/750x500/data/photo/2020/01/05/5e11aed43e19f.jpg",
        description: destDesc.value
    };

    // Menyimpan wishlist ke localStorage
    saveToLocalStorage(wishlistItem);

    // Menampilkan wishlist
    displayWishlist(wishlistItem);
});

// Fungsi untuk menyimpan wishlist ke localStorage
function saveToLocalStorage(wishlistItem) {
    // Periksa apakah localStorage didukung oleh browser
    if (typeof (Storage) !== "undefined") {
        // Ambil data wishlist yang sudah ada atau inisialisasi array kosong
        const existingWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

        // Tambahkan wishlist baru ke array
        existingWishlist.push(wishlistItem);

        // Simpan array wishlist kembali ke localStorage
        localStorage.setItem("wishlist", JSON.stringify(existingWishlist));

        console.log("Data wishlist berhasil disimpan ke localStorage");
    } else {
        console.log("Browser Anda tidak mendukung localStorage");
    }
}

// Fungsi untuk memuat wishlist dari localStorage saat halaman dimuat
function loadWishlist() {
    // Periksa apakah localStorage didukung oleh browser
    if (typeof (Storage) !== "undefined") {
        // Ambil data wishlist dari localStorage
        const existingWishlist = JSON.parse(localStorage.getItem("wishlist"));

        // Periksa apakah ada data wishlist yang disimpan sebelumnya
        if (existingWishlist) {
            // Jika ada, tampilkan setiap item wishlist
            existingWishlist.forEach(displayWishlist);
            console.log("Wishlist berhasil dimuat dari localStorage");
        } else {
            console.log("Tidak ada data wishlist yang disimpan sebelumnya");
        }
    } else {
        console.log("Browser Anda tidak mendukung localStorage");
    }
}

// Fungsi untuk menampilkan wishlist pada halaman
function displayWishlist(wishlistItem) {
    const cardsContainer = document.createElement("div");
    cardsContainer.className = "cards-container";
    const img = document.createElement("img");

    img.setAttribute("src", wishlistItem.photo);
    img.setAttribute("alt", wishlistItem.name);
    cardsContainer.appendChild(img);

    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
        <h3>${wishlistItem.name}</h3>
        <p>Destination Name: ${wishlistItem.name}</p>
        <p>Destination Location: ${wishlistItem.location}</p>

        <h3>Description:</h3>
        <p>${wishlistItem.description}</p>`;

    // Menambahkan tombol hapus
    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.addEventListener("click", function () {
        removeWishlistItem(wishlistItem);
        cardsContainer.remove();
    });
    card.appendChild(removeButton);

    // Menambahkan ke container
    cardsContainer.appendChild(card);
    gridContainer.appendChild(cardsContainer);
}

// Fungsi untuk menghapus item wishlist dari localStorage
function removeWishlistItem(wishlistItem) {
    // Periksa apakah localStorage didukung oleh browser
    if (typeof (Storage) !== "undefined") {
        // Ambil data wishlist yang sudah ada atau inisialisasi array kosong
        const existingWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

        // Filter wishlistItem yang akan dihapus
        const updatedWishlist = existingWishlist.filter(item => item !== wishlistItem);

        // Simpan array wishlist yang telah diperbarui kembali ke localStorage
        localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));

        console.log("Item wishlist dihapus dari localStorage");

        // Perbarui tampilan setelah menghapus item
        gridContainer.innerHTML = "";
        updatedWishlist.forEach(displayWishlist);
    } else {
        console.log("Browser Anda tidak mendukung localStorage");
    }
}

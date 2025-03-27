function saveCategory(category) {
    localStorage.setItem("selectedCategory", category);
}

document.addEventListener("DOMContentLoaded", function () {
    let selectedCategory = localStorage.getItem("selectedCategory");
  
    if (selectedCategory) {
      document.getElementById("category-title").innerText = selectedCategory;
    }
  });
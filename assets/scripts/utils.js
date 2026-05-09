// import { toggler } from "./main.js";

document.addEventListener("DOMContentLoaded", () => {
  const countHeart = document.querySelector(".count-heart");
  countHeart.textContent = favorites.length;
  const wishListCount = document.getElementById("wish-count-items");
  wishListCount.setAttribute("value", favorites.length);
});

// fetch products and inject to cards-products

fetch("/assets/products.json")
  .then((res) => res.json())
  .then((data) => {
    data.forEach((products) => {
      displayCardUI(products);
    });
  })
  .catch((err) => console.error("Erreur lors de la récupération :", err));
// function to play cards products UI
function displayCardUI(products) {
  const cardsProducts = document.querySelector(".cards-products");
  const card = document.createElement("div");
  card.className = "card";
  card.setAttribute("category", `${products.category}`);
  card.setAttribute("id", `${products.id}`);
  card.innerHTML = `
    <div class="card-content">
      <span class="discount-card">- ${products.remise_pourcentage}</span>
      <button class="btn add-to-card">add to card</button>
      <div class="react-card">
        <button class="btn btn-heart" data-id='${products.id}'><i class="fa-regular fa-heart"></i></button>
        <button class="btn btn-eye"><i class="fa-regular fa-eye"></i></button>
      </div>
      <img src="https:picsum.photos/id/${products.id}/270/250" alt="photo" class="img-card">
    </div>
    <div class="card-discription">
      <p class="title-card"> ${products.title}</p>
      <div class="price-card">
        <span class="new-price">${products.new_price}$</span>
        <span class="old-price">${products.old_price}$</span>
      </div>
      <div class="stars">
        <span class="">${products.stars}/5</span>
        <span class="">(${products.rate})</span>
      </div>
    </div>
`;

  cardsProducts.append(card);
  card.addEventListener("click", (e) => {
    if (e.target.classList.contains("add-to-card")) {
      const newItem = new Product(
        products.title,
        products.new_price,
        products.id,
        products.stock,
      );
      // check if exist
      const exist = productsItems.find((item) => item.id === newItem.id);
      if (exist) {
        exist.qts += 1;
        const originalText = e.target.textContent;
        e.target.textContent = "Already Exist";
        setTimeout(() => {
          e.target.textContent = originalText;
        }, 1500);
      } else {
        productsItems.push(newItem);
      }
      Product.saveDataLS(newItem);
      drowUI();
    }

    if (e.target.closest(".btn-heart")) {
      e.target.classList.toggle("active");

      setFavorite(products);
      const wishListCount = document.getElementById("wish-count-items");
      let favorites = JSON.parse(localStorage.getItem("favorites"));
      wishListCount.setAttribute("value", favorites.length);
    }
    generateProductModal(products);
  });
}

let productsItems = JSON.parse(localStorage.getItem("productsItems")) || [];
let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
class Product {
  constructor(title, price, id, stock) {
    this.title = title;
    this.price = price;
    this.id = id;
    this.qts = 1;
    this.stock = stock;
    this.uniqueId = Math.random().toString().slice(2, 8);
  }
  static saveDataLS() {
    localStorage.setItem("productsItems", JSON.stringify(productsItems));
  }
  static getDataLS() {
    const data = JSON.parse(localStorage.getItem("productsItems"));
    return Array.isArray(data) ? data : [];
  }
  static clear(ele) {
    ele.innerHTML = "";
  }
}

// function to drow UI in side BAR
function drowUI() {
  const listProducts = document.querySelector(".list-products");
  Product.clear(listProducts);
  productsItems = Product.getDataLS();
  productsItems.forEach((data) => {
    const items = document.createElement("div");
    items.className = "items";
    items.dataset.id = data.id;
    items.innerHTML = `
          <div class='item-details'>
            <span class="title">- ${data.title} :</span>
            <span class="price">${data.price} $</span>
          </div>
          <div class="controls">
            <div class="quantity" >
              <button class="btn-decrease">−</button>
                <input
                  type="number"
                  class="count-product"
                  value="${data.qts}"
                  min="1"
                  max="${data.stock}"
                  readonly
                  />
              <button class="btn-increase">+</button>
            </div>
            <button class=" btn btn-delete">
              <i class="fa-solid fa-trash-can"></i>
            </button>
          </div>
        `;
    listProducts.append(items);
  });
  const listProductsItem = document.querySelectorAll(".list-products .items");
  itemToDelete(listProductsItem);
  changeQts(listProductsItem);
}

drowUI();

// // function to delete items
function itemToDelete(listProductsItem) {
  listProductsItem.forEach((ele) => {
    ele.addEventListener("click", (e) => {
      if (
        e.target.classList.contains("fa-trash-can") ||
        e.target.closest(".btn-delete")
      ) {
        const id = Number(ele.dataset.id);
        console.log(productsItems);
        productsItems = productsItems.filter((item) => item.id !== id);
        console.log(productsItems);
        Product.saveDataLS();
        drowUI();
      }
    });
  });
}

// function to change qts with button
function changeQts(listProductsItem) {
  listProductsItem.forEach((ele) => {
    ele.addEventListener("click", (e) => {
      const id = Number(ele.dataset.id);
      const product = productsItems.find((p) => p.id === id);
      if (!product) return;
      if (e.target.classList.contains("btn-increase")) {
        if (product.qts < product.stock) product.qts++;
      } else if (e.target.classList.contains("btn-decrease")) {
        if (product.qts > 1) product.qts--;
      } else {
        return;
      }

      Product.saveDataLS();
      drowUI();
    });
  });
}

// function set favorite
function setFavorite(product) {
  const countHeart = document.querySelector(".count-heart");
  let favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
  const index = favorites.findIndex((item) => item.id === product.id);
  if (index > -1) {
    favorites.splice(index, 1);
  } else {
    favorites.push(product);
  }
  localStorage.setItem("favorites", JSON.stringify(favorites));
  if (countHeart) {
    countHeart.textContent = favorites.length;
  }
}

// setup show modal

drowUI();

function generateProductModal(data) {
  const modal = document.querySelector(".modal");
  const modalContent = document.createElement("div");
  modalContent.className = "modal-content";
  modalContent.id = `modal-${data.id}`;
  modalContent.innerHTML = "";
  modalContent.innerHTML = `
    <div class="modal-card">
      <div class="modal-badge">${data.remise_pourcentage}%</div>
      <button class="btn btn-close-modal"><i class="fa-solid fa-xmark"></i></button>
      <div class="modal-image">
        <img src="https://picsum.photos/id/${data.id}/270/250" class="img-card" alt="${data.title}">
      </div>
      <div class="modal-body">
        <span class="modal-category"> category :${data.category}</span>
        <h2 class="modal-title">${data.title}</h2>
        <div class="modal-pricing">
          <span class="price-new">${data.new_price}$</span>
          <span class="price-old">${data.old_price}$</span>
        </div>
        <div class="modal-discription">
          <span>discription :</span>
          <p class="discription">${data.description} </p>
        </div>
        <div class="modal-rating">
          <span class="stars">${data.stars}</span>
          <span class="count">(${data.rate} avis)</span>
        </div>
        <div class="modal-inventory">
          Stock : <span class="stock-value">${data.stock}</span>
        </div>
        <div class="modal-actions">
          <button class="btn btn-buy">Acheter</button>
        </div>
      </div>
    </div>
  `;
  // Injection dans le body
  modal.append(modalContent);
  const btnModal = document.querySelector(".btn-eye");

  if (btnModal && modal) {
    modal.classList.toggle("show");
    document.addEventListener("click", (e) => {
      if (
        e.target.parentNode.classList.contains("btn-close-modal") ||
        e.target.classList.contains("modal")
      ) {
        modal.classList.remove("show");
        modalContent.remove()
      }
    });
  }
  console.log(modalContent);
}

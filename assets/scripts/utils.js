// fetch products and inject to cards-products
//  use function displayCard
fetch("/assets/products.json")
  .then((res) => res.json())
  .then((data) => {
    data.forEach((product) => {
      displayCard(product);
    });
  })
  .catch((err) => console.error("Erreur lors de la récupération :", err));
export function displayCard(product) {
  const cardsProducts = document.querySelector(".cards-products");
  const card = document.createElement("div");
  card.className = "card";
  card.setAttribute("data-category", product.category);
  card.innerHTML = `
    <div >
        <div class="card-content">
            <span class="discount-card">- ${product.remise_pourcentage}</span>
            <button class="btn add-to-card">add to card</button>
            <div class="react-card">
            <i class="fa-regular fa-heart"></i>
            <i class="fa-regular fa-eye"></i>
            </div>
            <img src="https://picsum.photos/id/${product.id}/270/250" alt="photo" class="img-card">
        </div>
        <div class="card-discription">
            <p class="title-card"> ${product.title}</p>
            <div class="price-card">
                <span class="new-price">${product.new_price}$</span>
                <span class="old-price">${product.old_price}$</span>
            </div>
            <div class="stars">
             <span class="">${product.stars}/5</span>
             <span class="">(${product.rate})</span>
            </div>
        </div>
    </div>
    `;

  cardsProducts.append(card);
}

// set function counter for section discount

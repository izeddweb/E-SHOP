


// setup menu toggler
const toggleMenu = document.querySelector(".toggle-menu");
const navlist = document.querySelector(".nav-list");

toggleMenu.addEventListener("click", () => toggler(navlist));

// setup search input
const btnSearch = document.querySelector(".btn-search");
const inputSearch = document.querySelector(".inputSearch");

btnSearch.addEventListener("click", () => toggler(inputSearch));

// setup category links
const btnCategory = document.querySelector(".btn-category");
const listCategory = document.querySelector(".category-list");

// setup side bar shpping and favorite item
const btnShopping = document.querySelector(".shopping-cart");
const btnHeart = document.querySelector(".heart");
const sidePar = document.querySelector(".side-bar");

btnHeart.addEventListener('click',() => toggler(sidePar))
btnShopping.addEventListener('click',() => toggler(sidePar))

if (btnCategory && listCategory) {
  btnCategory.addEventListener("click", () => toggler(listCategory));
}

export function toggler(ele) {
  if (ele) {
    ele.classList.toggle("show");
  }
}

// setup active link to navbar

const links = document.querySelectorAll(".link");
links.forEach((link) => {
  link.addEventListener("click", () => {
    links.forEach((link) => {
      link.classList.remove("active");
    });
    link.classList.add("active");
  });
});


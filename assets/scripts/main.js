// setup Swiper

var swiper = new Swiper(".mySwiper", {
  spaceBetween: 30,
  centeredSlides: true,
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

// setup category links
const btnCategory = document.querySelector('.btn-category')
const listCategory = document.querySelector('.category-list')

btnCategory.addEventListener('click', () => toggler(listCategory))

// setup menu toggler
const toggleMenu = document.querySelector('.toggle-menu')
const navlist = document.querySelector('.nav-list')

toggleMenu.addEventListener('click', () => toggler(navlist))

// setup search input
const btnSearch = document.querySelector('.btn-search')
const inputSearch = document.querySelector('.inputSearch')

btnSearch.addEventListener('click', () => toggler(inputSearch))

function toggler(ele) {
  ele.classList.toggle('show')
}
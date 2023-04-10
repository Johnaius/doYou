const menuButton = document.getElementById('menuButton');
const menuList = document.getElementById('menuList');
let isMenuOpen = false;

function toggleMenu() {
  if (isMenuOpen) {
    menuList.classList.add('hidden');
    menuButton.setAttribute('aria-expanded', 'false');
    isMenuOpen = false;
  } else {
    menuList.classList.remove('hidden');
    menuButton.setAttribute('aria-expanded', 'true');
    isMenuOpen = true;
  }
}

menuButton.addEventListener('click', toggleMenu);

document.addEventListener('click', function(event) {
  if (event.target != menuButton && event.target.parentNode != menuList) {
    menuList.classList.add('hidden');
    menuButton.setAttribute('aria-expanded', 'false');
    isMenuOpen = false;
  }
});



 

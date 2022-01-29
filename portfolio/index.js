/* Adaptive Menu */
const buter_brodskiy = document.querySelector('.buter_brodskiy');
const nav = document.querySelector('.nav');
const navLinks = document.querySelectorAll('.nav-link');
const shdwBox = document.querySelector('.shadow-box');

buter_brodskiy.addEventListener('click', () => {
    buter_brodskiy.classList.toggle('active');
    nav.classList.toggle('active');
    shdwBox.classList.toggle('active');
});

navLinks.forEach(navLink => navLink.addEventListener('click', () => {
    buter_brodskiy.classList.remove('active');
    nav.classList.remove('active');
}));

/* Change Images */
const seasonBtns = document.querySelectorAll('.season-button');
const seasonBtnsParent = document.querySelector('.season-buttons');
const seasonImages = document.querySelectorAll('.image');

function changeImage() {
    seasonBtnsParent.addEventListener('click', (event) => {
        if (event.target && event.target.classList.contains('season-button')) {
            seasonImages.forEach((img, index) => img.src = `./assets/img/${event.target.dataset.season}/${index + 1}.jpg`);
        }
      });
}
    changeImage();
    
function changeClass() {
    seasonBtns.forEach(item => {
        item.addEventListener('click', () => {
            seasonBtns.forEach(button => {
                button.classList.remove('season-button_active');
            })
            item.classList.add('season-button_active');
        })
    })
}
    changeClass();

function preloadImages(season) {
    for(let i = 1; i <= 6; i++) {
      const img = new Image();
      img.src = `./assets/img/${season}/${i}.jpg`;
    }
  }
['winter','summer', 'spring', 'autumn'].forEach(season => {
    preloadImages(season);
});

/* Translation / Перевод */
import i18Obj from './js/translate.js';
const ruButton = document.querySelector('.lang-ru');
const enButton = document.querySelector('.lang-en');
const langItems = document.querySelectorAll('[data-i18]');
let lang = document.querySelector('lang');

    function getTranslate(language) {
        langItems.forEach(item => {
            item.textContent = i18Obj[language][item.dataset.i18];
            if (item.placeholder) {
                item.placeholder = i18Obj[language][item.dataset.i18];
                item.textContent = '';
            }
        })
    };

    ruButton.addEventListener('click', () => {
        getTranslate('ru');
        enButton.classList.remove('active');
        ruButton.classList.add('active');
        lang = "ru";
    });

    enButton.addEventListener('click', () => {
        getTranslate('en');
        ruButton.classList.remove('active');
        enButton.classList.add('active');
        lang = "en";
    });

/* Swtich Theme */

const buttonLight = document.querySelector('.switch-button');
const bodyLight = document.querySelector('body');
const heroLight = document.querySelector('.hero-container');
const contactsLight = document.querySelector('.contact-container');
const logoLight = document.querySelector('.logo');
const iconsLight = document.querySelectorAll('.social-icon');

buttonLight.addEventListener('click', () => {
  buttonLight.classList.toggle('light');
  heroLight.classList.toggle('light');
  contactsLight.classList.toggle('light');
  bodyLight.classList.toggle('switch-theme');
  logoLight.classList.toggle('light');
  iconsLight.forEach(icon => {
    icon.classList.toggle('light');
  })
});

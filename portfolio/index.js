const buter_brodskiy = document.querySelector('.buter_brodskiy');
const nav = document.querySelector('.nav');
const navLinks = document.querySelectorAll('.nav-link');
const seasonBtns = document.querySelectorAll('.season-button');
const seasonBtnsParent = document.querySelector('.season-buttons');
const seasonImages = document.querySelectorAll('.image');


buter_brodskiy.addEventListener("click", () => {
    buter_brodskiy.classList.toggle("active");
    nav.classList.toggle("active");
});

navLinks.forEach(navLink => navLink.addEventListener("click", () => {
    buter_brodskiy.classList.remove("active");
    nav.classList.remove("active");
}));

/*
seasonBtnsParent.addEventListener('click', (event) => {
    const target = event.target;
    if (target && target.classList.contains('season-button')) {
        seasonImages.forEach((img, index) => img.src = `./assets/img/${target.dataset.season}/${index + 1}.jpg`);
    })
  }
}
  */
function changeImage(event) {
    seasonBtnsParent.addEventListener('click', (event) => {
        if (event.target && event.target.classList.contains('season-button')) {
            seasonImages.forEach((img, index) => img.src = `./assets/img/${event.target.dataset.season}/${index + 1}.jpg`);
        }
      });
}
    changeImage();
    
function changeClass() {
    seasonBtns.forEach(item => {
        item.addEventListener('click', (event) => {
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

/*function preloadWinterImages() {
  for(let i = 1; i <= 6; i++) {
    const img = new Image();
    img.src = `./assets/img/winter/${i}.jpg`;
  }
}
preloadWinterImages();

function preloadSpringImages() {
  for(let i = 1; i <= 6; i++) {
    const img = new Image();
    img.src = `./assets/img/spring/${i}.jpg`;
  }
}
preloadSpringImages();

function preloadSummerImages() {
  for(let i = 1; i <= 6; i++) {
    const img = new Image();
    img.src = `./assets/img/summer/${i}.jpg`;
  }
}
preloadSummerImages();

function preloadAutumnImages() {
    for(let i = 1; i <= 6; i++) {
      const img = new Image();
      img.src = `./assets/img/autumn/${i}.jpg`;
    }
  }
  preloadAutumnImages();



/*btn.addEventListener('click', () => {
    portfolioImages.forEach((img, index) => img.src = `./assets/img/winter/${index + 1}.jpg`);
 });

 btn.addEventListener('click', () => {
    portfolioImages.forEach((img, index) => img.src = `./assets/img/spring/${index + 1}.jpg`);
 });

 btn.addEventListener('click', () => {
    portfolioImages.forEach((img, index) => img.src = `./assets/img/summer/${index + 1}.jpg`);
 });

 btN.addEventListener('click', () => {
    portfolioImages.forEach((img, index) => img.src = `./assets/img/autumn/${index + 1}.jpg`);
 });
/*function changeImage(event) {
    if(event.target.classList.contains('button_2')) {
        portfolioImages.forEach((img, index) => img.src = ./assets/img/winter/${index + 1}.jpg);
});
    }*/
    


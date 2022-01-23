const buter_brodskiy = document.querySelector(".buter_brodskiy");
const nav = document.querySelector(".nav");
const navLinks = document.querySelectorAll(".nav-link")

buter_brodskiy.addEventListener("click", () => {
    buter_brodskiy.classList.toggle("active");
    nav.classList.toggle("active");
})

navLinks.forEach(navLink => navLink.addEventListener("click", () => {
    buter_brodskiy.classList.remove("active");
    nav.classList.remove("active");
}))


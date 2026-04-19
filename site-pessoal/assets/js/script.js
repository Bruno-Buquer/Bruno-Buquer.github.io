let lastScroll = 0;
const navbar = document.getElementById("top-bar");
window.addEventListener("scroll", () => {
    let currentScroll = window.pageYOffset;

    if (currentScroll <= 0) {
        navbar.classList.remove("nav-hidden");
        return;
    }

    if (currentScroll > lastScroll) {
        navbar.classList.add("nav-hidden");
    } else {
        navbar.classList.remove("nav-hidden");
    }

    lastScroll = currentScroll;
});
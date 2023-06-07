const body = document.body;
const header = document.getElementById("header");
const burgerMenu = document.getElementById("burger-menu");
const open = "block-open";
const scrollUp = "scroll-up";
const scrollDown = "scroll-down";
const scrollTransition = "scroll-transition";

let fixedHeader = false;
let lastScroll = 0;

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;

  if (currentScroll <= 0) {
    fixedHeader = false;
  }

  if (currentScroll <= header.offsetHeight && !fixedHeader) {
    body.classList.remove(scrollTransition);
    header.style.transform = `translate3d(0, -${currentScroll}px, 0)`;
    return;
  } else {
    body.classList.add(scrollTransition);
    header.style.transform = null;
    fixedHeader = true;
  }

  if (currentScroll > lastScroll && !body.classList.contains(scrollDown)) {
    // down
    body.classList.remove(scrollUp);
    body.classList.add(scrollDown);
    header.classList.remove(open);
  } else if (currentScroll < lastScroll && body.classList.contains(scrollDown)) {
    // up
    body.classList.remove(scrollDown);
    body.classList.add(scrollUp);
  }

  lastScroll = currentScroll;
});


burgerMenu.addEventListener("click", () => {
  if (header.classList.contains(open)) {
    header.classList.remove(open);
  } else {
    header.classList.add(open);
  }
});
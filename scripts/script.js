const body = document.body;
const header = document.getElementById("header");
const burgerMenu = document.getElementById("burger-menu");
const copyDs = document.getElementById("copy-ds");
const anchors = document.querySelectorAll(".block > *");
const navItems = document.querySelectorAll(".navigation__item");
const open = "block-open";
const scrollUp = "scroll-up";
const scrollDown = "scroll-down";
const scrollTransition = "scroll-transition";
const successful = "text-copy-successful";
const successfulHidden = "text-copy-successful-hidden";
const navItemActive = "navigation__item-active";

let fixedHeader = false;
let lastScroll = 0;

let anchorsHeight = {};
updateaAnchorsHeight();
updateaNavItems();

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;
  updateaAnchorsHeight();
  updateaNavItems();

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

function copy(text) {
  if (!navigator.clipboard) {
    return prompt("Copy to clipboard: Ctrl+C, Enter", text);;
  }

  navigator.clipboard.writeText(text);

  copyDs.classList.remove(successfulHidden);
  copyDs.classList.add(successful);
  setTimeout(() => {
    copyDs.classList.remove(successful);
  }, 2000);//
  setTimeout(() => {
    copyDs.classList.add(successfulHidden);
  }, 2200);//
}

function updateaNavItems() {
  const yPos = window.scrollY + window.innerHeight / 2;
  const url =  window.location.href.split('?')[0];

  navItems.forEach(navElement => {
    if (navElement.href === url) {
      navElement.classList.add(navItemActive);
    } else {
      navElement.classList.remove(navItemActive);
    }
  });

  Object.entries(anchorsHeight).forEach(([aKey, aVal]) => {
    if (yPos > aVal) {
      navItems.forEach(navElement => {
        console.log(navElement.href === url)
        if (navElement.href.includes("#" + aKey)) {
          navElement.classList.add(navItemActive);
        } else {
          navElement.classList.remove(navItemActive);
        }
      });
      return;
    }
  });
}

function updateaAnchorsHeight() {
  anchors.forEach(e => {
    if (e.hasAttribute('id')) {
      const rect = e.getBoundingClientRect();
      anchorsHeight[e.id] = rect.top + window.scrollY;
    }
  });
}
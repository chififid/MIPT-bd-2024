const body = document.body;
const header = document.getElementById("header");
const anchors = document.querySelectorAll(".block");
const navItems = document.querySelectorAll(".header__link");
const open = "block-open";
const scrollUp = "scroll-up";
const scrollDown = "scroll-down";
const scrollTransition = "scroll-transition";
const navItemActive = "header__link-active";

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

const supportMessages = [
    "Да мы с тобой, Роман!",
    "Бдюлев Роман наш кан��идат!",
    "КОНЦЕПЦИЯ РЕШАЕТ!",
    "Физтех за Бдюлева!",
    "БДЮЛЕВ ЛЮБИТ ТЕБЯ ❤️",
    "ЭТО БАЗА!",
    "КОНЦЕПТУАЛЬНО ОДОБРЯЮ",
    "БДЮЛЕВ МОМЕНТ",
    "ДУБНА ЖДЁТ ТЕБЯ",
    "КРЕСТЬЯНИН ВОЛЬНОЙ ПЛАНЕТЫ 🌍",
    "ШИРОКО УЛЫБАЮЩИЙСЯ РОТ 😁",
    "ДЕГРАД ОДОБРЯЕТ 👍",
    "ОМСК -> КИЕВ -> ФИЗТЕХ",
    "БДЮЛЕВ = КОНЦЕПЦИЯ",
    "ЛЕММА БДЮЛЕВА-РУБИКА ДОКАЗАНА!",
    "РЕВОЛЮЦИЯ В ДУБНЕ",
    "МОЙ СЛОН (c) Надеждин",
    "БДЮЛЕВ REAL NO FAKE",
    "ФИЛОСОФ БЕЗ ФИЛОСОФСКОГО",
    "КРИПТО БЕЗ НАЗВАНИЯ",
    "ПОДПОЛЬНЫЙ РЭП ОДОБРЯЕТ",
    "BUSINESS DEVELOPMENT CEO",
    "СТАВЬ ЛАЙК ЕСЛИ БДЮЛЕВ",
    "БДЮЛЕВ GAMING",
    "БДЮЛЕВ SPEEDRUN ANY%",
    "ФИЗТЕХ CHALLENGE ACCEPTED",
    "БДЮЛЕВ 2024",
];

const colors = [
    "#FF0000", // Яркий красный
    "#00FF00", // Лаймовый
    "#0000FF", // Яркий синий
    "#FF00FF", // Маджента
    "#00FFFF", // Циан
    "#FFFF00", // Жёлтый
    "#FF4500", // Оранжево-красный
    "#8A2BE2", // Сине-фиолетовый
    "#FF1493", // Глубокий розовый
    "#7FFF00", // Шартрез
    "#FF69B4", // Ярко-розовый
];

document.querySelectorAll('.header__support-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        const message = document.createElement('div');
        message.className = 'support-message';
        
        // Случайное сообщение и цвет
        message.textContent = supportMessages[Math.floor(Math.random() * supportMessages.length)];
        message.style.color = colors[Math.floor(Math.random() * colors.length)];
    
        // Случайное положение вокруг точки клика
        const offset = 20;
        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * offset;
        const randomX = Math.cos(angle) * distance;
        const randomY = Math.sin(angle) * distance;
        
        // Добавляем сначала в DOM для получения размеров
        document.body.appendChild(message);
        
        // Позиционирование относительно клика с учетом размеров текста
        message.style.left = (e.clientX + randomX - message.offsetWidth/2) + 'px';
        message.style.top = (e.clientY + randomY - message.offsetHeight/2) + 'px';
        
        // Проверяем границы экрана и выбираем направление
        const rect = message.getBoundingClientRect();
        const directions = ['up-right', 'up-left', 'down-right', 'down-left'];
        let direction;

        if (rect.top < 50) {
            // Если близко к верху экрана
            direction = Math.random() > 0.5 ? 'down-right' : 'down-left';
        } else if (rect.bottom > window.innerHeight - 50) {
            // Если близко к низу экрана
            direction = Math.random() > 0.5 ? 'up-right' : 'up-left';
        } else if (rect.left < 50) {
            // Если близко к левому краю
            direction = Math.random() > 0.5 ? 'up-right' : 'down-right';
        } else if (rect.right > window.innerWidth - 50) {
            // Если близко к правому краю
            direction = Math.random() > 0.5 ? 'up-left' : 'down-left';
        } else {
            // Если достаточно места - случайное направление
            direction = directions[Math.floor(Math.random() * directions.length)];
        }
        
        message.setAttribute('data-direction', direction);
        
        setTimeout(() => {
            message.remove();
        }, 2000);
    });
});

const burgerMenu = document.getElementById("burger-menu");
const headerContainer = document.querySelector(".header");

burgerMenu.addEventListener("click", () => {
    headerContainer.classList.toggle("block-open");
});

// Закрываем меню при клике вне его
document.addEventListener("click", (e) => {
    if (!headerContainer.contains(e.target) && headerContainer.classList.contains("block-open")) {
        headerContainer.classList.remove("block-open");
    }
});
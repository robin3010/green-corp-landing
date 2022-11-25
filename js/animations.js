const INCREASE_NUMBER_ANIMATION_SPEED = 50;
const getNumber = (max, min = 0) => Math.floor(Math.random() * (max - min) + min);

/* рост счетчика клиентов - версия по заданию
function increaseNumAnimStep(i, el, endNumber) {
  if (i <= endNumber) {
    if (i === endNumber) {
      el.innerText = i + "+";
    } else {
      el.innerText = i;
    };
    i += 100;
    setTimeout(() => increaseNumAnimStep(i, el, endNumber), INCREASE_NUMBER_ANIMATION_SPEED);
  };
};
*/

// рост счетчика клиентов на рандомное число
function increaseNumAnimStep(i, el, endNumber) {
  if (i >= endNumber) {
    el.innerText = endNumber + "+";
  } else {
    el.innerText = i;
    i += getNumber(200, 50);
    setTimeout(() => increaseNumAnimStep(i, el, endNumber), INCREASE_NUMBER_ANIMATION_SPEED);
  };
};
 
function initIncreaseNumAnim() {
  const el = document.querySelector(".features__clients-count");
  increaseNumAnimStep(0, el, 5000);
};

// добавление селекта с выбором примерного бюджета
document.querySelector('#budget').addEventListener('change', function handleSelectChange(event) {
  if (event.target.value === "other") {
    const formContainer = document.createElement("div");
    formContainer.classList.add("form__group", "form__other-input");

    const input = document.createElement("input");
    input.placeholder = "Введите ваш вариант";
    input.type = "text";
    formContainer.appendChild(input);

    document.querySelector("#form form").insertBefore(formContainer, document.querySelector(".form__submit"));
  };

  const otherInput = document.querySelector(".form__other-input");
  if (event.target.value !== "other" && otherInput) {
    document.querySelector("#form form").removeChild(otherInput);
  };
});

// анимации при скролле - изменение шапки, увеличение счетчика клиентов
let animationInited = false;

function updateScroll() {
  let windowBottomPosition = window.scrollY + window.innerHeight;
  let countElementPosition = document.querySelector('.features__clients-count').offsetTop;
  if (windowBottomPosition >= countElementPosition && !animationInited) {
    animationInited = true;
    initIncreaseNumAnim();
  };
  if (window.scrollY > 0) {
    document.querySelector("header").classList.add("header__scrolled");
  } else {
    document.querySelector("header").classList.remove("header__scrolled");
  };
};
window.addEventListener("scroll", updateScroll);

// плавный скролл
function addSmoothScroll(anchor) {
  anchor.addEventListener("click", function (event) {
    event.preventDefault();
    document.querySelector(event.target.getAttribute("href")).scrollIntoView({
      behavior: 'smooth'
    });
  });
};

document.querySelectorAll("a[href^='#']").forEach(anchor => addSmoothScroll(anchor));

addSmoothScroll(document.querySelector(".more-button"));
const getNumber = (max, min = 0) => Math.floor(Math.random() * (max - min) + min);
const INCREASE_NUMBER_ANIMATION_SPEED = 50;

/* рост счетчика - версия по заданию
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

// рост счетчика на рандомное число
function increaseNumAnimStep(i, el, endNumber) {
  if (i >= endNumber) {
    el.innerText = endNumber + "+";
  } else {
    el.innerText = i;
    i += getNumber(200, 50);
    setTimeout(() => increaseNumAnimStep(i, el, endNumber), INCREASE_NUMBER_ANIMATION_SPEED);
    console.log(i);
  };
};
 
function initIncreaseNumAnim() {
  const el = document.querySelector(".features__clients-count");
  increaseNumAnimStep(0, el, 5000);
};
initIncreaseNumAnim();
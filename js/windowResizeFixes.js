const body = document.body;
const setBodyMarginR = () => {
  body.style["margin-right"] = -(body.offsetWidth - body.clientWidth) + "px";
};
window.addEventListener("resize", () => {
  let delay = 250, throttled = false;
  if (!throttled) {
    setBodyMarginR();
    throttled = true;
    setTimeout(function () {
      throttled = false;
    }, delay);
  }
});
setBodyMarginR();
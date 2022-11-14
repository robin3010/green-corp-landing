const body = document.querySelector("body");
    const setBodyMarginR = () => {
      body.style["margin-right"] = -(body.offsetWidth - body.clientWidth) + "px";
    };
    window.addEventListener("resize", () => {
      let delay = 250, throttled = false;
      if (!throttled) {
        setBodyMarginR();
        canvas = new CanvasBG("orb-canvas");
        canvas.start();
        throttled = true;
        setTimeout(function() {
          throttled = false;
        }, delay);
      }
    });
    setBodyMarginR();
const COLORS = ["255,108,80", "5,117,18", "29,39,57", "67,189,81"];
const BUBBLE_DENSITY = 100;

function genDecBetween(l, r) {
    return (Math.random() * (l - r) + r).toFixed(2);
};

class Bubble {
    constructor(cvs) {
        this.canvas = /** @type {HTMLCanvasElement} */ (cvs);
        this.getCanvasSize();
        this.init();
    }
    getCanvasSize() {
        this.canvasWidth = this.canvas.clientWidth;
        this.canvasHeight = this.canvas.clientHeight;
    }
    init() {
        this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
        this.size = genDecBetween(1, 3);
        this.alpha = genDecBetween(2, 7) / 10;
        this.translateX = genDecBetween(0, this.canvasWidth);
        this.translateY = genDecBetween(0, this.canvasHeight);
        this.velocity = genDecBetween(20, 40);
        this.movementX = genDecBetween(-2, 2) / this.velocity;
        this.movementY = genDecBetween(1, 20) / this.velocity;
    }
    move() {
        this.translateX -= this.movementX;
        this.translateY -= this.movementY;
        if (this.translateY < 0 || this.translateX < 0 || this.translateX > this.canvasWidth) {
            this.init();
            this.translateY = this.canvasHeight;
        };
    }
};

class CanvasBG {
    constructor(id) {
        this.canvas = /** @type {HTMLCanvasElement} */ (document.getElementById(id));
        this.ctx = this.canvas.getContext("2d");
        this.dpr = window.devicePixelRatio;
    }
    start() {
        this.canvasSize();
        this.generateBubbles();
        this.animate();
    }
    canvasSize() {
        this.canvas.width = this.canvas.offsetWidth * this.dpr;
        this.canvas.height = this.canvas.offsetHeight * this.dpr;
        this.ctx.scale(this.dpr, this.dpr);
    }
    generateBubbles() {
        this.bubblesList = [];
        for (let i = 0; i < BUBBLE_DENSITY; i++) {
            this.bubblesList.push(new Bubble(this.canvas));
        }
    }
    animate() {
        this.ctx.clearRect(0, 0, this.canvas.clientWidth, this.canvas.clientHeight);
        this.bubblesList.forEach(b => {
            b.move();
            this.ctx.translate(b.translateX, b.translateY);
            this.ctx.beginPath();
            this.ctx.arc(0, 0, b.size, 0, 2 * Math.PI);
            this.ctx.fillStyle = `rgba(${b.color},${b.alpha})`;
            this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
            this.ctx.fill();
        });
        requestAnimationFrame(this.animate.bind(this));
    }
}

const canvas = new CanvasBG("orb-canvas");
canvas.start();
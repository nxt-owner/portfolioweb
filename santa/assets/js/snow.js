const canvas = document.getElementById("snow-canvas");
const ctx = canvas.getContext("2d");

let width, height;
let flakes = [];

function resizeCanvas() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

class Snowflake {
    constructor() {
        this.reset();
    }

    reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.radius = Math.random() * 2.5 + 0.5;
        this.speedY = Math.random() * 0.6 + 0.3;
        this.speedX = Math.random() * 0.6 - 0.3;
        this.opacity = Math.random() * 0.8 + 0.2;
    }

    update() {
        this.y += this.speedY;
        this.x += this.speedX;

        if (this.y > height) {
            this.reset();
            this.y = -10;
        }
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
        ctx.fill();
    }
}

function initSnow(count = 200) {
    flakes = [];
    for (let i = 0; i < count; i++) {
        flakes.push(new Snowflake());
    }
}

function animateSnow() {
    ctx.clearRect(0, 0, width, height);
    flakes.forEach(flake => {
        flake.update();
        flake.draw();
    });
    requestAnimationFrame(animateSnow);
}

initSnow(100);
animateSnow();

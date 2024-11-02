const canvas = document.getElementById('fireworksCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let fireworks = [];

class Firework {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.hue = Math.random() * 360;
        this.particles = [];
        this.exploded = false;
        this.size = 2;
        this.count = 150; // Increased number of particles for more effect
    }

    update() {
        if (!this.exploded) {
            this.size += 0.3; // Increased size growth speed
            if (this.size >= 10) {
                this.explode();
            }
        } else {
            this.particles.forEach((particle, index) => {
                particle.update();
                if (particle.alpha <= 0) {
                    this.particles.splice(index, 1); // Remove dead particles
                }
            });
        }
    }

    explode() {
        this.exploded = true;
        for (let i = 0; i < this.count; i++) {
            this.particles.push(new Particle(this.x, this.y, this.hue));
        }
    }

    draw() {
        if (!this.exploded) {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `hsl(${this.hue}, 100%, 50%)`;
            ctx.fill();
        } else {
            this.particles.forEach(particle => particle.draw());
        }
    }
}

class Particle {
    constructor(x, y, hue) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 4 + 2; // Increased particle size
        this.speedX = Math.random() * 8 - 4; // Increased random speed
        this.speedY = Math.random() * 8 - 4; // Increased random speed
        this.hue = hue;
        this.alpha = 1; // Opacity
        this.decay = Math.random() * 0.03 + 0.01; // Slightly slower decay for longer duration
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.alpha -= this.decay;
    }

    draw() {
        ctx.save();
        ctx.globalAlpha = this.alpha; // Set particle opacity
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsl(${this.hue}, 100%, 50%)`;
        ctx.fill();
        ctx.restore();
    }
}

// Create fireworks at a faster rate
function createFirework() {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height * 0.5; 
    fireworks.push(new Firework(x, y));
}

// Animation loop
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); 
    fireworks.forEach(firework => {
        firework.update();
        firework.draw();
    });
    requestAnimationFrame(animate);
}


setInterval(createFirework, 200); 

// Start animation
animate();

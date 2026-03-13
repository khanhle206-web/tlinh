// --- Custom Cursor ---
const cursor = document.querySelector('.cursor');
const cursor2 = document.querySelector('.cursor2');
document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    cursor2.style.left = e.clientX + 'px';
    cursor2.style.top = e.clientY + 'px';
});

// --- Typing Effect ---
const textArray = ["Chào mừng đến với thế giới của Cá 🐟", "Cô gái sinh tháng 11 ngọt ngào 🍂", "Hãy cuộn xuống để khám phá nhé! 💕"];
let textIndex = 0;
let charIndex = 0;
const typingElement = document.querySelector('.typing-text');

function type() {
    if (charIndex < textArray[textIndex].length) {
        typingElement.textContent += textArray[textIndex].charAt(charIndex);
        charIndex++;
        setTimeout(type, 100);
    } else {
        setTimeout(erase, 2000);
    }
}

function erase() {
    if (charIndex > 0) {
        typingElement.textContent = textArray[textIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(erase, 50);
    } else {
        textIndex = (textIndex + 1) % textArray.length;
        setTimeout(type, 500);
    }
}
document.addEventListener("DOMContentLoaded", () => { setTimeout(type, 1000); });

// --- Smooth Scrolling ---
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// --- Scroll Reveal Animation ---
const reveals = document.querySelectorAll(".reveal");
function revealOnScroll() {
    for (let i = 0; i < reveals.length; i++) {
        let windowHeight = window.innerHeight;
        let elementTop = reveals[i].getBoundingClientRect().top;
        let elementVisible = 150;
        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add("active");
        }
    }
}
window.addEventListener("scroll", revealOnScroll);
revealOnScroll(); // Trigger on load

// --- Lightbox Gallery ---
const galleryItems = document.querySelectorAll('.gallery-item img');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeBtn = document.querySelector('.close-btn');

galleryItems.forEach(item => {
    item.addEventListener('click', () => {
        lightbox.style.display = 'block';
        lightboxImg.src = item.src;
    });
});

closeBtn.addEventListener('click', () => lightbox.style.display = 'none');
lightbox.addEventListener('click', (e) => {
    if(e.target === lightbox) lightbox.style.display = 'none';
});

// --- Canvas Particles (Bubbles & Hearts) ---
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray = [];
const numberOfParticles = 80;

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = canvas.height + Math.random() * 100;
        this.size = Math.random() * 15 + 5;
        this.speedY = Math.random() * 1.5 + 0.5;
        this.speedX = Math.random() * 2 - 1;
        this.type = Math.random() > 0.5 ? 'bubble' : 'heart';
        this.opacity = Math.random() * 0.5 + 0.2;
    }
    update() {
        this.y -= this.speedY;
        this.x += this.speedX;
        if (this.y < 0 - this.size) {
            this.y = canvas.height + this.size;
            this.x = Math.random() * canvas.width;
        }
    }
    draw() {
        ctx.globalAlpha = this.opacity;
        if(this.type === 'bubble') {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
            ctx.lineWidth = 1;
            ctx.stroke();
            ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
            ctx.fill();
        } else {
            // Draw cute heart
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.scale(this.size/20, this.size/20);
            ctx.beginPath();
            ctx.moveTo(0, 5);
            ctx.bezierCurveTo(-10, -10, -25, 5, 0, 25);
            ctx.bezierCurveTo(25, 5, 10, -10, 0, 5);
            ctx.fillStyle = '#ff69b4';
            ctx.fill();
            ctx.restore();
        }
    }
}

function initParticles() {
    particlesArray = [];
    for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle());
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
    }
    requestAnimationFrame(animateParticles);
}

initParticles();
animateParticles();

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initParticles();
});

// --- Interactive Heart Button Explosion ---
const heartBtn = document.getElementById('heart-btn');
heartBtn.addEventListener('click', () => {
    for(let i = 0; i < 50; i++) {
        let p = new Particle();
        p.x = window.innerWidth / 2;
        p.y = window.innerHeight / 2;
        p.speedY = (Math.random() - 0.5) * 10;
        p.speedX = (Math.random() - 0.5) * 10;
        p.type = 'heart';
        p.opacity = 1;
        particlesArray.push(p);
    }
});

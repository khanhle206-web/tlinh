// --- 1. Preloader ---
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    setTimeout(() => {
        preloader.style.opacity = '0';
        setTimeout(() => { preloader.style.display = 'none'; }, 500);
    }, 1500); // Giả lập thời gian load để xem hiệu ứng
});

// --- 2. Scroll Reveal (Fade Up Animation) ---
const fadeElements = document.querySelectorAll('.fade-up');
const observerOptions = { root: null, threshold: 0.1, rootMargin: "0px 0px -50px 0px" };

const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            obs.unobserve(entry.target);
        }
    });
}, observerOptions);

fadeElements.forEach(el => observer.observe(el));

// --- 3. Hero Parallax Effect (Chuyển động theo chuột) ---
document.addEventListener("mousemove", (e) => {
    const layers = document.querySelectorAll(".layer");
    const x = (window.innerWidth - e.pageX * 2) / 100;
    const y = (window.innerHeight - e.pageY * 2) / 100;

    layers.forEach(layer => {
        const speed = layer.getAttribute("data-speed");
        const xPos = x * speed;
        const yPos = y * speed;
        layer.style.transform = `translateX(${xPos}px) translateY(${yPos}px)`;
    });
});

// --- 4. Music Player Logic ---
const musicWidget = document.getElementById('music-toggle');
const bgMusic = document.getElementById('bg-music');
let isPlaying = false;

// Đặt volume nhỏ vừa đủ nghe
bgMusic.volume = 0.4;

musicWidget.addEventListener('click', () => {
    if (isPlaying) {
        bgMusic.pause();
        musicWidget.classList.add('paused');
        musicWidget.querySelector('.song-name').textContent = "Đã tạm dừng";
    } else {
        bgMusic.play().catch(e => console.log("Trình duyệt chặn autoplay"));
        musicWidget.classList.remove('paused');
        musicWidget.querySelector('.song-name').textContent = "Đang phát nhạc...";
    }
    isPlaying = !isPlaying;
});
// Mặc định dừng UI
musicWidget.classList.add('paused');

// --- 5. Lightbox Gallery (Mở ảnh to) ---
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');

function openLightbox(element) {
    const imgSrc = element.querySelector('img').src;
    lightboxImg.src = imgSrc;
    lightbox.classList.add('show');
    document.body.style.overflow = 'hidden'; // Ngăn cuộn trang
}

function closeLightbox() {
    lightbox.classList.remove('show');
    document.body.style.overflow = 'auto';
    setTimeout(() => { lightboxImg.src = ""; }, 400);
}

// Click ra ngoài để đóng
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
});

// --- 6. Secret Feature (Easter Egg) ---
// Bấm vào avatar 5 lần sẽ hiện một khung chứa lời nhắn bí mật
const secretTrigger = document.getElementById('secret-trigger');
const secretModal = document.getElementById('secret-modal');
let clickCount = 0;
let clickTimer;

secretTrigger.addEventListener('click', () => {
    clickCount++;
    
    // Reset bộ đếm nếu ngưng click sau 2 giây
    clearTimeout(clickTimer);
    clickTimer = setTimeout(() => { clickCount = 0; }, 2000);

    if (clickCount === 5) {
        secretModal.classList.add('active');
        clickCount = 0; // Reset
        
        // Bạn có thể thêm hiệu ứng Confetti (pháo giấy) ở đây nếu muốn tích hợp thêm thư viện js
    }
});

function closeSecret() {
    secretModal.classList.remove('active');
}

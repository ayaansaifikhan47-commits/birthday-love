let currentPage = 1;
const totalPages = 5;
let currentPhotoSlide = 0;
let currentMessageSlide = 0;

function showPage(pageNum) {
    // Hide all pages
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.classList.remove('active'));

    // Show current page
    const currentPageElement = document.querySelector(`.page-${pageNum}`);
    if (currentPageElement) {
        currentPageElement.classList.add('active');
    }

    currentPage = pageNum;
    
    // Initialize dots on page 2 and 3
    if (pageNum === 2) {
        initializePhotoDots();
        currentPhotoSlide = 0;
        updatePhotoCarousel();
    }
    if (pageNum === 3) {
        initializeMessageDots();
        currentMessageSlide = 0;
        updateMessageCarousel();
    }
}

function nextPage() {
    if (currentPage < totalPages) {
        showPage(currentPage + 1);
    }
}

function prevPage() {
    if (currentPage > 1) {
        showPage(currentPage - 1);
    }
}

function restartPage() {
    showPage(1);
    currentPhotoSlide = 0;
    currentMessageSlide = 0;
}

// Photo Carousel Functions
function nextSlide() {
    currentPhotoSlide = (currentPhotoSlide + 1) % 3;
    updatePhotoCarousel();
}

function prevSlide() {
    currentPhotoSlide = (currentPhotoSlide - 1 + 3) % 3;
    updatePhotoCarousel();
}

function updatePhotoCarousel() {
    const carousel = document.querySelector('.carousel');
    const offset = -currentPhotoSlide * 100;
    carousel.style.transform = `translateX(${offset}%)`;
    
    // Update dots
    const dots = document.querySelectorAll('.carousel-dots .dot');
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentPhotoSlide);
    });
}

function initializePhotoDots() {
    const dotsContainer = document.querySelector('.carousel-dots');
    if (!dotsContainer) return;
    
    dotsContainer.innerHTML = '';
    for (let i = 0; i < 3; i++) {
        const dot = document.createElement('div');
        dot.className = 'dot';
        if (i === currentPhotoSlide) dot.classList.add('active');
        dot.onclick = () => {
            currentPhotoSlide = i;
            updatePhotoCarousel();
        };
        dotsContainer.appendChild(dot);
    }
}

// Message Carousel Functions
function nextMessageSlide() {
    currentMessageSlide = (currentMessageSlide + 1) % 6;
    updateMessageCarousel();
}

function prevMessageSlide() {
    currentMessageSlide = (currentMessageSlide - 1 + 6) % 6;
    updateMessageCarousel();
}

function updateMessageCarousel() {
    const slides = document.querySelector('.messages-slides');
    const offset = -currentMessageSlide * 100;
    slides.style.transform = `translateX(${offset}%)`;
    
    // Update dots
    const dots = document.querySelectorAll('.message-dots .dot');
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentMessageSlide);
    });
}

function initializeMessageDots() {
    const dotsContainer = document.querySelector('.message-dots');
    if (!dotsContainer) return;
    
    dotsContainer.innerHTML = '';
    for (let i = 0; i < 6; i++) {
        const dot = document.createElement('div');
        dot.className = 'dot';
        if (i === currentMessageSlide) dot.classList.add('active');
        dot.onclick = () => {
            currentMessageSlide = i;
            updateMessageCarousel();
        };
        dotsContainer.appendChild(dot);
    }
}

// Photo Display Function
function displayPhoto(input, photoNum) {
    if (input.files && input.files[0]) {
        const reader = new FileReader();

        reader.onload = function(e) {
            const photoDisplay = document.getElementById(`photo${photoNum}`);
            
            // Remove existing image if any
            const existingImg = photoDisplay.querySelector('img');
            if (existingImg) {
                existingImg.remove();
            }
            
            // Create new image
            const img = document.createElement('img');
            img.src = e.target.result;
            photoDisplay.innerHTML = '';
            photoDisplay.appendChild(img);
        };

        reader.readAsDataURL(input.files[0]);
    }
}

// Candle Blow Animation
function blowCandles() {
    const candles = document.querySelectorAll('.candle');
    
    // Add "blown" class to candles
    candles.forEach((candle, index) => {
        setTimeout(() => {
            candle.classList.add('blown');
        }, index * 100);
    });

    // Create confetti
    createConfetti();

    // Show message
    setTimeout(() => {
        alert('🎉 Your wish has been made! ✨\n\nMay it come true! 💕');
    }, 500);
}

// Confetti Animation
function createConfetti() {
    const container = document.getElementById('confetti-container');
    const colors = ['#FF69B4', '#FFB6D9', '#FFC0E0', '#FF1493', '#FFD700', '#FF6B9D'];

    for (let i = 0; i < 60; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.animationDelay = Math.random() * 0.5 + 's';
        confetti.style.animationDuration = (Math.random() * 1 + 2) + 's';
        confetti.style.width = (Math.random() * 8 + 5) + 'px';
        confetti.style.height = confetti.style.width;

        container.appendChild(confetti);

        // Remove confetti after animation
        setTimeout(() => {
            confetti.remove();
        }, 3000);
    }
}

// Background Image Upload
function setBgImage(input) {
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        
        reader.onload = function(e) {
            const finalWishes = document.querySelector('.final-wishes');
            finalWishes.style.backgroundImage = `url('${e.target.result}')`;
        };
        
        reader.readAsDataURL(input.files[0]);
    }
}

// Make photo boxes clickable
document.addEventListener('DOMContentLoaded', function() {
    showPage(1);
    
    // Add click handlers to photo boxes
    for (let i = 1; i <= 3; i++) {
        const photoDisplay = document.getElementById(`photo${i}`);
        const photoInput = document.getElementById(`photoInput${i}`);
        
        if (photoDisplay && photoInput) {
            photoDisplay.addEventListener('click', () => {
                photoInput.click();
            });
        }
    }
    
    // Background upload
    const bgInput = document.getElementById('bgInput');
    const bgUpload = document.querySelector('.background-upload');
    
    if (bgUpload && bgInput) {
        bgUpload.addEventListener('click', () => {
            bgInput.click();
        });
    }
});
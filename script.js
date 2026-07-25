let currentPage = 1;
const totalPages = 5;

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
}

function displayPhoto(input, photoNum) {
    if (input.files && input.files[0]) {
        const reader = new FileReader();

        reader.onload = function(e) {
            const placeholder = input.parentElement;
            let img = placeholder.querySelector('img');

            if (!img) {
                img = document.createElement('img');
                placeholder.appendChild(img);
            }

            img.src = e.target.result;
        };

        reader.readAsDataURL(input.files[0]);
    }
}

function blowCandles() {
    const candles = document.querySelectorAll('.candle');
    
    // Add "blown" class to candles
    candles.forEach(candle => {
        candle.classList.add('blown');
    });

    // Create confetti
    createConfetti();

    // Optional: Show a message
    setTimeout(() => {
        alert('🎉 Your wish has been made! ✨\n\nMay it come true! 💕');
    }, 500);
}

function createConfetti() {
    const container = document.getElementById('confetti-container');
    const colors = ['#FF6B6B', '#FFD93D', '#6BCB77', '#4D96FF', '#FF6B9D', '#C06C84'];

    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.animationDelay = Math.random() * 0.5 + 's';
        confetti.style.animationDuration = (Math.random() * 1 + 2) + 's';

        container.appendChild(confetti);

        // Remove confetti after animation
        setTimeout(() => {
            confetti.remove();
        }, 3000);
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    showPage(1);
});
// --- 1. Animation Logic ---
function openInvitation() {
    const welcomeScreen = document.getElementById('welcome-screen');
    const mainInvite = document.getElementById('main-invite');

    // Fade out welcome screen
    welcomeScreen.style.opacity = '0';
    welcomeScreen.style.transform = 'translateY(-100%)';

    setTimeout(() => {
        welcomeScreen.style.display = 'none';

        // Show main invite
        mainInvite.style.display = 'block';
        // Small delay to allow display:block to apply before changing opacity for transition
        setTimeout(() => {
            mainInvite.style.opacity = '1';
            mainInvite.style.transform = 'translateY(0)';
            triggerConfetti();
            createPetals();
            // Auto-start music when invitation opens
            startMusic();
        }, 50);
    }, 800);
}

// --- 2. Confetti Effect ---
function triggerConfetti() {
    var duration = 3 * 1000;
    var animationEnd = Date.now() + duration;
    var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    var random = function(min, max) { return Math.random() * (max - min) + min; };

    var interval = setInterval(function() {
        var timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
            return clearInterval(interval);
        }

        var particleCount = 50 * (timeLeft / duration);
        // since particles fall down, start a bit higher than random
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: random(0.1, 0.3), y: Math.random() - 0.2 } }));
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: random(0.7, 0.9), y: Math.random() - 0.2 } }));
    }, 250);
}

// --- 3. Falling Petals ---
function createPetals() {
    const colors = ['#ffd1dc', '#ffb7b2', '#ff9eaa'];
    setInterval(() => {
        const petal = document.createElement('div');
        petal.classList.add('petal');
        petal.style.left = Math.random() * 100 + 'vw';
        petal.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        petal.style.animationDuration = Math.random() * 3 + 2 + 's';
        document.body.appendChild(petal);

        // Remove petal after animation to keep memory clean
        setTimeout(() => {
            petal.remove();
        }, 5000);
    }, 300);
}

// --- 4. Countdown Timer Logic ---
// SET YOUR EVENT DATE HERE: Year, Month (0-11), Day
const eventDate = new Date('2024-10-25T10:30:00').getTime();

const timer = setInterval(function() {
    const now = new Date().getTime();
    const distance = eventDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("days").innerHTML = days < 10 ? "0"+days : days;
    document.getElementById("hours").innerHTML = hours < 10 ? "0"+hours : hours;
    document.getElementById("minutes").innerHTML = minutes < 10 ? "0"+minutes : minutes;
    document.getElementById("seconds").innerHTML = seconds < 10 ? "0"+seconds : seconds;

    if (distance < 0) {
        clearInterval(timer);
        document.getElementById("countdown").innerHTML = "The Celebration Has Begun!";
    }
}, 1000);

// --- 5. Music Toggle ---
let isPlaying = false;
const bgMusic = document.getElementById('bgMusic');
const musicIcon = document.getElementById('musicIcon');

function startMusic() {
    bgMusic.play().then(() => {
        musicIcon.className = 'fas fa-volume-up';
        isPlaying = true;
    }).catch(err => {
        // Some browsers block autoplay - user will need to click music button
        console.log('Autoplay prevented:', err);
    });
}

function toggleMusic() {
    if (isPlaying) {
        bgMusic.pause();
        musicIcon.className = 'fas fa-music';
        isPlaying = false;
    } else {
        bgMusic.play();
        musicIcon.className = 'fas fa-volume-up';
        isPlaying = true;
    }
}

// --- 6. Scroll Animation Observer ---
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all fade-in elements after invitation opens
function initScrollAnimations() {
    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });
}

// Call this after invitation opens
setTimeout(() => {
    initScrollAnimations();
}, 1500);

let currentLanguage = localStorage.getItem('selectedLanguage') || 'gu';

function switchLanguage(lang) {
    currentLanguage = lang;
    localStorage.setItem('selectedLanguage', lang);
    
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-lang="${lang}"]`).classList.add('active');
    
    translatePage(lang);
}

// ============ Mobile Menu Toggle ============
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navMenu = document.querySelector('.nav-menu');

mobileMenuBtn.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// ============ Service Card Expansion ============
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('click', () => {
        const detail = card.querySelector('.service-detail');
        const isExpanded = card.classList.contains('expanded');
        
        document.querySelectorAll('.service-card').forEach(otherCard => {
            otherCard.classList.remove('expanded');
            otherCard.querySelector('.service-detail').classList.remove('show');
        });
        
        if (!isExpanded) {
            card.classList.add('expanded');
            detail.classList.add('show');
        }
    });
});

document.addEventListener('click', (e) => {
    if (!e.target.closest('.service-card')) {
        document.querySelectorAll('.service-card').forEach(card => {
            card.classList.remove('expanded');
            card.querySelector('.service-detail').classList.remove('show');
        });
    }
});

// ============ Contact Form ============
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const service = document.getElementById('service').value;
    const message = document.getElementById('message').value;
    
    if (!name || !email || !phone || !service || !message) {
        showMessage(TRANSLATIONS[currentLanguage]['form_error'], 'error');
        return;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showMessage(TRANSLATIONS[currentLanguage]['email_error'], 'error');
        return;
    }
    
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phone.replace(/[\s-]/g, ''))) {
        showMessage(TRANSLATIONS[currentLanguage]['phone_error'], 'error');
        return;
    }
    
    showMessage(TRANSLATIONS[currentLanguage]['contact_sent'], 'success');
    contactForm.reset();
    
    setTimeout(() => {
        formMessage.textContent = '';
        formMessage.className = '';
    }, 5000);
});

function showMessage(message, type) {
    formMessage.textContent = message;
    formMessage.className = type;
}

// ============ Smooth Scrolling ============
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ============ Optimized Parallax Effect ============
let ticking = false;

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            const scrolled = window.pageYOffset;
            
            document.querySelectorAll('.parallax').forEach(element => {
                const speed = parseFloat(element.getAttribute('data-speed')) || 0.5;
                const yPos = scrolled * speed;
                element.style.backgroundPosition = `0 ${yPos}px`;
            });
            
            // Navbar shadow on scroll
            const navbar = document.querySelector('.navbar');
            if (window.scrollY > 50) {
                navbar.style.boxShadow = 'var(--neon-glow)';
            } else {
                navbar.style.boxShadow = 'none';
            }
            
            ticking = false;
        });
        
        ticking = true;
    }
}, { passive: true });

// ============ Intersection Observer for Animations ============
const observerOptions = {
    threshold: 0.05,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            if (entry.target.classList.contains('stagger-animation')) {
                entry.target.style.animation = 'staggerIn 0.8s ease-out forwards';
            } else if (entry.target.classList.contains('zoom-in')) {
                entry.target.style.animation = 'zoomIn 0.8s ease-out forwards';
            } else if (entry.target.classList.contains('flip-in')) {
                entry.target.style.animation = `flipIn 0.8s ease-out forwards`;
            } else if (entry.target.classList.contains('slide-in-left')) {
                entry.target.style.animation = 'slideInLeft 1s ease-out forwards';
            } else if (entry.target.classList.contains('slide-in-right')) {
                entry.target.style.animation = 'slideInRight 1s ease-out forwards';
            } else {
                entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
            }
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.service-card, .testimonial-card, .step, .info-item, .about-content, .about-image').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
});

// ============ Mobile Touch Optimization ============
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
}, { passive: true });

document.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
}, { passive: true });

function handleSwipe() {
    const threshold = 100;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > threshold) {
        if (diff > 0) {
            // Swiped left
            console.log('Swiped left');
        } else {
            // Swiped right
            console.log('Swiped right');
        }
    }
}

// ============ Disable hover effects on mobile ============
function isMobile() {
    return window.innerWidth <= 768;
}

if (isMobile()) {
    document.querySelectorAll('.service-card, .testimonial-card, .info-item').forEach(el => {
        el.style.pointerEvents = 'auto';
    });
}

window.addEventListener('resize', () => {
    if (!isMobile()) {
        document.querySelectorAll('.service-card, .testimonial-card, .info-item').forEach(el => {
            el.style.pointerEvents = 'auto';
        });
    }
});

// ============ Initialize ============
document.addEventListener('DOMContentLoaded', () => {
    translatePage(currentLanguage);
    document.querySelector(`[data-lang="${currentLanguage}"]`).classList.add('active');
    
    // Optimize for mobile
    if (isMobile()) {
        document.documentElement.style.fontSize = '16px';
    }
});

// ============ Prevent layout shift ============
document.addEventListener('touchmove', (e) => {
    if (e.touches.length > 1) {
        e.preventDefault();
    }
}, { passive: false });

console.log('✨ Welcome to Yaxita Barot - Numerology & Life Guidance Website');
console.log('Language:', currentLanguage);

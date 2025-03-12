// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navLinksItems = document.querySelectorAll('.nav-links li');

// Only add event listeners if elements exist
if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
        // Toggle navigation
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');

        // Animate links
        navLinksItems.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navLinks.contains(e.target) && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
}

// Smooth scroll with enhanced easing
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });

            // Close mobile menu after clicking a link
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
            }
        }
    });
});

// Active Navigation Link on Scroll
const sections = document.querySelectorAll('section[id]');

function activeNavOnScroll() {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight && navLink) {
            document.querySelectorAll('.nav-links a').forEach(link => link.classList.remove('active'));
            navLink.classList.add('active');
        }
    });
}

window.addEventListener('scroll', activeNavOnScroll);

// Enhanced Notification System
function showNotification(message, type) {
    // Remove any existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => {
        notification.remove();
    });

    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    
    const icon = document.createElement('i');
    icon.className = type === 'success' ? 'fas fa-check-circle' : 'fas fa-exclamation-circle';
    
    const text = document.createElement('span');
    text.textContent = message;

    notification.appendChild(icon);
    notification.appendChild(text);
    document.body.appendChild(notification);

    // Trigger animation
    requestAnimationFrame(() => {
        notification.classList.add('show');
    });

    // Remove notification after delay
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Update notification styles
const style = document.createElement('style');
style.textContent = `
    @keyframes navLinkFade {
        from {
            opacity: 0;
            transform: translateY(10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    .notification {
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 12px 20px;
        border-radius: 8px;
        color: var(--text-primary);
        font-weight: 500;
        transform: translateX(150%);
        transition: transform 0.3s ease;
        z-index: 1001;
        display: flex;
        align-items: center;
        gap: 8px;
        background: var(--card-bg);
        border: 1px solid var(--glass-border);
        box-shadow: 0 4px 12px rgba(14, 165, 233, 0.2);
    }

    .notification i {
        font-size: 1.1rem;
        color: var(--accent-color);
    }

    .notification.show {
        transform: translateX(0);
    }

    .notification.success {
        border-color: var(--success-color);
        background: rgba(16, 185, 129, 0.1);
    }

    .notification.success i {
        color: var(--success-color);
    }

    .notification.error {
        border-color: var(--error-color);
        background: rgba(239, 68, 68, 0.1);
    }

    .notification.error i {
        color: var(--error-color);
    }
`;
document.head.appendChild(style);

// Enhanced tagline animation
const taglines = document.querySelectorAll('.dynamic-taglines .tag');
let currentTagline = 0;

if (taglines.length > 0) {
    function rotateTaglines() {
        const current = taglines[currentTagline];
        const next = taglines[(currentTagline + 1) % taglines.length];
        
        if (current && next) {
            current.style.transform = 'translateY(-10px)';
            current.style.opacity = '0';
            
            setTimeout(() => {
                current.classList.remove('active');
                next.classList.add('active');
                next.style.transform = 'translateY(0)';
                next.style.opacity = '1';
                currentTagline = (currentTagline + 1) % taglines.length;
            }, 300);
        }
    }

    setInterval(rotateTaglines, 3000);
}

// Update parallax effect to be more subtle
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const pattern = document.querySelector('.tech-pattern');
    
    if (pattern && hero) {
        pattern.style.transform = `translateY(${scrolled * 0.2}px)`;
        hero.style.backgroundPosition = `center ${scrolled * 0.3}px`;
    }
});

document.addEventListener('DOMContentLoaded', () => {
    // Handle mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }

    // Handle dynamic taglines
    const taglines = document.querySelectorAll('.dynamic-taglines .tag');
    let currentTagline = 0;

    if (taglines.length > 0) {
        setInterval(() => {
            taglines[currentTagline].classList.remove('active');
            currentTagline = (currentTagline + 1) % taglines.length;
            taglines[currentTagline].classList.add('active');
        }, 3000);
    }
});
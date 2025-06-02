// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId && targetId !== '#') {
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        }
    });
});

// Form submission handling
const contactForm = document.getElementById('contact-form');
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    // Here you would typically send the form data to a backend server
    alert('Thank you for your message! I will get back to you soon.');
    contactForm.reset();
});

// Handle social links
const socialLinks = document.querySelectorAll('.social-icon');
console.log('Found social links:', socialLinks.length);

socialLinks.forEach(link => {
    console.log('Social link:', link.href);
    link.addEventListener('click', function(e) {
        console.log('Clicked:', this.href);
        // Check if Font Awesome is loaded by looking for any .fab element
        const isFontAwesomeLoaded = document.querySelector('.fab') !== null;
        console.log('Font Awesome loaded:', isFontAwesomeLoaded);
        console.log('Event prevented:', e.defaultPrevented);
        
        // Prevent default behavior and open in new tab
        e.preventDefault();
        window.open(this.href, '_blank');
        return false;
    });
});

// Force focus on links
document.addEventListener('DOMContentLoaded', () => {
    const links = document.querySelectorAll('a');
    links.forEach(link => {
        link.style.cursor = 'pointer';
        link.style.userSelect = 'none';
    });
});

// Add scroll animation to sections
const sections = document.querySelectorAll('section');
const observerOptions = {
    threshold: 0.2
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

sections.forEach(section => {
    observer.observe(section);
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if (window.scrollY > 50) {
        nav.style.background = 'rgba(255, 255, 255, 0.95)';
        nav.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        nav.style.background = 'rgba(255, 255, 255, 0.95)';
        nav.style.boxShadow = 'none';
    }
});

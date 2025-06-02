// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
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

// Debug social links
const socialLinks = document.querySelectorAll('.social-icon');
console.log('Found social links:', socialLinks.length);

socialLinks.forEach(link => {
    console.log('Social link:', link.href);
    link.addEventListener('click', function(e) {
        console.log('Clicked:', this.href);
        console.log('Font Awesome loaded:', document.querySelector('.fab') !== null);
        console.log('Event prevented:', e.defaultPrevented);
        return true; // Ensure the link works
    });
});

// Check if Font Awesome is loaded
console.log('Font Awesome loaded:', document.querySelector('.fab') !== null);

// Check if icons are visible
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded');
    const icons = document.querySelectorAll('.fab');
    console.log('Font Awesome icons found:', icons.length);
    icons.forEach(icon => {
        console.log('Icon:', icon);
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

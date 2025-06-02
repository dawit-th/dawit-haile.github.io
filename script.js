// Smooth scrolling// Form submission handling
const contactForm = document.getElementById('contact-form');
const successMessage = document.createElement('div');
successMessage.className = 'success-message';
successMessage.style.display = 'none';
successMessage.style.color = 'var(--primary-color)';
successMessage.style.textAlign = 'center';
successMessage.style.marginTop = '1rem';
contactForm.parentNode.insertBefore(successMessage, contactForm.nextSibling);

contactForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    // Show loading state
    const submitButton = this.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;

    // Submit the form
    const formData = new FormData(this);
    const response = await fetch(this.action, {
        method: 'POST',
        body: formData
    });

    const data = await response.json();

    if (response.ok) {
        successMessage.textContent = 'Thank you for your message! I will get back to you soon.';
        successMessage.style.display = 'block';
        this.reset();
    } else {
        successMessage.textContent = 'Failed to send message. Please try again.';
        successMessage.style.display = 'block';
        successMessage.style.color = 'red';
    }

    // Reset loading state
    setTimeout(() => {
        submitButton.textContent = originalText;
        submitButton.disabled = false;
        successMessage.style.display = 'none';
    }, 3000);
});

// Smooth scrolling for navigation links
const navLinks = document.querySelectorAll('nav a[href^="#"]');
navLinks.forEach(anchor => {
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

// Handle social links
// Remove event listeners and let the browser handle the links normally
document.addEventListener('DOMContentLoaded', () => {
    const socialLinks = document.querySelectorAll('.social-icon');
    socialLinks.forEach(link => {
        // Remove any existing click handlers
        link.onclick = null;
        // Add pointer cursor
        link.style.cursor = 'pointer';
        // Add user-select prevention
        link.style.userSelect = 'none';
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

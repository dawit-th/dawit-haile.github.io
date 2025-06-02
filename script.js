// Smooth scrolling// Form submission handling
const contactForm = document.getElementById('contact-form');
const successMessage = document.createElement('div');
successMessage.className = 'success-message';
successMessage.style.display = 'none';
successMessage.style.color = 'var(--primary-color)';
successMessage.style.textAlign = 'center';
successMessage.style.marginTop = '1rem';
successMessage.style.padding = '1rem';
successMessage.style.borderRadius = '0.5rem';
successMessage.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
successMessage.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
contactForm.parentNode.insertBefore(successMessage, contactForm.nextSibling);

// Add validation
const validateForm = () => {
    const name = contactForm.querySelector('input[name="name"]').value.trim();
    const email = contactForm.querySelector('input[name="email"]').value.trim();
    const message = contactForm.querySelector('textarea[name="message"]').value.trim();

    if (!name) {
        successMessage.textContent = 'Please enter your name.';
        successMessage.style.display = 'block';
        successMessage.style.color = 'red';
        return false;
    }

    if (!email || !email.includes('@')) {
        successMessage.textContent = 'Please enter a valid email address.';
        successMessage.style.display = 'block';
        successMessage.style.color = 'red';
        return false;
    }

    if (!message || message.length < 10) {
        successMessage.textContent = 'Please enter a message (at least 10 characters).';
        successMessage.style.display = 'block';
        successMessage.style.color = 'red';
        return false;
    }

    return true;
};

contactForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    // Validate form
    if (!validateForm()) return;

    // Show loading state
    const submitButton = this.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;

    try {
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
            const error = data.error || 'Failed to send message. Please try again.';
            successMessage.textContent = error;
            successMessage.style.display = 'block';
            successMessage.style.color = 'red';
        }
    } catch (error) {
        successMessage.textContent = 'An error occurred. Please try again.';
        successMessage.style.display = 'block';
        successMessage.style.color = 'red';
        console.error('Form submission error:', error);
    }

    // Reset loading state
    setTimeout(() => {
        submitButton.textContent = originalText;
        submitButton.disabled = false;
        if (successMessage.style.color !== 'var(--primary-color)') {
            successMessage.style.display = 'none';
        }
    }, 3000);
});

// Add real-time validation
contactForm.addEventListener('input', function(e) {
    const target = e.target;
    const error = document.querySelector('.error');
    if (error) error.remove();

    if (target.name === 'email') {
        const email = target.value.trim();
        if (email && !email.includes('@')) {
            const error = document.createElement('div');
            error.className = 'error';
            error.style.color = 'red';
            error.style.fontSize = '0.9rem';
            error.textContent = 'Please enter a valid email address.';
            target.parentNode.insertBefore(error, target.nextSibling);
        }
    }
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

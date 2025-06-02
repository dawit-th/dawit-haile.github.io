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
successMessage.style.transition = 'opacity 0.3s ease';
contactForm.parentNode.insertBefore(successMessage, contactForm.nextSibling);

// Cache form elements
const nameInput = contactForm.querySelector('input[name="name"]');
const emailInput = contactForm.querySelector('input[name="email"]');
const messageInput = contactForm.querySelector('textarea[name="message"]');
const submitButton = contactForm.querySelector('button[type="submit"]');

// Add validation
const validateForm = () => {
    let isValid = true;
    
    // Clear previous errors
    successMessage.style.display = 'none';
    
    // Validate name
    if (!nameInput.value.trim()) {
        displayError('Please enter your name.');
        isValid = false;
    }

    // Validate email
    const email = emailInput.value.trim();
    if (!email || !email.includes('@')) {
        displayError('Please enter a valid email address.');
        isValid = false;
    }

    // Validate message
    const message = messageInput.value.trim();
    if (!message || message.length < 10) {
        displayError('Please enter a message (at least 10 characters).');
        isValid = false;
    }

    return isValid;
};

// Helper function to display errors
const displayError = (message) => {
    successMessage.textContent = message;
    successMessage.style.display = 'block';
    successMessage.style.color = 'red';
    successMessage.style.opacity = 1;
};

// Helper function to hide message
const hideMessage = () => {
    successMessage.style.opacity = '0';
    setTimeout(() => {
        successMessage.style.display = 'none';
    }, 300);
};

contactForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    // Validate form
    if (!validateForm()) return;

    // Show loading state
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;

    try {
        // Submit the form
        const formData = new FormData(this);
        const response = await fetch(this.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });

        const data = await response.json();

        if (response.ok) {
            successMessage.textContent = 'Thank you for your message! I will get back to you soon.';
            successMessage.style.display = 'block';
            successMessage.style.color = 'var(--primary-color)';
            this.reset();
            hideMessage();
        } else {
            const error = data.error || 'Failed to send message. Please try again.';
            displayError(error);
        }
    } catch (error) {
        displayError('An error occurred. Please try again.');
        console.error('Form submission error:', error);
    }

    // Reset loading state
    submitButton.textContent = originalText;
    submitButton.disabled = false;
});

// Add real-time validation
emailInput.addEventListener('input', function() {
    const email = this.value.trim();
    if (email && !email.includes('@')) {
        displayError('Please enter a valid email address.');
    } else {
        hideMessage();
    }
});

// Smooth scrolling for navigation links
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

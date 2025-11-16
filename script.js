// Message counter system
let messageCount = 0;

// Initialize counter from localStorage
function initializeCounter() {
    try {
        const savedCount = localStorage.getItem('applicationCount');
        messageCount = savedCount ? parseInt(savedCount) : 0;
        if (isNaN(messageCount)) {
            messageCount = 0;
        }
        updateCounterDisplay();
    } catch (e) {
        messageCount = 0;
        console.log('Counter: Using fallback');
    }
}

// Update counter display
function updateCounterDisplay() {
    const counterElement = document.getElementById('applicationCounter');
    if (counterElement) {
        counterElement.textContent = messageCount;
    }
}

// Increment counter
function incrementCounter() {
    messageCount++;
    try {
        localStorage.setItem('applicationCount', messageCount.toString());
    } catch (e) {
        console.log('Counter: Could not save to localStorage');
    }
    updateCounterDisplay();
}

// DOM Ready function
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    initializeCounter();
});

function initializeApp() {
    // Initialize mobile menu
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('nav a[data-section]');
    const closeModalBtn = document.getElementById('close-modal');
    const phoneModal = document.getElementById('phoneModal');

    // Mobile menu functionality
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    }

    // Navigation link handling
    navLinks.forEach(link => {
        link.addEventListener('click', handleNavClick);
    });

    // Modal functionality
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeModal);
    }

    // Close modal when clicking outside
    if (phoneModal) {
        phoneModal.addEventListener('click', function(e) {
            if (e.target === this) {
                closeModal();
            }
        });
    }

    // Close mobile menu when clicking on links
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            closeMobileMenu();
        });
    });

    // Set home navigation as active by default
    setActiveNav('home');
    
    // Initialize animations
    initializeAnimations();
    
    // Initialize form focus states
    initializeFormFocus();
    
    console.log('Extra Classes website initialized successfully!');
}

function initializeAnimations() {
    // Add intersection observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.feature-card, .subject-card, .media-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

function initializeFormFocus() {
    // Enhanced form experience
    document.querySelectorAll('input, select, textarea').forEach(field => {
        field.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        field.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.classList.remove('focused');
            }
        });
        
        // Initialize focused state for pre-filled fields
        if (field.value) {
            field.parentElement.classList.add('focused');
        }
    });
}

// Phone input validation
function validatePhoneInput(input) {
    // Remove any non-digit characters
    input.value = input.value.replace(/\D/g, '');
    
    // Limit to 10 digits
    if (input.value.length > 10) {
        input.value = input.value.slice(0, 10);
    }
}

// Mobile menu functionality
function toggleMobileMenu() {
    const navMenu = document.getElementById('nav-menu');
    const body = document.body;
    
    navMenu.classList.toggle('show');
    body.classList.toggle('menu-open');
}

function closeMobileMenu() {
    const navMenu = document.getElementById('nav-menu');
    const body = document.body;
    
    navMenu.classList.remove('show');
    body.classList.remove('menu-open');
}

// Navigation handling
function handleNavClick(event) {
    event.preventDefault();
    const sectionId = this.getAttribute('data-section');
    showSection(sectionId);
}

// Page navigation functionality
function showSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('.page').forEach(section => {
        section.classList.remove('active');
    });
    
    // Show the selected section
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
        
        // Scroll to top of the section with offset for fixed header
        setTimeout(() => {
            const offset = 80;
            const elementPosition = targetSection.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }, 100);
    }
    
    // Close mobile menu
    closeMobileMenu();
    
    // Update active navigation
    setActiveNav(sectionId);
}

function setActiveNav(sectionId) {
    // Remove active class from all nav items
    document.querySelectorAll('nav li').forEach(item => {
        item.classList.remove('active');
    });
    
    // Add active class to clicked nav item
    const activeNavItem = document.querySelector(`nav a[data-section="${sectionId}"]`);
    if (activeNavItem && activeNavItem.parentElement) {
        activeNavItem.parentElement.classList.add('active');
    }
}

// Form validation
function validateForm() {
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const grade = document.getElementById('grade').value;
    const subject = document.getElementById('subject').value;
    const classType = document.getElementById('classType').value;

    if (!name) {
        showNotification('Please enter your full name', 'error');
        document.getElementById('name').focus();
        return false;
    }
    
    if (!email) {
        showNotification('Please enter your email address', 'error');
        document.getElementById('email').focus();
        return false;
    }
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showNotification('Please enter a valid email address', 'error');
        document.getElementById('email').focus();
        return false;
    }
    
    if (!phone) {
        showNotification('Please enter your phone number', 'error');
        document.getElementById('phone').focus();
        return false;
    }
    
    // Phone validation
    const phoneDigits = phone.replace(/\D/g, '');
    if (phoneDigits.length !== 10) {
        showNotification('Please enter exactly 10 digits for phone number', 'error');
        document.getElementById('phone').focus();
        return false;
    }
    
    if (!grade) {
        showNotification('Please select your grade level', 'error');
        document.getElementById('grade').focus();
        return false;
    }
    
    if (!subject) {
        showNotification('Please select your subject', 'error');
        document.getElementById('subject').focus();
        return false;
    }
    
    if (!classType) {
        showNotification('Please select the type of extra class', 'error');
        document.getElementById('classType').focus();
        return false;
    }
    
    return true;
}

// WhatsApp submission
function submitViaWhatsApp() {
    if (!validateForm()) return;
    incrementCounter();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const grade = document.getElementById('grade').value;
    const subject = document.getElementById('subject').value;
    const classType = document.getElementById('classType').value;
    const message = document.getElementById('message').value.trim();
    
    const whatsappMessage = `Dear Mr. Mgaga,%0A%0AI would like to apply for extra classes and would appreciate your consideration.%0A%0A*STUDENT APPLICATION DETAILS*%0A%0A*Full Name:* ${name}%0A*Email Address:* ${email}%0A*Phone Number:* ${phone}%0A*Grade Level:* ${grade}%0A*Subject Required:* ${subject}%0A*Preferred Class Type:* ${classType}%0A*Additional Information:* ${message || 'No additional information provided'}%0A%0AThank you for considering my application. I look forward to your response.%0A%0AKind regards,%0A${name}`;
    
    const whatsappURL = `https://wa.me/27696429712?text=${whatsappMessage}`;
    
    showNotification('Opening WhatsApp... Your application will be sent when you press send.', 'success');
    
    clearForm();
    
    setTimeout(() => {
        if (window.innerWidth <= 768) {
            window.location.href = whatsappURL;
        } else {
            window.open(whatsappURL, '_blank');
        }
    }, 1500);
}

// Email submission
function submitViaEmail() {
    if (!validateForm()) return;
    incrementCounter();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const grade = document.getElementById('grade').value;
    const subject = document.getElementById('subject').value;
    const classType = document.getElementById('classType').value;
    const additionalMessage = document.getElementById('message').value.trim();
    
    const subjectLine = `Student Application - ${name} - ${subject} - ${grade}`;
    
    const body = `Dear Mr. Mgaga,

I am writing to apply for extra classes and would appreciate your consideration.

Please find my application details below:

STUDENT APPLICATION DETAILS
─────────────────────────────

Full Name: ${name}
Email Address: ${email}
Phone Number: ${phone}
Grade Level: ${grade}
Subject Required: ${subject}
Preferred Class Type: ${classType}
Additional Information: ${additionalMessage || 'No additional information provided'}

Thank you for considering my application. I am available to discuss my learning needs and look forward to your response.

Yours sincerely,
${name}`;
    
    showNotification('Opening your email app... Your application is ready to send.', 'success');
    
    clearForm();
    
    setTimeout(() => {
        const mailtoURL = `mailto:mgagak722@gmail.com?subject=${encodeURIComponent(subjectLine)}&body=${encodeURIComponent(body)}`;
        window.location.href = mailtoURL;
    }, 1500);
}

// Phone submission
function submitViaPhone() {
    if (!validateForm()) return;
    incrementCounter();
    
    showNotification('Opening phone dialer... Please call us to discuss your application.', 'success');
    
    clearForm();
    
    setTimeout(() => {
        document.getElementById('phoneModal').style.display = 'block';
    }, 1000);
}

// Quick contact functions
function openWhatsApp() {
    const whatsappURL = `https://wa.me/27696429712`;
    if (window.innerWidth <= 768) {
        window.location.href = whatsappURL;
    } else {
        window.open(whatsappURL, '_blank');
    }
}

function openEmail() {
    const mailtoURL = `mailto:mgagak722@gmail.com?subject=Inquiry about Extra Classes`;
    window.location.href = mailtoURL;
}

// Modal functions
function closeModal() {
    document.getElementById('phoneModal').style.display = 'none';
}

// Function to clear form inputs
function clearForm() {
    const form = document.getElementById('studentForm');
    if (form) {
        form.reset();
        // Clear focused states
        document.querySelectorAll('.form-group').forEach(group => {
            group.classList.remove('focused');
        });
    }
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">${type === 'success' ? '✓' : type === 'error' ? '⚠' : 'ℹ'}</span>
            <span class="notification-message">${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">×</button>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

// Close mobile menu when clicking outside
document.addEventListener('click', function(event) {
    const nav = document.querySelector('nav');
    const navMenu = document.getElementById('nav-menu');
    const mobileBtn = document.getElementById('mobile-menu-btn');
    
    if (!nav.contains(event.target) && navMenu.classList.contains('show')) {
        closeMobileMenu();
    }
});

// Add loading state to buttons
document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', function() {
        if (this.classList.contains('contact-option-btn') || this.classList.contains('cta-button')) {
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        }
    });
});

// Debug function to check if everything is working
window.addEventListener('load', function() {
    console.log('Page loaded - checking critical elements:');
    
    const criticalElements = [
        'mobile-menu-btn', 'nav-menu', 'studentForm', 
        'applicationCounter', 'phoneModal'
    ];
    
    criticalElements.forEach(id => {
        const element = document.getElementById(id);
        console.log(`${id}:`, element ? '✓ Found' : '✗ Missing');
    });
});
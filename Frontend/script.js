// Page navigation functionality
function showSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('.page').forEach(section => {
        section.classList.remove('active');
    });
    
    // Show the selected section
    document.getElementById(sectionId).classList.add('active');
    
    // Close mobile menu if open
    document.getElementById('nav-menu').classList.remove('show');
    
    // Scroll to top of page
    window.scrollTo(0, 0);
}

// Mobile menu functionality
function toggleMobileMenu() {
    const navMenu = document.getElementById('nav-menu');
    navMenu.classList.toggle('show');
}

// Close mobile menu when clicking outside
document.addEventListener('click', function(event) {
    const nav = document.querySelector('nav');
    const navMenu = document.getElementById('nav-menu');
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    
    if (!nav.contains(event.target) && navMenu.classList.contains('show')) {
        navMenu.classList.remove('show');
    }
});

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

// Function to clear form inputs
function clearForm() {
    document.getElementById('studentForm').reset();
    showNotification('Form has been cleared successfully', 'success');
}

// WhatsApp submission - UPDATED WITH MR. MGAGA
function submitViaWhatsApp() {
    if (!validateForm()) return;

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const grade = document.getElementById('grade').value;
    const subject = document.getElementById('subject').value;
    const classType = document.getElementById('classType').value;
    const message = document.getElementById('message').value.trim();
    
    const whatsappMessage = `Dear Mr. Mgaga,%0A%0AI would like to apply for extra classes with the following details:%0A%0A*STUDENT APPLICATION DETAILS*%0A%0A*Full Name:* ${name}%0A*Email Address:* ${email}%0A*Phone Number:* ${phone}%0A*Grade Level:* ${grade}%0A*Subject Required:* ${subject}%0A*Preferred Class Type:* ${classType}%0A*Additional Information:* ${message || 'No additional information provided'}%0A%0AThank you for considering my application. I look forward to your response.%0A%0AKind regards,%0A${name}`;
    
    // Updated WhatsApp number
    const whatsappURL = `https://wa.me/27606503136?text=${whatsappMessage}`;
    
    showNotification('Opening WhatsApp... Your formal application will be sent when you press the send button.', 'success');
    
    // Clear the form
    clearForm();
    
    // Open in new tab on desktop, same tab on mobile
    setTimeout(() => {
        if (window.innerWidth <= 768) {
            window.location.href = whatsappURL;
        } else {
            window.open(whatsappURL, '_blank');
        }
    }, 2000);
}

// Email submission - UPDATED WITH MR. MGAGA
function submitViaEmail() {
    if (!validateForm()) return;

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const grade = document.getElementById('grade').value;
    const subject = document.getElementById('subject').value;
    const classType = document.getElementById('classType').value;
    const additionalMessage = document.getElementById('message').value.trim();
    
    const subjectLine = `Student Application - ${name} - ${subject} - ${grade}`;
    const body = `Dear Mr. Mgaga,%0D%0A%0D%0AI am writing to apply for extra classes and would appreciate your consideration.%0D%0A%0D%0APlease find my application details below:%0D%0A%0D%0A*STUDENT APPLICATION DETAILS*%0D%0A%0D%0A*Full Name:* ${name}%0D%0A*Email Address:* ${email}%0D%0A*Phone Number:* ${phone}%0D%0A*Grade Level:* ${grade}%0D%0A*Subject Required:* ${subject}%0D%0A*Preferred Class Type:* ${classType}%0D%0A*Additional Information:* ${additionalMessage || 'No additional information provided'}%0D%0A%0D%0AThank you for considering my application. I am available to discuss my learning needs and look forward to your response.%0D%0A%0D%0AYours sincerely,%0D%0A${name}`;
    
    showNotification('Opening your email app... Your formal application is ready to send.', 'success');
    
    // Clear the form
    clearForm();
    
    setTimeout(() => {
        // Updated email address
        const mailtoURL = `mailto:mgagak722@gmail.com?subject=${encodeURIComponent(subjectLine)}&body=${encodeURIComponent(body)}`;
        window.location.href = mailtoURL;
    }, 2000);
}

// Phone submission - UPDATED NUMBER
function submitViaPhone() {
    if (!validateForm()) return;
    
    showNotification('Opening phone dialer... Please call us to discuss your application formally.', 'success');
    
    // Clear the form
    clearForm();
    
    setTimeout(() => {
        document.getElementById('phoneModal').style.display = 'block';
    }, 1500);
}

// Modal functions
function closeModal() {
    document.getElementById('phoneModal').style.display = 'none';
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('phoneModal');
    if (event.target == modal) {
        modal.style.display = 'none';
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

// Touch-friendly improvements
document.addEventListener('DOMContentLoaded', function() {
    // Add touch feedback to buttons
    const buttons = document.querySelectorAll('button, .teacher-card');
    buttons.forEach(button => {
        button.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.98)';
        });
        
        button.addEventListener('touchend', function() {
            this.style.transform = '';
        });
    });
    
    // Prevent zoom on double-tap for buttons
    document.addEventListener('touchend', function(e) {
        if (e.target.tagName === 'BUTTON' || e.target.closest('button')) {
            e.preventDefault();
        }
    }, { passive: false });
    
    console.log('Extra Classes website loaded successfully!');
});

// Handle orientation changes
window.addEventListener('orientationchange', function() {
    // Close modals on orientation change
    document.getElementById('phoneModal').style.display = 'none';
    
    // Recalculate any layout if needed
    setTimeout(() => {
        window.scrollTo(0, 0);
    }, 100);
});
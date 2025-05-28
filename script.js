// Theme Toggle Functionality
document.addEventListener('DOMContentLoaded', function() {
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    const themeStyle = document.getElementById('theme-style');
    const body = document.body;
    
    // Check for saved theme preference or use light theme as default
    const currentTheme = localStorage.getItem('theme') || 'light';
    
    // Apply the saved theme
    if (currentTheme === 'dark') {
        body.classList.add('dark-theme');
        themeStyle.disabled = true;
        themeToggleBtn.innerHTML = '<i class="fas fa-sun"></i> Light Mode';
    } else {
        themeStyle.disabled = false;
        themeToggleBtn.innerHTML = '<i class="fas fa-moon"></i> Dark Mode';
    }
    
    // Theme toggle button event
    themeToggleBtn.addEventListener('click', function() {
        if (body.classList.contains('dark-theme')) {
            // Switch to light theme
            body.classList.remove('dark-theme');
            themeStyle.disabled = false;
            localStorage.setItem('theme', 'light');
            themeToggleBtn.innerHTML = '<i class="fas fa-moon"></i> Dark Mode';
        } else {
            // Switch to dark theme
            body.classList.add('dark-theme');
            themeStyle.disabled = true;
            localStorage.setItem('theme', 'dark');
            themeToggleBtn.innerHTML = '<i class="fas fa-sun"></i> Light Mode';
        }
    });
    
    // Initialize tooltips
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Form validation for newsletter
    const newsletterForm = document.querySelector('.newsletter form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            const emailInput = this.querySelector('input[type="email"]');
            if (!emailInput.value || !emailInput.checkValidity()) {
                e.preventDefault();
                emailInput.classList.add('is-invalid');
            } else {
                // In a real implementation, you would submit the form here
                alert('Thank you for subscribing to our newsletter!');
                emailInput.value = '';
            }
        });
    }
    
    // Add animation to cards on scroll
    const animateOnScroll = function() {
        const cards = document.querySelectorAll('.card');
        cards.forEach(card => {
            const cardPosition = card.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (cardPosition < screenPosition) {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Set initial state for animation
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'all 0.6s ease';
    });
    
    // Run once on load
    animateOnScroll();
    
    // Run on scroll
    window.addEventListener('scroll', animateOnScroll);
});

// Function to show success popup
function showSuccessPopup(message) {
    const popup = document.createElement('div');
    popup.className = 'alert alert-success position-fixed top-0 start-50 translate-middle-x mt-3';
    popup.style.zIndex = '1100';
    popup.textContent = message;
    
    document.body.appendChild(popup);
    
    setTimeout(() => {
        popup.classList.add('fade');
        setTimeout(() => {
            popup.remove();
        }, 300);
    }, 3000);
}
// Form validation for signup
document.getElementById('signupForm').addEventListener('submit', function(e) {
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    if (password !== confirmPassword) {
        e.preventDefault();
        alert('Passwords do not match!');
        return false;
    }
    
    if (password.length < 8) {
        e.preventDefault();
        alert('Password must be at least 8 characters long!');
        return false;
    }
    
    // If validation passes, show success popup
    showSuccessPopup('Account created successfully! Welcome to Expat Explore!');
});

// Login form handling
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // In a real implementation, you would validate credentials with your backend
    // For this demo, we'll just show a success popup
    showSuccessPopup('Logged in successfully! Redirecting to your dashboard...');
    
    // Redirect after a delay
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 2000);
});

// Forgot password form handling
document.getElementById('forgotForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // In a real implementation, you would send a reset email
    // For this demo, we'll just show a success popup
    showSuccessPopup('Password reset link sent to your email!');
    
    // Redirect after a delay
    setTimeout(() => {
        window.location.href = 'login.html';
    }, 3000);
});

// Feedback form handling
document.getElementById('feedbackForm').addEventListener('submit', function(e) {
    // In a real implementation, you would validate and submit the form
    // For this demo, we'll just show a success popup
    e.preventDefault();
    showSuccessPopup('Thank you for your feedback! We appreciate your time.');
    
    // Reset form after submission
    this.reset();
});

// Function to show success popup
function showSuccessPopup(message) {
    const popup = document.createElement('div');
    popup.className = 'alert alert-success position-fixed top-0 start-50 translate-middle-x mt-3';
    popup.style.zIndex = '1100';
    popup.textContent = message;
    
    document.body.appendChild(popup);
    
    setTimeout(() => {
        popup.classList.add('fade');
        setTimeout(() => {
            popup.remove();
        }, 300);
    }, 3000);
}

// Booking Form Handling
document.getElementById('bookingForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // In a real implementation, you would process the booking here
    // For this demo, we'll show a success popup
    showSuccessPopup('Your booking has been received! We will contact you shortly to confirm.');
    
    // Reset form
    this.reset();
    
    // Redirect after delay
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 3000);
});

// EmailJS initialization (replace with your own user ID)
(function(){
  emailjs.init("gUuwhW7_FFu74VU0"); // <-- Replace with your EmailJS user ID
})();

document.addEventListener('DOMContentLoaded', function() {
  // Feedback form
  const feedbackForm = document.getElementById('feedbackForm');
  if (feedbackForm) {
    feedbackForm.addEventListener('submit', function(e) {
      e.preventDefault();
      emailjs.sendForm('service_sfu1hq8', 'YOUR_FEEDBACK_TEMPLATE_ID', this)
        .then(function() {
          alert('Thank you for your feedback!');
          feedbackForm.reset();
        }, function(error) {
          alert('Sorry, there was an error. Please try again.');
        });
    });
  }

  // Contact form
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      emailjs.sendForm('service_sfu1hq8', 'template_b6ixmgo', this)
        .then(function() {
          alert('Thank you for contacting us!');
          contactForm.reset();
        }, function(error) {
          alert('Sorry, there was an error. Please try again.');
        });
    });
  }

  // Ticket booking form
  const ticketForm = document.getElementById('ticketForm');
  if (ticketForm) {
    ticketForm.addEventListener('submit', function(e) {
      e.preventDefault();
      emailjs.sendForm('service_sfu1hq8', 'template_oydn33h', this)
        .then(function() {
          alert('Your ticket has been booked! A confirmation email has been sent.');
          ticketForm.reset();
        }, function(error) {
          alert('Sorry, there was an error. Please try again.');
        });
    });
  }
});

// Load header and footer components
document.addEventListener('DOMContentLoaded', function() {
    loadComponent('header-placeholder', './components/header.html');
    loadComponent('footer-placeholder', './components/footer.html');
    
    // Initialize other functionality
    initializeFAQ();
    initializeContactForm();
});

// Function to load HTML components
async function loadComponent(elementId, filePath) {
    try {
        const response = await fetch(filePath);
        const html = await response.text();
        const element = document.getElementById(elementId);
        if (element) {
            element.innerHTML = html;
            // Initialize navigation after header is loaded
            if (elementId === 'header-placeholder') {
                initializeNavigation();
                setActiveNavigation();
            }
        }
    } catch (error) {
        console.error('Error loading component:', error);
    }
}

// Initialize navigation functionality after header is loaded
function initializeNavigation() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function() {
            const isHidden = mobileMenu.classList.contains('hidden');
            
            if (isHidden) {
                mobileMenu.classList.remove('hidden');
                mobileMenu.classList.add('mobile-menu-enter');
                setTimeout(() => {
                    mobileMenu.classList.add('mobile-menu-enter-active');
                }, 10);
            } else {
                mobileMenu.classList.remove('mobile-menu-enter-active');
                setTimeout(() => {
                    mobileMenu.classList.remove('mobile-menu-enter');
                    mobileMenu.classList.add('hidden');
                }, 200);
            }
        });
    }
}

// Set active navigation based on current page
function setActiveNavigation() {
    const currentPage = window.location.pathname.split('/').pop().replace('.html', '') || 'index';
    
    // Update desktop navigation
    const desktopNavLinks = document.querySelectorAll('#desktop-nav .nav-link');
    desktopNavLinks.forEach(link => {
        const linkPage = link.getAttribute('data-page');
        if (linkPage === currentPage) {
            link.classList.add('text-primary-green', 'font-medium');
            link.classList.remove('text-gray-600', 'hover:text-primary-green');
        } else {
            link.classList.add('text-gray-600', 'hover:text-primary-green');
            link.classList.remove('text-primary-green', 'font-medium');
        }
    });
    
    // Update mobile navigation
    const mobileNavLinks = document.querySelectorAll('#mobile-nav .nav-link-mobile');
    mobileNavLinks.forEach(link => {
        const linkPage = link.getAttribute('data-page');
        if (linkPage === currentPage) {
            link.classList.add('text-primary-green');
            link.classList.remove('text-gray-600', 'hover:text-primary-green');
        } else {
            link.classList.add('text-gray-600', 'hover:text-primary-green');
            link.classList.remove('text-primary-green');
        }
    });
}

// FAQ Accordion functionality
function initializeFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const button = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        const icon = item.querySelector('.faq-icon');
        
        if (button && answer) {
            button.addEventListener('click', function() {
                const isOpen = !answer.classList.contains('hidden');
                
                // Close all other FAQ items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        const otherAnswer = otherItem.querySelector('.faq-answer');
                        const otherIcon = otherItem.querySelector('.faq-icon');
                        if (otherAnswer && otherIcon) {
                            otherAnswer.classList.add('hidden');
                            otherIcon.style.transform = 'rotate(0deg)';
                        }
                    }
                });
                
                // Toggle current item
                if (isOpen) {
                    answer.classList.add('hidden');
                    if (icon) icon.style.transform = 'rotate(0deg)';
                } else {
                    answer.classList.remove('hidden');
                    if (icon) icon.style.transform = 'rotate(180deg)';
                }
            });
        }
    });
}

// Smooth scrolling for anchor links
document.addEventListener('DOMContentLoaded', function() {
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
});

// Contact form handling (basic validation)
function initializeContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic form validation
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const message = document.getElementById('message');
            
            let isValid = true;
            
            // Reset previous error states
            [name, email, message].forEach(field => {
                if (field) {
                    field.classList.remove('border-red-500');
                }
            });
            
            // Validate name
            if (!name || !name.value.trim()) {
                if (name) name.classList.add('border-red-500');
                isValid = false;
            }
            
            // Validate email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!email || !email.value.trim() || !emailRegex.test(email.value)) {
                if (email) email.classList.add('border-red-500');
                isValid = false;
            }
            
            // Validate message
            if (!message || !message.value.trim()) {
                if (message) message.classList.add('border-red-500');
                isValid = false;
            }
            
            if (isValid) {
                // Show success message
                const successDiv = document.createElement('div');
                successDiv.className = 'bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4';
                successDiv.textContent = 'Thank you for your message. We will get back to you soon.';
                contactForm.insertBefore(successDiv, contactForm.firstChild);
                
                // Reset form
                contactForm.reset();
                
                // Remove success message after 5 seconds
                setTimeout(() => {
                    successDiv.remove();
                }, 5000);
            }
        });
    }
}

// Add scroll effect to navbar
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('nav');
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.classList.add('shadow-lg');
            navbar.classList.remove('shadow-sm');
        } else {
            navbar.classList.remove('shadow-lg');
            navbar.classList.add('shadow-sm');
        }
    }
});

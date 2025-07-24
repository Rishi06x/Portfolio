// Wait for page to load
document.addEventListener('DOMContentLoaded', function() {
    // Get elements
    const header = document.getElementById('header');
    const menuToggle = document.getElementById('menu-toggle');
    const menuClose = document.getElementById('menu-close');
    const mobileNav = document.getElementById('mobile-nav');
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');

    // Header scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    menuToggle.addEventListener('click', function() {
        mobileNav.classList.toggle('active');
        menuToggle.classList.toggle('active');
        menuToggle.style.display = 'none';
        menuClose.style.display = 'flex';
        
    });

    function closeMobileMenu() {
        mobileNav.classList.remove('active');
        menuToggle.classList.remove('active');

        if (window.innerWidth <= 768) { 
            menuToggle.style.display = 'flex';
            menuClose.style.display = 'none';
        } else {
            menuToggle.style.display = '';
            menuClose.style.display = '';
        }
    }

    menuClose.addEventListener('click', closeMobileMenu);

    // Close menu when clicking nav links
    navLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
            const section = e.target.dataset.section;
            
            if (section) {
                // Update active link
                navLinks.forEach(function(navLink) {
                    navLink.classList.remove('active');
                    if (navLink.dataset.section === section) {
                        navLink.classList.add('active');
                    }
                });
                closeMobileMenu();
            }
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!mobileNav.contains(e.target) && !menuToggle.contains(e.target)) {
            closeMobileMenu();
        }
    });

    // Close mobile menu on window resize (for larger screens)
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            closeMobileMenu();
        }
    });

    // Set initial active link to 'home'
    navLinks.forEach(function(link) {
        link.classList.remove('active');
        if (link.dataset.section === 'home') {
            link.classList.add('active');
        }
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
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

function showSection(id, clickedLink){
    const sections = document.querySelectorAll('.section');
    sections.forEach(sec => sec.classList.remove('active'));
    document.getElementById(id).classList.add('active');

    const links = document.querySelectorAll('.edu-links a');
    links.forEach(link => link.classList.remove('active-link'));
    clickedLink.classList.add('active-link')
}


 const contactDetails = document.querySelectorAll('.contact-details');
        
        contactDetails.forEach(detail => {
            const input = detail.querySelector('input, textarea');
            const label = detail.querySelector('label');
            
            // Handle focus event
            input.addEventListener('focus', function() {
                label.classList.add('filled');
            });
            
            // Handle blur event
            input.addEventListener('blur', function() {
                if (input.value.trim() === '') {
                    label.classList.remove('filled');
                }
            });
            
            // Handle input event for real-time updates
            input.addEventListener('input', function() {
                if (input.value.trim() !== '') {
                    label.classList.add('filled');
                } else {
                    label.classList.remove('filled');
                }
            });
            
            // Check if field has value on page load
            if (input.value.trim() !== '') {
                label.classList.add('filled');
            }
        });

        const sendBtn = document.getElementById('send-btn');

    async function sendMessage(e) {
    e.preventDefault();  // Prevent normal form submit (page reload)

    const form = e.target;  // The form element that triggered submit
    const formData = new FormData(form);
    const button = document.getElementById('send-btn');
    const successMessage = document.getElementById('successMessage');
        
    // Simple validation (you can keep yours too)
    const name = formData.get('name').trim();
    const email = formData.get('email').trim();
    const message = formData.get('message').trim();

    if (!name || !email || !message) {
        alert('Please fill in all fields');
        return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address');
        return;
    }

    button.textContent = 'Sending...';
    button.disabled = true;

    try {
        // Replace the URL below with your form handler endpoint (like Formspree)
        const response = await fetch('https://formspree.io/f/mqalprye', {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'  // Expect JSON response
            }
        });

        if (response.ok) {
            successMessage.style.display = 'block';
            form.reset();
        } else {
            alert('Failed to send message. Please try again later.');
        }
    } catch (error) {
        alert('Error sending message: ' + error.message);
    }

    button.textContent = 'Send Message';
    button.disabled = false;

    setTimeout(() => {
        successMessage.style.display = 'none';
    }, 3000);
}

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

    menuClose.addEventListener('click', function closeMobileMenu() {
        mobileNav.classList.remove('active');
        menuToggle.classList.remove('active');
        menuToggle.style.display = 'flex';
        menuClose.style.display = 'none';
    });
    

    // Navigation links click handler
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
                
                // Close mobile menu
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
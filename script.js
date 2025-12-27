// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Preloader Animation
    const preloader = document.querySelector('.preloader');
    const preloaderProgress = document.querySelector('.preloader-progress-bar');
    
    // Simulate loading progress
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 20;
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            setTimeout(() => {
                preloader.classList.add('loaded');
                document.body.classList.remove('loading');
                // Initialize animations after preloader is hidden
                initAnimations();
            }, 500);
        }
        preloaderProgress.style.width = `${progress}%`;
    }, 300);

    // Custom Cursor
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');
    
    // Update cursor position
    document.addEventListener('mousemove', (e) => {
        cursor.style.transform = `translate(calc(${e.clientX}px - 50%), calc(${e.clientY}px - 50%))`;
        cursorFollower.style.transform = `translate(calc(${e.clientX}px - 50%), calc(${e.clientY}px - 50%))`;
    });
    
    // Add hover effect on interactive elements
    const hoverElements = ['a', 'button', '.btn', '.tech-icon', 'input', 'textarea', 'select'];
    hoverElements.forEach(selector => {
        document.querySelectorAll(selector).forEach(element => {
            element.addEventListener('mouseenter', () => {
                cursor.classList.add('hovered');
            });
            element.addEventListener('mouseleave', () => {
                cursor.classList.remove('hovered');
            });
        });
    });

    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const nav = document.querySelector('.nav');
    const navLinks = document.querySelectorAll('.nav__link');
    
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        nav.classList.toggle('active');
        document.body.classList.toggle('nav-open');
    });
    
    // Close mobile menu when clicking on a nav link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            nav.classList.remove('active');
            document.body.classList.remove('nav-open');
        });
    });

    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Adjust for fixed header
                    behavior: 'smooth'
                });
            }
        });
    });

    // Header Scroll Effect
    const header = document.querySelector('.header');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            header.classList.remove('scroll-up');
            return;
        }
        
        if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
            // Scroll Down
            header.classList.remove('scroll-up');
            header.classList.add('scroll-down');
        } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
            // Scroll Up
            header.classList.remove('scroll-down');
            header.classList.add('scroll-up');
        }
        
        // Add shadow when scrolled
        if (currentScroll > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });

    // Form Submission
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const formValues = Object.fromEntries(formData.entries());
            
            // Here you would typically send the form data to a server
            console.log('Form submitted:', formValues);
            
            // Show success message
            const submitBtn = this.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                submitBtn.textContent = 'Message Sent!';
                submitBtn.classList.add('success');
                this.reset();
                
                // Reset button after delay
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    submitBtn.classList.remove('success');
                }, 3000);
            }, 1500);
        });
    }

    // Simplified GSAP animations
    function initAnimations() {
        gsap.registerPlugin(ScrollTrigger);
        
        gsap.utils.toArray('section').forEach((section) => {
            gsap.from(section, {
                scrollTrigger: {
                    trigger: section,
                    start: 'top 80%'
                },
                opacity: 0,
                duration: 0.6
            });
        });
    }

    // Initialize Particle System
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: { value: 40 },
                color: { value: '#4299e1' },
                opacity: { value: 0.3 },
                size: { value: 2 },
                line_linked: { 
                    enable: true,
                    distance: 200,
                    opacity: 0.1
                }
            }
        });
    }

    // Update current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();
});

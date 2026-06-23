document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       1. MOBILE MENU NAVIGATION TOGGLE
       ========================================================================== */
    const mobileToggleBtn = document.getElementById('mobileToggleBtn');
    const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
    
    if (mobileToggleBtn && mobileMenuOverlay) {
        mobileToggleBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            mobileMenuOverlay.classList.toggle('active');
            
            // Toggle hamburger icon between bars and X
            const icon = mobileToggleBtn.querySelector('i');
            if (icon.classList.contains('fa-bars')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-xmark');
                document.body.style.overflow = 'hidden'; // Disable scroll when menu is open
            } else {
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
                document.body.style.overflow = ''; // Re-enable scroll
            }
        });

        // Close menu when clicking on any mobile navigation link
        const mobileNavItems = document.querySelectorAll('.mobile-nav-item');
        mobileNavItems.forEach(item => {
            item.addEventListener('click', () => {
                mobileMenuOverlay.classList.remove('active');
                document.body.style.overflow = '';
                
                const icon = mobileToggleBtn.querySelector('i');
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            });
        });
        
        // Close menu if clicked outside content area
        document.addEventListener('click', (e) => {
            if (mobileMenuOverlay.classList.contains('active') && !mobileMenuOverlay.contains(e.target) && e.target !== mobileToggleBtn) {
                mobileMenuOverlay.classList.remove('active');
                document.body.style.overflow = '';
                
                const icon = mobileToggleBtn.querySelector('i');
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }
        });
    }


    /* ==========================================================================
       2. TYPEWRITER EFFECT (HERO SUBTITLE LOOP)
       ========================================================================== */
    const typewriterText = document.getElementById('typewriterText');
    const roles = [
        "Java Spring Boot Developer",
        "Fullstack Web Developer",
        "Backend System Engineer",
        "Android Mobile Developer"
    ];
    
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    
    function type() {
        if (!typewriterText) return;
        
        const currentRole = roles[roleIndex];
        
        if (isDeleting) {
            // Delete character
            typewriterText.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50; // Faster deleting speed
        } else {
            // Add character
            typewriterText.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 120; // Natural typing speed
        }
        
        // Handling transition points
        if (!isDeleting && charIndex === currentRole.length) {
            // Wait at the end of the word
            isDeleting = true;
            typingSpeed = 2000; // Pause at full word
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length; // Loop to next word
            typingSpeed = 500; // Pause before typing next word
        }
        
        setTimeout(type, typingSpeed);
    }
    
    // Start typewriter loop
    if (typewriterText) {
        typewriterText.textContent = ''; // Clear default text
        setTimeout(type, 1000);
    }


    /* ==========================================================================
       3. MOUSE-TRACKING GLOW EFFECT FOR CARDS
       ========================================================================== */
    const cards = document.querySelectorAll('.card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left; // x coordinate inside the card
            const y = e.clientY - rect.top;  // y coordinate inside the card
            
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });


    /* ==========================================================================
       4. SCROLL-TRIGGERED PROGRESS BAR FILL
       ========================================================================== */
    const skillFills = document.querySelectorAll('.progress-bar-fill');
    
    if ('IntersectionObserver' in window && skillFills.length > 0) {
        const skillObserverOptions = {
            threshold: 0.2,
            rootMargin: '0px 0px -30px 0px'
        };
        
        const skillObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const fill = entry.target;
                    const targetWidth = fill.getAttribute('data-percent');
                    fill.style.width = targetWidth;
                    observer.unobserve(fill); // Animate only once
                }
            });
        }, skillObserverOptions);
        
        skillFills.forEach(fill => {
            skillObserver.observe(fill);
        });
    } else {
        // Fallback: Fill immediately if Observer is not supported
        skillFills.forEach(fill => {
            fill.style.width = fill.getAttribute('data-percent');
        });
    }


    /* ==========================================================================
       5. SCROLL REVEAL EFFECT FOR SECTIONS (INTERSECTION OBSERVER)
       ========================================================================== */
    const scrollRevealElements = document.querySelectorAll('.scroll-reveal');
    
    if ('IntersectionObserver' in window && scrollRevealElements.length > 0) {
        const revealOptions = {
            threshold: 0.15,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    observer.unobserve(entry.target);
                }
            });
        }, revealOptions);
        
        scrollRevealElements.forEach(element => {
            revealObserver.observe(element);
        });
    } else {
        // Fallback for older browsers
        const revealFallback = () => {
            const triggerBottom = (window.innerHeight / 5) * 4;
            scrollRevealElements.forEach(element => {
                const boxTop = element.getBoundingClientRect().top;
                if (boxTop < triggerBottom) {
                    element.classList.add('revealed');
                }
            });
        };
        revealFallback();
        window.addEventListener('scroll', revealFallback);
    }


    /* ==========================================================================
       6. SMOOTH NAVIGATION LINK HIGHLIGHT ON SCROLL
       ========================================================================== */
    const navItems = document.querySelectorAll('.main-header .nav-item:not(.cta-btn)');
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', () => {
        let scrollY = window.pageYOffset;
        
        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 120;
            const sectionId = current.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navItems.forEach(item => {
                    item.classList.remove('active');
                    if (item.getAttribute('href') === '#' + sectionId) {
                        item.classList.add('active');
                    }
                });
            }
        });
    });

});

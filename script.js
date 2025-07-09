 
    // Mobile Menu Toggle
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    
    menuToggle.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });
    
    // Active Navigation Link
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });
    
    // Contact Form Submission
    const contactForm = document.getElementById('contact-form');
    
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // Simple validation
        if (name && email && subject && message) {
            // In a real application, you would send this data to a server
            alert('Thank you for your message! I will get back to you soon.');
            contactForm.reset();
        } else {
            alert('Please fill in all fields.');
        }
    });
    
    // Enhanced Typing Animation
    const typingText = document.getElementById('typing-text');
    const texts = [" Student"," My Career Paths are.", " Web Dev", " Programmer", " Game Dev"];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingDelay = 150; // Typing speed
    let deletingDelay = 80; // Deleting speed
    let newTextDelay = 1500; // Delay before typing next text
    let pauseBeforeDelete = 1000; // Pause before starting to delete
    
    function type() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            // Deleting text
            typingText.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            
            if (charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
                setTimeout(type, newTextDelay); // Pause before typing next text
            } else {
                setTimeout(type, deletingDelay);
            }
        } else {
            // Typing text
            typingText.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            
            if (charIndex === currentText.length) {
                isDeleting = true;
                setTimeout(type, pauseBeforeDelete); // Pause before deleting
            } else {
                setTimeout(type, typingDelay);
            }
        }
    }
    
    // Start typing animation after a short delay
    setTimeout(type, 1000);
    
    // Generic Slider Function
    function initializeSlider(sliderClass, prevBtnClass, nextBtnClass, dotsClass) {
        const sliderContainer = document.querySelector(`.${sliderClass} .slider-container`);
        const sliderItems = document.querySelectorAll(`.${sliderClass} .slider-item`);
        const prevBtn = document.querySelector(`.${prevBtnClass}`);
        const nextBtn = document.querySelector(`.${nextBtnClass}`);
        const dots = document.querySelectorAll(`.${dotsClass} .slider-dot`);
        
        let currentIndex = 0;
        
        // Initialize slider
        function initSlider() {
            sliderItems.forEach((item, index) => {
                if (index === currentIndex) {
                    item.classList.add('active');
                } else {
                    item.classList.remove('active');
                }
            });
            
            updateSliderPosition();
            updateDots();
        }
        
        // Update slider position
        function updateSliderPosition() {
            sliderContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
        }
        
        // Update dots
        function updateDots() {
            dots.forEach((dot, index) => {
                if (index === currentIndex) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
        }
        
        // Previous slide
        prevBtn.addEventListener('click', () => {
            if (currentIndex > 0) {
                currentIndex--;
            } else {
                currentIndex = sliderItems.length - 1;
            }
            
            initSlider();
        });
        
        // Next slide
        nextBtn.addEventListener('click', () => {
            if (currentIndex < sliderItems.length - 1) {
                currentIndex++;
            } else {
                currentIndex = 0;
            }
            
            initSlider();
        });
        
        // Dot navigation
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentIndex = index;
                initSlider();
            });
        });
        
        // Auto slide (optional)
        let slideInterval;
        
        function startSlideInterval() {
            slideInterval = setInterval(() => {
                if (currentIndex < sliderItems.length - 1) {
                    currentIndex++;
                } else {
                    currentIndex = 0;
                }
                initSlider();
            }, 6000); // Change slide every 6 seconds
        }
        
        function stopSlideInterval() {
            clearInterval(slideInterval);
        }
        
        // Pause auto slide on hover
        const slider = document.querySelector(`.${sliderClass}`);
        slider.addEventListener('mouseenter', stopSlideInterval);
        slider.addEventListener('mouseleave', startSlideInterval);
        
        // Initialize slider on page load
        initSlider();
        startSlideInterval();
        
        return { initSlider, startSlideInterval, stopSlideInterval };
    }
    
    // Initialize Education Slider
    const educationSlider = initializeSlider('education-slider', 'education-prev', 'education-next', 'education-dots');
    
    // Initialize Hobbies Slider
    const hobbiesSlider = initializeSlider('hobbies-slider', 'hobbies-prev', 'hobbies-next', 'hobbies-dots');
 

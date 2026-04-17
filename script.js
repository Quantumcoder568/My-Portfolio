 // Dark/Light Mode Toggle
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = themeToggle.querySelector('i');
    
    // Check for saved preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    }
    
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const isDark = document.body.classList.contains('dark-mode');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        if (isDark) {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        } else {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
        }
    });
    
    // Form submission with fetch (no page reload)
    const contactForm = document.getElementById('contactForm');
    const successMessage = document.getElementById('successMessage');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const formData = new FormData(contactForm);
        fetch(contactForm.action, {
            method: contactForm.method,
            body: formData,
            headers: { 'Accept': 'application/json' }
        }).then(response => {
            if (response.ok) {
                successMessage.style.display = 'block';
                contactForm.reset();
                setTimeout(() => {
                    successMessage.style.display = 'none';
                }, 4000);
            } else {
                alert('Oops! Something went wrong. Please try again.');
            }
        }).catch(error => {
            alert('Network error. Please try again later.');
        });
    });
    
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const navbar = document.getElementById('navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        updateScrollIndicator();
    });
    
    // Mobile menu toggle
    const menuBtn = document.getElementById('menuBtn');
    const navLinks = document.getElementById('navLinks');
    menuBtn.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        menuBtn.innerHTML = navLinks.classList.contains('active') ? '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
    });
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });
    
    // Scroll indicator update & click
    function updateScrollIndicator() {
        const sections = document.querySelectorAll('section');
        const scrollDots = document.querySelectorAll('.scroll-dot');
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        scrollDots.forEach(dot => {
            dot.classList.remove('active');
            if (dot.getAttribute('data-section') === current) {
                dot.classList.add('active');
            }
        });
    }
    document.querySelectorAll('.scroll-dot').forEach(dot => {
        dot.addEventListener('click', function() {
            const section = document.getElementById(this.getAttribute('data-section'));
            if (section) {
                window.scrollTo({ top: section.offsetTop, behavior: 'smooth' });
            }
        });
    });
    
    // Gentle mouse move parallax for glass cards (optional)
    document.addEventListener('mousemove', (e) => {
        const cards = document.querySelectorAll('.project-card, .contact-form');
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        cards.forEach(card => {
            const moveX = (mouseX - 0.5) * 8;
            const moveY = (mouseY - 0.5) * 8;
            card.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });
    });
    // Reset transform on mouse leave
    document.addEventListener('mouseleave', () => {
        const cards = document.querySelectorAll('.project-card, .contact-form');
        cards.forEach(card => {
            card.style.transform = 'translate(0,0)';
        });
    });
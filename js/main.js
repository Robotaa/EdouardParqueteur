document.addEventListener('DOMContentLoaded', function () {

    // ========================================
    // Mobile Menu Toggle
    // ========================================
    var hamburger = document.getElementById('hamburger');
    var navMenu = document.getElementById('navMenu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function () {
            var isOpen = navMenu.classList.toggle('open');
            hamburger.classList.toggle('active');
            hamburger.setAttribute('aria-expanded', isOpen);
        });

        // Close menu when clicking a link
        var navLinks = navMenu.querySelectorAll('.navbar__link');
        navLinks.forEach(function (link) {
            link.addEventListener('click', function () {
                navMenu.classList.remove('open');
                hamburger.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
            });
        });
    }

    // ========================================
    // Active Navigation Link
    // ========================================
    var currentPage = window.location.pathname.split('/').pop() || 'index.html';
    var allNavLinks = document.querySelectorAll('.navbar__link');

    allNavLinks.forEach(function (link) {
        var href = link.getAttribute('href');
        if (href === currentPage && !link.classList.contains('navbar__link--cta')) {
            link.classList.add('navbar__link--active');
        }
    });

    // ========================================
    // Navbar Scroll Effect
    // ========================================
    var navbar = document.getElementById('navbar');

    function handleScroll() {
        if (!navbar) return;
        // Only apply scroll effect on pages with hero (index.html)
        if (navbar.classList.contains('navbar--scrolled') && currentPage !== 'index.html') return;

        if (window.scrollY > 50) {
            navbar.classList.add('navbar--scrolled');
        } else if (currentPage === 'index.html' || currentPage === '') {
            navbar.classList.remove('navbar--scrolled');
        }
    }

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    // ========================================
    // Contact Form Validation
    // ========================================
    var contactForm = document.getElementById('contactForm');
    var formSuccess = document.getElementById('formSuccess');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            var isValid = true;

            // Reset errors
            var groups = contactForm.querySelectorAll('.form__group');
            groups.forEach(function (group) {
                group.classList.remove('form__group--error');
            });

            // Validate name
            var name = document.getElementById('name');
            if (!name.value.trim()) {
                name.closest('.form__group').classList.add('form__group--error');
                isValid = false;
            }

            // Validate email
            var email = document.getElementById('email');
            var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!email.value.trim() || !emailRegex.test(email.value.trim())) {
                email.closest('.form__group').classList.add('form__group--error');
                isValid = false;
            }

            // Validate phone (optional, but if filled must be valid)
            var phone = document.getElementById('phone');
            if (phone.value.trim()) {
                var phoneRegex = /^[\d\s\+\-\.()]{6,}$/;
                if (!phoneRegex.test(phone.value.trim())) {
                    phone.closest('.form__group').classList.add('form__group--error');
                    isValid = false;
                }
            }

            // Validate subject
            var subject = document.getElementById('subject');
            if (!subject.value) {
                subject.closest('.form__group').classList.add('form__group--error');
                isValid = false;
            }

            // Validate message
            var message = document.getElementById('message');
            if (!message.value.trim()) {
                message.closest('.form__group').classList.add('form__group--error');
                isValid = false;
            }

            if (isValid) {
                contactForm.style.display = 'none';
                formSuccess.classList.add('visible');
            }
        });

        // Remove error on input
        var inputs = contactForm.querySelectorAll('.form__input, .form__select, .form__textarea');
        inputs.forEach(function (input) {
            input.addEventListener('input', function () {
                this.closest('.form__group').classList.remove('form__group--error');
            });
        });
    }

});

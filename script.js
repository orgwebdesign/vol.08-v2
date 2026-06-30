document.addEventListener('DOMContentLoaded', () => {
    // Header Scroll Effect
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Mobile Menu Toggle
    const burgerMenu = document.querySelector('.burger-menu');
    const navLinks = document.querySelector('.nav-links');

    if (burgerMenu) {
        burgerMenu.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            
            // Toggle Icon between menu and x
            if (navLinks.classList.contains('active')) {
                burgerMenu.innerHTML = '<i data-lucide="x"></i>';
            } else {
                burgerMenu.innerHTML = '<i data-lucide="menu"></i>';
            }
            if (typeof lucide !== 'undefined') {
                lucide.createIcons();
            }
        });
    }

    const aboutCards = document.querySelectorAll('.about-card');
    const tabletBreakpoint = window.matchMedia('(max-width: 1024px)');

    const closeAboutCards = () => {
        aboutCards.forEach((card) => card.classList.remove('is-open'));
    };

    aboutCards.forEach((card) => {
        const openButton = card.querySelector('.about-card-plus');
        const closeButton = card.querySelector('.about-card-close');

        card.addEventListener('click', (event) => {
            if (!tabletBreakpoint.matches) {
                return;
            }

            if (event.target.closest('.about-card-close')) {
                return;
            }

            event.preventDefault();
            const isOpen = card.classList.contains('is-open');
            closeAboutCards();
            if (!isOpen) {
                card.classList.add('is-open');
            }
        });

        if (openButton) {
            openButton.addEventListener('click', (event) => {
                if (!tabletBreakpoint.matches) {
                    return;
                }

                event.preventDefault();
                event.stopPropagation();
                const isOpen = card.classList.contains('is-open');
                closeAboutCards();
                if (!isOpen) {
                    card.classList.add('is-open');
                }
            });
        }

        if (closeButton) {
            closeButton.addEventListener('click', (event) => {
                if (!tabletBreakpoint.matches) {
                    return;
                }

                event.preventDefault();
                event.stopPropagation();
                card.classList.remove('is-open');
            });
        }
    });

    document.addEventListener('click', (event) => {
        if (!tabletBreakpoint.matches) {
            return;
        }

        if (!event.target.closest('.about-card')) {
            closeAboutCards();
        }
    });

    tabletBreakpoint.addEventListener('change', (event) => {
        if (!event.matches) {
            closeAboutCards();
        }
    });

    if (typeof Swiper !== 'undefined') {
        new Swiper('.full-width-swiper', {
            loop: true,
            speed: 900,
            spaceBetween: 16,
            slidesPerView: 1,
            autoplay: {
                delay: 4000,
                disableOnInteraction: false,
            },
        });
    }


    // Form AJAX submissions (Formspree)
    document.querySelectorAll('form[action*="formspree.io"]').forEach(form => {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const btn = form.querySelector('button[type="submit"]');
            const originalText = btn.textContent;
            btn.disabled = true;
            btn.textContent = 'Envoi en cours...';

            try {
                const res = await fetch(form.action, {
                    method: 'POST',
                    body: new FormData(form),
                    headers: { 'Accept': 'application/json' }
                });
                if (res.ok) {
                    form.innerHTML = '<p class="form-success">✅ Message envoyé ! Nous vous répondrons sous 48h.</p>';
                } else {
                    throw new Error('Erreur serveur');
                }
            } catch (err) {
                btn.disabled = false;
                btn.textContent = originalText;
                alert('Une erreur est survenue. Veuillez réessayer ou nous contacter par email.');
            }
        });
    });

    // Initialize Lucide Icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
});

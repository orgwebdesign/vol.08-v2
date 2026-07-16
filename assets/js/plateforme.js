const PLATFORME_UTILS = {
    getSession() {
        const data = sessionStorage.getItem('vol08_client_session');
        return data ? JSON.parse(data) : null;
    },
    requireAuth() {
        const session = this.getSession();
        if (!session) {
            window.location.href = 'connexion.html';
        }
        return session;
    },
    logout() {
        sessionStorage.removeItem('vol08_client_session');
        window.location.href = 'connexion.html';
    },
    getUserInfo() {
        const session = this.getSession();
        if (!session) return null;
        const clients = JSON.parse(localStorage.getItem('vol08_b2b_clients') || '[]');
        return clients.find(c => c.email === session.email) || null;
    }
};

// Transition overlay
const overlay = document.createElement('div');
overlay.className = 'page-transition-overlay';
document.body.appendChild(overlay);

document.addEventListener('DOMContentLoaded', () => {
    if (typeof lucide !== 'undefined') lucide.createIcons();

    const main = document.querySelector('.plateforme-main');
    const header = document.querySelector('.plateforme-header');

    // Page enter animation
    if (main) {
        main.classList.add('page-enter');
        if (header) header.classList.add('header-enter');
    }

    // Stagger child elements
    if (main) {
        const children = main.children;
        Array.from(children).forEach((child, i) => {
            child.style.opacity = '0';
            child.style.transform = 'translateY(16px)';
            child.style.transition = `opacity 0.45s cubic-bezier(0.25,0.46,0.45,0.94) ${i * 0.06 + 0.1}s, transform 0.45s cubic-bezier(0.25,0.46,0.45,0.94) ${i * 0.06 + 0.1}s`;
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    child.style.opacity = '1';
                    child.style.transform = 'translateY(0)';
                });
            });
        });
    }

    // Intercept nav links
    document.querySelectorAll('.plateforme-header nav a, .plateforme-card, .dash-link, .plateforme-header-user a').forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (!href || href.startsWith('#') || href.startsWith('javascript:') || e.ctrlKey || e.metaKey) return;
            e.preventDefault();

            overlay.classList.add('active');

            if (main) {
                main.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                main.style.opacity = '0';
                main.style.transform = 'scale(0.98) translateY(-6px)';
            }
            if (header) {
                header.style.transition = 'opacity 0.25s ease';
                header.style.opacity = '0';
            }

            setTimeout(() => { window.location.href = href; }, 350);
        });
    });
});

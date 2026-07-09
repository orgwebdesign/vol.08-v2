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

document.addEventListener('DOMContentLoaded', () => {
    if (typeof lucide !== 'undefined') lucide.createIcons();
});

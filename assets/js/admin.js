const ADMIN_PASSWORD = 'vol08admin2026';

const ADMIN_UTILS = {
    isLoggedIn() {
        return sessionStorage.getItem('vol08_admin_auth') === 'true';
    },
    requireAuth() {
        if (!this.isLoggedIn()) {
            window.location.href = 'login.html';
        }
    },
    getRequests() {
        return JSON.parse(localStorage.getItem('vol08_b2b_requests') || '[]');
    },
    saveRequests(requests) {
        localStorage.setItem('vol08_b2b_requests', JSON.stringify(requests));
    },
    getClients() {
        return JSON.parse(localStorage.getItem('vol08_b2b_clients') || '[]');
    },
    saveClients(clients) {
        localStorage.setItem('vol08_b2b_clients', JSON.stringify(clients));
    },
    formatDate(iso) {
        return new Date(iso).toLocaleDateString('fr-FR', {
            day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
        });
    },
    getStatusLabel(status) {
        const labels = { pending: 'En attente', approved: 'Validé', rejected: 'Refusé' };
        return labels[status] || status;
    },
    logout() {
        sessionStorage.removeItem('vol08_admin_auth');
        window.location.href = 'login.html';
    },
    getCounts() {
        const requests = this.getRequests();
        const clients = this.getClients();
        return {
            pending: requests.filter(r => r.status === 'pending').length,
            approved: requests.filter(r => r.status === 'approved').length,
            rejected: requests.filter(r => r.status === 'rejected').length,
            totalClients: clients.length
        };
    }
};

document.addEventListener('DOMContentLoaded', () => {
    if (typeof lucide !== 'undefined') lucide.createIcons();
});

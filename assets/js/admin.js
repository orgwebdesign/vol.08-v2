const ADMIN_PASSWORD = 'vol08admin2026';

const STORE = {
  get(key, fallback) {
    try { return JSON.parse(localStorage.getItem(key)) || fallback; }
    catch { return fallback; }
  },
  set(key, val) { localStorage.setItem(key, JSON.stringify(val)); }
};

const ADMIN_UTILS = {
  isLoggedIn() { return sessionStorage.getItem('vol08_admin_auth') === 'true'; },
  requireAuth() { if (!this.isLoggedIn()) window.location.href = 'login.html'; },
  getRequests() { return STORE.get('vol08_b2b_requests', []); },
  saveRequests(r) { STORE.set('vol08_b2b_requests', r); },
  getClients() { return STORE.get('vol08_b2b_clients', []); },
  saveClients(c) { STORE.set('vol08_b2b_clients', c); },
  getProduits() { return STORE.get('vol08_produits', PRODUITS_MOCK); },
  saveProduits(p) { STORE.set('vol08_produits', p); },
  getCollections() { return STORE.get('vol08_collections', COLLECTIONS_MOCK); },
  saveCollections(c) { STORE.set('vol08_collections', c); },
  getCommandes() { return STORE.get('vol08_commandes', COMMANDES_MOCK); },
  saveCommandes(c) { STORE.set('vol08_commandes', c); },
  getDevis() { return STORE.get('vol08_devis', DEVIS_MOCK); },
  saveDevis(d) { STORE.set('vol08_devis', d); },
  getMedias() { return STORE.get('vol08_medias', MEDIAS_MOCK); },
  saveMedias(m) { STORE.set('vol08_medias', m); },
  formatDate(iso) {
    return new Date(iso).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  },
  formatCurrency(n) { return n.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' }); },
  getStatusLabel(s) { return { pending: 'En attente', approved: 'Validé', rejected: 'Refusé', active: 'Actif', inactive: 'Inactif', livree: 'Livrée', en_cours: 'En cours', annulee: 'Annulée' }[s] || s; },
  logout() { sessionStorage.removeItem('vol08_admin_auth'); window.location.href = 'login.html'; },
  getCounts() {
    const reqs = this.getRequests(), clients = this.getClients(), prods = this.getProduits(), cmd = this.getCommandes();
    return {
      pending: reqs.filter(r => r.status === 'pending').length,
      approved: reqs.filter(r => r.status === 'approved').length,
      rejected: reqs.filter(r => r.status === 'rejected').length,
      totalClients: clients.length, totalProduits: prods.length,
      totalCommandes: cmd.length
    };
  }
};

/* ===== MOCK DATA ===== */
const PRODUITS_MOCK = [
  { ref: 'T.ZANE', name: 'Table basse T.ZANE', collection: 'Mobilier', categorie: 'Tables', stock: 12, prixHT: 890, status: 'active', image: 'https://d392ke4nwqmbdz.cloudfront.net/Images/Vol08/TableBasse.webp' },
  { ref: 'U.NITE', name: 'Canapé U.NITE', collection: 'Mobilier', categorie: 'Assises', stock: 5, prixHT: 2490, status: 'active', image: 'https://d392ke4nwqmbdz.cloudfront.net/Images/Vol08/Canape.webp' },
  { ref: 'Z.LIGE', name: 'Bibliothèque Z.LIGE', collection: 'Mobilier', categorie: 'Rangements', stock: 8, prixHT: 1750, status: 'active', image: 'https://d392ke4nwqmbdz.cloudfront.net/Images/Vol08/Bibliotheque.webp' },
  { ref: 'T.CUITE', name: 'Fauteuil T.CUITE', collection: 'Mobilier', categorie: 'Assises', stock: 3, prixHT: 1340, status: 'active', image: 'https://d392ke4nwqmbdz.cloudfront.net/Images/Vol08/Fauteuil.webp' },
  { ref: 'L.UMIZE', name: 'Suspension L.UMIZE', collection: 'Luminaires', categorie: 'Suspensions', stock: 20, prixHT: 620, status: 'active', image: 'https://d392ke4nwqmbdz.cloudfront.net/Images/Vol08/Suspension.webp' },
  { ref: 'A.SSISE', name: 'Tabouret A.SSISE', collection: 'Mobilier', categorie: 'Assises', stock: 15, prixHT: 450, status: 'active', image: 'https://d392ke4nwqmbdz.cloudfront.net/Images/Vol08/Tabouret.webp' },
  { ref: 'D.CORE', name: 'Vase D.CORE', collection: 'Décoration', categorie: 'Accessoires', stock: 25, prixHT: 180, status: 'active', image: 'https://d392ke4nwqmbdz.cloudfront.net/Images/Vol08/Vase.webp' },
  { ref: 'B.OUGY', name: 'Bougie B.OUGY', collection: 'Décoration', categorie: 'Accessoires', stock: 40, prixHT: 65, status: 'active', image: 'https://d392ke4nwqmbdz.cloudfront.net/Images/Vol08/Bougie.webp' },
  { ref: 'M.ROCCO', name: 'Mirador M.ROCCO', collection: 'Mobilier', categorie: 'Tables', stock: 0, prixHT: 2100, status: 'inactive', image: 'https://d392ke4nwqmbdz.cloudfront.net/Images/Vol08/Mirador.webp' }
];

const COLLECTIONS_MOCK = [
  { id: 'mobilier', name: 'Mobilier', count: 45, status: 'active' },
  { id: 'decoration', name: 'Décoration', count: 120, status: 'active' },
  { id: 'luminaires', name: 'Luminaires', count: 78, status: 'active' },
  { id: 'accessoires', name: 'Accessoires', count: 60, status: 'active' },
  { id: 'textile', name: 'Textile', count: 32, status: 'active' },
  { id: 'art-de-la-table', name: 'Art de la table', count: 28, status: 'active' }
];

const COMMANDES_MOCK = [
  { id: 'CMD-001', client: 'Maison&Objet Casablanca', email: 'contact@moc.ma', montant: 4450, date: '2026-06-28T10:30:00', status: 'livree', articles: 4 },
  { id: 'CMD-002', client: 'Atelier Kenz Rabat', email: 'kenz@atelier.ma', montant: 2300, date: '2026-07-01T14:15:00', status: 'en_cours', articles: 2 },
  { id: 'CMD-003', client: 'Archidesign Marrakech', email: 'studio@archidesign.ma', montant: 8900, date: '2026-07-03T09:00:00', status: 'en_cours', articles: 7 },
  { id: 'CMD-004', client: 'Déco & Sens Tanger', email: 'cmd@deco-sens.ma', montant: 1200, date: '2026-06-25T16:45:00', status: 'livree', articles: 3 },
  { id: 'CMD-005', client: 'Lumières Studio', email: 'info@lumieres.ma', montant: 3100, date: '2026-07-05T11:20:00', status: 'annulee', articles: 2 }
];

const DEVIS_MOCK = [
  { id: 'DEV-001', client: 'Maison&Objet Casablanca', email: 'contact@moc.ma', montant: 3200, date: '2026-06-20T10:00:00', status: 'approuve', articles: 3 },
  { id: 'DEV-002', client: 'Atelier Kenz Rabat', email: 'kenz@atelier.ma', montant: 1800, date: '2026-06-25T15:30:00', status: 'envoye', articles: 2 },
  { id: 'DEV-003', client: 'Archidesign Marrakech', email: 'studio@archidesign.ma', montant: 5600, date: '2026-07-01T08:45:00', status: 'brouillon', articles: 5 },
  { id: 'DEV-004', client: 'Déco & Sens Tanger', email: 'cmd@deco-sens.ma', montant: 900, date: '2026-07-02T13:00:00', status: 'refuse', articles: 1 }
];

const MEDIAS_MOCK = [
  { id: 'MED-001', name: 'Catalogue_Automne_2026.pdf', type: 'PDF', taille: '12.4 Mo', date: '2026-06-15', downloads: 45 },
  { id: 'MED-002', name: 'Fiche_technique_T.ZANE.pdf', type: 'PDF', taille: '2.1 Mo', date: '2026-06-10', downloads: 128 },
  { id: 'MED-003', name: 'Pack_visuels_mobilier.zip', type: 'ZIP', taille: '45.8 Mo', date: '2026-05-28', downloads: 32 },
  { id: 'MED-004', name: 'Lookbook_2026.pdf', type: 'PDF', taille: '28.3 Mo', date: '2026-06-01', downloads: 67 },
  { id: 'MED-005', name: 'Logo_VOL08_HD.png', type: 'PNG', taille: '0.8 Mo', date: '2026-04-20', downloads: 200 }
];

document.addEventListener('DOMContentLoaded', () => {
  if (typeof lucide !== 'undefined') lucide.createIcons();
});

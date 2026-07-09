const STORE = {
  user: {
    id: 1,
    name: "Karim Benali",
    email: "karim@benali-design.fr",
    company: "Benali Design Studio",
    role: "Commercial",
    avatar: "KB",
    since: "Janvier 2026",
  },

  stats: {
    commands: 24,
    quotes: 8,
    favorites: 16,
    pending: 3,
  },

  recentOrders: [
    { id: "CMD-2026-0042", date: "04/07/2026", client: "Maison Dubois", total: "3 240 €", status: "Livrée" },
    { id: "CMD-2026-0041", date: "30/06/2026", client: "Hôtel Royal Palm", total: "8 750 €", status: "Expédiée" },
    { id: "CMD-2026-0040", date: "28/06/2026", client: "Espace Carré", total: "1 890 €", status: "En préparation" },
    { id: "CMD-2026-0039", date: "25/06/2026", client: "Atelier Moderne", total: "5 400 €", status: "Validée" },
    { id: "CMD-2026-0038", date: "22/06/2026", client: "Galerie Noor", total: "2 100 €", status: "En attente" },
  ],

  pendingQuotes: [
    { id: "DEV-2026-015", client: "Architecture Z", items: 8, total: "12 400 €", date: "05/07/2026", status: "À valider" },
    { id: "DEV-2026-014", client: "Bureau d'étude LM", items: 3, total: "4 800 €", date: "03/07/2026", status: "En cours" },
    { id: "DEV-2026-013", client: "Résidence Alia", items: 12, total: "18 200 €", date: "01/07/2026", status: "Devis envoyé" },
  ],

  clients: [
    { id: 1, name: "Maison Dubois", siret: "823 456 789 00012", email: "contact@maisondubois.fr", city: "Lyon", orders: 12, total: "42 300 €", status: "Actif" },
    { id: 2, name: "Hôtel Royal Palm", siret: "912 345 678 00023", email: "achats@royalpalm.ma", city: "Marrakech", orders: 8, total: "67 500 €", status: "Actif" },
    { id: 3, name: "Espace Carré", siret: "734 567 890 00034", email: "commande@espacecarre.fr", city: "Paris", orders: 5, total: "12 800 €", status: "Actif" },
    { id: 4, name: "Galerie Noor", siret: "645 678 901 00045", email: "info@galerienoor.ma", city: "Casablanca", orders: 3, total: "6 200 €", status: "En attente" },
    { id: 5, name: "Atelier Moderne", siret: "556 789 012 00056", email: "pro@atelier-moderne.fr", city: "Bordeaux", orders: 0, total: "0 €", status: "À qualifier" },
  ],

  notifications: [
    { id: 1, title: "Nouvelle commande CMD-2026-0043", time: "Il y a 10 min", read: false },
    { id: 2, title: "Devis DEV-2026-015 validé par la direction", time: "Il y a 1h", read: false },
    { id: 3, title: "Compte Galerie Noor activé", time: "Il y a 3h", read: true },
    { id: 4, title: "Mise à jour tarifaire collection T.ZANE", time: "Hier", read: true },
  ],
};

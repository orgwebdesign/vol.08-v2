# VOL.08 — Résumé de la Plateforme B2B

## Aperçu général

VOL.08 est une marque de mobilier et décoration professionnelle basée au Maroc. La plateforme B2B permet aux professionnels (architectes, designers, décoreurs, hôtels) de commander en gros avec tarifs exclusifs.

---

## Structure du Site

### Site Public (`index.html`)
- Page d'accueil avec présentation des collections
- Catalogue public vitrine
- Page contact / demande d'accès B2B

### Espace Privé B2B (racine)
- `dashboard.html` — Tableau de bord avec CA tracker, stats, activité récente
- `catalogue.html` — Catalogue privé avec filtres avancés, recherche, comparateur
- `comparer.html` — Comparaison de 2-3 produits côte à côte
- `devis.html` — Panier et création de devis
- `commandes.html` — Suivi des commandes
- `selections.html` — Favoris et sélections de produits
- `compte.html` — Gestion du profil

### Plateforme Client (`/plateforme/`)
- `dashboard.html` — Dashboard client avec suivi commande, devis, recommandés
- `catalogue.html` — Catalogue pour clients
- `devis.html` — Devis client
- `commandes.html` — Commandes client
- `notifications.html` — Notifications dynamiques (localStorage)
- `favoris.html` — Sélections partageables avec export PDF
- `support.html` — Support prioritaire
- `compte.html` — Profil client
- `connexion.html` — Page de connexion

### Espace Commercial (`/commercial/`)
- `dashboard.html` — Portefeuille clients
- `devis.html` — Devis express

### Administration (`/admin/`)
- Gestion des produits, tarifs, clients, sécurité

---

## Fonctionnalités Principales

### 1. Catalogue Privé
- 8 produits avec fiches complètes (prix HT, dimensions, matériaux, couleurs, stock)
- Filtres : catégorie, collection, prix, matière, couleur
- Recherche textuelle avec historique
- Tri : prix croissant/décroissant, nom, stock

### 2. Comparateur Produits
- Sélection de 2-3 produits max
- Comparaison : prix, collection, catégorie, dimensions, matériaux, couleurs, poids, stock, entretien
- Badge comparateur dans la sidebar

### 3. Recherche Avancée
- Barre de recherche dans le topbar
- Filtres déroulants (catégorie, collection, tri)
- Filtres avancés (prix, matière, couleur)
- Historique des recherches (localStorage)

### 4. Système de Notifications
- Notifications dynamiques depuis localStorage
- Types : info, succès, alerte
- Marquer lu / marquer tout lu
- Badge avec compteur

### 5. Favoris & Sélections Partageables
- Créer des sélections de produits
- Renommer, supprimer
- Lien de partage unique
- Partage par email
- Export PDF

### 6. Dashboard Privé
- **CA Tracker** : barre de progression mensuelle avec objectif
- **Stats** : commandes, devis, favoris, en attente
- **Activité récente** : timeline des dernières actions
- **Top produits** : meilleurs ventes du mois
- **Produits consultés** : historique depuis localStorage
- **Alertes stock** : produits en stock faible
- **Actions rapides** : boutons accès direct
- **Chatbot** : assistant virtuel

### 7. Dashboard Client
- **Résumé** : total commandé, devis, livraisons, favoris
- **Suivi commande** : étapes visuelles (confirmée → préparation → expédition → livraison)
- **Devis récents** : derniers devis avec montants
- **Recommandés** : produits suggérés selon l'historique
- **Profil** : informations société avec modification

---

## Données & Stockage

| Clé localStorage | Description |
|---|---|
| `vol08_produits` | Produits du catalogue |
| `vol08_devis` | Devis créés |
| `vol08_commandes` | Commandes passées |
| `vol08_b2b_clients` | Clients B2B inscrits |
| `vol08_client_session` | Session utilisateur (sessionStorage) |
| `vol08_notifications` | Notifications |
| `vol08_favoris` | Sélections produits |
| `vol08_compare` | Produits en comparaison |
| `vol08_search_history` | Historique de recherche |
| `vol08_recent_viewed` | Produits récemment consultés |

---

## Produits (8 références)

| Réf | Nom | Collection | Catégorie | Prix HT |
|---|---|---|---|---|
| TZANE-001 | Table basse T.ZANE | T.ZANE | Mobilier | 890 € |
| UNITE-001 | Canapé U.NITE 3 places | U.NITE | Mobilier | 2 450 € |
| ZLIGE-001 | Bibliothèque Z.LIGE | Z.LIGE | Mobilier | 1 680 € |
| TCUITE-001 | Fauteuil T.CUITE | T.CUITE | Mobilier | 1 350 € |
| LUMIZE-001 | Suspension L.UMIZE | L.UMIZE | Luminaires | 320 € |
| ASSISE-001 | Assise A.SSISE | A.SSISE | Mobilier | 240 € |
| DCORE-001 | Vase D.CORE | D.CORE | Décoration | 180 € |
| BOUGY-001 | Bougie B.OUGY | B.OUGY | Décoration | 55 € |

---

## Stack Technique

- **Frontend** : HTML, CSS, JavaScript vanilla (pas de framework)
- **Icônes** : Lucide CDN
- **Carousel** : Swiper.js
- **Police** : Grift (custom)
- **Images** : CloudFront CDN
- **Hébergement** : Vercel
- **Auth** : SessionStorage (mock, pas de backend)

---

## Fichiers Clés

| Fichier | Rôle |
|---|---|
| `assets/css/private.css` | Styles espace privé (sidebar + contenu) |
| `assets/css/plateforme.css` | Styles plateforme client |
| `assets/css/style.css` | Styles site public |
| `assets/js/app.js` | Logique catalogue, filtres, comparateur |
| `assets/js/plateforme.js` | Notifications, favoris, session |
| `assets/js/data.js` | Données statiques (STORE) |
| `assets/js/produits-data.js` | Données produits unifiées |

---

*Dernière mise à jour : Juillet 2026*

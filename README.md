# VOL.08 — Plateforme B2B Privée → Partie Publique

> **Projet :** Transition de la plateforme privée VOL.08 vers une architecture publique + privée  
> **Client :** VOL.08 — Distribution professionnelle d'ameublement & décoration  
> **Tech stack :** HTML5 / CSS3 / JavaScript (Vanilla) · Lucide Icons · Grift Font  
> **Hébergement :** Statique (fichiers `.html` prêts pour Vercel, Netlify, ou tout serveur HTTP)

---

## Architecture Actuelle (Privée Seulement)

```
┌─────────────────────────────────────────────┐
│               PLATEFORME PRIVÉE              │
│  (toutes les pages derrière index.html)       │
│                                               │
│  ├── index.html          ← Login (simulé)     │
│  ├── dashboard.html      ← Dashboard client   │
│  ├── catalogue.html      ← Catalogue privé    │
│  ├── produit.html        ← Fiche produit      │
│  ├── commandes.html      ← Commandes          │
│  ├── devis.html          ← Devis/Panier       │
│  ├── selections.html     ← Favoris            │
│  ├── compte.html         ← Mon compte         │
│  ├── support.html        ← Support            │
│  ├── notifications.html  ← Notifications      │
│  ├── inspirations.html   ← Moodboard          │
│  ├── commercial/         ← Espace commercial  │
│  ├── admin/              ← Administration      │
│  ├── inscription.html    ← Inscription         │
│  └── mot-de-passe-oublie.html                 │
└─────────────────────────────────────────────┘
```

**Limitation actuelle :** Aucune authentification réelle. Le formulaire de login redirige vers `dashboard.html` sans validation. Toutes les pages sont techniquement publiques (accessibles par URL).

---

## Architecture Cible (Publique + Privée)

```
┌──────────────────────────────────────────────────────────┐
│                     PORTAIL PUBLIC                        │
│  (index.html → Nouveau site vitrine)                      │
│                                                           │
│  ├── index.html          ← Page d'accueil publique        │
│  ├── catalogue.html      ← Catalogue public (visible)     │
│  ├── produit.html        ← Fiche produit (visible)        │
│  ├── inspirations.html   ← Inspirations publiques         │
│  ├── propos.html         ← À propos                       │
│  ├── contact.html        ← Contact                        │
│  └── footer / header     ← Navigation publique            │
├──────────────────────────────────────────────────────────┤
│                     ZONE CLIENT B2B                        │
│  (après connexion)                                         │
│                                                           │
│  ├── app/dashboard.html  ← Dashboard client               │
│  ├── app/commandes.html  ← Commandes                      │
│  ├── app/devis.html      ← Devis/Panier                   │
│  ├── app/selections.html ← Favoris & sélections           │
│  ├── app/compte.html     ← Mon compte                     │
│  ├── app/support.html    ← Support prioritaire            │
│  └── app/notifications.html                               │
├──────────────────────────────────────────────────────────┤
│                     ZONE COMMERCIALE                        │
│  (après connexion commerciale)                             │
│                                                           │
│  └── commercial/         ← Portefeuille, devis, relances  │
├──────────────────────────────────────────────────────────┤
│                     ZONE ADMIN                             │
│  (après connexion admin)                                  │
│                                                           │
│  └── admin/              ← Produits, clients, tarifs      │
└──────────────────────────────────────────────────────────┘
```

---

## Stratégie de Transition

### Phase 1 — Restructuration des fichiers

Déplacer les pages privées dans des sous-dossiers pour isoler le domaine public du domaine privé :

```
/                               → Racine (pages publiques)
├── index.html                  → Nouvelle landing page publique
├── catalogue-public.html       → Catalogue visible sans login
├── produit-public.html         → Fiche produit publique
├── assets/
│   ├── css/public.css          → Styles du portail public
│   └── css/private.css         → Styles de l'espace privé
└── app/                        → Pages privées (client B2B)
    ├── index.html              → Login
    ├── dashboard.html
    ├── catalogue.html          → Catalogue privé (prix pro)
    ├── commandes.html
    └── ...
```

### Phase 2 — Catalogue Public vs Privé

Deux niveaux de catalogue :

| Élément | Public | Privé (connecté) |
|---------|--------|------------------|
| Visuels produits | ✅ Oui | ✅ Oui |
| Noms & références | ✅ Oui | ✅ Oui |
| Prix indicatifs | Prix public (TTC) | Prix pro (HT) |
| Fiches techniques | Version simplifiée | Version complète |
| Stock & délais | ❌ Non | ✅ Oui |
| Commande / Devis | ❌ Non (CTA → inscription) | ✅ Oui |

### Phase 3 — Simulateur d'authentification (côté client)

Ajouter une vérification simple avec `localStorage` en attendant le backend :

```javascript
// assets/js/auth.js
function requireAuth() {
  const token = localStorage.getItem('vol08_token');
  if (!token) window.location.href = '/app/index.html';
}

function login(email, password) {
  // Simulation — à remplacer par un appel API
  localStorage.setItem('vol08_token', 'demo-token');
  localStorage.setItem('vol08_user', JSON.stringify({ name: '...', role: '...' }));
  window.location.href = '/app/dashboard.html';
}

function logout() {
  localStorage.removeItem('vol08_token');
  window.location.href = '/app/index.html';
}
```

Ajouter `<script src="assets/js/auth.js"></script>` et un appel `requireAuth()` sur chaque page privée.

### Phase 4 — Design système unifié

Deux thèmes partageant les mêmes tokens de design :

```css
/* public.css — Clair, ouvert, accessible */
:root {
  --bg: #ffffff;
  --text: #1a1a1a;
  --primary: #1c1c16;
  --accent: #c9a96e;
  --font: 'Grift', sans-serif;
}

/* private.css — Existant, sombre, professionnel */
:root {
  --bg: #1c1c16;
  --surface: #2a2a24;
  --text: #f0f0ea;
  --border: #3a3a34;
  --primary: #c9a96e;
  --accent: #e8d5a3;
}
```

---

## Livrables

| Fichier | Description |
|---------|-------------|
| `index.html` | Landing page publique (hero, collections, CTA inscription) |
| `catalogue-public.html` | Catalogue visible sans authentification |
| `produit-public.html` | Fiche produit en lecture publique |
| `app/index.html` | Login redessiné |
| `app/dashboard.html` | Dashboard client (inchangé) |
| `assets/css/public.css` | Styles du portail public |
| `assets/js/auth.js` | Guard d'authentification |
| `README.md` | Ce document |

---

## Pages Actuelles et Leur Devenir

| Page actuelle | Statut | Nouvelle destination |
|---------------|--------|---------------------|
| `index.html` | **À réécrire** | Landing page publique |
| `catalogue.html` | **Dupliquer** → public + privé | `catalogue-public.html` + `app/catalogue.html` |
| `produit.html` | **Dupliquer** → public + privé | `produit-public.html` + `app/produit.html` |
| `dashboard.html` | **Déplacer** | `app/dashboard.html` |
| `commandes.html` | **Déplacer** | `app/commandes.html` |
| `devis.html` | **Déplacer** | `app/devis.html` |
| `selections.html` | **Déplacer** | `app/selections.html` |
| `compte.html` | **Déplacer** | `app/compte.html` |
| `support.html` | **Déplacer** | `app/support.html` |
| `notifications.html` | **Déplacer** | `app/notifications.html` |
| `inspirations.html` | **Garder** public | `inspirations.html` (publique) |
| `inscription.html` | **Améliorer** | Formulaire avec validation |
| `mot-de-passe-oublie.html` | **Garder** | Inchangé |
| `commercial/` | **Déplacer** | `app/commercial/` |
| `admin/` | **Déplacer** | `app/admin/` |

---

## Installation & Développement

```bash
# Servir en local (n'importe quel serveur HTTP)
python3 -m http.server 8000
# ou
npx serve .
```

Puis ouvrir `http://localhost:8000`.

---

## Ressources

- [Site public actuel VOL.08](https://vol-08-v2.vercel.app/)
- [Dépôt GitHub](https://github.com/orgwebdesign/vol08-priv--b2b.git)
- [Maquette fonctionnelle](/assets/public/sitemap-vol08.png)
- [Cahier des charges](/assets/public/R%C3%A9sum%C3%A9%20ex%C3%A9cutif%20et%20cahier%20des%20charges%20fonctionnel%20premium%2007.05.2026%20vdf%20(2).docx)

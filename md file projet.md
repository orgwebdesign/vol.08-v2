# VOL.08 — Plateforme Privée B2B

**Plateforme B2B privée** destinée aux distributeurs, architectes, décorateurs et acheteurs professionnels du secteur de l'ameublement et de la décoration au Maroc et en Afrique.

---

## À propos

VOL.08 est une plateforme de distribution professionnelle qui connecte les acheteurs du secteur de l'aménagement avec des fournisseurs premium basés au Maroc. Elle permet de **sourcer, visualiser, sélectionner et commander** du mobilier, de la décoration, des luminaires et des accessoires — le tout dans un espace professionnel sécurisé.

---

## Rôles & Accès

| Rôle | Accès | Description |
|------|-------|-------------|
| **Client B2B** | Catalogue, devis, commandes, support | Distributeurs, architectes, décorateurs |
| **Commercial** | Portefeuille clients, devis express, relances | Équipe commerciale VOL.08 |
| **Administrateur** | Produits, tarifs, clients, sécurité | Gestion de la plateforme |

---

## Fonctionnalités

### Client B2B
- Catalogue privé (400+ références)
- Fiches techniques et médias HD
- Prix professionnels HT
- Favoris & sélections
- Panier & devis
- Commandes et suivi
- Support client prioritaire
- Inspirations & moodboard

### Commercial
- Portefeuille clients
- Devis express
- Grilles tarifaires
- Relances clients
- Reporting commercial

### Administrateur
- Gestion des produits et collections
- Gestion des médias et documents
- Gestion des clients
- Tarifs et grilles de prix
- Sécurité et paramètres
- Intégrations

---

## Pages de la plateforme

- **Dashboard** — Tableau de bord client
- **Catalogue** — Catalogue privé avec recherche et filtres
- **Produit** — Fiche détail produit
- **Favoris & sélections** — Gestion des listes de favoris
- **Panier & devis** — Création et gestion des devis
- **Commandes** — Suivi des commandes
- **Mon compte** — Profil, utilisateurs, préférences
- **Notifications** — Centre de notifications
- **Support** — Assistance prioritaire
- **Inspirations** — Moodboard et inspirations

---

## Stack technique

| Technologie | Utilisation |
|-------------|-------------|
| **HTML5** | Structure des pages |
| **CSS3** | Styles et mise en page |
| **JavaScript** | Comportements UI, interactions |
| **Lucide Icons** | Iconographie |
| **Grift Font** | Typographie sur mesure |

---

## Structure du projet

```
/
├── index.html           ← Page de connexion
├── dashboard.html       ← Dashboard client B2B
├── catalogue.html       ← Catalogue privé (400+ références)
├── produit.html         ← Fiche produit
├── selections.html      ← Favoris & sélections
├── devis.html           ← Panier & devis
├── commandes.html       ← Commandes et suivi
├── compte.html          ← Mon compte
├── notifications.html   ← Centre de notifications
├── support.html         ← Support prioritaire
├── inspirations.html    ← Moodboard & inspirations
├── inscription.html     ← Formulaire d'inscription
├── mot-de-passe-oublie.html
├── commercial/          ← Espace commercial (10 pages)
│   ├── index.html       ← Portefeuille clients
│   ├── dashboard.html   ← Dashboard commercial
│   ├── devis.html       ← Devis express
│   └── ...
├── admin/               ← Administration (11 pages)
│   ├── index.html       ← Dashboard admin
│   ├── produits.html    ← Gestion des produits
│   ├── clients.html     ← Gestion des clients
│   └── ...
├── assets/
│   ├── css/private.css  ← Styles de la plateforme
│   ├── fonts/           ← Polices Grift (18 fichiers)
│   ├── img/             ← Logo et images
│   └── js/
│       ├── app.js       ← UI / comportements
│       └── data.js      ← Données mock (démo)
└── README.md
```

---

## Lancement en local

```bash
python3 -m http.server 8000
# ou
npx serve .
```

Ouvrir `http://localhost:8000`.

---

## Lien utile

- **Site public externe :** [https://vol-08-v2.vercel.app/](https://vol-08-v2.vercel.app/)
- **Dépôt GitHub :** [https://github.com/orgwebdesign/vol08-priv--b2b.git](https://github.com/orgwebdesign/vol08-priv--b2b.git)

---

*Document généré le 09/07/2026*

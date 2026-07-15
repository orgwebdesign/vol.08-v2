#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Generate VOL.08 project summary PDF
"""

from fpdf import FPDF
import os

class ProjectPDF(FPDF):
    def header(self):
        if self.page_no() == 1:
            return  # No header on first page (cover)
        self.set_font('Grift', '', 8)
        self.set_text_color(100, 100, 100)
        self.cell(0, 10, 'VOL.08 — Plateforme B2B Privée', 0, 0, 'L')
        self.cell(0, 10, f'Page {self.page_no()}', 0, 0, 'R')
        self.ln(12)
        self.set_draw_color(201, 169, 110)
        self.set_line_width(0.5)
        self.line(10, self.get_y(), 200, self.get_y())
        self.ln(4)

    def footer(self):
        if self.page_no() == 1:
            return
        self.set_y(-15)
        self.set_font('Grift', '', 8)
        self.set_text_color(128, 128, 128)
        self.cell(0, 10, 'Document généré le 09/07/2026 — VOL.08 Distribution', 0, 0, 'C')

    def chapter_title(self, title, level=1):
        if level == 1:
            self.set_font('Grift', 'B', 16)
            self.set_text_color(28, 28, 22)
            self.set_fill_color(201, 169, 110)
            self.cell(0, 12, f'  {title}', 0, 1, 'L', fill=True)
            self.ln(4)
        elif level == 2:
            self.set_font('Grift', 'B', 12)
            self.set_text_color(201, 169, 110)
            self.cell(0, 10, title, 0, 1, 'L')
            self.ln(2)
        else:
            self.set_font('Grift', 'B', 10)
            self.set_text_color(60, 60, 60)
            self.cell(0, 8, title, 0, 1, 'L')
            self.ln(1)

    def body_text(self, text, bold=False, size=10):
        self.set_font('Grift', 'B' if bold else '', size)
        self.set_text_color(40, 40, 40)
        self.multi_cell(0, 6, text)
        self.ln(2)

    def bullet_text(self, text):
        self.set_font('Grift', '', 10)
        self.set_text_color(40, 40, 40)
        self.cell(5, 6, '', 0, 0)
        self.cell(5, 6, '-', 0, 0)
        self.multi_cell(0, 6, text)
        self.ln(1)

    def add_table_header(self, headers, widths, fill=True):
        self.set_font('Grift', 'B', 8)
        self.set_fill_color(28, 28, 22)
        self.set_text_color(232, 232, 234)
        for h, w in zip(headers, widths):
            self.cell(w, 8, h, 1, 0, 'C', fill=True)
        self.ln()

    def add_table_row(self, cols, widths, fill=False):
        self.set_font('Grift', '', 8)
        self.set_text_color(40, 40, 40)
        bg = (245, 245, 242) if fill else (255, 255, 255)
        self.set_fill_color(*bg)
        for c, w in zip(cols, widths):
            self.cell(w, 7, str(c), 1, 0, 'L', fill=True)
        self.ln()


# Register Grift font (use Helvetica as fallback if not found)
pdf = ProjectPDF()
font_dir = '/Users/havetdigital/Desktop/ANAS HARBOUB/site web/vol.08 site 2/assets/fonts'
grift_available = False
grift_weights = {}

if os.path.exists(font_dir):
    weights = ['Regular', 'Bold', 'Light', 'Medium', 'SemiBold', 'ExtraBold', 'Black', 'Italic', 'BoldItalic', 'LightItalic', 'MediumItalic', 'SemiBoldItalic', 'ExtraBoldItalic', 'BlackItalic', 'Thin', 'ThinItalic', 'ExtraLight', 'ExtraLightItalic']
    for w in weights:
        path = os.path.join(font_dir, f'Grift-{w}.otf')
        if os.path.exists(path):
            grift_weights[w] = path

    if grift_weights:
        try:
            style_map = {
                'Regular': '',
                'Bold': 'B',
                'Light': 'L',
                'Medium': 'M',
                'SemiBold': 'SB',
                'ExtraBold': 'EB',
                'Black': 'BK',
                'Italic': 'I',
                'BoldItalic': 'BI',
                'LightItalic': 'LI',
                'MediumItalic': 'MI',
                'SemiBoldItalic': 'SBI',
                'ExtraBoldItalic': 'EBI',
                'BlackItalic': 'BKI',
                'Thin': 'T',
                'ThinItalic': 'TI',
                'ExtraLight': 'EL',
                'ExtraLightItalic': 'ELI',
            }
            for w, path in grift_weights.items():
                pdf.add_font('Grift', style_map.get(w, ''), path, uni=True)
            grift_available = True
        except Exception as e:
            print(f'Font loading error: {e}')
            grift_available = False

if not grift_available:
    pdf.set_font('Helvetica', '', 10)

pdf.set_auto_page_break(auto=True, margin=18)
pdf.add_page()

# ==================== COVER PAGE ====================
if grift_available:
    pdf.set_font('Grift', 'B', 32)
else:
    pdf.set_font('Helvetica', 'B', 28)
pdf.set_text_color(28, 28, 22)
pdf.cell(0, 20, 'VOL.08', 0, 1, 'C')
if grift_available:
    pdf.set_font('Grift', 'B', 18)
else:
    pdf.set_font('Helvetica', 'B', 16)
pdf.set_text_color(201, 169, 110)
pdf.cell(0, 12, 'Plateforme B2B Privée', 0, 1, 'C')
pdf.ln(8)
if grift_available:
    pdf.set_font('Grift', '', 12)
else:
    pdf.set_font('Helvetica', '', 11)
pdf.set_text_color(80, 80, 80)
pdf.multi_cell(0, 8, 'Distribution professionnelle d\'ameublement & décoration\nMaroc & Afrique', align='C')
pdf.ln(15)

# Gold line
pdf.set_draw_color(201, 169, 110)
pdf.set_line_width(1.5)
pdf.line(60, pdf.get_y(), 150, pdf.get_y())
pdf.ln(15)

if grift_available:
    pdf.set_font('Grift', '', 11)
else:
    pdf.set_font('Helvetica', '', 10)
pdf.set_text_color(60, 60, 60)
info_items = [
    'Client : VOL.08 — Distribution professionnelle',
    'Stack : HTML5 / CSS3 / JavaScript (Vanilla)',
    'Design : Grift Font · Lucide Icons',
    'Hébergement : Statique (Vercel / Netlify)',
    'Date : Juillet 2026',
]
for item in info_items:
    pdf.cell(0, 8, item, 0, 1, 'C')
    pdf.ln(1)

# ==================== PAGE 2 - OVERVIEW ====================
pdf.add_page()
pdf.chapter_title('1. Résumé du Projet', level=1)
pdf.body_text('VOL.08 est une plateforme B2B privée de distribution professionnelle d\'ameublement et décoration haut de gamme, basée au Maroc et opérant en Afrique. Elle connecte les acheteurs du secteur de l\'aménagement (distributeurs, architectes, décorateurs) avec des fournisseurs premium marocains.')
pdf.body_text('La plateforme permet de sourcer, visualiser, sélectionner et commander du mobilier, de la décoration, des luminaires et des accessoires dans un espace professionnel sécurisé et dédié.')

pdf.chapter_title('Objectif Principal', level=2)
pdf.body_text('Transitionner la plateforme d\'un mode 100% privé vers une architecture hybride Publique + Privée, avec un portail vitrine accessible sans authentification et un espace client B2B sécurisé.')

pdf.chapter_title('Architecture Cible', level=2)
pdf.body_text('La nouvelle architecture se décompose en 4 zones distinctes :')
pdf.bullet_text('Portail Public — Landing page, catalogue public, fiches produits, inspirations, contact, FAQ, pages légales')
pdf.bullet_text('Zone Client B2B — Dashboard, commandes, devis, sélections, compte, support, notifications (après connexion)')
pdf.bullet_text('Zone Commerciale — Portefeuille clients, devis express, grilles tarifaires, relances, reporting (après connexion commerciale)')
pdf.bullet_text('Zone Admin — Gestion produits, clients, tarifs, médias, sécurité, paramètres, intégrations (après connexion admin)')

# ==================== PAGE 3 - ROLES ====================
pdf.add_page()
pdf.chapter_title('2. Rôles & Accès', level=1)

roles = [
    ('Client B2B', 'Catalogue, devis, commandes, support', 'Distributeurs, architectes, décorateurs'),
    ('Commercial', 'Portefeuille clients, devis express, grilles tarifaires, relances, reporting', 'Équipe commerciale VOL.08'),
    ('Administrateur', 'Produits, tarifs, clients, sécurité', 'Gestion de la plateforme'),
]
for role, access, desc in roles:
    pdf.chapter_title(f'Rôle : {role}', level=3)
    pdf.body_text(f'Accès : {access}')
    pdf.body_text(f'Description : {desc}')
    pdf.ln(2)

pdf.chapter_title('3. Stack Technique', level=1)
pdf.body_text('La plateforme est développée en technologie 100% statique, sans framework ni build tool, pour une simplicité de déploiement et une performance optimale.')

stack = [
    ('HTML5', 'Structure des pages'),
    ('CSS3', 'Styles et mise en page'),
    ('JavaScript (Vanilla)', 'Comportements UI, interactions'),
    ('Lucide Icons', 'Iconographie'),
    ('Grift Font', 'Typographie sur mesure (18 fichiers .otf)'),
]
for tech, usage in stack:
    pdf.bullet_text(f'{tech} — {usage}')

pdf.body_text('Hébergement : Statique, compatible Vercel, Netlify ou tout serveur HTTP.')

# ==================== PAGE 4 - DESIGN SYSTEM ====================
pdf.add_page()
pdf.chapter_title('4. Design System', level=1)
pdf.body_text('Deux thèmes partagent les mêmes tokens de design pour une cohérence visuelle entre le portail public et l\'espace privé.')

pdf.chapter_title('Palette de couleurs', level=2)
colors = [
    ('Fond principal', '#1c1c16', (28, 28, 22)),
    ('Surface / Cartes', '#2a2a24', (42, 42, 36)),
    ('Texte principal', '#f0f0ea', (240, 240, 234)),
    ('Texte secondaire', '#8a8a82', (138, 138, 130)),
    ('Bordures', '#3a3a34', (58, 58, 52)),
    ('Accent doré', '#c9a96e', (201, 169, 110)),
    ('Accent clair', '#e8d5a3', (232, 213, 163)),
]
for name, hex_color, rgb in colors:
    # Draw color swatch
    pdf.set_fill_color(*rgb)
    pdf.cell(8, 6, '', 1, 0, 'C', fill=True)
    pdf.set_font('Grift', '', 10)
    pdf.set_text_color(40, 40, 40)
    pdf.cell(60, 6, f' {name}', 0, 0, 'L')
    pdf.set_font('Grift', '', 10)
    pdf.set_text_color(100, 100, 100)
    pdf.cell(0, 6, f'{hex_color}', 0, 1, 'L')
    pdf.ln(2)

pdf.chapter_title('Composants UI', level=2)
components = [
    'Boutons : fond #c9a96e, texte foncé, border-radius 6px',
    'Sidebar : fond #1c1c16, largeur 240px, items avec icônes Lucide',
    'Topbar : fond #2a2a24, barre de recherche intégrée',
    'Cards : fond #2a2a24, border-radius 10px, box-shadow subtil',
    'Tables : pleine largeur, fond alterné, badges de statut (vert/jaune/bleu)',
    'Mobile : bottom navigation, menu hamburger',
    'Animations : transitions douces, transform scale subtil sur cartes',
]
for comp in components:
    pdf.bullet_text(comp)

# ==================== PAGE 5 - PUBLIC PAGES ====================
pdf.add_page()
pdf.chapter_title('5. Pages du Portail Public', level=1)
pdf.body_text('Le portail public est accessible sans authentification. Il sert de vitrine et permet la découverte des produits.')

public_pages = [
    ('index.html', 'Page d\'accueil publique', 'Landing page avec hero, collections, CTA inscription'),
    ('b2b.html', 'Page B2B publique', 'Présentation des avantages B2B'),
    ('catalogue.html', 'Catalogue public', 'Catalogue visible sans login (prix public TTC)'),
    ('collections.html', 'Collections', 'Vitrine des collections disponibles'),
    ('produit.html', 'Fiche produit publique', 'Détail produit en lecture publique'),
    ('univers.html', 'Univers', 'Page univers de la marque'),
    ('sourcing.html', 'Sourcing', 'Page de sourcing'),
    ('livraison.html', 'Livraison', 'Informations livraison'),
    ('comment-ca-marche.html', 'Comment ça marche', 'Guide d\'utilisation'),
    ('contact.html', 'Contact', 'Formulaire de contact'),
    ('faq.html', 'FAQ', 'Foire aux questions'),
    ('inspirations.html', 'Inspirations', 'Moodboard public'),
    ('mentions-legales.html', 'Mentions légales', 'Pages légales'),
    ('confidentialite.html', 'Confidentialité', 'Politique de confidentialité'),
    ('cgv-b2b.html', 'CGV B2B', 'Conditions générales de vente B2B'),
    ('inscription.html', 'Inscription', 'Formulaire d\'inscription professionnelle'),
    ('mot-de-passe-oublie.html', 'Mot de passe oublié', 'Réinitialisation mot de passe'),
    ('404.html', 'Page 404', 'Erreur 404 personnalisée'),
]

pdf.add_table_header(['Page', 'Nom', 'Description'], [50, 55, 85])
for i, (page, name, desc) in enumerate(public_pages):
    pdf.add_table_row([page, name, desc], [50, 55, 85], fill=(i % 2 == 1))

# ==================== PAGE 6 - PLATEFORME PAGES ====================
pdf.add_page()
pdf.chapter_title('6. Pages de la Plateforme Privée (plateforme/)', level=1)
pdf.body_text('Ces pages sont accessibles uniquement après connexion. Elles constituent l\'espace client B2B.')

plateforme_pages = [
    ('connexion.html', 'Connexion', 'Page de connexion élégante'),
    ('dashboard.html', 'Dashboard', 'Tableau de bord client avec stats et aperçus'),
    ('catalogue.html', 'Catalogue privé', 'Catalogue avec prix professionnels HT'),
    ('produit.html', 'Fiche produit', 'Détail complet avec fiches techniques'),
    ('favoris.html', 'Favoris', 'Gestion des listes de favoris'),
    ('devis.html', 'Panier & devis', 'Création et gestion des devis'),
    ('commandes.html', 'Commandes', 'Suivi des commandes avec statuts'),
    ('compte.html', 'Mon compte', 'Profil, utilisateurs, préférences'),
    ('notifications.html', 'Notifications', 'Centre de notifications'),
    ('support.html', 'Support', 'Assistance prioritaire'),
    ('inspirations.html', 'Inspirations', 'Moodboard et inspirations privées'),
]

pdf.add_table_header(['Page', 'Nom', 'Description'], [50, 45, 95])
for i, (page, name, desc) in enumerate(plateforme_pages):
    pdf.add_table_row([page, name, desc], [50, 45, 95], fill=(i % 2 == 1))

# ==================== PAGE 7 - COMMERCIAL PAGES ====================
pdf.add_page()
pdf.chapter_title('7. Espace Commercial (commercial/)', level=1)
pdf.body_text('Espace réservé à l\'équipe commerciale VOL.08 pour la gestion des clients et des devis.')

commercial_pages = [
    ('index.html', 'Portefeuille clients', 'Liste et gestion des clients B2B'),
    ('dashboard.html', 'Dashboard commercial', 'Vue d\'ensemble commerciale'),
    ('devis.html', 'Devis express', 'Création rapide de devis'),
    ('grilles-tarifaires.html', 'Grilles tarifaires', 'Consultation des tarifs'),
    ('client.html', 'Client détail', 'Fiche détail client'),
    ('nouveau-client.html', 'Nouveau client', 'Ajout d\'un nouveau client'),
    ('commandes.html', 'Commandes', 'Gestion des commandes commerciales'),
    ('selections-partagees.html', 'Sélections partagées', 'Sélections partagées avec clients'),
    ('relances.html', 'Relances', 'Gestion des relances clients'),
    ('reporting.html', 'Reporting', 'Rapports commerciaux'),
]

pdf.add_table_header(['Page', 'Nom', 'Description'], [50, 55, 85])
for i, (page, name, desc) in enumerate(commercial_pages):
    pdf.add_table_row([page, name, desc], [50, 55, 85], fill=(i % 2 == 1))

# ==================== PAGE 8 - ADMIN PAGES ====================
pdf.add_page()
pdf.chapter_title('8. Espace Administration (admin/)', level=1)
pdf.body_text('Interface d\'administration complète pour la gestion de la plateforme.')

admin_pages = [
    ('index.html', 'Dashboard admin', 'Vue d\'ensemble administration'),
    ('produits.html', 'Gestion produits', 'Ajout/modification/suppression produits'),
    ('clients.html', 'Gestion clients', 'Gestion des clients B2B'),
    ('commandes.html', 'Gestion commandes', 'Suivi et gestion des commandes'),
    ('devis.html', 'Gestion devis', 'Gestion des devis'),
    ('tarifs.html', 'Tarifs & grilles', 'Gestion des grilles de prix'),
    ('medias.html', 'Médias & documents', 'Upload et gestion des médias'),
    ('reporting.html', 'Reporting admin', 'Rapports et statistiques'),
    ('securite.html', 'Sécurité', 'Paramètres de sécurité'),
    ('parametres.html', 'Paramètres', 'Configuration générale'),
    ('integrations.html', 'Intégrations', 'Gestion des intégrations tierces'),
]

pdf.add_table_header(['Page', 'Nom', 'Description'], [50, 55, 85])
for i, (page, name, desc) in enumerate(admin_pages):
    pdf.add_table_row([page, name, desc], [50, 55, 85], fill=(i % 2 == 1))

# ==================== PAGE 9 - BACKUP & TRANSITION ====================
pdf.add_page()
pdf.chapter_title('9. Structure Complète du Projet', level=1)
pdf.body_text('Le projet contient plusieurs versions et dossiers de travail :')
pdf.bullet_text('Racine (/) — Pages publiques et pages privées mélangées (en cours de migration)')
pdf.bullet_text('plateforme/ — Version alternative de la plateforme privée (11 pages)')
pdf.bullet_text('commercial/ — Espace commercial (10 pages)')
pdf.bullet_text('admin/ — Espace administration (11 pages)')
pdf.bullet_text('Vol08 paltform priver b2b/ — Duplication/backup de la plateforme privée')
pdf.bullet_text('assets/ — Ressources (CSS, fonts Grift, images, JS, données JSON)')

pdf.chapter_title('Fichiers de documentation', level=2)
pdf.bullet_text('README.md — Documentation du projet')
pdf.bullet_text('md file projet.md — Spécifications fonctionnelles')
pdf.bullet_text('prompt-recreation.md — Prompts de recréation (FR/EN)')
pdf.bullet_text('script.js — Scripts globaux')
pdf.bullet_text('sitemap.xml / robots.txt — SEO')
pdf.bullet_text('site.webmanifest — PWA manifest')

pdf.chapter_title('Stratégie de Transition', level=2)
pdf.body_text('Phase 1 : Restructuration des fichiers — Déplacer les pages privées dans des sous-dossiers (app/) pour isoler le domaine public du domaine privé.')
pdf.body_text('Phase 2 : Catalogue Public vs Privé — Deux niveaux de catalogue avec prix public (TTC) vs prix pro (HT), fiches simplifiées vs complètes.')
pdf.body_text('Phase 3 : Simulateur d\'authentification — Vérification client-side avec localStorage en attendant le backend.')
pdf.body_text('Phase 4 : Design système unifié — Deux thèmes partageant les mêmes tokens de design.')

# ==================== PAGE 10 - CATALOGUE DIFF ====================
pdf.add_page()
pdf.chapter_title('10. Catalogue Public vs Privé', level=1)

pdf.add_table_header(['Élément', 'Public', 'Privé (connecté)'], [60, 65, 65])
catalogue_diff = [
    ('Visuels produits', 'Oui', 'Oui'),
    ('Noms & références', 'Oui', 'Oui'),
    ('Prix', 'Public (TTC)', 'Pro (HT)'),
    ('Fiches techniques', 'Version simplifiée', 'Version complète'),
    ('Stock & délais', 'Non', 'Oui'),
    ('Commande / Devis', 'CTA → inscription', 'Oui'),
]
for i, row in enumerate(catalogue_diff):
    pdf.add_table_row(row, [60, 65, 65], fill=(i % 2 == 1))

pdf.ln(8)
pdf.chapter_title('Fonctionnalités Client B2B', level=2)
features_b2b = [
    'Catalogue privé (400+ références)',
    'Fiches techniques et médias HD',
    'Prix professionnels HT',
    'Favoris & sélections personnalisées',
    'Panier & devis',
    'Commandes et suivi en temps réel',
    'Support client prioritaire',
    'Inspirations & moodboard',
]
for f in features_b2b:
    pdf.bullet_text(f)

pdf.chapter_title('Fonctionnalités Commercial', level=2)
features_comm = [
    'Portefeuille clients',
    'Devis express',
    'Grilles tarifaires',
    'Relances clients automatisées',
    'Reporting commercial',
]
for f in features_comm:
    pdf.bullet_text(f)

pdf.chapter_title('Fonctionnalités Admin', level=2)
features_admin = [
    'Gestion des produits et collections',
    'Gestion des médias et documents',
    'Gestion des clients',
    'Tarifs et grilles de prix',
    'Sécurité et paramètres',
    'Intégrations',
]
for f in features_admin:
    pdf.bullet_text(f)

# ==================== FINAL PAGE - SUMMARY ====================
pdf.add_page()
pdf.chapter_title('11. Résumé Exécutif', level=1)
pdf.body_text('VOL.08 est une plateforme B2B complète pour la distribution professionnelle d\'ameublement et décoration au Maroc et en Afrique. Avec 3 espaces distincts (Client B2B, Commercial, Admin) et plus de 30 pages fonctionnelles, elle couvre l\'ensemble du parcours professionnel : de la découverte du catalogue à la gestion administrative.')
pdf.body_text('Le projet est actuellement en phase de transition vers une architecture hybride Publique + Privée, avec pour objectif de rendre une partie du catalogue accessible sans authentification tout en préservant l\'espace privé pour les professionnels connectés.')

pdf.chapter_title('Chiffres clés', level=2)
stats = [
    '3 rôles utilisateurs (Client B2B, Commercial, Admin)',
    '3 zones d\'accès distinctes',
    '~32 pages HTML fonctionnelles',
    '11 pages dans plateforme/',
    '10 pages dans commercial/',
    '11 pages dans admin/',
    '18 fichiers de police Grift (.otf)',
    '400+ références produits dans le catalogue',
    'Stack 100% statique (HTML/CSS/JS vanilla)',
    'Design system avec accent doré #c9a96e',
]
for s in stats:
    pdf.bullet_text(s)

pdf.ln(10)
pdf.set_draw_color(201, 169, 110)
pdf.set_line_width(1)
pdf.line(60, pdf.get_y(), 150, pdf.get_y())
pdf.ln(8)
pdf.set_font('Grift', 'I', 10)
pdf.set_text_color(120, 120, 120)
pdf.cell(0, 8, 'VOL.08 — Plateforme B2B Privée — Juillet 2026', 0, 1, 'C')

# Save
output_path = '/Users/havetdigital/Desktop/ANAS HARBOUB/site web/vol.08 site 2/VOL08_Resume_Projet.pdf'
pdf.output(output_path)
print(f'PDF generated: {output_path}')
print(f'Total pages: {pdf.page_no()}')

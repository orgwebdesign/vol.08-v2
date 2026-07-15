(function() {
    var SECTIONS = {
        b2b: {
            title: 'Espace B2B',
            icon: 'layout-dashboard',
            items: [
                { href: '/dashboard.html', icon: 'layout-dashboard', label: 'Tableau de bord', pages: ['dashboard'] },
                { href: '/catalogue.html', icon: 'package', label: 'Catalogue', pages: ['catalogue', 'produit'] },
                { href: '/selections.html', icon: 'heart', label: 'Favoris & sélections', pages: ['selections'] },
                { href: '/devis.html', icon: 'file-text', label: 'Panier & devis', pages: ['devis'] },
                { href: '/commandes.html', icon: 'truck', label: 'Commandes', pages: ['commandes'] },
                { href: '/compte.html', icon: 'user', label: 'Mon compte', pages: ['compte'] }
            ]
        },
        commercial: {
            title: 'Espace Commercial',
            icon: 'briefcase',
            items: [
                { href: '/commercial/dashboard.html', icon: 'bar-chart', label: 'Tableau de bord', pages: ['dashboard'] },
                { href: '/commercial/index.html', icon: 'briefcase', label: 'Portefeuille clients', pages: ['index'] },
                { href: '/commercial/nouveau-client.html', icon: 'user-plus', label: 'Nouveau client', pages: ['nouveau'] },
                { href: '/commercial/devis.html', icon: 'file-signature', label: 'Devis express', pages: ['devis'] },
                { href: '/commercial/selections-partagees.html', icon: 'share-2', label: 'Sélections partagées', pages: ['selections'] },
                { href: '/commercial/grilles-tarifaires.html', icon: 'table', label: 'Grilles tarifaires', pages: ['grilles'] },
                { href: '/commercial/commandes.html', icon: 'truck', label: 'Commandes', pages: ['commandes'] },
                { href: '/commercial/relances.html', icon: 'bell', label: 'Relances', pages: ['relances'] },
                { href: '/commercial/reporting.html', icon: 'bar-chart-2', label: 'Reporting', pages: ['reporting'] }
            ]
        },
        admin: {
            title: 'Administration',
            icon: 'shield',
            items: [
                { href: '/admin/', icon: 'layout-dashboard', label: 'Tableau de bord', pages: ['admin'] },
                { href: '/admin/produits.html', icon: 'package', label: 'Produits', pages: ['produits'] },
                { href: '/admin/commandes.html', icon: 'truck', label: 'Commandes', pages: ['commandes'] },
                { href: '/admin/devis.html', icon: 'file-text', label: 'Devis', pages: ['devis'] },
                { href: '/admin/clients.html', icon: 'users', label: 'Clients', pages: ['clients'] },
                { href: '/admin/tarifs.html', icon: 'tag', label: 'Tarifs', pages: ['tarifs'] },
                { href: '/admin/medias.html', icon: 'image', label: 'Médias', pages: ['medias'] },
                { href: '/admin/securite.html', icon: 'shield', label: 'Sécurité', pages: ['securite'] },
                { href: '/admin/reporting.html', icon: 'bar-chart-2', label: 'Reporting', pages: ['reporting'] },
                { href: '/admin/parametres.html', icon: 'settings', label: 'Paramètres', pages: ['parametres'] }
            ]
        }
    };

    function detectActiveSection(path) {
        if (path.indexOf('/commercial/') !== -1) return 'commercial';
        if (path.indexOf('/admin/') !== -1) return 'admin';
        return 'b2b';
    }

    function isActiveItem(item, path) {
        var clean = path.replace(/\/+$/, '');
        var filename = clean.split('/').pop().replace('.html', '') || clean.split('/').pop();
        for (var i = 0; i < item.pages.length; i++) {
            if (item.pages[i] && filename === item.pages[i]) return true;
        }
        return false;
    }

    function buildSidebar() {
        var sidebar = document.querySelector('.sidebar');
        if (!sidebar) return;
        if (sidebar.dataset.shared === 'done') return;
        sidebar.dataset.shared = 'done';

        var path = window.location.pathname;
        var activeSection = detectActiveSection(path);

        var html = '';

        html += '<div class="sidebar-logo">';
        html += '<img src="/assets/img/logo%20Vol.08.svg" alt="VOL.08">';
        html += '<span>Espace Pro</span>';
        html += '</div>';

        if (activeSection !== 'b2b') {
            var section = SECTIONS[activeSection];
            html += '<a href="/dashboard.html" class="sidebar-back"><i data-lucide="arrow-left"></i></a>';
        }

        html += '<div class="sidebar-scroll">';

        if (activeSection === 'b2b') {
            html += '<nav class="sidebar-nav">';
            html += '<div class="sidebar-label">Navigation</div>';
            var b2b = SECTIONS.b2b;
            for (var i = 0; i < b2b.items.length; i++) {
                var item = b2b.items[i];
                var active = isActiveItem(item, path);
                html += '<a href="' + item.href + '" class="sidebar-item' + (active ? ' active' : '') + '">';
                html += '<i data-lucide="' + item.icon + '"></i> ' + item.label;
                html += '</a>';
            }
            html += '</nav>';
        } else {
            var section = SECTIONS[activeSection];
            html += '<nav class="sidebar-nav">';
            html += '<div class="sidebar-label">' + section.title + '</div>';
            for (var i = 0; i < section.items.length; i++) {
                var item = section.items[i];
                var active = isActiveItem(item, path);
                html += '<a href="' + item.href + '" class="sidebar-item' + (active ? ' active' : '') + '">';
                html += '<i data-lucide="' + item.icon + '"></i> ' + item.label;
                html += '</a>';
            }
            html += '</nav>';
        }

        html += '</div>';

        html += '<div class="sidebar-spaces">';
        html += '<div class="sidebar-spaces-label">Espaces</div>';

        var keys = ['b2b', 'commercial', 'admin'];
        for (var s = 0; s < keys.length; s++) {
            var key = keys[s];
            var sec = SECTIONS[key];
            var isActive = key === activeSection;
            var href = key === 'b2b' ? '/dashboard.html' : key === 'commercial' ? '/commercial/dashboard.html' : '/admin/';
            html += '<a href="' + href + '" class="sidebar-space-item' + (isActive ? ' active' : '') + '">';
            html += '<i data-lucide="' + sec.icon + '"></i> ' + sec.title;
            html += '</a>';
        }

        html += '</div>';

        html += '<div class="sidebar-user">';
        html += '<div class="sidebar-avatar">KB</div>';
        html += '<div class="sidebar-user-info">';
        html += '<div class="sidebar-user-name">Karim Benali</div>';
        html += '<div class="sidebar-user-role">Commercial • Benali Design</div>';
        html += '</div>';
        html += '</div>';

        sidebar.innerHTML = html;

        if (typeof lucide !== 'undefined') lucide.createIcons();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', buildSidebar);
    } else {
        buildSidebar();
    }
})();

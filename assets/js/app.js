document.addEventListener('DOMContentLoaded', () => {

  lucide.createIcons();

  // Sidebar toggle
  const menuToggle = document.getElementById('menuToggle');
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebarOverlay');

  if (menuToggle && sidebar && overlay) {
    const open = () => {
      sidebar.classList.add('open');
      overlay.classList.add('open');
      document.body.classList.add('sidebar-open');
    };
    const close = () => {
      sidebar.classList.remove('open');
      overlay.classList.remove('open');
      document.body.classList.remove('sidebar-open');
    };
    menuToggle.addEventListener('click', open);
    overlay.addEventListener('click', close);
    // Swipe to close sidebar
    let startX = 0;
    sidebar.addEventListener('touchstart', (e) => { startX = e.touches[0].clientX; }, { passive: true });
    sidebar.addEventListener('touchmove', (e) => {
      const dx = e.touches[0].clientX - startX;
      if (dx < -50) { close(); }
    }, { passive: true });
  }

  // Active nav item
  const navItems = document.querySelectorAll('.sidebar-item');
  navItems.forEach(item => {
    if (item.dataset.page === document.body.dataset.page) {
      item.classList.add('active');
    }
  });

  // Notifications toggle
  const notifToggle = document.getElementById('notifToggle');
  const notifDropdown = document.getElementById('notifDropdown');

  if (notifToggle && notifDropdown) {
    notifToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      notifDropdown.classList.toggle('open');
    });
    document.addEventListener('click', () => {
      notifDropdown.classList.remove('open');
    });
    notifDropdown.addEventListener('click', (e) => e.stopPropagation());
  }

  // Tabs
  document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => {
      const parent = tab.closest('.tabs');
      parent.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const target = tab.dataset.tab;
      document.querySelectorAll('.tab-content').forEach(c => c.style.display = 'none');
      const content = document.getElementById(target);
      if (content) content.style.display = 'block';
    });
  });

  // Table row click (produit.html)
  document.querySelectorAll('tr[data-href]').forEach(row => {
    row.style.cursor = 'pointer';
    row.addEventListener('click', () => {
      window.location.href = row.dataset.href;
    });
  });

  // Mobile: auto-label table cells from thead
  function labelMobileTables() {
    document.querySelectorAll('table').forEach(table => {
      const headers = [];
      const thead = table.querySelector('thead');
      if (!thead) return;
      thead.querySelectorAll('th').forEach(th => {
        headers.push(th.textContent.trim());
      });
      table.querySelectorAll('tbody tr').forEach(row => {
        row.querySelectorAll('td').forEach((td, i) => {
          if (headers[i]) {
            td.dataset.label = headers[i];
          }
        });
      });
    });
  }
  labelMobileTables();

  // Search: open overlay on click, submit on Enter
  const searchTrigger = document.querySelector('.topbar-search');
  const searchOverlay = document.getElementById('searchOverlay');
  const searchOverlayInput = document.getElementById('searchOverlayInput');
  const searchOverlayClose = document.getElementById('searchOverlayClose');
  function performSearch(query) {
    const q = query.trim();
    if (!q) return;
    sessionStorage.setItem('vol08_search_query', q);
    const isRoot = !window.location.pathname.includes('/plateforme/') && !window.location.pathname.includes('/commercial/');
    const base = isRoot ? 'plateforme/' : '';
    window.location.href = base + 'catalogue.html?search=' + encodeURIComponent(q);
  }
  if (searchTrigger && searchOverlay) {
    searchTrigger.addEventListener('click', (e) => {
      if (window.innerWidth <= 640) {
        e.preventDefault();
        searchOverlay.classList.add('open');
        setTimeout(() => { if (searchOverlayInput) searchOverlayInput.focus(); }, 100);
      }
    });
    if (searchOverlayClose) {
      searchOverlayClose.addEventListener('click', () => {
        searchOverlay.classList.remove('open');
      });
    }
    const topbarInput = searchTrigger.querySelector('input');
    if (topbarInput) {
      topbarInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') performSearch(topbarInput.value);
      });
    }
  }
  if (searchOverlayInput) {
    searchOverlayInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        performSearch(searchOverlayInput.value);
        searchOverlay.classList.remove('open');
      }
    });
  }

  // Bottom nav active state
  const currentPage = document.body.dataset.page || '';
  document.querySelectorAll('.mobile-bottom-nav a').forEach(a => {
    const href = a.getAttribute('href');
    if (href && currentPage && href.includes(currentPage)) {
      a.classList.add('active');
    }
  });

});

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('b2bForm');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const prenom = document.getElementById('b2bPrenom').value.trim();
        const nom = document.getElementById('b2bNom').value.trim();
        const email = document.getElementById('b2bEmail').value.trim();
        const entreprise = document.getElementById('b2bEntreprise').value.trim();
        const site_web = document.getElementById('b2bSite').value.trim();
        const statut = document.getElementById('b2bStatut').value;
        const pays = document.getElementById('b2bPays').value;
        const message = document.getElementById('b2bMessage').value.trim();

        const ref = 'VOL-' + Date.now().toString(36).toUpperCase() + '-' + Math.random().toString(36).substring(2, 6).toUpperCase();

        const request = {
            id: ref,
            prenom,
            nom,
            email,
            entreprise,
            site_web,
            statut,
            pays,
            message,
            date: new Date().toISOString(),
            status: 'pending'
        };

        const requests = JSON.parse(localStorage.getItem('vol08_b2b_requests') || '[]');
        requests.push(request);
        localStorage.setItem('vol08_b2b_requests', JSON.stringify(requests));

        document.getElementById('requestRef').textContent = ref;
        document.getElementById('confirmModal').classList.add('active');

        form.reset();
    });

    document.getElementById('confirmModal').addEventListener('click', (e) => {
        if (e.target === e.currentTarget) {
            e.currentTarget.classList.remove('active');
        }
    });
});

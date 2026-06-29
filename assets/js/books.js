document.addEventListener('DOMContentLoaded', () => {
    function loadModal(url, btnId, modalId, closeBtnId) {
        fetch(url)
            .then(response => {
                if (!response.ok) throw new Error("Failed to load component " + url);
                return response.text();
            })
            .then(html => {
                document.body.insertAdjacentHTML('beforeend', html);
                const btn = document.getElementById(btnId);
                const modal = document.getElementById(modalId);
                const closeBtn = document.getElementById(closeBtnId);

                if (!btn || !modal || !closeBtn) return;

                btn.addEventListener('click', () => {
                    modal.classList.add('active');
                    document.body.style.overflow = 'hidden';
                });

                closeBtn.addEventListener('click', () => {
                    modal.classList.remove('active');
                    document.body.style.overflow = '';
                });

                modal.addEventListener('click', (e) => {
                    if (e.target === modal) {
                        modal.classList.remove('active');
                        document.body.style.overflow = '';
                    }
                });

                document.addEventListener('keydown', (e) => {
                    if (e.key === 'Escape' && modal.classList.contains('active')) {
                        modal.classList.remove('active');
                        document.body.style.overflow = '';
                    }
                });
            })
            .catch(err => {
                console.error("Error loading modal component:", err);
                console.warn("Agar siz faylni to'g'ridan-to'g'ri (file://) ochgan bo'lsangiz, fetch() ishlamasligi mumkin.");
            });
    }

    loadModal('components/books-modal.html', 'badiiy-btn', 'booksModal', 'closeBooksModal');
    loadModal('components/shaxsiy-modal.html', 'shaxsiy-btn', 'shaxsiyModal', 'closeShaxsiyModal');
});

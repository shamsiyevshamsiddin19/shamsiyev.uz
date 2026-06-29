document.addEventListener('DOMContentLoaded', () => {
    // Fetch the books modal HTML component
    fetch('components/books-modal.html')
        .then(response => {
            if (!response.ok) throw new Error("Failed to load component");
            return response.text();
        })
        .then(html => {
            // Inject the HTML at the end of the body
            document.body.insertAdjacentHTML('beforeend', html);
            
            // Initialize modal logic
            const badiiyBtn = document.getElementById('badiiy-btn');
            const booksModal = document.getElementById('booksModal');
            const closeBooksModal = document.getElementById('closeBooksModal');

            if (!badiiyBtn || !booksModal || !closeBooksModal) return;

            badiiyBtn.addEventListener('click', () => {
                booksModal.classList.add('active');
                document.body.style.overflow = 'hidden';
            });

            closeBooksModal.addEventListener('click', () => {
                booksModal.classList.remove('active');
                document.body.style.overflow = '';
            });

            booksModal.addEventListener('click', (e) => {
                if (e.target === booksModal) {
                    booksModal.classList.remove('active');
                    document.body.style.overflow = '';
                }
            });

            // Close on Escape key
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && booksModal.classList.contains('active')) {
                    booksModal.classList.remove('active');
                    document.body.style.overflow = '';
                }
            });
        })
        .catch(err => {
            console.error("Error loading books modal component:", err);
            // Fallback for local testing if CORS blocks fetch
            console.warn("Agar siz faylni to'g'ridan-to'g'ri (file://) ochgan bo'lsangiz, fetch() ishlamasligi mumkin. Live Server ishlating.");
        });
});

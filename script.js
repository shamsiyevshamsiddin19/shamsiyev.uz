document.addEventListener('DOMContentLoaded', () => {
    // Navigation highlighting
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

    // Prevent form submission for demo
    const form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = form.querySelector('.btn');
            const originalText = btn.textContent;
            btn.textContent = 'MESSAGE SENT!';
            btn.style.background = '#fff';
            btn.style.color = '#000';
            
            setTimeout(() => {
                btn.textContent = originalText;
                btn.style.background = 'transparent';
                btn.style.color = '#fff';
                form.reset();
            }, 3000);
        });
    }

    // SQL Skill Rotator
    const sqlSkill = document.getElementById('sql-skill');
    if (sqlSkill) {
        const sqlLangs = ['PostgreSQL', 'SQLite', 'MySQL'];
        let sqlIndex = 0;
        sqlSkill.style.transition = 'opacity 0.3s ease';
        
        setInterval(() => {
            sqlSkill.style.opacity = 0;
            setTimeout(() => {
                sqlIndex = (sqlIndex + 1) % sqlLangs.length;
                sqlSkill.textContent = sqlLangs[sqlIndex];
                sqlSkill.style.opacity = 1;
            }, 300);
        }, 2000);
    }
});

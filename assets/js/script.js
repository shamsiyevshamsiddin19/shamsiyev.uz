"use strict";
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
                current = section.getAttribute('id') || '';
            }
        });
        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href && href.includes(current)) {
                link.classList.add('active');
            }
        });
    });
    // Handle form submission via FormSubmit AJAX
    const form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = form.querySelector('.btn');
            const originalText = btn.textContent || '';
            btn.textContent = 'SENDING...';
            const formData = new FormData(form);
            fetch("https://formsubmit.co/ajax/ad5c1a6b8cec65f29d902ec3c0012c9d", {
                method: "POST",
                body: formData
            })
                .then(response => response.json())
                .then(data => {
                btn.textContent = 'MESSAGE SENT!';
                btn.style.background = '#fff';
                btn.style.color = '#000';
                setTimeout(() => {
                    btn.textContent = originalText;
                    btn.style.background = 'transparent';
                    btn.style.color = '#fff';
                    form.reset();
                }, 3000);
            })
                .catch(error => {
                btn.textContent = 'ERROR!';
                setTimeout(() => {
                    btn.textContent = originalText;
                }, 3000);
            });
        });
    }
    // Infinite Native Momentum Marquee Setup
    const friendsCarousel = document.querySelector('.friends-carousel');
    if (friendsCarousel) {
        const cards = Array.from(friendsCarousel.children);
        if (cards.length > 0) {
            const group = document.createElement('div');
            group.className = 'marquee-group';
            cards.forEach(card => group.appendChild(card));
            const content = document.createElement('div');
            content.className = 'marquee-content';
            // We use 3 groups to allow endless scrolling in both directions safely
            content.appendChild(group.cloneNode(true));
            content.appendChild(group);
            content.appendChild(group.cloneNode(true));
            friendsCarousel.appendChild(content);
            setTimeout(() => {
                const groupWidth = content.children[0].offsetWidth;
                friendsCarousel.scrollLeft = groupWidth;
                let isHovered = false;
                let isTouching = false;
                let autoScrollSpeed = 1;
                let scrollAccumulator = friendsCarousel.scrollLeft;
                friendsCarousel.addEventListener('mouseenter', () => isHovered = true);
                friendsCarousel.addEventListener('mouseleave', () => isHovered = false);
                friendsCarousel.addEventListener('touchstart', () => isTouching = true, { passive: true });
                friendsCarousel.addEventListener('touchend', () => isTouching = false);
                function animate() {
                    if (!isHovered && !isTouching) {
                        scrollAccumulator += autoScrollSpeed;
                        friendsCarousel.scrollLeft = scrollAccumulator;
                    }
                    else {
                        scrollAccumulator = friendsCarousel.scrollLeft;
                    }
                    if (friendsCarousel.scrollLeft >= groupWidth * 2) {
                        friendsCarousel.scrollLeft -= groupWidth;
                        scrollAccumulator -= groupWidth;
                    }
                    else if (friendsCarousel.scrollLeft <= 0) {
                        friendsCarousel.scrollLeft += groupWidth;
                        scrollAccumulator += groupWidth;
                    }
                    requestAnimationFrame(animate);
                }
                requestAnimationFrame(animate);
                friendsCarousel.addEventListener('scroll', () => {
                    if (friendsCarousel.scrollLeft >= groupWidth * 2) {
                        friendsCarousel.scrollLeft -= groupWidth;
                        scrollAccumulator = friendsCarousel.scrollLeft;
                    }
                    else if (friendsCarousel.scrollLeft <= 0) {
                        friendsCarousel.scrollLeft += groupWidth;
                        scrollAccumulator = friendsCarousel.scrollLeft;
                    }
                });
            }, 200);
        }
    }
    // SQL Skill Rotator
    const sqlSkill = document.getElementById('sql-skill');
    if (sqlSkill) {
        const sqlLangs = ['PostgreSQL', 'SQLite', 'MySQL'];
        let sqlIndex = 0;
        sqlSkill.style.transition = 'opacity 0.5s ease-in-out';
        setInterval(() => {
            sqlSkill.style.opacity = '0';
            setTimeout(() => {
                sqlIndex = (sqlIndex + 1) % sqlLangs.length;
                sqlSkill.textContent = sqlLangs[sqlIndex];
                sqlSkill.style.opacity = '1';
            }, 500);
        }, 4000);
    }
    // Python Framework Rotator
    const pySkill = document.getElementById('py-skill');
    if (pySkill) {
        const pyLangs = ['Django', 'FastAPI', 'Flask'];
        let pyIndex = 0;
        pySkill.style.transition = 'opacity 0.5s ease-in-out';
        setInterval(() => {
            pySkill.style.opacity = '0';
            setTimeout(() => {
                pyIndex = (pyIndex + 1) % pyLangs.length;
                pySkill.textContent = pyLangs[pyIndex];
                pySkill.style.opacity = '1';
            }, 500);
        }, 4000);
    }
    // Web Skill Rotator
    const webSkill = document.getElementById('web-skill');
    if (webSkill) {
        const webLangs = ['Node.js', 'HTML', 'CSS', 'TypeScript'];
        let webIndex = 0;
        webSkill.style.transition = 'opacity 0.5s ease-in-out';
        setInterval(() => {
            webSkill.style.opacity = '0';
            setTimeout(() => {
                webIndex = (webIndex + 1) % webLangs.length;
                webSkill.textContent = webLangs[webIndex];
                webSkill.style.opacity = '1';
            }, 500);
        }, 4000);
    }
    // Tools Skill Rotator
    const toolsSkill = document.getElementById('tools-skill');
    if (toolsSkill) {
        const toolsLangs = ['Docker', 'Redis', 'Celery'];
        let toolsIndex = 0;
        toolsSkill.style.transition = 'opacity 0.5s ease-in-out';
        setInterval(() => {
            toolsSkill.style.opacity = '0';
            setTimeout(() => {
                toolsIndex = (toolsIndex + 1) % toolsLangs.length;
                toolsSkill.textContent = toolsLangs[toolsIndex];
                toolsSkill.style.opacity = '1';
            }, 500);
        }, 4000);
    }
    // C++ Skill Rotator
    const cppSkill = document.getElementById('cpp-skill');
    if (cppSkill) {
        const cppLangs = ['OOP', 'Data Structures', 'Algorithms'];
        let cppIndex = 0;
        cppSkill.style.transition = 'opacity 0.5s ease-in-out';
        setInterval(() => {
            cppSkill.style.opacity = '0';
            setTimeout(() => {
                cppIndex = (cppIndex + 1) % cppLangs.length;
                cppSkill.textContent = cppLangs[cppIndex];
                cppSkill.style.opacity = '1';
            }, 500);
        }, 4000);
    }
    // Git Skill Rotator
    const gitSkill = document.getElementById('git-skill');
    if (gitSkill) {
        const gitLangs = ['Version Control', 'CI/CD', 'GitHub Actions'];
        let gitIndex = 0;
        gitSkill.style.transition = 'opacity 0.5s ease-in-out';
        setInterval(() => {
            gitSkill.style.opacity = '0';
            setTimeout(() => {
                gitIndex = (gitIndex + 1) % gitLangs.length;
                gitSkill.textContent = gitLangs[gitIndex];
                gitSkill.style.opacity = '1';
            }, 500);
        }, 4000);
    }

    // Side Panel Toggle Logic
    const logoBtn = document.getElementById('logoBtn');
    const sidePanel = document.getElementById('sidePanel');
    const closePanelBtn = document.getElementById('closePanelBtn');

    if (logoBtn && sidePanel && closePanelBtn) {
        logoBtn.addEventListener('click', (e) => {
            e.preventDefault();
            sidePanel.classList.add('open');
        });

        closePanelBtn.addEventListener('click', () => {
            sidePanel.classList.remove('open');
        });

        // Close on clicking outside
        document.addEventListener('click', (e) => {
            if (sidePanel.classList.contains('open') && !sidePanel.contains(e.target) && !logoBtn.contains(e.target)) {
                sidePanel.classList.remove('open');
            }
        });
    }
});

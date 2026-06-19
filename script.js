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

    // Handle form submission via FormSubmit AJAX
    const form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = form.querySelector('.btn');
            const originalText = btn.textContent;
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

    // Infinite Friends Marquee Setup
    const friendsCarousel = document.querySelector('.friends-carousel');
    if (friendsCarousel) {
        const cards = Array.from(friendsCarousel.children);
        if (cards.length > 0) {
            const group = document.createElement('div');
            group.className = 'marquee-group';
            cards.forEach(card => group.appendChild(card));
            
            const content = document.createElement('div');
            content.className = 'marquee-content';
            content.appendChild(group);
            content.appendChild(group.cloneNode(true));
            
            friendsCarousel.appendChild(content);
        }
    }

    // SQL Skill Rotator
    const sqlSkill = document.getElementById('sql-skill');
    if (sqlSkill) {
        const sqlLangs = ['PostgreSQL', 'SQLite', 'MySQL'];
        let sqlIndex = 0;
        sqlSkill.style.transition = 'opacity 0.5s ease-in-out';
        
        setInterval(() => {
            sqlSkill.style.opacity = 0;
            setTimeout(() => {
                sqlIndex = (sqlIndex + 1) % sqlLangs.length;
                sqlSkill.textContent = sqlLangs[sqlIndex];
                sqlSkill.style.opacity = 1;
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
            pySkill.style.opacity = 0;
            setTimeout(() => {
                pyIndex = (pyIndex + 1) % pyLangs.length;
                pySkill.textContent = pyLangs[pyIndex];
                pySkill.style.opacity = 1;
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
            webSkill.style.opacity = 0;
            setTimeout(() => {
                webIndex = (webIndex + 1) % webLangs.length;
                webSkill.textContent = webLangs[webIndex];
                webSkill.style.opacity = 1;
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
            toolsSkill.style.opacity = 0;
            setTimeout(() => {
                toolsIndex = (toolsIndex + 1) % toolsLangs.length;
                toolsSkill.textContent = toolsLangs[toolsIndex];
                toolsSkill.style.opacity = 1;
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
            cppSkill.style.opacity = 0;
            setTimeout(() => {
                cppIndex = (cppIndex + 1) % cppLangs.length;
                cppSkill.textContent = cppLangs[cppIndex];
                cppSkill.style.opacity = 1;
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
            gitSkill.style.opacity = 0;
            setTimeout(() => {
                gitIndex = (gitIndex + 1) % gitLangs.length;
                gitSkill.textContent = gitLangs[gitIndex];
                gitSkill.style.opacity = 1;
            }, 500);
        }, 4000);
    }
    // Premium CV/Resume Magic Button
    const cvBtn = document.querySelector('.cv-btn');
    if (cvBtn) {
        cvBtn.style.position = 'relative';
        cvBtn.style.width = '240px'; 
        cvBtn.style.overflow = 'hidden';
        
        cvBtn.innerHTML = `
            <span style="visibility: hidden;">DOWNLOAD RESUME</span>
            <span id="cv-text-1" style="position: absolute; left: 0; top: 50%; transform: translateY(-50%); width: 100%; text-align: center; transition: all 1.2s cubic-bezier(0.68, -0.55, 0.265, 1.55);">DOWNLOAD CV</span>
            <span id="cv-text-2" style="position: absolute; left: 0; top: 50%; transform: translateY(100%); opacity: 0; width: 100%; text-align: center; transition: all 1.2s cubic-bezier(0.68, -0.55, 0.265, 1.55);">DOWNLOAD RESUME</span>
        `;
        
        const t1 = document.getElementById('cv-text-1');
        const t2 = document.getElementById('cv-text-2');
        let state = 0;
        
        setInterval(() => {
            if (state === 0) {
                // Show 2, hide 1
                t1.style.transform = 'translateY(-200%)';
                t1.style.opacity = '0';
                
                t2.style.transition = 'all 1.2s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
                t2.style.transform = 'translateY(-50%)';
                t2.style.opacity = '1';
                
                setTimeout(() => {
                    t1.style.transition = 'none';
                    t1.style.transform = 'translateY(100%)';
                }, 1200);
                
                state = 1;
            } else {
                // Show 1, hide 2
                t2.style.transform = 'translateY(-200%)';
                t2.style.opacity = '0';
                
                t1.style.transition = 'all 1.2s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
                t1.style.transform = 'translateY(-50%)';
                t1.style.opacity = '1';
                
                setTimeout(() => {
                    t2.style.transition = 'none';
                    t2.style.transform = 'translateY(100%)';
                }, 1200);
                
                state = 0;
            }
        }, 6000);
    }
});

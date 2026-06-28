document.addEventListener('DOMContentLoaded', () => {
    const loader = document.getElementById('loader');
    const mainContent = document.getElementById('main-content');
    const cursorGlow = document.getElementById('cursor-glow');
    const bgMesh = document.getElementById('bg-mesh');
    const profileCard = document.getElementById('profile-card');
    const reflectionSweep = document.getElementById('reflection-sweep');
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const typedTextElement = document.getElementById('typed-text');
    const counters = document.querySelectorAll('.stat-counter');
    const socialButtons = document.querySelectorAll('.social-btn');

    const avatarGlow = document.getElementById('avatar-glow');
    const avatarFrame = document.getElementById('avatar-frame');
    const profileName = document.getElementById('profile-name');
    const profileBio = document.getElementById('profile-bio');
    const ctaButton = document.getElementById('cta-button');
    const stackTitle = document.getElementById('stack-title');
    const footprintTitle = document.getElementById('footprint-title');
    const pageFooter = document.getElementById('page-footer');
    const profileLeftPanel = document.getElementById('profile-left-panel');
    const statusDot = document.getElementById('status-dot');
    const skillBadges = document.querySelectorAll('.skill-badge');
    const statBoxes = document.querySelectorAll('.stat-box');
    const statLabels = document.querySelectorAll('.stat-label');

    // 1. Initial Transition Loader Delay
    setTimeout(() => {
        loader.style.opacity = '0';
        loader.style.pointerEvents = 'none';
        document.body.classList.remove('loading-active');

        setTimeout(() => {
            mainContent.classList.remove('opacity-0', 'translate-y-8');
            triggerCounters();
            startTypingEngine();
        }, 200);
    }, 1000);

    // 2. Interactive Cursor Position
    document.addEventListener('mousemove', (e) => {
        if (cursorGlow && document.documentElement.classList.contains('dark')) {
            cursorGlow.style.left = `${e.clientX}px`;
            cursorGlow.style.top = `${e.clientY}px`;
        }
    });

    // 3. Card Perspective Motion Framework Effect
    if (window.innerWidth > 1024) {
        profileCard.addEventListener('mousemove', (e) => {
            const rect = profileCard.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const xc = rect.width / 2;
            const yc = rect.height / 2;
            const angleX = (yc - y) / 25;
            const angleY = (x - xc) / 25;

            profileCard.style.transform = `rotateX(${angleX}deg) rotateY(${angleY}deg) scale(1.01)`;
            if (reflectionSweep) {
                reflectionSweep.style.transform = `translateX(${(x / rect.width) * 100}%) translateY(${(y / rect.height) * 100}%)`;
            }
        });

        profileCard.addEventListener('mouseleave', () => {
            profileCard.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)';
            if (reflectionSweep) {
                reflectionSweep.style.transform = 'translateX(-100%)';
            }
        });
    }

    // 4. Content Text Typing Engine Loops
    const rolesList = ["Backend Web Developer", "Blogger & Traveller", "API Architect", "Open Source Contributor"];
    let roleIdx = 0, charIdx = 0, isDeleting = false;

    function startTypingEngine() {
        const currentStr = rolesList[roleIdx];
        if (isDeleting) {
            typedTextElement.textContent = currentStr.substring(0, charIdx - 1);
            charIdx--;
        } else {
            typedTextElement.textContent = currentStr.substring(0, charIdx + 1);
            charIdx++;
        }

        let typingSpeed = isDeleting ? 40 : 100;
        if (!isDeleting && charIdx === currentStr.length) {
            typingSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIdx === 0) {
            isDeleting = false;
            roleIdx = (roleIdx + 1) % rolesList.length;
            typingSpeed = 400;
        }
        setTimeout(startTypingEngine, typingSpeed);
    }

    // 5. Statistics Counter System
    function triggerCounters() {
        counters.forEach(counter => {
            counter.textContent = '0';
            const targetValue = parseInt(counter.getAttribute('data-target'), 10);
            const stepsCount = 40;
            const incrementStep = targetValue / stepsCount;
            const hasPlus = counter.classList.contains('has-plus') ? '+' : '';
            let currentCount = 0;
            let currentStep = 0;

            const updateTimer = setInterval(() => {
                currentCount += incrementStep;
                currentStep++;
                if (currentStep >= stepsCount) {
                    counter.textContent = targetValue + hasPlus;
                    clearInterval(updateTimer);
                } else {
                    counter.textContent = Math.floor(currentCount);
                }
            }, 25);
        });
    }

    // 6. Social Element Tracking Movement Animations
    socialButtons.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - (rect.width / 2);
            const y = e.clientY - rect.top - (rect.height / 2);
            btn.style.transform = `translate(${x * 0.35}px, ${y * 0.35}px) scale(1.1)`;
        });
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate(0px, 0px) scale(1)';
        });
    });

    // 7. Theme Structural Mutation Engine
    themeToggle.addEventListener('click', () => {
        const htmlTag = document.documentElement;

        if (htmlTag.classList.contains('dark')) {
            htmlTag.classList.remove('dark');
            htmlTag.classList.add('light');

            // LIGHT THEME DESIGN: Elegant, Clean Premium Editorial Grid
            document.body.className = "bg-brand-lightBg text-slate-900 min-h-screen relative flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-500";
            if (bgMesh) bgMesh.style.display = 'none';
            if (cursorGlow) cursorGlow.style.display = 'none';

            // High-contrast solid container styling
            profileCard.className = "bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-10 shadow-xl relative overflow-hidden transition-all duration-500 card-container";
            themeToggle.className = "w-10 h-10 rounded-xl flex items-center justify-center bg-slate-100 text-amber-500 border border-slate-200 shadow-sm transition-all duration-300 transform hover:scale-105";
            themeIcon.className = 'fa-solid fa-sun text-lg';

            // Left Profile Section Restyling
            if (avatarGlow) avatarGlow.className = "hidden"; // Hide wild neon ring in editorial look
            avatarFrame.className = "relative w-36 h-36 rounded-full bg-slate-50 border-4 border-slate-100 shadow-md overflow-hidden transition-all duration-500";
            statusDot.className = "absolute bottom-1 right-2 bg-emerald-500 w-5 h-5 rounded-full border-4 border-white shadow-sm animate-pulse";

            profileName.className = "text-3xl font-extrabold tracking-tight text-slate-900 mb-1.5 transition-all duration-500";
            typedTextElement.className = "text-indigo-600 font-bold tracking-wider text-sm uppercase";
            profileBio.className = "text-slate-600 text-sm leading-relaxed mb-6 font-medium transition-all duration-500";

            // Premium solid flat CTA button instead of neon gradients
            ctaButton.className = "px-6 py-3 w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-xl text-center transition-all duration-300 shadow-sm group flex items-center justify-center space-x-2";

            // Heading Structural Highlights
            stackTitle.className = "text-xs uppercase tracking-widest text-slate-500 font-bold mb-4 flex items-center transition-all duration-500";
            footprintTitle.className = "text-xs uppercase tracking-widest text-slate-500 font-bold mb-4 flex items-center transition-all duration-500";
            profileLeftPanel.className = "lg:col-span-5 flex flex-col items-center lg:items-start text-center lg:text-left border-b lg:border-b-0 lg:border-r border-slate-200/80 pb-8 lg:pb-0 lg:pr-8 transition-all duration-500";
            pageFooter.className = "mt-6 text-center text-[11px] font-bold tracking-wider text-slate-400 uppercase px-4 flex flex-col sm:flex-row justify-between items-center gap-2 transition-all duration-500";

            // Grid Sub-elements transformations
            skillBadges.forEach(badge => {
                badge.className = "skill-badge bg-slate-50 border border-slate-200/70 px-3.5 py-1.5 rounded-xl text-xs font-bold text-slate-700 hover:text-indigo-600 hover:border-indigo-200 hover:bg-indigo-50/30 transition-all duration-300 cursor-default flex items-center space-x-1.5";
            });
            statBoxes.forEach(box => {
                box.className = "stat-box bg-slate-50 border border-slate-200/60 p-4 rounded-2xl text-center shadow-sm transition-all duration-300";
            });
            statLabels.forEach(label => {
                label.className = "stat-label text-[10px] uppercase font-bold tracking-wider text-slate-400 mt-1";
            });
            socialButtons.forEach(btn => {
                btn.className = "social-btn bg-slate-50 border border-slate-200/80 h-12 rounded-xl flex items-center justify-center text-slate-500 hover:text-indigo-600 hover:bg-indigo-50/50 hover:border-indigo-200 text-xl transition-all duration-300 shadow-sm";
            });

        } else {
            htmlTag.classList.remove('light');
            htmlTag.classList.add('dark');

            // DARK THEME DESIGN: Immersive Neon Cyberpunk Glassmorphism
            document.body.className = "bg-brand-darkBg text-gray-100 min-h-screen relative flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-500";
            if (bgMesh) bgMesh.style.display = 'block';
            if (cursorGlow) cursorGlow.style.display = 'block';

            profileCard.className = "bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden transition-all duration-500 card-container";
            themeToggle.className = "w-10 h-10 rounded-xl flex items-center justify-center bg-white/5 text-gray-400 border border-white/10 shadow-lg hover:text-brand-cyan transition-all duration-300 transform hover:scale-105";
            themeIcon.className = 'fa-solid fa-moon text-lg';

            // Left Profile Section Return Dark Architecture
            if (avatarGlow) avatarGlow.className = "absolute -inset-1 bg-gradient-to-r from-brand-cyan via-brand-purple to-brand-pink rounded-full blur opacity-75 group-hover:opacity-100 transition duration-700 group-hover:duration-200 animate-tilt";
            avatarFrame.className = "relative w-36 h-36 rounded-full bg-gray-900 border-2 border-white/10 overflow-hidden transition-all duration-500";
            statusDot.className = "absolute bottom-1 right-2 bg-emerald-500 w-5 h-5 rounded-full border-4 border-brand-darkBg shadow-md animate-pulse";

            profileName.className = "text-3xl font-extrabold tracking-tight mb-2 text-white transition-all duration-500";
            typedTextElement.className = "text-brand-cyan font-semibold tracking-wide text-sm uppercase";
            profileBio.className = "text-gray-400 text-sm leading-relaxed mb-6 font-medium transition-all duration-500";

            // Glow button return
            ctaButton.className = "px-6 py-3 w-full bg-gradient-to-r from-brand-cyan/20 to-brand-purple/20 hover:from-brand-cyan hover:to-brand-purple text-white font-semibold rounded-xl border border-brand-cyan/30 hover:border-transparent text-center transition-all duration-500 transform hover:-translate-y-1 shadow-lg hover:shadow-brand-cyan/20 group flex items-center justify-center space-x-2";

            stackTitle.className = "text-xs uppercase tracking-widest text-gray-400 font-bold mb-4 flex items-center transition-all duration-500";
            footprintTitle.className = "text-xs uppercase tracking-widest text-gray-400 font-bold mb-4 flex items-center transition-all duration-500";
            profileLeftPanel.className = "lg:col-span-5 flex flex-col items-center lg:items-start text-center lg:text-left border-b lg:border-b-0 lg:border-r border-white/10 pb-8 lg:pb-0 lg:pr-8 transition-all duration-500";
            pageFooter.className = "mt-6 text-center text-[11px] font-semibold tracking-wider text-gray-500 uppercase px-4 flex flex-col sm:flex-row justify-between items-center gap-2 transition-all duration-500";

            // Grid structural reversions
            skillBadges.forEach(badge => {
                badge.className = "skill-badge bg-white/5 border border-white/10 px-3.5 py-1.5 rounded-xl text-xs font-semibold text-gray-300 hover:text-brand-cyan transition-all duration-300 cursor-default flex items-center space-x-1.5";
            });
            statBoxes.forEach(box => {
                box.className = "stat-box bg-white/5 border border-white/10 p-4 rounded-2xl text-center group transition-all duration-300";
            });
            statLabels.forEach(label => {
                label.className = "stat-label text-[10px] uppercase font-bold tracking-wider text-gray-500 mt-1";
            });
            socialButtons.forEach(btn => {
                btn.className = "social-btn bg-white/5 border border-white/10 h-12 rounded-xl flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-800/50 text-xl transition-all duration-300 shadow-sm";
            });
        }
    });
});
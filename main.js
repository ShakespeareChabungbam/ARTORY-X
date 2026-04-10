/* ================================================================
   ARTORYX — main.js v8  |  Premium GIF Edition
   ================================================================ */

'use strict';

/* ─── PAGE LOADER DISMISS ─────────────────────────────────── */
const loader = document.getElementById('page-loader');
if (loader) {
    const dismissLoader = () => {
        // Wait at least 2s so the progress bar animation completes
        const elapsed = performance.now();
        const delay = Math.max(0, 2000 - elapsed);
        setTimeout(() => {
            loader.classList.add('hidden');
            setTimeout(() => loader.remove(), 1000);
        }, delay);
    };
    if (document.readyState === 'complete') {
        dismissLoader();
    } else {
        window.addEventListener('load', dismissLoader);
    }
}

/* ─── SCROLL PROGRESS ──────────────────────────────────────────── */
const progressBar = document.getElementById('scroll-progress');
if (progressBar) {
    window.addEventListener('scroll', () => {
        const s = document.documentElement;
        const pct = (s.scrollTop / (s.scrollHeight - s.clientHeight)) * 100;
        progressBar.style.width = pct + '%';
    }, { passive: true });
}

/* ─── NAVBAR SCROLL STATE ──────────────────────────────────────── */
const navbar = document.getElementById('navbar');
if (navbar) {
    const onNavScroll = () => {
        navbar.classList.toggle('scrolled', window.scrollY > 40);
    };
    window.addEventListener('scroll', onNavScroll, { passive: true });
    onNavScroll();
}

/* ─── NAVBAR LOGO ENTRANCE ─────────────────────────────────────── */
const navLogo = document.querySelector('.nav-logo-img');
if (navLogo) {
    navLogo.style.opacity = '0';
    navLogo.style.transform = 'translateY(-6px)';
    navLogo.style.transition = 'opacity 0.7s cubic-bezier(0.22,1,0.36,1), transform 0.7s cubic-bezier(0.22,1,0.36,1)';
    window.addEventListener('load', () => {
        setTimeout(() => {
            navLogo.style.opacity = '1';
            navLogo.style.transform = 'translateY(0)';
        }, 120);
    });
}

/* ─── MOBILE MENU ──────────────────────────────────────────────── */
const mobileMenu  = document.getElementById('mobile-menu');
const menuToggle  = document.getElementById('menu-toggle');

if (menuToggle && mobileMenu) {
    let menuOpen = false;

    const openMenu = () => {
        menuOpen = true;
        mobileMenu.style.display = 'flex';
        mobileMenu.offsetHeight; // force reflow — enables CSS transition
        mobileMenu.style.opacity = '1';
        mobileMenu.style.transform = 'translateY(0) scale(1)';
        menuToggle.classList.add('open');
        document.body.style.overflow = 'hidden';
    };

    const closeMenu = () => {
        menuOpen = false;
        mobileMenu.style.opacity = '0';
        mobileMenu.style.transform = 'translateY(-14px) scale(0.98)';
        menuToggle.classList.remove('open');
        document.body.style.overflow = '';
        setTimeout(() => {
            if (!menuOpen) mobileMenu.style.display = 'none';
        }, 420);
    };

    menuToggle.addEventListener('click', () => {
        menuOpen ? closeMenu() : openMenu();
    });

    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', closeMenu);
    });
}


/* ─── CURSOR GLOW FOLLOWER ─────────────────────────────────────── */
const cursorGlow = document.querySelector('.cursor-glow');
if (cursorGlow && window.matchMedia('(pointer: fine)').matches) {
    let cx = window.innerWidth / 2, cy = window.innerHeight / 2;
    let tx = cx, ty = cy;
    let isVisible = false;

    document.addEventListener('mousemove', e => {
        tx = e.clientX;
        ty = e.clientY;
        if (!isVisible) {
            isVisible = true;
            cursorGlow.style.opacity = '1';
        }
    }, { passive: true });

    document.addEventListener('mouseleave', () => {
        isVisible = false;
        cursorGlow.style.opacity = '0';
    });

    cursorGlow.style.opacity = '0';
    cursorGlow.style.transition = 'opacity 0.6s ease';

    const animateCursor = () => {
        // Smooth lerp — faster = 0.1, silkier = 0.055
        cx += (tx - cx) * 0.058;
        cy += (ty - cy) * 0.058;
        cursorGlow.style.left = cx + 'px';
        cursorGlow.style.top  = cy + 'px';
        requestAnimationFrame(animateCursor);
    };
    animateCursor();
}

/* ─── SCROLL REVEAL (staggered bento) ─────────────────────────── */
const revealEls = document.querySelectorAll('.reveal, .reveal-scale');
if (revealEls.length) {
    const io = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                io.unobserve(entry.target);
            }
        });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(el => io.observe(el));
}

/* ─── BENTO CARD STAGGER ───────────────────────────────────────── */
const bentoCards = document.querySelectorAll('.bento-grid .bento-card');
if (bentoCards.length) {
    const bio = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const cards = entry.target.querySelectorAll('.bento-card');
                cards.forEach((card, i) => {
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, i * 90);
                });
                bio.unobserve(entry.target);
            }
        });
    }, { threshold: 0.05 });

    document.querySelectorAll('.bento-grid').forEach(grid => {
        // Set initial state for stagger
        grid.querySelectorAll('.bento-card').forEach(card => {
            if (!card.classList.contains('reveal')) {
                card.style.opacity = '0';
                card.style.transform = 'translateY(32px)';
                card.style.transition = 'opacity 0.8s cubic-bezier(0.22,1,0.36,1), transform 0.8s cubic-bezier(0.22,1,0.36,1)';
            }
        });
        bio.observe(grid);
    });
}

/* ─── INJECT BENTO CARD SHIMMER ELEMENT ────────────────────────── */
document.querySelectorAll('.bento-card').forEach(card => {
    if (!card.querySelector('.card-shimmer')) {
        const shimmer = document.createElement('div');
        shimmer.className = 'card-shimmer';
        card.appendChild(shimmer);
    }
});

/* ─── SPLIT TEXT HERO ──────────────────────────────────────────── */
const splitChars = document.querySelectorAll('.split-chars');
splitChars.forEach(el => {
    el.style.visibility = 'visible';
    const html = el.innerHTML;
    const lines = html.split('<br>');
    el.innerHTML = lines.map((line, li) =>
        `<span style="display:block;overflow:hidden;">
            <span style="display:block;transform:translateY(100%);opacity:0;animation:wordReveal 0.9s cubic-bezier(0.22,1,0.36,1) ${0.15 + li * 0.18}s forwards;">
                ${line}
            </span>
        </span>`
    ).join('');
});

/* CSS for split text (injected dynamically) */
const splitStyle = document.createElement('style');
splitStyle.textContent = `
    @keyframes wordReveal {
        to { transform: translateY(0); opacity: 1; }
    }
`;
document.head.appendChild(splitStyle);

/* ─── NUMBER COUNTER ANIMATION ─────────────────────────────────── */
const counterEls = document.querySelectorAll('[data-count]');
if (counterEls.length) {
    const easeOutQuart = t => 1 - Math.pow(1 - t, 4);
    const animateCount = (el) => {
        const target   = +el.dataset.count;
        const suffix   = el.dataset.suffix || '';
        const duration = 1800;
        const start    = performance.now();
        const tick = (now) => {
            const t   = Math.min((now - start) / duration, 1);
            const val = Math.round(easeOutQuart(t) * target);
            el.textContent = val + suffix;
            if (t < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
    };

    const cio = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCount(entry.target);
                cio.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    counterEls.forEach(el => cio.observe(el));
}

/* ─── PARALLAX BACKGROUNDS (lerp-smoothed) ─────────────────────── */
const parallaxImgs = document.querySelectorAll('[data-parallax]');
if (parallaxImgs.length) {
    const pState = new Map();
    parallaxImgs.forEach(img => pState.set(img, { cur: 0, tar: 0 }));

    const updateParallaxTargets = () => {
        parallaxImgs.forEach(img => {
            const section = img.closest('.section-bg') || img.parentElement;
            const rect    = section.getBoundingClientRect();
            const speed   = parseFloat(img.dataset.parallax) || 0.3;
            const state   = pState.get(img);
            if (state) state.tar = rect.top * speed * 0.4;
        });
    };

    const parallaxTick = () => {
        parallaxImgs.forEach(img => {
            const section = img.closest('.section-bg') || img.parentElement;
            const rect    = section.getBoundingClientRect();
            if (rect.bottom < -200 || rect.top > window.innerHeight + 200) return;
            const state  = pState.get(img);
            state.cur += (state.tar - state.cur) * 0.08;
            img.style.transform = `scale(1.12) translateY(${state.cur}px)`;
        });
        requestAnimationFrame(parallaxTick);
    };

    window.addEventListener('scroll', updateParallaxTargets, { passive: true });
    updateParallaxTargets();
    parallaxTick();
}

/* ─── PARTICLES ─────────────────────────────────────────────────── */
const particleContainer = document.getElementById('particles');
if (particleContainer) {
    const count = window.innerWidth < 768 ? 16 : 30;
    for (let i = 0; i < count; i++) {
        const p = document.createElement('div');
        const size    = Math.random() * 2 + 1;
        const opacity = Math.random() * 0.35 + 0.1;
        const delay   = Math.random() * 8;
        const dur     = Math.random() * 10 + 14;
        const x       = Math.random() * 100;
        const y       = Math.random() * 100;
        const colorChoices = [
            'rgba(139,92,246,', 'rgba(167,139,250,',
            'rgba(245,158,11,', 'rgba(34,197,94,',
        ];
        const color = colorChoices[Math.floor(Math.random() * colorChoices.length)];

        Object.assign(p.style, {
            position: 'absolute',
            width: size + 'px', height: size + 'px',
            borderRadius: '50%',
            background: `${color}${opacity})`,
            left: x + '%', top: y + '%',
            boxShadow: `0 0 ${size * 4}px ${color}${opacity * 0.7})`,
            animation: `particleDrift ${dur}s ease-in-out ${delay}s infinite`,
            willChange: 'transform, opacity',
            pointerEvents: 'none',
        });
        particleContainer.appendChild(p);
    }
}

/* ─── MAGNETIC BUTTONS ──────────────────────────────────────────── */
const magnetBtns = document.querySelectorAll('.btn-primary');
magnetBtns.forEach(btn => {
    const strength = 0.28;
    btn.addEventListener('mousemove', e => {
        const r   = btn.getBoundingClientRect();
        const dx  = e.clientX - (r.left + r.width / 2);
        const dy  = e.clientY - (r.top  + r.height / 2);
        btn.style.transform = `translateY(-3px) scale(1.02) translate(${dx * strength}px, ${dy * strength * 0.5}px)`;
    });
    btn.addEventListener('mouseleave', () => {
        btn.style.transform = '';
        btn.style.transition = 'transform 0.5s cubic-bezier(0.22,1,0.36,1)';
        setTimeout(() => { btn.style.transition = ''; }, 500);
    });
});

/* ─── SECTION AMBIENT BG ────────────────────────────────────────── */
const ambientSections = document.querySelectorAll('[data-ambient-color]');
if (ambientSections.length) {
    const ambientIO = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const color = entry.target.dataset.ambientColor;
                document.body.style.backgroundColor = color || '#030305';
            }
        });
    }, { threshold: 0.4 });
    ambientSections.forEach(s => ambientIO.observe(s));

    window.addEventListener('scroll', () => {
        if (window.scrollY < 100) document.body.style.backgroundColor = '#030305';
    }, { passive: true });
}

/* ─── SMOOTH CARD TILT ──────────────────────────────────────────── */
if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    const tiltCards = document.querySelectorAll('.glass-card, .bento-card, .floating-card');
    tiltCards.forEach(card => {
        card.addEventListener('mousemove', e => {
            const r    = card.getBoundingClientRect();
            const x    = (e.clientX - r.left) / r.width  - 0.5;
            const y    = (e.clientY - r.top)  / r.height - 0.5;
            card.style.transform = `perspective(700px) rotateX(${-y * 4}deg) rotateY(${x * 4}deg) translateY(-5px)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
            card.style.transition = 'transform 0.55s cubic-bezier(0.22,1,0.36,1)';
            setTimeout(() => { card.style.transition = ''; }, 550);
        });
    });
}

/* ─── ACTIVE NAV LINK ───────────────────────────────────────────── */
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
        link.classList.add('active');
    }
});

/* ─── PAGE ENTER ANIMATION ──────────────────────────────────────── */
document.body.classList.add('page-enter');

/* ─── MARQUEE PAUSE ON HOVER ────────────────────────────────────── */
const marqueeTrack = document.querySelector('.marquee-track');
if (marqueeTrack) {
    const wrapper = marqueeTrack.parentElement;
    if (wrapper) {
        wrapper.addEventListener('mouseenter', () => {
            marqueeTrack.style.animationPlayState = 'paused';
        });
        wrapper.addEventListener('mouseleave', () => {
            marqueeTrack.style.animationPlayState = 'running';
        });
    }
}

/* ─── GLOW LINE TRIGGER ─────────────────────────────────────────── */
const glowLines = document.querySelectorAll('.glow-line');
if (glowLines.length) {
    const glio = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                const pseudo = e.target;
                pseudo.style.opacity = '0';
                requestAnimationFrame(() => {
                    pseudo.style.opacity = '1';
                });
            }
        });
    }, { threshold: 0.1 });
    glowLines.forEach(l => glio.observe(l));
}

/* ─── SPOTLIGHT ON BENTO CARDS ─────────────────────────────────── */
document.querySelectorAll('.bento-card').forEach(card => {
    let spotlight = card.querySelector('.spotlight');
    if (!spotlight) {
        spotlight = document.createElement('div');
        spotlight.className = 'spotlight';
        card.appendChild(spotlight);
    }

    card.addEventListener('mousemove', e => {
        const r = card.getBoundingClientRect();
        const x = ((e.clientX - r.left) / r.width)  * 100;
        const y = ((e.clientY - r.top)  / r.height) * 100;
        spotlight.style.setProperty('--x', x + '%');
        spotlight.style.setProperty('--y', y + '%');
        spotlight.style.opacity = '1';
    });
    card.addEventListener('mouseleave', () => {
        spotlight.style.opacity = '0';
    });
});

/* ─── CONSOLE SIGNATURE ─────────────────────────────────────────── */
console.log(
    '%c ArtoryX Studio ',
    'background: linear-gradient(135deg, #6d28d9, #8b5cf6); color: #fff; padding: 6px 12px; border-radius: 8px; font-weight: bold; font-size: 14px;',
    '\nBuilt with ♥ by Shakespeare Chabungbam — shakespearechabungbam.online'
);

/* ─── SMOOTH PAGE TRANSITIONS ───────────────────────────────────── */
document.querySelectorAll('a[href]').forEach(link => {
    const href = link.getAttribute('href');
    if (!href || href.startsWith('mailto') || href.startsWith('tel') ||
        href.startsWith('https') || href.startsWith('http') ||
        link.hasAttribute('target')) return;

    // Anchor links — native smooth scroll
    if (href.startsWith('#')) {
        link.addEventListener('click', e => {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
        return;
    }

    // Internal page links — smooth fade-out transition
    link.addEventListener('click', e => {
        e.preventDefault();
        document.body.style.opacity = '0';
        document.body.style.transform = 'translateY(6px)';
        document.body.style.transition = 'opacity 0.38s cubic-bezier(0.22,1,0.36,1), transform 0.38s cubic-bezier(0.22,1,0.36,1)';
        setTimeout(() => { window.location.href = href; }, 360);
    });
});

/* ─── SPOTLIGHT ON GLASS CARDS ──────────────────────────────────── */
if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    document.querySelectorAll('.glass-card').forEach(card => {
        let spotlight = card.querySelector('.spotlight');
        if (!spotlight) {
            spotlight = document.createElement('div');
            spotlight.className = 'spotlight';
            card.appendChild(spotlight);
        }
        card.addEventListener('mousemove', e => {
            const r = card.getBoundingClientRect();
            const x = ((e.clientX - r.left) / r.width)  * 100;
            const y = ((e.clientY - r.top)  / r.height) * 100;
            spotlight.style.setProperty('--x', x + '%');
            spotlight.style.setProperty('--y', y + '%');
            spotlight.style.opacity = '1';
        });
        card.addEventListener('mouseleave', () => {
            spotlight.style.opacity = '0';
        });
    });
}

/* ─── COUNT CARD TILT ───────────────────────────────────────────── */
if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    document.querySelectorAll('.count-card').forEach(card => {
        card.addEventListener('mousemove', e => {
            const r = card.getBoundingClientRect();
            const x = (e.clientX - r.left) / r.width  - 0.5;
            const y = (e.clientY - r.top)  / r.height - 0.5;
            card.style.transform = `perspective(600px) rotateX(${-y * 5}deg) rotateY(${x * 5}deg) translateY(-4px)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
            card.style.transition = 'transform 0.55s cubic-bezier(0.22,1,0.36,1)';
            setTimeout(() => { card.style.transition = ''; }, 550);
        });
    });
}

/* ─── FLOAT ANIMATION ON SCROLL STOP ───────────────────────────── */
let scrollTimer;
window.addEventListener('scroll', () => {
    document.querySelectorAll('.float-subtle').forEach(el => {
        el.style.animationPlayState = 'paused';
    });
    clearTimeout(scrollTimer);
    scrollTimer = setTimeout(() => {
        document.querySelectorAll('.float-subtle').forEach(el => {
            el.style.animationPlayState = 'running';
        });
    }, 200);
}, { passive: true });

/* ─── ANIMATED GRADIENT BORDER ON BENTO (CSS @property fallback) ── */
/* Inject keyframes for conic-gradient rotation if supported */
if (CSS.supports && CSS.supports('background', 'conic-gradient(red, blue)')) {
    const angleStyle = document.createElement('style');
    angleStyle.textContent = `
        @property --angle {
            syntax: '<angle>';
            initial-value: 0deg;
            inherits: false;
        }
        @keyframes borderSpin {
            to { --angle: 360deg; }
        }
        .bento-card:hover::before {
            animation: borderSpin 3s linear infinite;
        }
    `;
    document.head.appendChild(angleStyle);
}
/* ─── FAQ ACCORDION ─────────────────────────────────────────────── */
const faqItems = document.querySelectorAll('.faq-item');
if (faqItems.length) {
    faqItems.forEach(item => {
        const btn = item.querySelector('.faq-question');
        if (!btn) return;
        btn.addEventListener('click', () => {
            const isOpen = item.classList.contains('open');
            faqItems.forEach(i => {
                i.classList.remove('open');
                const b = i.querySelector('.faq-question');
                if (b) b.setAttribute('aria-expanded', 'false');
            });
            if (!isOpen) {
                item.classList.add('open');
                btn.setAttribute('aria-expanded', 'true');
            }
        });
    });
}

/* ===== BRIGHT FUTURE — DESIGN INTERACTIONS ===== */

// ── Scroll Reveal ──────────────────────────────────────────
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ── Animated Number Counter ────────────────────────────────
function animateCounter(el) {
    const target = parseInt(el.dataset.target, 10);
    const suffix = el.dataset.suffix || '';
    const duration = 1800;
    const start = performance.now();

    function update(now) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        // Ease-out cubic
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(eased * target);
        el.textContent = current.toLocaleString() + suffix;
        if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
}

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounter(entry.target);
            counterObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('[data-target]').forEach(el => counterObserver.observe(el));

// ── Active Nav Highlight ───────────────────────────────────
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('nav a[href]').forEach(link => {
    // Don't underline the logo or primary enroll buttons
    if (link.classList.contains('group') || link.classList.contains('btn-glow')) return;

    if (link.getAttribute('href') === currentPage) {
        link.classList.add('text-blue-700', 'border-b-2', 'border-blue-700', 'pb-0.5');
        link.classList.remove('text-slate-500', 'text-slate-600');
    }
});

// ── Mobile Navigation Toggle ───────────────────────────────
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

if (mobileMenuBtn && mobileMenu) {
    const menuIcon = mobileMenuBtn.querySelector('.menu-icon');

    function closeMenu() {
        mobileMenu.classList.remove('scale-y-100', 'opacity-100');
        mobileMenu.classList.add('scale-y-0', 'opacity-0');
        setTimeout(() => {
            mobileMenu.classList.add('hidden');
        }, 300); // Wait for transition. duration-300
        if (menuIcon) menuIcon.textContent = 'menu';
    }

    function openMenu() {
        mobileMenu.classList.remove('hidden');
        // Small delay to allow element to render before adding transition classes
        setTimeout(() => {
            mobileMenu.classList.remove('scale-y-0', 'opacity-0');
            mobileMenu.classList.add('scale-y-100', 'opacity-100');
        }, 10);
        if (menuIcon) menuIcon.textContent = 'close';
    }

    mobileMenuBtn.addEventListener('click', () => {
        if (!mobileMenu.classList.contains('hidden') && mobileMenu.classList.contains('opacity-100')) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    // Close on link click
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // Close on window resize outside mobile breakpoint
    window.addEventListener('resize', () => {
        if (window.innerWidth >= 768 && (!mobileMenu.classList.contains('hidden') || mobileMenu.classList.contains('opacity-100'))) {
            closeMenu();
        }
    });
}

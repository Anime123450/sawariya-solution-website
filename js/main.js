/* =========================================================
   Sawariya Solution — Interactions
   ========================================================= */
(function () {
  'use strict';

  const $  = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));

  /* ---- Current year ---- */
  const yearEl = $('#year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---- Theme toggle (white default, dark optional) ---- */
  const themeBtn = $('#themeToggle');
  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      if (isDark) {
        document.documentElement.removeAttribute('data-theme');
        try { localStorage.setItem('theme', 'light'); } catch (e) {}
      } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        try { localStorage.setItem('theme', 'dark'); } catch (e) {}
      }
    });
  }

  /* ---- Sticky header shadow ---- */
  const header = $('#header');
  const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 10);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---- Mobile navigation drawer ---- */
  const hamburger = $('#hamburger');
  const nav = $('#nav');
  const overlay = $('#navOverlay');

  const closeNav = () => {
    nav.classList.remove('active');
    overlay.classList.remove('active');
    hamburger.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  };
  const openNav = () => {
    nav.classList.add('active');
    overlay.classList.add('active');
    hamburger.classList.add('active');
    hamburger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  };

  hamburger.addEventListener('click', () =>
    nav.classList.contains('active') ? closeNav() : openNav()
  );
  overlay.addEventListener('click', closeNav);

  /* Mobile mega-menu accordions */
  $$('.has-mega .nav__toggle').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      if (window.innerWidth <= 960) {
        e.preventDefault();
        const parent = btn.closest('.has-mega');
        const isOpen = parent.classList.toggle('open');
        btn.setAttribute('aria-expanded', String(isOpen));
      }
    });
  });

  /* Close drawer when a link is clicked */
  $$('#nav a[href^="#"]').forEach((a) =>
    a.addEventListener('click', () => { if (window.innerWidth <= 960) closeNav(); })
  );

  /* Reset drawer state when resizing up to desktop */
  let rt;
  window.addEventListener('resize', () => {
    clearTimeout(rt);
    rt = setTimeout(() => {
      if (window.innerWidth > 960) {
        closeNav();
        $$('.has-mega.open').forEach((el) => el.classList.remove('open'));
      }
      setupSlider();
    }, 150);
  });

  /* ---- Reveal on scroll ---- */
  const revealEls = $$('.reveal');
  if ('IntersectionObserver' in window) {
    const ro = new IntersectionObserver((entries, obs) => {
      entries.forEach((en) => {
        if (en.isIntersecting) {
          en.target.classList.add('in');
          obs.unobserve(en.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach((el, i) => {
      el.style.transitionDelay = ((i % 4) * 60) + 'ms';
      ro.observe(el);
    });
  } else {
    revealEls.forEach((el) => el.classList.add('in'));
  }

  /* ---- Animated counters ---- */
  const counters = $$('.count');
  const runCounter = (el) => {
    const target = parseFloat(el.dataset.target) || 0;
    const suffix = el.dataset.suffix || '';
    const dur = 1600;
    const start = performance.now();
    const step = (now) => {
      const p = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased) + suffix + (p === 1 ? '+' : '');
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  if ('IntersectionObserver' in window && counters.length) {
    const co = new IntersectionObserver((entries, obs) => {
      entries.forEach((en) => {
        if (en.isIntersecting) { runCounter(en.target); obs.unobserve(en.target); }
      });
    }, { threshold: 0.5 });
    counters.forEach((c) => co.observe(c));
  } else {
    counters.forEach((c) => (c.textContent = c.dataset.target + '+'));
  }

  /* ---- Back to top ---- */
  const toTop = $('#toTop');
  const toggleTop = () => toTop.classList.toggle('show', window.scrollY > 600);
  toggleTop();
  window.addEventListener('scroll', toggleTop, { passive: true });
  toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  /* ---- Testimonials slider ---- */
  const track = $('#testiTrack');
  const dotsWrap = $('#testiDots');
  const prevBtn = $('#testiPrev');
  const nextBtn = $('#testiNext');
  let slides, perView, maxIndex, index = 0, autoTimer;

  function slidesPerView() {
    if (window.innerWidth <= 520) return 1;
    if (window.innerWidth <= 760) return 2;
    return 3;
  }

  function goTo(i) {
    index = Math.max(0, Math.min(i, maxIndex));
    const slideW = slides[0].getBoundingClientRect().width;
    track.style.transform = `translateX(${-index * slideW}px)`;
    $$('button', dotsWrap).forEach((d, di) => d.classList.toggle('active', di === index));
  }

  function buildDots() {
    dotsWrap.innerHTML = '';
    for (let i = 0; i <= maxIndex; i++) {
      const b = document.createElement('button');
      b.setAttribute('aria-label', 'Go to slide ' + (i + 1));
      b.addEventListener('click', () => { goTo(i); restartAuto(); });
      dotsWrap.appendChild(b);
    }
  }

  function setupSlider() {
    if (!track) return;
    slides = $$('.slide', track);
    perView = slidesPerView();
    maxIndex = Math.max(0, slides.length - perView);
    buildDots();
    if (index > maxIndex) index = maxIndex;
    goTo(index);
  }

  function next() { goTo(index >= maxIndex ? 0 : index + 1); }
  function prev() { goTo(index <= 0 ? maxIndex : index - 1); }

  function startAuto() { autoTimer = setInterval(next, 5000); }
  function restartAuto() { clearInterval(autoTimer); startAuto(); }

  if (track) {
    nextBtn.addEventListener('click', () => { next(); restartAuto(); });
    prevBtn.addEventListener('click', () => { prev(); restartAuto(); });

    /* touch / swipe */
    let x0 = null;
    const slider = $('#testimonialSlider');
    slider.addEventListener('touchstart', (e) => (x0 = e.touches[0].clientX), { passive: true });
    slider.addEventListener('touchend', (e) => {
      if (x0 === null) return;
      const dx = e.changedTouches[0].clientX - x0;
      if (Math.abs(dx) > 45) { dx < 0 ? next() : prev(); restartAuto(); }
      x0 = null;
    }, { passive: true });

    slider.addEventListener('mouseenter', () => clearInterval(autoTimer));
    slider.addEventListener('mouseleave', startAuto);

    setupSlider();
    startAuto();
  }

  /* ---- Contact form (front-end validation + feedback) ---- */
  const form = $('#contactForm');
  if (form) {
    const note = $('#formNote');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      note.className = 'form__note';
      note.textContent = '';
      let valid = true;

      const required = [
        { el: $('#cf-name'),    test: (v) => v.trim().length >= 2 },
        { el: $('#cf-email'),   test: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) },
        { el: $('#cf-message'), test: (v) => v.trim().length >= 10 },
      ];

      required.forEach(({ el, test }) => {
        const field = el.closest('.field');
        const ok = test(el.value);
        field.classList.toggle('invalid', !ok);
        if (!ok) valid = false;
      });

      if (!valid) {
        note.classList.add('err');
        note.textContent = 'Please fill in your name, a valid email and a short message.';
        return;
      }

      const btn = form.querySelector('button[type="submit"]');
      btn.disabled = true;
      btn.textContent = 'Sending...';
      setTimeout(() => {
        form.reset();
        btn.disabled = false;
        btn.textContent = 'Send Message';
        note.classList.add('ok');
        note.textContent = 'Thank you! Your message has been received. We will get back to you within one business day.';
      }, 900);
    });

    /* clear invalid state on input */
    $$('#contactForm input, #contactForm textarea').forEach((el) =>
      el.addEventListener('input', () => el.closest('.field').classList.remove('invalid'))
    );
  }
})();

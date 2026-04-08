(function () {
    'use strict';

    /* ---- Age Counter ---- */
    var BIRTHDATE = new Date('2004-08-04T01:36:00+05:30').getTime();
    var MS_PER_YEAR = 365.25 * 24 * 60 * 60 * 1000;

    function initAgeCounter() {
        var el = document.getElementById('age-counter');
        if (!el) return;

        function tick() {
            var age = (Date.now() - BIRTHDATE) / MS_PER_YEAR;
            el.textContent = age.toFixed(9);
            requestAnimationFrame(tick);
        }
        tick();
    }

    /* ---- Navbar ---- */
    function initNavbar() {
        var navbar = document.getElementById('navbar');
        var lastY = 0;
        var ticking = false;

        window.addEventListener('scroll', function () {
            if (!ticking) {
                requestAnimationFrame(function () {
                    var y = window.scrollY;
                    navbar.classList.toggle('scrolled', y > 60);
                    navbar.classList.toggle('hidden', y > 300 && y > lastY);
                    lastY = y;
                    ticking = false;
                });
                ticking = true;
            }
        });
    }

    /* ---- Scroll Reveal ---- */
    function initReveal() {
        var els = document.querySelectorAll('.reveal');
        if (!els.length) return;

        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (e) {
                if (e.isIntersecting) {
                    e.target.classList.add('visible');
                    observer.unobserve(e.target);
                }
            });
        }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

        els.forEach(function (el) { observer.observe(el); });
    }

    /* ---- Cursor Glow (desktop only) ---- */
    function initCursorGlow() {
        if (!window.matchMedia('(pointer: fine)').matches) return;

        var glow = document.createElement('div');
        glow.className = 'cursor-glow';
        document.body.appendChild(glow);

        document.addEventListener('mousemove', function (e) {
            glow.style.left = e.clientX + 'px';
            glow.style.top = e.clientY + 'px';
        });
    }

    /* ---- Magnetic Button ---- */
    function initMagnetic() {
        var btns = document.querySelectorAll('.nav-cta');
        btns.forEach(function (btn) {
            btn.addEventListener('mousemove', function (e) {
                var r = btn.getBoundingClientRect();
                var x = e.clientX - r.left - r.width / 2;
                var y = e.clientY - r.top - r.height / 2;
                btn.style.transform = 'translate(' + x * 0.25 + 'px,' + y * 0.25 + 'px)';
            });
            btn.addEventListener('mouseleave', function () {
                btn.style.transform = '';
            });
        });
    }

    /* ---- Smooth Scroll ---- */
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(function (a) {
            a.addEventListener('click', function (e) {
                var target = document.querySelector(a.getAttribute('href'));
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });
    }

    /* ---- Boot ---- */
    document.addEventListener('DOMContentLoaded', function () {
        initAgeCounter();
        initNavbar();
        initReveal();
        initCursorGlow();
        initMagnetic();
        initSmoothScroll();
    });
})();

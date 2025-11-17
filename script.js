document.addEventListener("DOMContentLoaded", function() {
    const modalTriggers = document.querySelectorAll('.modal-trigger-btn');
    const modalCloseBtns = document.querySelectorAll('.modal-close-btn');
    const modals = document.querySelectorAll('.modal-overlay');

    modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            const modalId = trigger.getAttribute('data-modal-id');
            const modal = document.getElementById(modalId);
            if(modal) {
                document.body.classList.add('modal-open');
                modal.classList.add('is-visible');
            }
        });
    });

    modalCloseBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const modal = btn.closest('.modal-overlay');
            document.body.classList.remove('modal-open');
            modal.classList.remove('is-visible');
        });
    });

    modals.forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                document.body.classList.remove('modal-open');
                modal.classList.remove('is-visible');
            }
        });
    });

    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links a');

    if(hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('is-active');
            navLinks.classList.toggle('is-active');
        });
        links.forEach(l => l.addEventListener('click', () => {
            hamburger.classList.remove('is-active');
            navLinks.classList.remove('is-active');
        }));
    }

    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if(target) target.scrollIntoView({ behavior: 'smooth' });
        });
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                const items = entry.target.querySelectorAll('.fade-in-item');
                items.forEach((item, idx) => {
                    item.style.transitionDelay = `${idx * 50}ms`;
                    item.classList.add('is-visible');
                });
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-in-parent').forEach(p => observer.observe(p));
});

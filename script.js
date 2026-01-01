// Mobile nav toggle
const navToggle = document.getElementById('nav-toggle');
const navLinks = document.querySelector('.nav-links');
const navbar = document.getElementById('navbar');

if (navToggle) {
  navToggle.addEventListener('click', () => {
    const open = navLinks.classList.toggle('show');
    navToggle.classList.toggle('open', open);
    navToggle.setAttribute('aria-expanded', String(open));
  });
}

// Close mobile menu on link click
document.querySelectorAll('.nav-links a').forEach(a => {
  a.addEventListener('click', () => {
    navLinks.classList.remove('show');
    if (navToggle) { navToggle.classList.remove('open'); navToggle.setAttribute('aria-expanded','false'); }
  });
});

// Scroll: add small background to nav after scrolling
window.addEventListener('scroll', () => {
  if (window.scrollY > 40) navbar.classList.add('scrolled'); else navbar.classList.remove('scrolled');
});

// Smooth in-page link scrolling (already handled via CSS, but ensure offset)
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    const target = document.querySelector(link.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const y = target.getBoundingClientRect().top + window.scrollY - 70;
    window.scrollTo({top: y, behavior: 'smooth'});
  });
});

// Intersection Observer for reveal animations and skill bars
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      // animate skill bars
      entry.target.querySelectorAll && entry.target.querySelectorAll('.skill-bar .fill').forEach(el => {
        const w = getComputedStyle(el).getPropertyValue('--w') || '60%';
        el.style.width = w.trim();
      });
    }
  });
}, {threshold: 0.15});

// Observe sections and skill cards
document.querySelectorAll('.section, .skill-card, .about-text, .hero-text').forEach(el => {
  el.classList.add('reveal');
  observer.observe(el);
});

// small accessibility: close nav on ESC
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    navLinks.classList.remove('show');
    if (navToggle) { navToggle.classList.remove('open'); navToggle.setAttribute('aria-expanded','false'); }
  }
});

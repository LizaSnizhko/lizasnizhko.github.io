// =====================
// NAV: scroll shadow
// =====================
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 20) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// =====================
// NAV: mobile toggle
// =====================
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.getElementById('nav-menu');

navToggle.addEventListener('click', () => {
  const isOpen = navMenu.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', isOpen);
});

// Close mobile menu when a link is clicked
navMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('open');
    navToggle.setAttribute('aria-expanded', false);
  });
});

// =====================
// NAV: active link highlight
// =====================
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

function setActiveLink() {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.style.color = '';
    if (link.getAttribute('href') === `#${current}`) {
      link.style.color = 'var(--green-bright)';
    }
  });
}

window.addEventListener('scroll', setActiveLink);
setActiveLink();

// =====================
// SCROLL REVEAL
// =====================
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Stagger delay for siblings
      const siblings = [...entry.target.parentElement.querySelectorAll('.reveal:not(.visible)')];
      const index = siblings.indexOf(entry.target);
      const delay = Math.min(index * 80, 300);

      setTimeout(() => {
        entry.target.classList.add('visible');
      }, delay);

      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -40px 0px'
});

revealElements.forEach(el => revealObserver.observe(el));

// =====================
// SMOOTH SCROLL (fallback for older browsers)
// =====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

    // Floating blurred green blobs on canvas
    const canvas = document.getElementById('bg-canvas');
    const ctx = canvas.getContext('2d');

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = document.body.scrollHeight;
    }
    resize();
    window.addEventListener('resize', () => { resize(); drawBlobs(); });

    const blobs = [
      // Hero area
      { x: 0.82, y: 0.03, r: 260, alpha: 0.18 },
      { x: 0.08, y: 0.06, r: 180, alpha: 0.12 },
      // Mid page
      { x: 0.92, y: 0.22, r: 200, alpha: 0.10 },
      { x: 0.05, y: 0.32, r: 240, alpha: 0.09 },
      { x: 0.6,  y: 0.40, r: 160, alpha: 0.08 },
      // Lower page
      { x: 0.15, y: 0.55, r: 220, alpha: 0.10 },
      { x: 0.88, y: 0.62, r: 190, alpha: 0.09 },
      { x: 0.45, y: 0.72, r: 170, alpha: 0.08 },
      { x: 0.1,  y: 0.85, r: 200, alpha: 0.11 },
      { x: 0.78, y: 0.90, r: 150, alpha: 0.08 },
    ];

    function drawBlobs() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const h = canvas.height;
      const w = canvas.width;

      blobs.forEach(b => {
        const x = b.x * w;
        const y = b.y * h;
        const r = b.r;
        const grad = ctx.createRadialGradient(x, y, 0, x, y, r);
        grad.addColorStop(0,   `rgba(45, 106, 79, ${b.alpha})`);
        grad.addColorStop(0.5, `rgba(82, 183, 136, ${b.alpha * 0.5})`);
        grad.addColorStop(1,   `rgba(82, 183, 136, 0)`);
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
      });
    }

    drawBlobs();

    // Gentle parallax drift on scroll
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const offset = window.scrollY * 0.04;
          canvas.style.transform = `translateY(${offset}px)`;
          ticking = false;
        });
        ticking = true;
      }
    });
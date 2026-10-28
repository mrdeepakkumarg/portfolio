/* =========================================================
   Deepak Kumar Portfolio - Scripts
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- 1. Lucide icons ---------- */
  if (window.lucide) {
    lucide.createIcons();
  }

  /* ---------- 2. Mobile navigation ---------- */
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  const setMenu = (open) => {
    navLinks.classList.toggle('open', open);
    navToggle.classList.toggle('open', open);
    document.body.classList.toggle('menu-open', open);
    navToggle.setAttribute('aria-expanded', String(open));
    navToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  };

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      setMenu(!navLinks.classList.contains('open'));
    });

    // Close menu when a link is clicked
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => setMenu(false));
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (navLinks.classList.contains('open') && !navLinks.contains(e.target)) {
        setMenu(false);
      }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') setMenu(false);
    });

    // Close if screen is resized to desktop
    window.addEventListener('resize', () => {
      if (window.innerWidth > 992) setMenu(false);
    });
  }

  /* ---------- 3. Active nav link on scroll ---------- */
  const sections = document.querySelectorAll('main section[id]');
  const menuLinks = document.querySelectorAll('.nav-links a');

  const setActiveLink = () => {
    const scrollPos = window.scrollY + 140;
    let currentId = 'home';

    sections.forEach(section => {
      if (scrollPos >= section.offsetTop) {
        currentId = section.id;
      }
    });

    menuLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === `#${currentId}`);
    });
  };

  window.addEventListener('scroll', setActiveLink, { passive: true });
  setActiveLink();

  /* ---------- 4. Reveal on scroll ---------- */
  const revealEls = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    revealEls.forEach(el => observer.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('visible'));
  }

  /* ---------- 5. Back to top ---------- */
  const toTop = document.getElementById('toTop');
  if (toTop) {
    toTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ---------- 6. Footer year ---------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- 7. Image fallback (if an image is missing) ---------- */
  const swapWithPlaceholder = (img) => {
    if (!img.isConnected) return;
    const placeholder = document.createElement('div');
    placeholder.className = 'img-placeholder';
    placeholder.textContent = img.alt || 'Image';
    img.replaceWith(placeholder);
  };

  document.querySelectorAll('img[src^="images/"]').forEach(img => {
    // Image already failed before this script ran
    if (img.complete && img.naturalWidth === 0) {
      swapWithPlaceholder(img);
      return;
    }
    img.addEventListener('error', () => swapWithPlaceholder(img));
  });

  /* ---------- 8. Contact form ---------- */
  const form = document.getElementById('contactForm');
  const status = document.getElementById('formStatus');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = form.name.value.trim();
      const email = form.email.value.trim();
      const project = form.project.value;
      const message = form.message.value.trim();

      status.className = 'form-status';

      if (!name || !email || !project || !message) {
        status.textContent = 'Please fill in all fields.';
        status.classList.add('err');
        return;
      }

      const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      if (!emailOk) {
        status.textContent = 'Please enter a valid email address.';
        status.classList.add('err');
        return;
      }

      // Opens the user's email app with the message pre-filled.
      // Replace this with your own backend / Formspree / EmailJS later if needed.
      const subject = encodeURIComponent(`New Project Inquiry: ${project} - ${name}`);
      const body = encodeURIComponent(
        `Name: ${name}\nEmail: ${email}\nProject: ${project}\n\nMessage:\n${message}`
      );
      window.location.href = `mailto:mrdeepakg07@gmail.com?subject=${subject}&body=${body}`;

      status.textContent = 'Thanks! Your email app is opening with the message.';
      status.classList.add('ok');
      form.reset();
    });
  }

  /* ---------- 9. Smooth scroll with navbar offset ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId.length < 2) return;
      const target = document.querySelector(targetId);
      if (!target) return;
      e.preventDefault();
      const offset = 90;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

});

(function initNav() {
  const nav = document.getElementById("nav");
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("navLinks");

  nav.classList.add("scrolled");

  hamburger?.addEventListener("click", () => {
    const isOpen = hamburger.classList.toggle("active");
    navLinks.classList.toggle("open");
    hamburger.setAttribute("aria-expanded", isOpen);
  });

  navLinks?.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active");
      navLinks.classList.remove("open");
      hamburger.setAttribute("aria-expanded", "false");
    });
  });

  const sections = document.querySelectorAll("section[id]");
  window.addEventListener("scroll", () => {
    const scrollY = window.pageYOffset;
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.offsetHeight;
      const id = section.getAttribute("id");
      const link = navLinks?.querySelector(`a[href="#${id}"]`);
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks
          ?.querySelectorAll(".nav-link")
          .forEach((l) => (l.style.color = ""));
        if (link) link.style.color = "var(--gold)";
      }
    });
  });
})();

(function initReveal() {
  const elements = document.querySelectorAll(
    ".reveal, .timeline-item, .project-card, .skill-item, .skill-category, .stat",
  );

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          const siblings = Array.from(
            entry.target.parentElement?.children || [],
          );
          const idx = siblings.indexOf(entry.target);
          entry.target.style.transitionDelay = `${idx * 0.1}s`;
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -40px 0px" },
  );

  elements.forEach((el) => {
    el.classList.add("reveal");
    observer.observe(el);
  });
})();

(function initSkillBars() {
  const fills = document.querySelectorAll(".skill-fill");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const fill = entry.target;
          const width = fill.dataset.width || "0";
          setTimeout(() => {
            fill.style.width = width + "%";
          }, 200);
          observer.unobserve(fill);
        }
      });
    },
    { threshold: 0.3 },
  );

  fills.forEach((fill) => observer.observe(fill));
})();

const form = document.getElementById("contactForm");
const status = document.getElementById("formStatus");

let lastSubmit = 0;

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const honeypot = form.querySelector('[name="website"]');

  if (honeypot && honeypot.value !== "") {
    return;
  }

  const now = Date.now();

  if (now - lastSubmit < 15000) {
    status.textContent = "Please wait before sending again.";
    status.className = "form-status error";
    return;
  }

  const btn = form.querySelector(".btn-text");

  lastSubmit = now;
  btn.textContent = "Sending...";

  emailjs
    .sendForm("service_kljjqpj", "template_ubgrglj", form)
    .then(() => {
      btn.textContent = "Send Message";
      status.textContent = "✓ Message sent successfully!";
      status.className = "form-status success";
      form.reset();
    })
    .catch((error) => {
      console.error(error);
      btn.textContent = "Send Message";
      status.textContent = "✗ Failed to send message";
      status.className = "form-status error";
    });
});

(function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      const href = anchor.getAttribute("href");
      if (href === "#") return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      const offset = 72; // nav height
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    });
  });
})();

(function initParallax() {
  const orbs = document.querySelectorAll(".hero-orb");
  window.addEventListener("scroll", () => {
    const y = window.scrollY;
    orbs.forEach((orb, i) => {
      const speed = i === 0 ? 0.3 : 0.2;
      orb.style.transform = `translateY(${y * speed}px)`;
    });
  });
})();

(function initHeroReveal() {
  const reveals = document.querySelectorAll(".hero-content .reveal");
  reveals.forEach((el, i) => {
    el.style.transitionDelay = `${0.2 + i * 0.15}s`;
    setTimeout(() => el.classList.add("visible"), 100);
  });
})();

(function injectKeyframes() {
  const style = document.createElement("style");
  style.textContent = `
    @keyframes fadeInUp {
      from { opacity: 0; transform: translateY(20px); }
      to   { opacity: 1; transform: translateY(0); }
    }
  `;
  document.head.appendChild(style);
})();

(function initResumeModal() {
  const openBtn = document.getElementById("openResume");
  const closeBtn = document.getElementById("closeResume");
  const modal = document.getElementById("resumeModal");

  if (!openBtn || !closeBtn || !modal) return;

  openBtn.addEventListener("click", () => {
    modal.classList.add("active");
    document.body.classList.add("modal-open");
  });

  closeBtn.addEventListener("click", () => {
    modal.classList.remove("active");
    document.body.classList.remove("modal-open");
  });

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.remove("active");
      document.body.classList.remove("modal-open");
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("active")) {
      modal.classList.remove("active");
      document.body.classList.remove("modal-open");
    }
  });
})();

document.addEventListener('DOMContentLoaded', () => {
  // --- Scroll Animation ---
  const animatedElements = document.querySelectorAll('.animate-on-scroll');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1
  });

  animatedElements.forEach(el => {
    observer.observe(el);
  });

  // --- Mobile Menu Toggle ---
  const menuToggle = document.querySelector('.menu-toggle');
  const menuWrapper = document.querySelector('.menu-wrapper');
  const menuLinks = document.querySelectorAll('.menu a');

  if (menuToggle && menuWrapper) {
    menuToggle.addEventListener('click', () => {
      menuToggle.classList.toggle('open');
      menuWrapper.classList.toggle('open');
    });
  }
  
  // Close menu when a link is clicked (except dropdown toggles)
  menuLinks.forEach(link => {
    if (!link.classList.contains('dropdown-toggle')) {
      link.addEventListener('click', () => {
        if (menuToggle && menuToggle.classList.contains('open')) {
          menuToggle.classList.remove('open');
          menuWrapper.classList.remove('open');
        }
      });
    }
  });

  // --- Mobile Dropdown Toggle ---
  const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
  
  dropdownToggles.forEach(toggle => {
    toggle.addEventListener('click', (e) => {
      // Only prevent default on mobile
      if (window.innerWidth <= 992) {
        e.preventDefault();
        const dropdown = toggle.closest('.dropdown');
        dropdown.classList.toggle('open');
      }
    });
  });

  // --- Contact Form Submission ---
  
const contactForm = document.getElementById("contactForm");

if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    let valid = true;

    const nombre = document.getElementById("nombre");
    const email = document.getElementById("email");
    const codigoArea = document.getElementById("codigoArea");
    const telefono = document.getElementById("telefono");
    const asunto = document.getElementById("asunto");
    const mensaje = document.getElementById("mensaje");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const numRegex = /^[0-9]+$/;

    // Reset errores
    document.querySelectorAll(".error-message").forEach(el => {
      el.textContent = "";
      el.style.display = "none";
    });

    if (nombre.value.trim().length < 3) {
      error("error-nombre", "El nombre debe tener al menos 3 caracteres.");
      valid = false;
    }

    if (!emailRegex.test(email.value.trim())) {
      error("error-email", "Ingresa un email válido.");
      valid = false;
    }

    if (!numRegex.test(codigoArea.value.trim())) {
      error("error-codigoArea", "El código de área debe ser numérico.");
      valid = false;
    }

    if (!numRegex.test(telefono.value.trim())) {
      error("error-telefono", "El teléfono debe ser numérico.");
      valid = false;
    }

    if (asunto.value === "") {
      error("error-asunto", "Selecciona un asunto.");
      valid = false;
    }

    if (mensaje.value.trim().length < 10) {
      error("error-mensaje", "El mensaje debe tener al menos 10 caracteres.");
      valid = false;
    }

    // ⛔ frena SOLO si hay errores
    if (!valid) {
      e.preventDefault();
    }
    // ✅ si es válido, el form se envía SOLO a Web3Forms
  });

  // Solo números
  ["codigoArea", "telefono"].forEach(id => {
    document.getElementById(id).addEventListener("input", e => {
      e.target.value = e.target.value.replace(/[^0-9]/g, "");
    });
  });
}

// Helper
function error(id, msg) {
  const el = document.getElementById(id);
  el.textContent = msg;
  el.style.display = "block";
}


  // --- Smooth Button Transitions ---
  const buttons = document.querySelectorAll('.btn, .btn-small');
  
  buttons.forEach(button => {
    button.addEventListener('mouseenter', function() {
      this.style.transition = 'all 0.3s ease';
    });
  });

  // --- Active Page Highlight in Navigation ---
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.menu a');
  
  navLinks.forEach(link => {
    const linkPage = link.getAttribute('href');
    if (linkPage === currentPage) {
      link.style.color = '#fff';
      link.style.fontWeight = 'bold';
    }
  });
});
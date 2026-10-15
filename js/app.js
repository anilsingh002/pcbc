/**
 * Prayagraj Charitable Blood Centre - Core Interactive Engine
 * Benchmarked on Modern Clean Design & Mobile-First Best Practices
 * Tagore Town, Prayagraj, UP - 211002
 * Emergency Helpline: 0532-3552983 / +91 94152 18900 / +91 99566 71400
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileNavigation();
  initHeaderScroll();
  initScrollSpy();
  initModalListeners();
});

/* ==========================================================================
   1. MOBILE DRAWER NAVIGATION
   ========================================================================== */
function initMobileNavigation() {
  const toggle = document.getElementById('mobileMenuToggle');
  const drawer = document.getElementById('mobileDrawer');
  const backdrop = document.getElementById('drawerBackdrop');
  const closeBtn = document.getElementById('drawerCloseBtn');
  const drawerLinks = document.querySelectorAll('.drawer-item, .drawer-link');

  function openDrawer() {
    if (drawer && backdrop) {
      drawer.classList.add('open');
      backdrop.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeDrawer() {
    if (drawer && backdrop) {
      drawer.classList.remove('open');
      backdrop.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  if (toggle) toggle.addEventListener('click', openDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
  if (backdrop) backdrop.addEventListener('click', closeDrawer);

  drawerLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });
}

/* ==========================================================================
   2. HEADER SCROLL ELEVATION
   ========================================================================== */
function initHeaderScroll() {
  const header = document.getElementById('siteHeader');
  if (!header) return;

  function onScroll() {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* ==========================================================================
   3. DESKTOP SINGLE-LINE NAVBAR SCROLL SPY
   ========================================================================== */
function initScrollSpy() {
  const navLinks = document.querySelectorAll('.main-nav .nav-item');
  if (!navLinks.length) return;

  const sections = [];
  navLinks.forEach(link => {
    const hash = link.getAttribute('href');
    if (hash && hash.startsWith('#')) {
      const sectionEl = document.querySelector(hash);
      if (sectionEl) {
        sections.push({ el: sectionEl, link: link });
      }
    }
  });

  function updateActiveNavLink() {
    const scrollPos = window.scrollY + 120;

    for (let i = sections.length - 1; i >= 0; i--) {
      const section = sections[i];
      const top = section.el.offsetTop;
      const height = section.el.offsetHeight;

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(nl => nl.classList.remove('active'));
        section.link.classList.add('active');
        return;
      }
    }

    if (window.scrollY < 150 && navLinks[0]) {
      navLinks.forEach(nl => nl.classList.remove('active'));
      navLinks[0].classList.add('active');
    }
  }

  window.addEventListener('scroll', updateActiveNavLink, { passive: true });
  updateActiveNavLink();
}

/* ==========================================================================
   4. MODAL DIALOG CONTROLLER (DIRECT PHONE CONTACTS - NO INPUT FORMS)
   ========================================================================== */
function openContactModal(type = 'all') {
  const modal = document.getElementById('contactNumbersModal');
  if (!modal) return;

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';

  // Highlight specific requested card
  const emergencyCard = document.getElementById('contactEmergencyCard');
  const donorCard = document.getElementById('contactDonorCard');

  if (emergencyCard) emergencyCard.classList.remove('card-highlight');
  if (donorCard) donorCard.classList.remove('card-highlight');

  if (type === 'emergency' && emergencyCard) {
    emergencyCard.classList.add('card-highlight');
    emergencyCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  } else if ((type === 'donor' || type === 'rare') && donorCard) {
    donorCard.classList.add('card-highlight');
    donorCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
}

function openModal(modalId) {
  // If user calls any legacy modal ID, automatically redirect to the contact numbers modal
  if (modalId === 'emergencyModal' || modalId === 'emergencyRequisitionForm') {
    openContactModal('emergency');
  } else if (modalId === 'donorModal' || modalId === 'donorBookingForm' || modalId === 'rareModal' || modalId === 'rareDonorForm') {
    openContactModal('donor');
  } else {
    openContactModal('all');
  }
}

function closeAllModals() {
  const modals = document.querySelectorAll('.modal-overlay');
  modals.forEach(m => m.classList.remove('active'));
  document.body.style.overflow = '';
}

// Make accessible to inline onclick handlers
window.openContactModal = openContactModal;
window.openModal = openModal;
window.closeAllModals = closeAllModals;

function initModalListeners() {
  const overlays = document.querySelectorAll('.modal-overlay');
  overlays.forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        closeAllModals();
      }
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeAllModals();
    }
  });
}

/* ==========================================================================
   5. TOAST NOTIFICATION ENGINE (Optional User Feedback)
   ========================================================================== */
function showToast(message, type = 'info') {
  let container = document.getElementById('toastContainer');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toastContainer';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `toast ${type === 'success' ? 'toast-success' : type === 'error' ? 'toast-error' : ''}`;
  
  const icon = type === 'success' ? '✓' : type === 'error' ? '✕' : 'ℹ';
  toast.innerHTML = `
    <span style="font-weight: 800; font-size: 1.1rem; color: ${type === 'success' ? '#34d399' : '#fb7185'};">${icon}</span>
    <span style="line-height: 1.4;">${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.transition = 'opacity 0.35s ease, transform 0.35s ease';
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    setTimeout(() => {
      toast.remove();
    }, 350);
  }, 4500);
}

window.showToast = showToast;

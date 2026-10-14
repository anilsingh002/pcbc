/**
 * Prayagraj Charitable Blood Centre (PCBC) - Interactive Engine
 * Tagore Town, Prayagraj, UP - 211002
 * Emergency: 0532-3552983 / +91 94152 18900
 */

document.addEventListener('DOMContentLoaded', () => {
  initStockInventory();
  initHeroFinder();
  initCompatibilityMatrix();
  initEligibilityChecker();
  initPledgeGenerator();
  initFaqAccordion();
  initModals();
  initMobileNavigation();
});

/* ==========================================================================
   1. LIVE BLOOD STOCK DATA & INVENTORY VIEWER
   ========================================================================== */
const STOCK_DATA = [
  { group: 'A+', prbc: 24, sdp: 4, rdp: 18, ffp: 22, whole: 8, status: 'adequate' },
  { group: 'A-', prbc: 6, sdp: 1, rdp: 4, ffp: 7, whole: 2, status: 'moderate' },
  { group: 'B+', prbc: 29, sdp: 6, rdp: 20, ffp: 26, whole: 11, status: 'adequate' },
  { group: 'B-', prbc: 3, sdp: 1, rdp: 2, ffp: 4, whole: 1, status: 'critical' },
  { group: 'O+', prbc: 32, sdp: 7, rdp: 25, ffp: 30, whole: 14, status: 'adequate' },
  { group: 'O-', prbc: 2, sdp: 1, rdp: 2, ffp: 3, whole: 1, status: 'critical' },
  { group: 'AB+', prbc: 14, sdp: 3, rdp: 10, ffp: 16, whole: 5, status: 'adequate' },
  { group: 'AB-', prbc: 1, sdp: 0, rdp: 1, ffp: 2, whole: 0, status: 'critical' },
];

let activeGroupFilter = 'all';
let activeComponentFilter = 'prbc';

function initStockInventory() {
  const container = document.getElementById('stockCardsGrid');
  const groupFilters = document.querySelectorAll('.stock-group-filter');
  const componentFilters = document.querySelectorAll('.stock-component-filter');
  const refreshTimeEl = document.getElementById('lastUpdateTime');

  if (refreshTimeEl) {
    const now = new Date();
    refreshTimeEl.textContent = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  // Filter blood group
  groupFilters.forEach(btn => {
    btn.addEventListener('click', (e) => {
      groupFilters.forEach(b => b.classList.remove('active'));
      e.currentTarget.classList.add('active');
      activeGroupFilter = e.currentTarget.getAttribute('data-group');
      renderStockCards();
    });
  });

  // Filter component type
  componentFilters.forEach(btn => {
    btn.addEventListener('click', (e) => {
      componentFilters.forEach(b => b.classList.remove('active'));
      e.currentTarget.classList.add('active');
      activeComponentFilter = e.currentTarget.getAttribute('data-component');
      renderStockCards();
    });
  });

  renderStockCards();
}

function renderStockCards() {
  const container = document.getElementById('stockCardsGrid');
  if (!container) return;

  const filtered = STOCK_DATA.filter(item => {
    if (activeGroupFilter === 'all') return true;
    return item.group === activeGroupFilter;
  });

  const componentLabels = {
    prbc: 'Packed Red Cells (PRBC)',
    sdp: 'Apheresis Platelets (SDP)',
    rdp: 'Random Platelets (RDP)',
    ffp: 'Fresh Frozen Plasma (FFP)',
    whole: 'Whole Blood Units'
  };

  container.innerHTML = filtered.map(item => {
    const mainUnits = item[activeComponentFilter];
    let badgeClass = 'status-adequate';
    let statusText = 'Adequate Supply';
    let badgePillClass = 'available';

    if (mainUnits <= 2) {
      badgeClass = 'status-critical';
      statusText = 'Critical Shortage';
      badgePillClass = 'critical';
    } else if (mainUnits <= 6) {
      badgeClass = 'status-moderate';
      statusText = 'Moderate Stock';
      badgePillClass = 'low';
    }

    const [mainType, rh] = [item.group.slice(0, -1), item.group.slice(-1)];

    return `
      <div class="stock-card ${badgeClass}">
        <div class="stock-card-top">
          <div class="blood-type-big">
            ${mainType}<span class="rh-sign">${rh}</span>
          </div>
          <div class="units-counter-badge">
            <div class="units-num">${mainUnits}</div>
            <div class="units-label">Units Avail.</div>
          </div>
        </div>

        <div style="margin-bottom: 0.85rem;">
          <span class="stock-pill-badge ${badgePillClass}">
            <span class="pulse-dot" style="width:6px;height:6px;"></span>
            ${statusText}
          </span>
        </div>

        <div class="component-stock-breakdown">
          <div class="breakdown-row">
            <span>PRBC (Red Cells):</span>
            <span>${item.prbc} units</span>
          </div>
          <div class="breakdown-row">
            <span>Platelets (SDP/RDP):</span>
            <span>${item.sdp + item.rdp} units</span>
          </div>
          <div class="breakdown-row">
            <span>Plasma (FFP):</span>
            <span>${item.ffp} units</span>
          </div>
          <div class="breakdown-row">
            <span>Whole Blood:</span>
            <span>${item.whole} units</span>
          </div>
        </div>

        <div class="stock-card-actions">
          <button class="btn btn-sm btn-outline" onclick="openEmergencyModalWithGroup('${item.group}')" title="Request blood for a hospital patient">
            Requisition
          </button>
          <button class="btn btn-sm btn-primary" onclick="openDonorModalWithGroup('${item.group}')" title="Donate blood for this group">
            Donate
          </button>
        </div>
      </div>
    `;
  }).join('');
}

/* ==========================================================================
   2. HERO QUICK FINDER
   ========================================================================== */
function initHeroFinder() {
  const chips = document.querySelectorAll('.hero-finder-chip');
  const compSelect = document.getElementById('heroComponentSelect');
  const countDisplay = document.getElementById('heroFinderCount');
  const statusBadge = document.getElementById('heroFinderStatus');
  let selectedGroup = 'O+';

  function updateHeroResult() {
    const item = STOCK_DATA.find(d => d.group === selectedGroup);
    const comp = compSelect ? compSelect.value : 'prbc';
    if (!item) return;

    const count = item[comp] !== undefined ? item[comp] : item.prbc;
    if (countDisplay) countDisplay.textContent = `${count} Units Available`;

    if (statusBadge) {
      if (count <= 2) {
        statusBadge.className = 'stock-pill-badge critical';
        statusBadge.innerHTML = '<span class="pulse-dot" style="width:6px;height:6px;"></span> Critical Low';
      } else if (count <= 6) {
        statusBadge.className = 'stock-pill-badge low';
        statusBadge.innerHTML = '<span class="pulse-dot" style="width:6px;height:6px;"></span> Moderate';
      } else {
        statusBadge.className = 'stock-pill-badge available';
        statusBadge.innerHTML = '<span class="pulse-dot" style="width:6px;height:6px;"></span> Ready to Dispatch';
      }
    }
  }

  chips.forEach(chip => {
    chip.addEventListener('click', (e) => {
      chips.forEach(c => c.classList.remove('active'));
      e.currentTarget.classList.add('active');
      selectedGroup = e.currentTarget.getAttribute('data-group');
      updateHeroResult();
    });
  });

  if (compSelect) {
    compSelect.addEventListener('change', updateHeroResult);
  }

  updateHeroResult();
}

/* ==========================================================================
   3. INTERACTIVE BLOOD COMPATIBILITY MATRIX
   ========================================================================== */
const COMPATIBILITY = {
  // Red Blood Cell rules
  rbc: {
    'O-': {
      donateTo: ['O-', 'O+', 'A-', 'A+', 'B-', 'B+', 'AB-', 'AB+'],
      receiveFrom: ['O-'],
      fact: 'O Negative is the Universal Red Cell Donor! It can be transfused in any emergency when a patient’s blood type is unknown.'
    },
    'O+': {
      donateTo: ['O+', 'A+', 'B+', 'AB+'],
      receiveFrom: ['O-', 'O+'],
      fact: 'O Positive is the most frequently requested blood type in Prayagraj hospitals for trauma, road accidents, and maternity surgeries.'
    },
    'A-': {
      donateTo: ['A-', 'A+', 'AB-', 'AB+'],
      receiveFrom: ['O-', 'A-'],
      fact: 'A Negative red blood cells can be safely administered to both A and AB patients of both Rh factors.'
    },
    'A+': {
      donateTo: ['A+', 'AB+'],
      receiveFrom: ['O-', 'O+', 'A-', 'A+'],
      fact: 'A Positive is one of the most common groups in Uttar Pradesh; steady donations keep surgical suites prepared.'
    },
    'B-': {
      donateTo: ['B-', 'B+', 'AB-', 'AB+'],
      receiveFrom: ['O-', 'B-'],
      fact: 'B Negative is rare (<2% of population). Regular B- donors are closely maintained in our PCBC emergency donor registry.'
    },
    'B+': {
      donateTo: ['B+', 'AB+'],
      receiveFrom: ['O-', 'O+', 'B-', 'B+'],
      fact: 'B Positive represents nearly 36% of the local population in Eastern UP, creating constant round-the-clock hospital demand.'
    },
    'AB-': {
      donateTo: ['AB-', 'AB+'],
      receiveFrom: ['O-', 'A-', 'B-', 'AB-'],
      fact: 'AB Negative is the rarest blood type in India. AB- donors are our real-life medical guardians.'
    },
    'AB+': {
      donateTo: ['AB+'],
      receiveFrom: ['O-', 'O+', 'A-', 'A+', 'B-', 'B+', 'AB-', 'AB+'],
      fact: 'AB Positive is the Universal Red Cell Recipient! AB+ individuals can receive packed red cells from any blood type.'
    }
  },
  // Plasma rules
  plasma: {
    'O-': {
      donateTo: ['O-'],
      receiveFrom: ['O-', 'O+', 'A-', 'A+', 'B-', 'B+', 'AB-', 'AB+'],
      fact: 'In plasma transfusion, O is the universal recipient because its plasma carries both Anti-A and Anti-B antibodies.'
    },
    'O+': {
      donateTo: ['O-', 'O+'],
      receiveFrom: ['O+', 'A+', 'B+', 'AB+'],
      fact: 'O Positive plasma can be given to O patients safely.'
    },
    'A-': {
      donateTo: ['O-', 'A-'],
      receiveFrom: ['A-', 'A+', 'AB-', 'AB+'],
      fact: 'Type A plasma contains Anti-B antibodies.'
    },
    'A+': {
      donateTo: ['O-', 'O+', 'A-', 'A+'],
      receiveFrom: ['A+', 'AB+'],
      fact: 'Type A positive plasma provides crucial clotting factors for trauma patients.'
    },
    'B-': {
      donateTo: ['O-', 'B-'],
      receiveFrom: ['B-', 'B+', 'AB-', 'AB+'],
      fact: 'Type B plasma contains Anti-A antibodies.'
    },
    'B+': {
      donateTo: ['O-', 'O+', 'B-', 'B+'],
      receiveFrom: ['B+', 'AB+'],
      fact: 'Type B plasma is widely needed for burn care and liver surgical procedures.'
    },
    'AB-': {
      donateTo: ['O-', 'O+', 'A-', 'A+', 'B-', 'B+', 'AB-', 'AB+'],
      receiveFrom: ['AB-', 'AB+'],
      fact: 'AB is the Universal Plasma Donor! Its plasma contains zero A or B antibodies and can be given to anyone in an ICU.'
    },
    'AB+': {
      donateTo: ['O-', 'O+', 'A-', 'A+', 'B-', 'B+', 'AB-', 'AB+'],
      receiveFrom: ['AB+'],
      fact: 'AB+ plasma is 100% universal and critically vital for burn victims, shock, and pediatric trauma.'
    }
  }
};

let currentCompatMode = 'rbc';
let selectedCompatGroup = 'O+';

function initCompatibilityMatrix() {
  const modeBtns = document.querySelectorAll('.mode-toggle-btn');
  const groupBtns = document.querySelectorAll('.compat-group-btn');

  modeBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      modeBtns.forEach(b => b.classList.remove('active'));
      e.currentTarget.classList.add('active');
      currentCompatMode = e.currentTarget.getAttribute('data-mode');
      updateCompatibilityView();
    });
  });

  groupBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      groupBtns.forEach(b => b.classList.remove('active'));
      e.currentTarget.classList.add('active');
      selectedCompatGroup = e.currentTarget.getAttribute('data-group');
      updateCompatibilityView();
    });
  });

  updateCompatibilityView();
}

function updateCompatibilityView() {
  const data = COMPATIBILITY[currentCompatMode][selectedCompatGroup];
  if (!data) return;

  const titleEl = document.getElementById('compatSelectedGroup');
  const factEl = document.getElementById('compatFactText');
  const donateListEl = document.getElementById('compatDonateList');
  const receiveListEl = document.getElementById('compatReceiveList');
  const bubbleEl = document.getElementById('compatBubble');

  if (titleEl) titleEl.textContent = `${selectedCompatGroup} (${currentCompatMode === 'rbc' ? 'Red Cells' : 'Plasma'})`;
  if (bubbleEl) bubbleEl.textContent = selectedCompatGroup;
  if (factEl) factEl.textContent = data.fact;

  const allGroups = ['O-', 'O+', 'A-', 'A+', 'B-', 'B+', 'AB-', 'AB+'];

  if (donateListEl) {
    donateListEl.innerHTML = allGroups.map(grp => {
      const isMatch = data.donateTo.includes(grp);
      return `<span class="compat-pill ${isMatch ? 'match' : 'not-match'}">${grp} ${isMatch ? '✓' : ''}</span>`;
    }).join('');
  }

  if (receiveListEl) {
    receiveListEl.innerHTML = allGroups.map(grp => {
      const isMatch = data.receiveFrom.includes(grp);
      return `<span class="compat-pill ${isMatch ? 'match' : 'not-match'}">${grp} ${isMatch ? '✓' : ''}</span>`;
    }).join('');
  }
}

/* ==========================================================================
   4. DONOR ELIGIBILITY CHECKER (60-SECOND SELF ASSESSMENT)
   ========================================================================== */
function initEligibilityChecker() {
  const items = document.querySelectorAll('.eligibility-item');
  const resultBox = document.getElementById('eligibilityResult');

  items.forEach(item => {
    const buttons = item.querySelectorAll('.switch-btn');
    buttons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        buttons.forEach(b => {
          b.classList.remove('selected-yes', 'selected-no');
        });

        const choice = e.currentTarget.getAttribute('data-val');
        if (choice === 'yes') {
          e.currentTarget.classList.add('selected-yes');
          item.setAttribute('data-state', 'yes');
        } else {
          e.currentTarget.classList.add('selected-no');
          item.setAttribute('data-state', 'no');
        }

        evaluateEligibility();
      });
    });
  });

  function evaluateEligibility() {
    const answered = Array.from(items).filter(it => it.hasAttribute('data-state'));
    if (answered.length < items.length) {
      if (resultBox) {
        resultBox.className = 'eligibility-result-box';
        resultBox.innerHTML = `
          <div>
            <strong>Complete the 5 checklist questions above</strong>
            <p style="font-size: 0.85rem; color: var(--slate-600); margin-top: 0.2rem;">Takes less than 60 seconds to check your donation readiness.</p>
          </div>
          <span style="font-size:0.85rem; color:var(--slate-500);">${answered.length} of ${items.length} answered</span>
        `;
      }
      return;
    }

    // Questions:
    // 1. Age (18-65) -> yes is good
    // 2. Weight >= 45kg -> yes is good
    // 3. Donated within 90 days? -> NO is good
    // 4. Tattoo/surgery in 6 months? -> NO is good
    // 5. Healthy & free of fever? -> YES is good

    const q1 = document.getElementById('eligQ1')?.getAttribute('data-state') === 'yes';
    const q2 = document.getElementById('eligQ2')?.getAttribute('data-state') === 'yes';
    const q3 = document.getElementById('eligQ3')?.getAttribute('data-state') === 'no';
    const q4 = document.getElementById('eligQ4')?.getAttribute('data-state') === 'no';
    const q5 = document.getElementById('eligQ5')?.getAttribute('data-state') === 'yes';

    const isEligible = q1 && q2 && q3 && q4 && q5;

    if (isEligible) {
      resultBox.className = 'eligibility-result-box pass';
      resultBox.innerHTML = `
        <div>
          <h4 style="color:#065f46; font-size:1.15rem; font-weight:800; display:flex; align-items:center; gap:0.5rem;">
            <span>🎉</span> Congratulations! You Are Eligible to Donate
          </h4>
          <p style="color:#047857; font-size:0.9rem; margin-top:0.25rem;">
            Your selfless gesture can save up to 3 precious lives in Prayagraj today. Walk into our Tagore Town centre or schedule your preferred slot below.
          </p>
        </div>
        <button class="btn btn-primary" onclick="openModal('donorModal')">
          Book Donation Slot Now
        </button>
      `;
    } else {
      resultBox.className = 'eligibility-result-box fail';
      resultBox.innerHTML = `
        <div>
          <h4 style="color:#991b1b; font-size:1.15rem; font-weight:800; display:flex; align-items:center; gap:0.5rem;">
            <span>ℹ️</span> Temporary Deferral Notice
          </h4>
          <p style="color:#b91c1c; font-size:0.9rem; margin-top:0.25rem;">
            Based on clinical guidelines (weight, interval, or recent procedures), you are currently deferred for your safety. You will be warmly eligible once the mandatory waiting period concludes!
          </p>
        </div>
        <a href="#faq" class="btn btn-outline" style="border-color:#fca5a5; color:#991b1b;">
          Read Medical Guidelines
        </a>
      `;
    }
  }
}

/* ==========================================================================
   5. INTERACTIVE DONOR PLEDGE CARD GENERATOR
   ========================================================================== */
function initPledgeGenerator() {
  const nameInput = document.getElementById('pledgeNameInput');
  const groupSelect = document.getElementById('pledgeGroupSelect');
  const localityInput = document.getElementById('pledgeLocalityInput');

  const cardName = document.getElementById('cardDonorName');
  const cardGroup = document.getElementById('cardBloodGroup');
  const cardLocality = document.getElementById('cardLocality');
  const cardDate = document.getElementById('cardIssuedDate');

  if (cardDate) {
    const today = new Date();
    cardDate.textContent = today.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  }

  function updateCard() {
    if (cardName) cardName.textContent = nameInput.value.trim() || 'Prayagraj Citizen';
    if (cardGroup) cardGroup.textContent = groupSelect.value || 'O+';
    if (cardLocality) cardLocality.textContent = localityInput.value.trim() || 'Tagore Town, Prayagraj';
  }

  if (nameInput) nameInput.addEventListener('input', updateCard);
  if (groupSelect) groupSelect.addEventListener('change', updateCard);
  if (localityInput) localityInput.addEventListener('input', updateCard);

  const downloadBtn = document.getElementById('btnDownloadPledge');
  if (downloadBtn) {
    downloadBtn.addEventListener('click', () => {
      showToast('Life-Saver Pledge Certificate Generated! Thank you for standing ready to save lives.', 'success');
    });
  }
}

/* ==========================================================================
   6. FAQ ACCORDION
   ========================================================================== */
function initFaqAccordion() {
  const items = document.querySelectorAll('.faq-item');
  items.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      items.forEach(i => i.classList.remove('open'));
      if (!isOpen) {
        item.classList.add('open');
      }
    });
  });
}

/* ==========================================================================
   7. MODAL WINDOWS & APPLICATION FORMS
   ========================================================================== */
function initModals() {
  // Close on backdrop click
  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        closeAllModals();
      }
    });
  });

  // Close buttons
  document.querySelectorAll('.modal-close-btn').forEach(btn => {
    btn.addEventListener('click', closeAllModals);
  });

  // Emergency Requisition Form submission
  const reqForm = document.getElementById('emergencyRequisitionForm');
  if (reqForm) {
    reqForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const patient = document.getElementById('reqPatientName')?.value;
      const hospital = document.getElementById('reqHospitalName')?.value;
      const group = document.getElementById('reqBloodGroup')?.value;
      const units = document.getElementById('reqUnits')?.value;
      const phone = document.getElementById('reqPhone')?.value;

      closeAllModals();
      const reqId = 'PCBC-' + Math.floor(100000 + Math.random() * 900000);
      showToast(`Emergency Requisition #${reqId} logged! Our medical dispatch desk has been alerted for ${patient} at ${hospital}. We will call ${phone} immediately.`, 'success');
      reqForm.reset();
    });
  }

  // Donor Appointment Booking Form submission
  const donorForm = document.getElementById('donorBookingForm');
  if (donorForm) {
    donorForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('donorName')?.value;
      const date = document.getElementById('donorDate')?.value;
      const time = document.getElementById('donorTimeSlot')?.value;
      const group = document.getElementById('donorBloodGroup')?.value;

      closeAllModals();
      const token = 'DNR-' + Math.floor(1000 + Math.random() * 9000);
      showToast(`Donor Appointment Confirmed for ${name}! Slot: ${date} at ${time} (${group}). Your Priority Token is #${token}. Refreshments will be waiting!`, 'success');
      donorForm.reset();
    });
  }

  // Camp Request Form submission
  const campForm = document.getElementById('campRequestForm');
  if (campForm) {
    campForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const org = document.getElementById('campOrgName')?.value;
      const contact = document.getElementById('campContactPerson')?.value;

      closeAllModals();
      showToast(`Camp Organization Request received from ${org}! Our Community Coordinator will contact ${contact} to plan logistics.`, 'success');
      campForm.reset();
    });
  }
}

window.openModal = function(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
};

window.closeAllModals = function() {
  document.querySelectorAll('.modal-overlay').forEach(modal => {
    modal.classList.remove('active');
  });
  document.body.style.overflow = '';
};

window.openEmergencyModalWithGroup = function(group) {
  openModal('emergencyModal');
  const groupSelect = document.getElementById('reqBloodGroup');
  if (groupSelect) groupSelect.value = group;
};

window.openDonorModalWithGroup = function(group) {
  openModal('donorModal');
  const groupSelect = document.getElementById('donorBloodGroup');
  if (groupSelect) groupSelect.value = group;
};

/* ==========================================================================
   8. MOBILE NAVIGATION DRAWER
   ========================================================================== */
function initMobileNavigation() {
  const toggle = document.getElementById('mobileMenuToggle');
  const drawer = document.getElementById('mobileDrawer');
  const backdrop = document.getElementById('drawerBackdrop');
  const closeBtn = document.getElementById('drawerCloseBtn');
  const drawerLinks = document.querySelectorAll('.drawer-link');

  function openDrawer() {
    drawer.classList.add('open');
    backdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    drawer.classList.remove('open');
    backdrop.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (toggle) toggle.addEventListener('click', openDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
  if (backdrop) backdrop.addEventListener('click', closeDrawer);

  drawerLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });
}

/* ==========================================================================
   9. TOAST NOTIFICATION ENGINE
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
    toast.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    setTimeout(() => {
      toast.remove();
    }, 400);
  }, 5000);
}

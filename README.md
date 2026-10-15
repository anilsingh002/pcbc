# Prayagraj Charitable Blood Centre
### Modern, Responsive & Mobile-Friendly Regional Transfusion Portal
**Modeled on the Gold Standard of BMST Rotary TTK Blood Bank**

A state-of-the-art web application developed for **Prayagraj Charitable Blood Centre** (A Unit of Anant Samaj Sangam Society, Tagore Town, Prayagraj, UP – 211002).

---

## 🌟 Core Pillars & Key Features (BMST Rotary TTK Benchmark)

### 1. The Three Guiding Principles
- **Quantity:**
  - 12,850+ units voluntary donor blood collected annually; 45,000+ registered donor database.
  - Partnered with 150+ universities, colleges (MNNIT, Allahabad University), and corporate organizations for regular camps.
  - Component maximization: *"One unit of blood collected serves several patients"*.
  - Full component storage matrix: Packed Red Cells (2°C–6°C for 35–42 days), Platelets (20°C–24°C with continuous agitation for 5 days), Fresh Frozen Plasma (-30°C to -80°C for 1 year), and Cryoprecipitate.
  - Apheresis Single Donor Platelets (SDP) facility: Closed sterile circuit, <200mL extracorporeal blood volume, ≥55 kg donor threshold, donation frequency up to twice a week.
- **Quality (Vein-to-Vein Safety):**
  - NABH-aligned Total Quality Management System & CDSCO compliance.
  - 100% voluntary blood donors with confidential counseling & health risk questionnaires.
  - **Overcoming the "Window Period" (WP) with Dual Testing:** Automated 4th Generation Chemiluminescence (CLIA) for antibodies/antigens + Nucleic Acid Amplification Technology (NAT) detecting viral RNA/DNA for HIV 1&2, Hepatitis B, and Hepatitis C to reduce the window period from months to mere days.
  - **Immunohematology Reference Support:** Routine testing for Major (ABO/RhD) and Minor Blood Group Systems (Rh C, c, E, e; Kell, Duffy, Kidd, MNS) for multi-transfused Thalassemia and surgery problem cases.
  - Vein-to-Vein Traceability: ISBT 128 international barcodes and automated electronic quarantine-to-release validation.
- **Accessibility & Non-Profit Cost Policy:**
  - 24/7 round-the-clock emergency supply & bedside crossmatch delivery.
  - Bulk transfer network to 40+ hospitals and 100+ nursing homes in Prayagraj & neighboring districts.
  - Non-Profit Cost Recovery: Blood itself is never sold; nominal statutory processing charges strictly governed by Government ceilings, completely waived for pediatric Thalassemia, Hemophilia, poor patients, and emergency trauma.

---

### 2. Operations & Cumulative Impact Dashboard
- Interactive comparative ledger matching BMST's format:
  * **Voluntary Donation Camps:** 184 (2025–26) | 2,460 (Cumulative)
  * **Units of Blood Collected:** 12,850 (2025–26) | 1,48,600 (Cumulative)
  * **Components Prepared & Issued:** 28,400 (2025–26) | 3,12,000 (Cumulative)
  * **Free & Subsidized Issues:** 6,420 (2025–26) | 74,500 (Cumulative)
  * **Patients Impacted & Lives Saved:** 22,500 (2025–26) | 2,85,000 (Cumulative)
- Timeframe filter buttons: "Comprehensive View", "2025–26 Only", and "Inception to Date".

---

### 3. The Rare Donor Program & Rh-Negative Registry
- Dedicated confidential registry for rare phenotypes (O-, A-, B-, AB-, Bombay Blood Group Oh, Anti-M, Rh-null).
- Direct on-call alert squad for emergency trauma and pediatric Thalassemia matches.
- Interactive modal for donors to register in the Rare Donor Club.

---

### 4. Documented Clinical Case Files
- **Case 01:** *The Rare Phenotype & Exchange Transfusion* — Anti-Rh17 in neonatal jaundice.
- **Case 02:** *The Anti-M Antibody Emergency* — Pediatric highway collision trauma crossmatched across 20+ units.
- **Case 03:** *Bombay Phenotype (Oh) Coordination* — Rare Bombay blood dispatch for emergency open-heart surgery.

---

### 5. Virtual Facility Tour & Real Infrastructure
- Interactive tabbed gallery showcasing genuine on-ground facility photography:
  * **Building & Reception:** Facade at 223/87A Tagore Town & public daily stock board.
  * **Donation Suites:** Ergonomic red recliners, digital blood collection mixers, and tube sealers.
  * **Component Prep Lab:** Refrigerated heavy centrifuges and Class 100 Laminar Air Flow stations.
  * **Cold Chain Storage Area:** Medsky digital blood refrigerators and -80°C deep freezers with continuous temperature log sheets.

---

### 6. Interactive Medical Tools
- **Live Blood Inventory Viewer:** Real-time stock counts across PRBC, SDP, RDP, FFP, and Whole Blood with status tags (Adequate, Moderate, Critical).
- **Interactive Blood Compatibility Matrix:** PRBC and Plasma compatibility matrices with interactive donor/recipient visual highlighting.
- **60-Second Donor Eligibility Self-Assessment:** 5-question NBTC & NACO compliant screening quiz.
- **Life-Saver Pledge Card Generator:** Instant digital donor credentials with live badge preview and client-side download.
- **Blood Donation Camp Calendar:** Upcoming drives in Tagore Town, University of Allahabad, and Civil Lines, with a 1-click organizer request modal.
- **Medical FAQ Accordion:** Doctor-verified transfusion advice.

---

### 7. Modern 2026 Mobile-First Experience
- **Floating Mobile Action Bar:** 1-tap Call Desk (`0532-3552983`), 1-tap WhatsApp (`+91 99566 71400`), and 1-tap Emergency Requisition.
- **Mobile Navigation Drawer:** Slide-out drawer with organized sections and quick booking links.
- **Accessibility & Touch Targets:** Sized for one-hand thumb use (minimum 48px), fluid responsive typography.

---

## 📁 Project Structure

```
PCBC/
├── index.html              # Main application with BMST structure
├── css/
│   └── style.css           # Responsive medical-grade CSS design system
├── js/
│   └── app.js              # Interactive engine (stock, impact, facility, compatibility, quiz, modals)
├── assets/
│   └── images/
│       ├── pcbc_official_emblem.jpg   # Official Anant Samaj Sangam PCBC logo
│       ├── pcbc_building_facade.jpg   # Exterior building facade (Tagore Town)
│       ├── pcbc_reception_desk.jpg    # Reception desk & stock whiteboard
│       ├── pcbc_phlebotomy_room.jpg   # Phlebotomy room & red donor recliners
│       ├── pcbc_donation_chairs.jpg   # Blood collection mixers & chairs
│       ├── pcbc_component_lab.jpg     # Laminar flow & Remi centrifuges
│       ├── pcbc_cold_storage.jpg      # Medsky blood bank refrigerators & freezers
│       ├── hero_banner.jpg            # Clinical hero graphic
│       ├── lab_components.jpg         # Laboratory testing spotlight
│       └── donor_care.jpg             # Donor experience illustration
└── README.md               # Complete documentation
```

---

## 🚀 How to Run Locally

### Option 1: Direct File Open
Double-click `index.html` in File Explorer or open in any modern browser.

### Option 2: Local HTTP Server (Python)
```powershell
python -m http.server 5173
```
Then visit: [http://localhost:5173](http://localhost:5173)

---

## 📍 Facility & Contact Information

- **Organization:** Prayagraj Charitable Blood Centre
- **Society:** A Unit of Anant Samaj Sangam Society
- **Address:** 223/87A, Tagore Town, Prayagraj, Uttar Pradesh – 211002
- **Desk & Crossmatch Landline:** 0532-3552983
- **Voluntary Donation Line:** +91 99566 71400
- **24/7 Emergency Cell:** +91 94152 18900
- **Operating Hours:** Open 24 Hours, 365 Days a Year (Continuous Trauma Dispatch)

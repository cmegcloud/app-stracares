import { ensureAnonymousAuth } from "../firebase/firebase-auth.js";

const SERVICES = [
  ["disc","Intervertebral Disc Prolapse","photos/1.png","Specialized care for spinal disc issues, focusing on pain relief and restoring spine health."],
  ["back","Low Back Ache","photos/2.jpg","Targeted physiotherapy to alleviate chronic and acute lower back pain effectively."],
  ["cervical","Cervical Spondylosis","photos/3.jpg","Comprehensive neck pain management and posture correction techniques."],
  ["knee","Osteoarthritis of Knee","photos/4.jpg","Mobility improvement and pain reduction for knee joint degeneration."],
  ["shoulder","Periarthritis of Shoulder","photos/5.jpg","Therapies designed to restore range of motion and treat frozen shoulder."],
  ["elbow","Tennis Elbow","photos/6.jpg","Effective rehabilitation for elbow joint inflammation and strain injuries."],
  ["heel","Plantar Fasciitis","photos/7.jpg","Advanced care for heel pain to help you walk comfortably again."],
  ["sports","Sports Injuries","photos/8.jpg","Dedicated sports rehabilitation to get athletes back to their peak performance."],
  ["stroke","Stroke Rehabilitation","photos/9.jpg","Neurological physiotherapy to aid in balance, mobility, and motor recovery."],
  ["cp","Cerebral Palsy","photos/10.jpg","Paediatric therapy ensuring physical development and muscle control."],
  ["bells","Bell's Palsy","photos/11.jpg","Facial nerve rehabilitation utilizing specialized stimulation and exercises."]
];

const BRANCHES = [
  ["Home Care","Physiotherapy at your location","theracare555physio@gmail.com","+919744902555",""],
  ["Mahe","stracare555@gmail.com","","+918590243951","https://www.google.com/maps/search/?api=1&query=Mahe"],
  ["Pallikkuni","Stracare555@gmail.com","","+917306962564","https://www.google.com/maps/search/?api=1&query=Pallikkuni"],
  ["Panoor","Stracare555@gmail.com","","+917306813576","https://www.google.com/maps/search/?api=1&query=Panoor"],
  ["Stracare","Stracare555@gmail.com","","+919895972836","https://www.google.com/maps/search/?api=1&query=Stracare"],
  ["Thuneri","theracare555physio@gmail.com","","+916282088672","https://www.google.com/maps/search/?api=1&query=Thuneri"]
];

const MODAL_HTML = {
  "appointment-modal": `...`,
  "payment-modal": `...`,
  "branch-modal": `...`,
  "search-modal": `...`,
  "app-info-modal": `...`,
  "privacy-modal": `...`
};

function renderServices(){
  const el = document.getElementById("servicesCarousel");
  if(!el) return;

  el.innerHTML = SERVICES.map(s => `
    <div class="service-card"
      onclick="openServiceDetails(
        '${escapeAttr(s[0])}',
        '${escapeAttr(s[1])}',
        '${escapeAttr(s[2])}',
        '${escapeAttr(s[3])}'
      )">

      <div class="service-photo">
        <img
          src="${s[2]}"
          alt="${escapeAttr(s[1])}"
          onerror="this.src='https://placehold.co/400x300/0369A1/FFF?text=Service'"
        >
      </div>

      <div class="service-info">
        <h3>${escapeHtml(s[1])}</h3>
        <i data-lucide="info"></i>
      </div>

    </div>
  `).join("");

  refreshIcons();
}

function renderModal(id){
  if(document.getElementById(id)) return;

  const host = document.getElementById("modal-host");
  if(!host) return;

  const wrapper = document.createElement("section");

  wrapper.id = id;
  wrapper.className = "fs-modal";
  wrapper.innerHTML = modalContent(id);

  host.appendChild(wrapper);

  refreshIcons();

  if(id === "appointment-modal"){
    initAppointmentForm();
  }
}

function modalContent(id){

  if(id === "appointment-modal"){
    return `
      <div class="modal-header">
        <h2>
          <i data-lucide="calendar-plus"></i>
          Appointment
        </h2>

        <button class="icon-btn" onclick="closeAllModals()">
          <i data-lucide="x"></i>
        </button>
      </div>

      <div class="modal-body">

        <div class="form-header-card">
          <h3>
            <i data-lucide="heart-pulse"></i>
            Patient Details
          </h3>

          <p>
            Please enter the details required for your appointment.
          </p>
        </div>

        ${appointmentForm()}

      </div>
    `;
  }

  if(id === "payment-modal"){
    return `
      <div class="modal-header">
        <h2>
          <i data-lucide="credit-card"></i>
          Pay Advance
        </h2>

        <button class="icon-btn" onclick="closeAllModals()">
          <i data-lucide="x"></i>
        </button>
      </div>

      <div class="modal-body">

        <div class="qr-card">

          <h3>Scan to Pay via UPI</h3>

          <div class="qr-code">
            <img src="assets/upi-qr.png" alt="UPI QR Code">
          </div>

          <p>
            UPI ID:
            <strong>Q30454120@ybl</strong>
          </p>

          <div class="bank-details">

            <h4>Bank Transfer Details</h4>

            <div class="bank-row">
              <span>Account Name:</span>
              <span>STRA CARE</span>
            </div>

            <div class="bank-row">
              <span>Account No:</span>
              <span>50200120597389</span>
            </div>

            <div class="bank-row">
              <span>IFSC Code:</span>
              <span>HDFC0000465</span>
            </div>

            <div class="bank-row">
              <span>Bank Name:</span>
              <span>HDFC Bank</span>
            </div>

          </div>

        </div>

      </div>
    `;
  }

  if(id === "branch-modal"){
    return `
      <div class="modal-header">

        <h2>
          <i data-lucide="map-pin"></i>
          Our Branches
        </h2>

        <button class="icon-btn" onclick="closeAllModals()">
          <i data-lucide="x"></i>
        </button>

      </div>

      <div class="modal-body">
        ${BRANCHES.map(branchCard).join("")}
      </div>
    `;
  }

  if(id === "search-modal"){
    return `
      <div class="modal-header">

        <h2>
          <i data-lucide="search"></i>
          Master Search
        </h2>

        <button class="icon-btn" onclick="closeAllModals()">
          <i data-lucide="x"></i>
        </button>

      </div>

      <div class="modal-body">

        <input
          id="masterSearch"
          class="form-control"
          placeholder="Search services, branches..."
        >

        <div id="searchResults">
          <p style="color:var(--text-muted)">
            Start typing to search our physiotherapy services,
            branch details, and general health info.
          </p>
        </div>

      </div>
    `;
  }

  if(id === "app-info-modal"){
    return `
      <div class="modal-header">

        <h2>
          <i data-lucide="info"></i>
          App Info
        </h2>

        <button class="icon-btn" onclick="closeAllModals()">
          <i data-lucide="x"></i>
        </button>

      </div>

      <div class="modal-body">

        <div class="qr-card">

          <img
            src="assets/logo-app.png"
            alt="Logo"
            style="width:80px;height:80px;margin:auto;border-radius:18px"
          >

          <h2 style="margin:14px 0 4px">
            STRA CARE
          </h2>

          <p style="color:var(--text-muted)">
            Booking App Version 1.0
          </p>

          <button
            class="btn-primary"
            onclick="installApp()"
            style="margin-top:20px"
          >
            <i data-lucide="download"></i>
            Install Booking App
          </button>

        </div>

        <div
          style="
            text-align:center;
            padding:18px;
            color:var(--text-muted);
            font-size:12px
          "
        >
          Designed & Developed by
          <strong>CM Filings</strong>

          <br>

          <a
            href="https://www.cmfilings.com"
            target="_blank"
            style="color:var(--primary-color)"
          >
            www.cmfilings.com
          </a>
        </div>

      </div>
    `;
  }

  if(id === "privacy-modal"){
    return `
      <div class="modal-header">

        <h2>
          <i data-lucide="shield-check"></i>
          Privacy & Policy
        </h2>

        <button class="icon-btn" onclick="closeAllModals()">
          <i data-lucide="x"></i>
        </button>

      </div>

      <div class="modal-body">

        <h3>Privacy</h3>

        <p>
          Your booking details are used for appointment
          processing and communication with STRA CARE.
        </p>

        <h3>Data</h3>

        <p>
          Only information required for booking and
          service delivery should be submitted.
        </p>

        <h3>Payments</h3>

        <p>
          Payment is handled through the UPI/payment
          method presented in the app.
        </p>

      </div>
    `;
  }

  return "";
}


/* =========================================================
   PUBLIC APPOINTMENT FORM
   ========================================================= */

function appointmentForm(){

  return `
    <form id="appointmentForm">

      <!-- PERSONAL INFORMATION -->
      <div class="form-section-title">
        Personal Information
      </div>

      <div class="form-group">

        <label>
          Patient Full Name
          <span style="color:red">*</span>
        </label>

        <input
          type="text"
          id="pat_name"
          class="form-control"
          placeholder="Enter patient name"
          autocomplete="name"
          required
        >

      </div>


      <div class="form-row">

        <div class="form-group">

          <label>
            Age
            <span style="color:red">*</span>
          </label>

          <input
            type="number"
            id="pat_age"
            class="form-control"
            placeholder="Age"
            min="1"
            max="120"
            required
          >

        </div>


        <div class="form-group">

          <label>
            Sex
            <span style="color:red">*</span>
          </label>

          <select
            id="pat_gender"
            class="form-control"
            required
          >

            <option value="" disabled selected>
              Select
            </option>

            <option value="Male">
              Male
            </option>

            <option value="Female">
              Female
            </option>

            <option value="Other">
              Other
            </option>

          </select>

        </div>

      </div>


      <div class="form-group">

        <label>
          Mobile Number
          <span style="color:red">*</span>
        </label>

        <input
          type="tel"
          id="pat_mobile"
          class="form-control"
          placeholder="10-digit mobile number"
          maxlength="10"
          inputmode="numeric"
          autocomplete="tel"
          pattern="[0-9]{10}"
          required
        >

      </div>


      <!-- COMMENTS -->
      <div class="form-section-title">
        Patient Comments
      </div>

      <div class="form-group">

        <label>
          Comments
        </label>

        <textarea
          id="pat_notes"
          class="form-control"
          rows="3"
          placeholder="Write any comments or information you would like us to know..."
        ></textarea>

      </div>


      <!-- LOCATION -->
      <div class="form-section-title">
        Location
      </div>

      <div class="form-group">

        <button
          type="button"
          class="btn-location"
          onclick="getLocation()"
        >

          <i data-lucide="map-pin"></i>

          Detect My Location

        </button>

        <p
          id="location-status"
          style="
            font-size:12px;
            color:var(--text-muted);
            display:none
          "
        ></p>

        <input
          type="hidden"
          id="lat_val"
        >

        <input
          type="hidden"
          id="lng_val"
        >

      </div>


      <!-- BOOKING -->
      <div class="form-section-title">
        Booking Details
      </div>

      <div class="form-group">

        <label>
          Select Branch
          <span style="color:red">*</span>
        </label>

        <select
          id="pat_branch"
          class="form-control"
          required
        >

          <option
            value=""
            disabled
            selected
          >
            Select branch...
          </option>

          ${BRANCHES.map(b => `
            <option value="${escapeHtml(b[0])}">
              ${escapeHtml(b[0])}
            </option>
          `).join("")}

        </select>

      </div>


      <div class="form-row">

        <div class="form-group">

          <label>
            Preferred Date
            <span style="color:red">*</span>
          </label>

          <input
            type="date"
            id="pat_date"
            class="form-control"
            required
          >

        </div>


        <div class="form-group">

          <label>
            Preferred Time
            <span style="color:red">*</span>
          </label>

          <input
            type="time"
            id="pat_time"
            class="form-control"
            required
          >

        </div>

      </div>


      <button
        type="submit"
        class="btn-primary"
        id="submitAppBtn"
      >

        Submit Booking

        <i data-lucide="check-circle"></i>

      </button>


      <p
        id="statusMsg"
        style="
          text-align:center;
          font-size:13px
        "
      ></p>

    </form>
  `;
}


/* =========================================================
   BRANCH CARD
   ========================================================= */

function branchCard(b,i){

  const isHome = i === 0;

  return `
    <div class="branch-card ${isHome ? "premium" : ""}">

      <div class="branch-header">

        <div class="branch-icon">
          <i data-lucide="${isHome ? "home" : "map-pin"}"></i>
        </div>

        <div class="branch-card-info">

          <h3>
            ${escapeHtml(b[0])}
          </h3>

          <p>
            ${escapeHtml(b[1])}

            <br>

            <small>
              ${escapeHtml(b[2] || "")}
            </small>
          </p>

        </div>

      </div>


      <div class="branch-actions">

        <a
          href="tel:${b[3]}"
          class="b-btn call"
        >
          <i data-lucide="phone"></i>
          Call
        </a>


        <a
          href="https://wa.me/${b[3].replace("+","")}"
          target="_blank"
          class="b-btn wa"
        >
          <i class="fa-brands fa-whatsapp"></i>
          Chat
        </a>


        ${
          isHome

          ?

          `<a
            onclick="closeAllModals();openModal('appointment-modal')"
            class="b-btn map"
          >
            <i data-lucide="calendar"></i>
            Book
          </a>`

          :

          `<a
            href="${b[4]}"
            target="_blank"
            class="b-btn map"
          >
            <i data-lucide="navigation"></i>
            Map
          </a>`
        }

      </div>

    </div>
  `;
}


/* =========================================================
   INITIALIZE PUBLIC BOOKING FORM
   ========================================================= */

function initAppointmentForm(){

  const f = document.getElementById("appointmentForm");

  if(!f) return;


  const date = document.getElementById("pat_date");

  if(date){

    const today =
      new Date().toISOString().split("T")[0];

    date.min = today;
    date.value = today;

  }


  f.addEventListener(
    "submit",
    async e => {

      e.preventDefault();

      await submitBooking();

    }
  );


  /*
   * Allow only numbers in mobile field
   */

  const mobile =
    document.getElementById("pat_mobile");

  mobile?.addEventListener(
    "input",
    () => {

      mobile.value =
        mobile.value
          .replace(/\D/g,"")
          .slice(0,10);

    }
  );

}


/* =========================================================
   SUBMIT PUBLIC BOOKING
   ========================================================= */

async function submitBooking(){

  const get = id =>
    document
      .getElementById(id)
      ?.value
      ?.trim();


  const payload = {

    patientName:
      get("pat_name"),

    age:
      get("pat_age"),

    gender:
      get("pat_gender"),

    phone:
      get("pat_mobile"),

    notes:
      get("pat_notes"),

    lat:
      get("lat_val"),

    lng:
      get("lng_val"),

    branch:
      get("pat_branch"),

    date:
      get("pat_date"),

    time:
      get("pat_time"),

    status:
      "pending"

  };


  /*
   * Validate required fields
   */

  if(
    !payload.patientName ||
    !payload.age ||
    !payload.gender ||
    !payload.phone ||
    !payload.branch ||
    !payload.date ||
    !payload.time
  ){

    alert(
      "Please fill all required booking details."
    );

    return;
  }


  if(!/^[0-9]{10}$/.test(payload.phone)){

    alert(
      "Please enter a valid 10-digit mobile number."
    );

    return;
  }


  const btn =
    document.getElementById(
      "submitAppBtn"
    );


  if(btn){

    btn.disabled = true;

    btn.innerHTML =
      '<i class="fa-solid fa-spinner fa-spin"></i> Submitting Booking...';

  }


  try{

    /*
     * Anonymous Firebase Authentication
     */

    const user =
      await ensureAnonymousAuth();


    const {
      db,
      collection,
      addDoc,
      serverTimestamp
    } = window.SC_FIREBASE;


    /*
     * Generate booking reference
     */

    const ref =
      "APT-" +
      Date.now()
        .toString()
        .slice(-6);


    /*
     * Create appointment
     *
     * Public app can CREATE only.
     * Admin app continues to manage it.
     */

    await addDoc(
      collection(
        db,
        "appointments"
      ),
      {

        ...payload,

        bookingRef:
          ref,

        userId:
          user.uid,

        createdAt:
          serverTimestamp()

      }
    );


    /*
     * Show confirmation
     */

    showBookingConfirmation({

      ...payload,

      bookingRef:
        ref

    });


  }catch(err){

    console.error(
      "Booking submission error:",
      err
    );


    alert(
      "Unable to submit booking. Please check your internet connection and try again."
    );


  }finally{

    if(btn){

      btn.disabled = false;

      btn.innerHTML =
        'Submit Booking <i data-lucide="check-circle"></i>';

      refreshIcons();

    }

  }

}


/* =========================================================
   BOOKING CONFIRMATION
   ========================================================= */

function showBookingConfirmation(p){

  const host =
    document.getElementById(
      "modal-host"
    );

  if(!host) return;


  const old =
    document.getElementById(
      "confirmation-popup"
    );

  old?.remove();


  const d =
    document.createElement(
      "div"
    );


  d.id =
    "confirmation-popup";

  d.className =
    "popup-overlay active";


  d.innerHTML = `

    <div class="popup-content">

      <div class="popup-body">

        <h2>
          Booking Submitted!
        </h2>

        <p
          style="
            color:var(--text-muted);
            margin-top:6px
          "
        >
          Thank you for choosing STRA CARE.
        </p>


        <div class="ticket-box">

          <div class="ticket-header">

            <h3>
              Booking Ref:
              ${escapeHtml(p.bookingRef)}
            </h3>

          </div>


          <div class="ticket-row">

            <span class="label">
              Patient Name
            </span>

            <span class="val">
              ${escapeHtml(p.patientName)}
            </span>

          </div>


          <div class="ticket-row">

            <span class="label">
              Date & Time
            </span>

            <span class="val">
              ${escapeHtml(p.date)}
              ${escapeHtml(p.time)}
            </span>

          </div>


          <div class="ticket-row">

            <span class="label">
              Branch
            </span>

            <span class="val">
              ${escapeHtml(p.branch)}
            </span>

          </div>


          <div class="ticket-row">

            <span class="label">
              Status
            </span>

            <span class="val">
              Pending (Review)
            </span>

          </div>

        </div>


        <div
          style="
            display:flex;
            gap:8px
          "
        >

          <button
            class="btn-primary"
            onclick="closeConfirmation()"
          >
            Close
          </button>


          <button
            class="btn-primary"
            onclick="downloadTicketJpeg()"
          >
            Download JPEG
          </button>

        </div>

      </div>

    </div>

  `;


  host.appendChild(d);


  window.__ticketData =
    p;

}


/* =========================================================
   DOWNLOAD BOOKING TICKET
   ========================================================= */

window.closeConfirmation = () =>
  document
    .getElementById(
      "confirmation-popup"
    )
    ?.remove();


window.downloadTicketJpeg =
  async () => {

    const el =
      document.querySelector(
        "#confirmation-popup .ticket-box"
      );

    if(!el) return;


    const canvas =
      await html2canvas(el);


    const a =
      document.createElement(
        "a"
      );


    a.download =
      "stra-care-booking.jpg";


    a.href =
      canvas.toDataURL(
        "image/jpeg",
        .92
      );


    a.click();

  };


/* =========================================================
   SERVICE DETAILS
   ========================================================= */

window.openServiceDetails =
  (
    id,
    title,
    img,
    desc
  ) => {

    renderServicePopup(
      title,
      img,
      desc
    );

  };


function renderServicePopup(
  title,
  img,
  desc
){

  const old =
    document.getElementById(
      "service-popup"
    );

  old?.remove();


  const p =
    document.createElement(
      "div"
    );


  p.id =
    "service-popup";

  p.className =
    "popup-overlay active";


  p.innerHTML = `

    <div class="popup-content">

      <img
        src="${img}"
        class="popup-img"
        onerror="
          this.src='https://placehold.co/600x300/0369A1/FFF?text=Service'
        "
      >


      <div class="popup-body">

        <h2>
          ${escapeHtml(title)}
        </h2>


        <p
          style="
            margin:10px 0 20px;
            color:var(--text-muted)
          "
        >
          ${escapeHtml(desc)}
        </p>


        <button
          class="btn-primary"
          onclick="
            document
              .getElementById('service-popup')
              .remove();
            openModal('appointment-modal')
          "
        >

          <i data-lucide="calendar-plus"></i>

          Book Appointment

        </button>

      </div>

    </div>

  `;


  document.body.appendChild(p);

  refreshIcons();

}


/* =========================================================
   MODAL / NAVIGATION
   ========================================================= */

window.openModal =
  id => {

    renderModal(id);

    document
      .getElementById(id)
      ?.classList.add("active");


    const back =
      document.getElementById(
        "btn-back"
      );

    if(back){

      back.style.display =
        "flex";

    }


    setTimeout(
      refreshIcons,
      50
    );

  };


window.closeAllModals =
  () => {

    document
      .querySelectorAll(
        ".fs-modal.active"
      )
      .forEach(
        x =>
          x.classList.remove(
            "active"
          )
      );


    const back =
      document.getElementById(
        "btn-back"
      );

    if(back){

      back.style.display =
        "none";

    }

  };


window.toggleSidebar =
  () => {

    document
      .getElementById(
        "sidebar"
      )
      ?.classList.toggle(
        "active"
      );


    document
      .getElementById(
        "sidebar-overlay"
      )
      ?.classList.toggle(
        "active"
      );

  };


window.setActiveNav =
  el => {

    document
      .querySelectorAll(
        ".bottom-nav .nav-item"
      )
      .forEach(
        x =>
          x.classList.remove(
            "active"
          )
      );


    el?.classList.add(
      "active"
    );

  };


window.scrollCarousel =
  dir => {

    document
      .getElementById(
        "servicesCarousel"
      )
      ?.scrollBy({

        left:
          dir * 300,

        behavior:
          "smooth"

      });

  };


/* =========================================================
   LOCATION
   ========================================================= */

window.getLocation =
  () => {

    const st =
      document.getElementById(
        "location-status"
      );


    if(!navigator.geolocation){

      alert(
        "Location is not supported on this device."
      );

      return;

    }


    if(st){

      st.style.display =
        "block";

      st.textContent =
        "Detecting location...";

    }


    navigator.geolocation.getCurrentPosition(

      pos => {

        const lat =
          document.getElementById(
            "lat_val"
          );

        const lng =
          document.getElementById(
            "lng_val"
          );


        if(lat){

          lat.value =
            pos.coords.latitude;

        }


        if(lng){

          lng.value =
            pos.coords.longitude;

        }


        if(st){

          st.textContent =
            "Location detected.";

        }

      },


      () => {

        if(st){

          st.textContent =
            "Unable to detect location. You can continue without location.";

        }

      },


      {

        enableHighAccuracy:
          true,

        timeout:
          10000

      }

    );

  };


/* =========================================================
   THEME
   ========================================================= */

window.toggleTheme =
  () => {

    const dark =
      document.documentElement
        .getAttribute(
          "data-theme"
        ) === "dark";


    document.documentElement
      .setAttribute(
        "data-theme",
        dark
          ? "light"
          : "dark"
      );


    localStorage.setItem(
      "theme",
      dark
        ? "light"
        : "dark"
    );


    updateThemeIcon();

  };


function updateThemeIcon(){

  const i =
    document.getElementById(
      "theme-icon"
    );

  if(!i) return;


  i.setAttribute(
    "data-lucide",

    document.documentElement
      .getAttribute(
        "data-theme"
      ) === "dark"

      ? "sun"

      : "moon"
  );


  refreshIcons();

}


/* =========================================================
   PWA INSTALL
   ========================================================= */

window.installApp =
  async () => {

    if(window.__deferredPrompt){

      window.__deferredPrompt.prompt();

      await
        window.__deferredPrompt
          .userChoice;

      window.__deferredPrompt =
        null;

      return;

    }


    alert(
      "If the install prompt is not shown, use your browser menu and choose 'Install app' or 'Add to Home screen'."
    );

  };


/* =========================================================
   UTILITIES
   ========================================================= */

function refreshIcons(){

  if(window.lucide){

    lucide.createIcons();

  }

}


function escapeHtml(v = ""){

  return String(v).replace(
    /[&<>"']/g,

    m => ({

      "&":
        "&amp;",

      "<":
        "&lt;",

      ">":
        "&gt;",

      '"':
        "&quot;",

      "'":
        "&#039;"

    }[m])

  );

}


function escapeAttr(v = ""){

  return escapeHtml(v)
    .replace(
      /`/g,
      "&#096;"
    );

}


/* =========================================================
   PWA INSTALL POPUP
   ========================================================= */

window.addEventListener(
  "beforeinstallprompt",
  e => {

    e.preventDefault();

    window.__deferredPrompt =
      e;

    showInstallPopup();

  }
);


function showInstallPopup(){

  if(
    document.getElementById(
      "install-popup"
    )
  ) return;


  const p =
    document.createElement(
      "div"
    );


  p.id =
    "install-popup";

  p.className =
    "app-install-popup active";


  p.innerHTML = `

    <div class="install-row">

      <img
        src="assets/logo-app.png"
        alt="STRA CARE"
      >

      <div class="install-copy">

        <strong>
          Install STRA CARE
        </strong>

        <span>
          Install the booking app for faster,
          seamless appointments.
        </span>

      </div>

    </div>


    <div class="install-actions">

      <button
        class="install-later"
        onclick="
          document
            .getElementById('install-popup')
            .remove()
        "
      >
        Not now
      </button>


      <button
        class="install-now"
        onclick="
          installApp();
          document
            .getElementById('install-popup')
            .remove()
        "
      >
        Install App
      </button>

    </div>

  `;


  document.body.appendChild(p);

}


/* =========================================================
   APP START
   ========================================================= */

window.addEventListener(
  "load",
  () => {

    renderServices();


    if(

      localStorage.getItem(
        "theme"
      ) === "dark"

      ||

      (
        !localStorage.getItem(
          "theme"
        )

        &&

        matchMedia(
          "(prefers-color-scheme: dark)"
        ).matches
      )

    ){

      document.documentElement
        .setAttribute(
          "data-theme",
          "dark"
        );

    }


    updateThemeIcon();

    refreshIcons();


    setTimeout(
      () => {

        document
          .getElementById(
            "splash-screen"
          )
          ?.remove();

      },
      1200
    );

  }
);
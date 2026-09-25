import { ensureAnonymousAuth } from "../firebase/firebase-auth.js";


/* =========================================================
   STRA CARE PUBLIC BOOKING
   PUBLIC BOOKINGS ARE SAVED SEPARATELY

   Firestore:
   appointments-public

   Existing admin appointments collection is NOT touched.
========================================================= */


/* =========================================================
   SERVICES
========================================================= */

const SERVICES = [

  [
    "disc",
    "Intervertebral Disc Prolapse",
    "photos/1.png",
    "Specialized care for spinal disc issues, focusing on pain relief and restoring spine health."
  ],

  [
    "back",
    "Low Back Ache",
    "photos/2.jpg",
    "Targeted physiotherapy to alleviate chronic and acute lower back pain effectively."
  ],

  [
    "cervical",
    "Cervical Spondylosis",
    "photos/3.jpg",
    "Comprehensive neck pain management and posture correction techniques."
  ],

  [
    "knee",
    "Osteoarthritis of Knee",
    "photos/4.jpg",
    "Mobility improvement and pain reduction for knee joint degeneration."
  ],

  [
    "shoulder",
    "Periarthritis of Shoulder",
    "photos/5.jpg",
    "Therapies designed to restore range of motion and treat frozen shoulder."
  ],

  [
    "elbow",
    "Tennis Elbow",
    "photos/6.jpg",
    "Effective rehabilitation for elbow joint inflammation and strain injuries."
  ],

  [
    "heel",
    "Plantar Fasciitis",
    "photos/7.jpg",
    "Advanced care for heel pain to help you walk comfortably again."
  ],

  [
    "sports",
    "Sports Injuries",
    "photos/8.jpg",
    "Dedicated sports rehabilitation to get athletes back to their peak performance."
  ],

  [
    "stroke",
    "Stroke Rehabilitation",
    "photos/9.jpg",
    "Neurological physiotherapy to aid in balance, mobility, and motor recovery."
  ],

  [
    "cp",
    "Cerebral Palsy",
    "photos/10.jpg",
    "Paediatric therapy ensuring physical development and muscle control."
  ],

  [
    "bells",
    "Bell's Palsy",
    "photos/11.jpg",
    "Facial nerve rehabilitation utilizing specialized stimulation and exercises."
  ]

];


/* =========================================================
   BRANCHES

   EXACT DISPLAY NAMES REQUESTED
========================================================= */

const BRANCHES = [

  {
    id: "1",
    name: "1.AZHIYUR",
    phone: "",
    email: "",
    map: "https://www.google.com/maps/search/?api=1&query=Azhiyur",
    homeCare: false
  },

  {
    id: "2",
    name: "2.PALLIKKUNI",
    phone: "+917306962564",
    email: "Stracare555@gmail.com",
    map: "https://www.google.com/maps/search/?api=1&query=Pallikkuni",
    homeCare: false
  },

  {
    id: "3",
    name: "3.ARAYAKOOL",
    phone: "",
    email: "",
    map: "https://www.google.com/maps/search/?api=1&query=Arayakool",
    homeCare: false
  },

  {
    id: "4",
    name: "4.KOTTAYAMPOYIL",
    phone: "",
    email: "",
    map: "https://www.google.com/maps/search/?api=1&query=Kottayampoyil",
    homeCare: false
  },

  {
    id: "5",
    name: "5.TUNERI",
    phone: "+916282088672",
    email: "theracare555physio@gmail.com",
    map: "https://www.google.com/maps/search/?api=1&query=Thuneri",
    homeCare: false
  },

  {
    id: "6",
    name: "6.HOME CARE",
    phone: "+919744902555",
    email: "theracare555physio@gmail.com",
    map: "",
    homeCare: true
  }

];


/* =========================================================
   GLOBAL
========================================================= */

let bookingSubmitting = false;


/* =========================================================
   MODAL RENDER
========================================================= */

function renderModal(id) {

  if (document.getElementById(id)) {
    return;
  }


  const host =
    document.getElementById("modal-host");


  if (!host) {
    console.error("modal-host not found.");
    return;
  }


  const wrapper =
    document.createElement("section");


  wrapper.id = id;

  wrapper.className = "fs-modal";


  wrapper.innerHTML =
    modalContent(id);


  host.appendChild(wrapper);


  refreshIcons();


  if (id === "appointment-modal") {
    initAppointmentForm();
  }


  if (id === "search-modal") {
    initMasterSearch();
  }

}


/* =========================================================
   MODAL CONTENT
========================================================= */

function modalContent(id) {


  /* -------------------------------------------------------
     APPOINTMENT
  ------------------------------------------------------- */

  if (id === "appointment-modal") {

    return `

      <div class="modal-header">

        <h2>
          <i data-lucide="calendar-plus"></i>
          Book Appointment
        </h2>

        <button
          class="icon-btn"
          type="button"
          onclick="closeAllModals()"
          aria-label="Close"
        >
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
            Submit your appointment request.
            STRA CARE will review and confirm your booking.
          </p>

        </div>


        ${appointmentForm()}

      </div>

    `;
  }


  /* -------------------------------------------------------
     PAYMENT
  ------------------------------------------------------- */

  if (id === "payment-modal") {

    return `

      <div class="modal-header">

        <h2>
          <i data-lucide="credit-card"></i>
          Pay Advance
        </h2>

        <button
          class="icon-btn"
          type="button"
          onclick="closeAllModals()"
        >
          <i data-lucide="x"></i>
        </button>

      </div>


      <div class="modal-body">

        <div class="qr-card">

          <h3>
            Scan to Pay via UPI
          </h3>


          <div class="qr-code">

            <img
              src="assets/upi-qr.png"
              alt="UPI QR Code"
            >

          </div>


          <p>
            UPI ID:
            <strong>Q30454120@ybl</strong>
          </p>


          <div class="bank-details">

            <h4>
              Bank Transfer Details
            </h4>


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


  /* -------------------------------------------------------
     BRANCHES
  ------------------------------------------------------- */

  if (id === "branch-modal") {

    return `

      <div class="modal-header">

        <h2>

          <i data-lucide="map-pin"></i>

          Our Branches

        </h2>


        <button
          class="icon-btn"
          type="button"
          onclick="closeAllModals()"
        >

          <i data-lucide="x"></i>

        </button>

      </div>


      <div class="modal-body">

        ${BRANCHES.map(branchCard).join("")}

      </div>

    `;
  }


  /* -------------------------------------------------------
     SEARCH
  ------------------------------------------------------- */

  if (id === "search-modal") {

    return `

      <div class="modal-header">

        <h2>

          <i data-lucide="search"></i>

          Search

        </h2>


        <button
          class="icon-btn"
          type="button"
          onclick="closeAllModals()"
        >

          <i data-lucide="x"></i>

        </button>

      </div>


      <div class="modal-body">

        <input
          id="masterSearch"
          class="form-control"
          placeholder="Search services, branches..."
          autocomplete="off"
        >


        <div id="searchResults">

          <p style="color:var(--text-muted)">
            Start typing to search.
          </p>

        </div>

      </div>

    `;
  }


  /* -------------------------------------------------------
     APP INFO
  ------------------------------------------------------- */

  if (id === "app-info-modal") {

    return `

      <div class="modal-header">

        <h2>

          <i data-lucide="info"></i>

          App Info

        </h2>


        <button
          class="icon-btn"
          type="button"
          onclick="closeAllModals()"
        >

          <i data-lucide="x"></i>

        </button>

      </div>


      <div class="modal-body">

        <div class="qr-card">

          <img
            src="assets/logo-app.png"
            alt="STRA CARE"
            style="
              width:80px;
              height:80px;
              margin:auto;
              border-radius:18px;
              object-fit:cover;
            "
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
            type="button"
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
            font-size:12px;
          "
        >

          Designed & Developed by
          <strong>CM Filings</strong>

          <br>

          <a
            href="https://www.cmfilings.com"
            target="_blank"
            rel="noopener"
            style="color:var(--primary-color)"
          >
            www.cmfilings.com
          </a>

        </div>

      </div>

    `;
  }


  /* -------------------------------------------------------
     PRIVACY
  ------------------------------------------------------- */

  if (id === "privacy-modal") {

    return `

      <div class="modal-header">

        <h2>

          <i data-lucide="shield-check"></i>

          Privacy & Policy

        </h2>


        <button
          class="icon-btn"
          type="button"
          onclick="closeAllModals()"
        >

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
   APPOINTMENT FORM
========================================================= */

function appointmentForm() {

  return `

    <form
      id="appointmentForm"
      novalidate
    >


      <div class="form-section-title">
        Personal Information
      </div>


      <div class="form-group">

        <label>
          Contact Phone Number
          <span style="color:red">*</span>
        </label>


        <input
          type="tel"
          id="pat_mobile"
          class="form-control"
          placeholder="10-digit number"
          maxlength="10"
          inputmode="numeric"
          autocomplete="tel"
          required
        >

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
          placeholder="Patient full name"
          autocomplete="name"
          required
        >

      </div>


      <div class="form-row">


        <div class="form-group">

          <label>
            Age *
          </label>


          <input
            type="number"
            id="pat_age"
            class="form-control"
            min="1"
            max="120"
            inputmode="numeric"
            required
          >

        </div>


        <div class="form-group">

          <label>
            Gender *
          </label>


          <select
            id="pat_gender"
            class="form-control"
            required
          >

            <option
              value=""
              disabled
              selected
            >
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


      <div class="form-section-title">
        Location Details
      </div>


      <div class="form-group">

        <label>
          Patient Address / Location *
        </label>


        <textarea
          id="pat_address"
          class="form-control"
          rows="2"
          placeholder="Enter patient address / location"
          required
        ></textarea>

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
            display:none;
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


      <div class="form-section-title">
        Treatment Details
      </div>


      <div class="form-group">

        <label>
          Symptoms / Service Needed *
        </label>


        <select
          id="pat_symptom"
          class="form-control"
          required
          onchange="toggleCustomSymptom()"
        >

          <option
            value=""
            disabled
            selected
          >
            Select an issue or service...
          </option>


          ${SERVICES.map(
            s => `
              <option value="${escapeHtml(s[1])}">
                ${escapeHtml(s[1])}
              </option>
            `
          ).join("")}


          <option value="Home Care Physiotherapy">
            Home Care Physiotherapy
          </option>


          <option value="Other">
            Other
          </option>

        </select>


        <input
          type="text"
          id="pat_symptom_custom"
          class="form-control"
          placeholder="Please specify your issue"
          style="display:none;margin-top:8px"
        >

      </div>


      <div class="form-group">

        <label>
          Select Branch *
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


          ${BRANCHES.map(
            b => `
              <option
                value="${escapeHtml(b.name)}"
                data-branch-id="${escapeAttr(b.id)}"
              >
                ${escapeHtml(b.name)}
              </option>
            `
          ).join("")}

        </select>

      </div>


      <div class="form-row">


        <div class="form-group">

          <label>
            Preferred Date *
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
            Preferred Time *
          </label>


          <input
            type="time"
            id="pat_time"
            class="form-control"
            min="08:00"
            max="20:00"
            required
          >

        </div>

      </div>


      <div class="form-group">

        <label>
          Patient Comments / Notes
        </label>


        <textarea
          id="pat_notes"
          class="form-control"
          rows="3"
          placeholder="Any previous injuries, surgeries, or specific pain areas..."
        ></textarea>

      </div>


      <button
        type="submit"
        class="btn-primary"
        id="submitAppBtn"
      >

        <i data-lucide="check-circle"></i>

        Submit Booking Request

      </button>


      <p
        id="statusMsg"
        style="
          text-align:center;
          font-size:13px;
          margin-top:10px;
        "
      ></p>


    </form>

  `;
}


/* =========================================================
   BRANCH CARD
========================================================= */

function branchCard(branch) {

  const hasPhone =
    Boolean(branch.phone);


  const isHome =
    branch.homeCare === true;


  return `

    <div
      class="branch-card ${isHome ? "premium" : ""}"
    >


      <div class="branch-header">


        <div class="branch-icon">

          <i
            data-lucide="${isHome ? "home" : "map-pin"}"
          ></i>

        </div>


        <div class="branch-card-info">

          <h3>
            ${escapeHtml(branch.name)}
          </h3>


          ${
            branch.email
              ? `
                <p>
                  ${escapeHtml(branch.email)}
                </p>
              `
              : ""
          }

        </div>

      </div>


      <div class="branch-actions">


        ${
          hasPhone
            ? `
              <a
                href="tel:${escapeAttr(branch.phone)}"
                class="b-btn call"
              >
                <i data-lucide="phone"></i>
                Call
              </a>


              <a
                href="https://wa.me/${String(branch.phone).replace(/\+/g, "")}"
                target="_blank"
                rel="noopener"
                class="b-btn wa"
              >
                <i class="fa-brands fa-whatsapp"></i>
                Chat
              </a>
            `
            : ""
        }


        ${
          isHome

            ? `
              <a
                href="javascript:void(0)"
                onclick="
                  closeAllModals();
                  openModal('appointment-modal')
                "
                class="b-btn map"
              >
                <i data-lucide="calendar"></i>
                Book
              </a>
            `

            : `
              <a
                href="${escapeAttr(branch.map)}"
                target="_blank"
                rel="noopener"
                class="b-btn map"
              >
                <i data-lucide="navigation"></i>
                Map
              </a>
            `
        }

      </div>

    </div>

  `;
}


/* =========================================================
   SERVICES
========================================================= */

function renderServices() {

  const el =
    document.getElementById("servicesCarousel");


  if (!el) {
    return;
  }


  el.innerHTML =
    SERVICES.map(
      s => `

        <div
          class="service-card"
          onclick="
            openServiceDetails(
              '${escapeAttr(s[0])}',
              '${escapeAttr(s[1])}',
              '${escapeAttr(s[2])}',
              '${escapeAttr(s[3])}'
            )
          "
        >


          <div class="service-photo">

            <img
              src="${escapeAttr(s[2])}"
              alt="${escapeAttr(s[1])}"
              loading="lazy"
              onerror="
                this.src='https://placehold.co/400x300/0369A1/FFF?text=Service'
              "
            >

          </div>


          <div class="service-info">

            <h3>
              ${escapeHtml(s[1])}
            </h3>


            <i data-lucide="info"></i>

          </div>

        </div>

      `
    ).join("");


  refreshIcons();

}


/* =========================================================
   FORM INITIALIZATION
========================================================= */

function initAppointmentForm() {

  const form =
    document.getElementById("appointmentForm");


  if (!form) {
    return;
  }


  const date =
    document.getElementById("pat_date");


  if (date) {

    const today =
      getLocalDateString();


    date.min =
      today;


    if (!date.value) {
      date.value = today;
    }

  }


  const mobile =
    document.getElementById("pat_mobile");


  mobile?.addEventListener(
    "input",
    function () {

      this.value =
        this.value
          .replace(/\D/g, "")
          .slice(0, 10);

    }
  );


  form.addEventListener(
    "submit",
    async function (e) {

      e.preventDefault();

      if (bookingSubmitting) {
        return;
      }

      await submitBooking();

    }
  );


  refreshIcons();

}


/* =========================================================
   DATE
========================================================= */

function getLocalDateString() {

  const d =
    new Date();


  const year =
    d.getFullYear();


  const month =
    String(d.getMonth() + 1)
      .padStart(2, "0");


  const day =
    String(d.getDate())
      .padStart(2, "0");


  return `${year}-${month}-${day}`;

}


/* =========================================================
   SUBMIT BOOKING
========================================================= */

async function submitBooking() {

  if (bookingSubmitting) {
    return;
  }


  const get =
    id => {

      const el =
        document.getElementById(id);

      return (
        el?.value?.trim() || ""
      );

    };


  const patientName =
    get("pat_name");


  const phone =
    get("pat_mobile");


  const age =
    get("pat_age");


  const gender =
    get("pat_gender");


  const address =
    get("pat_address");


  const selectedSymptom =
    get("pat_symptom");


  const customSymptom =
    get("pat_symptom_custom");


  const branch =
    get("pat_branch");


  const date =
    get("pat_date");


  const time =
    get("pat_time");


  const notes =
    get("pat_notes");


  const lat =
    get("lat_val");


  const lng =
    get("lng_val");


  const symptom =
    selectedSymptom === "Other"
      ? customSymptom
      : selectedSymptom;


  /* -------------------------------------------------------
     VALIDATION
  ------------------------------------------------------- */

  if (!patientName) {

    alert(
      "Please enter the patient's full name."
    );

    return;
  }


  if (!/^[0-9]{10}$/.test(phone)) {

    alert(
      "Please enter a valid 10-digit mobile number."
    );

    return;
  }


  if (
    !age ||
    Number(age) < 1 ||
    Number(age) > 120
  ) {

    alert(
      "Please enter a valid patient age."
    );

    return;
  }


  if (!gender) {

    alert(
      "Please select gender."
    );

    return;
  }


  if (!address) {

    alert(
      "Please enter the patient address/location."
    );

    return;
  }


  if (!symptom) {

    alert(
      "Please select or enter the service required."
    );

    return;
  }


  if (!branch) {

    alert(
      "Please select a branch."
    );

    return;
  }


  if (!date) {

    alert(
      "Please select the preferred date."
    );

    return;
  }


  if (!time) {

    alert(
      "Please select the preferred time."
    );

    return;
  }


  /* -------------------------------------------------------
     TIME VALIDATION
  ------------------------------------------------------- */

  if (
    time < "08:00" ||
    time > "20:00"
  ) {

    alert(
      "Please select a time between 8:00 AM and 8:00 PM."
    );

    return;
  }


  /* -------------------------------------------------------
     PREVENT PAST TIME FOR TODAY
  ------------------------------------------------------- */

  const today =
    getLocalDateString();


  if (date === today) {

    const now =
      new Date();


    const currentMinutes =
      now.getHours() * 60 +
      now.getMinutes();


    const selectedParts =
      time.split(":");


    const selectedMinutes =
      Number(selectedParts[0]) * 60 +
      Number(selectedParts[1]);


    if (
      selectedMinutes <= currentMinutes
    ) {

      alert(
        "Please select a future time."
      );

      return;
    }

  }


  /* -------------------------------------------------------
     BRANCH OBJECT
  ------------------------------------------------------- */

  const branchObject =
    BRANCHES.find(
      b => b.name === branch
    );


  /* -------------------------------------------------------
     BOOKING REFERENCE
  ------------------------------------------------------- */

  const bookingRef =
    "SC-" +
    date.replace(/-/g, "") +
    "-" +
    Math.random()
      .toString(36)
      .substring(2, 8)
      .toUpperCase();


  /* -------------------------------------------------------
     PUBLIC BOOKING PAYLOAD
  ------------------------------------------------------- */

  const payload = {

    /* Public-booking fields */

    name:
      patientName,

    mobile:
      phone,

    age:
      String(age),

    sex:
      gender,

    patientComments:
      notes,

    address:
      address,

    latitude:
      lat || "",

    longitude:
      lng || "",

    branch:
      branch,

    branchId:
      branchObject?.id || "",

    service:
      symptom,

    date:
      date,

    time:
      time,


    /* Existing appointment-compatible fields */

    patientName:
      patientName,

    phone:
      phone,

    gender:
      gender,

    symptom:
      symptom,

    notes:
      notes,


    /* Workflow */

    status:
      "pending",

    bookingRef:
      bookingRef,

    source:
      "public_booking",

    category:
      "Normal",

    appointmentStatus:
      "Pending Review"

  };


  /* -------------------------------------------------------
     UI
  ------------------------------------------------------- */

  const btn =
    document.getElementById(
      "submitAppBtn"
    );


  const status =
    document.getElementById(
      "statusMsg"
    );


  bookingSubmitting =
    true;


  if (btn) {

    btn.disabled =
      true;


    btn.innerHTML = `

      <i class="fa-solid fa-spinner fa-spin"></i>

      Submitting Booking...

    `;

  }


  if (status) {

    status.textContent =
      "Securely submitting your booking request...";


    status.style.color =
      "var(--text-muted)";

  }


  try {

    /* -----------------------------------------------------
       AUTH
    ----------------------------------------------------- */

    const user =
      await ensureAnonymousAuth();


    if (!user) {

      throw new Error(
        "Anonymous authentication failed."
      );

    }


    /* -----------------------------------------------------
       FIREBASE
    ----------------------------------------------------- */

    const firebase =
      window.SC_FIREBASE;


    if (!firebase) {

      throw new Error(
        "SC_FIREBASE is not initialized."
      );

    }


    const {
      db,
      collection,
      addDoc,
      serverTimestamp
    } = firebase;


    if (
      !db ||
      !collection ||
      !addDoc ||
      !serverTimestamp
    ) {

      throw new Error(
        "Firestore functions are unavailable."
      );

    }


    /* -----------------------------------------------------
       IMPORTANT:
       NEW PUBLIC COLLECTION
    ----------------------------------------------------- */

    const publicBookingsRef =
      collection(
        db,
        "appointments-public"
      );


    /* -----------------------------------------------------
       SAVE
    ----------------------------------------------------- */

    const docData = {

      ...payload,

      userId:
        user.uid,

      createdAt:
        serverTimestamp(),

      updatedAt:
        serverTimestamp()

    };


    const ref =
      await addDoc(
        publicBookingsRef,
        docData
      );


    console.log(
      "PUBLIC BOOKING SAVED:",
      ref.id
    );


    /* -----------------------------------------------------
       SUCCESS
    ----------------------------------------------------- */

    if (status) {

      status.textContent =
        "Booking request submitted successfully.";

      status.style.color =
        "#15803d";

    }


    showBookingConfirmation({
      ...payload
    });


  } catch (error) {

    console.error(
      "PUBLIC BOOKING ERROR:",
      error
    );


    showFirebaseBookingError(
      error
    );


  } finally {

    bookingSubmitting =
      false;


    if (btn) {

      btn.disabled =
        false;


      btn.innerHTML = `

        <i data-lucide="check-circle"></i>

        Submit Booking Request

      `;

    }


    refreshIcons();

  }

}


/* =========================================================
   FIREBASE ERROR
========================================================= */

function showFirebaseBookingError(error) {

  const code =
    String(
      error?.code || ""
    ).toLowerCase();


  const message =
    String(
      error?.message || ""
    ).toLowerCase();


  let userMessage =
    "Unable to save your booking right now. Please try again or contact STRA CARE.";


  if (
    code.includes("permission-denied") ||
    message.includes("permission")
  ) {

    userMessage =
      "The public booking service is not permitted to save this request. Please contact STRA CARE.";

  }


  else if (
    code.includes("unauthenticated") ||
    message.includes("authentication")
  ) {

    userMessage =
      "Secure connection to the booking service could not be established. Please refresh and try again.";

  }


  else if (
    code.includes("unavailable") ||
    message.includes("network") ||
    message.includes("offline")
  ) {

    userMessage =
      "Internet connection appears unavailable. Please check your connection and try again.";

  }


  else if (
    code.includes("resource-exhausted") ||
    code.includes("quota") ||
    message.includes("quota") ||
    message.includes("daily limit")
  ) {

    userMessage =
      "The booking service is temporarily unavailable. Please try again later or contact STRA CARE.";

  }


  const status =
    document.getElementById(
      "statusMsg"
    );


  if (status) {

    status.textContent =
      userMessage;

    status.style.color =
      "#b91c1c";

  }


  alert(
    userMessage
  );

}


/* =========================================================
   CONFIRMATION
========================================================= */

function showBookingConfirmation(p) {

  document
    .getElementById("confirmation-popup")
    ?.remove();


  const popup =
    document.createElement("div");


  popup.id =
    "confirmation-popup";


  popup.className =
    "popup-overlay active";


  popup.innerHTML = `

    <div class="popup-content">

      <div class="popup-body">


        <h2>
          Booking Request Submitted
        </h2>


        <p
          style="
            color:var(--text-muted);
            margin-top:6px;
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
              &nbsp;
              ${escapeHtml(p.time)}
            </span>

          </div>


          <div class="ticket-row">

            <span class="label">
              Service
            </span>

            <span class="val">
              ${escapeHtml(p.symptom)}
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
              Pending Review
            </span>

          </div>


        </div>


        <div
          style="
            display:flex;
            gap:8px;
            margin-top:14px;
          "
        >


          <button
            class="btn-primary"
            onclick="closeConfirmation()"
            type="button"
          >
            Close
          </button>


          <button
            class="btn-primary"
            onclick="downloadTicketJpeg()"
            type="button"
          >
            Download JPEG
          </button>


        </div>


      </div>

    </div>

  `;


  document.body.appendChild(
    popup
  );


  window.__ticketData =
    p;

}


/* =========================================================
   CLOSE CONFIRMATION
========================================================= */

window.closeConfirmation =
  function () {

    document
      .getElementById(
        "confirmation-popup"
      )
      ?.remove();

  };


/* =========================================================
   DOWNLOAD TICKET
========================================================= */

window.downloadTicketJpeg =
  async function () {

    const el =
      document.querySelector(
        "#confirmation-popup .ticket-box"
      );


    if (!el) {
      return;
    }


    if (
      typeof html2canvas ===
      "undefined"
    ) {

      alert(
        "Ticket image generator is not available."
      );

      return;
    }


    try {

      const canvas =
        await html2canvas(
          el,
          {
            backgroundColor:
              "#ffffff",
            scale:
              2
          }
        );


      const a =
        document.createElement("a");


      a.download =
        "stra-care-booking.jpg";


      a.href =
        canvas.toDataURL(
          "image/jpeg",
          0.92
        );


      a.click();


    } catch (error) {

      console.error(
        "Ticket generation error:",
        error
      );


      alert(
        "Unable to generate booking ticket."
      );

    }

  };


/* =========================================================
   SERVICE DETAILS
========================================================= */

window.openServiceDetails =
  function (
    id,
    title,
    img,
    desc
  ) {

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
) {

  document
    .getElementById(
      "service-popup"
    )
    ?.remove();


  const popup =
    document.createElement(
      "div"
    );


  popup.id =
    "service-popup";


  popup.className =
    "popup-overlay active";


  popup.innerHTML = `

    <div class="popup-content">


      <img
        src="${escapeAttr(img)}"
        class="popup-img"
        alt="${escapeAttr(title)}"
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
            color:var(--text-muted);
          "
        >
          ${escapeHtml(desc)}
        </p>


        <button
          class="btn-primary"
          onclick="
            document
              .getElementById('service-popup')
              ?.remove();

            openModal('appointment-modal');
          "
          type="button"
        >

          <i data-lucide="calendar-plus"></i>

          Book This Service

        </button>


      </div>

    </div>

  `;


  document.body.appendChild(
    popup
  );


  refreshIcons();

}


/* =========================================================
   OPEN MODAL
========================================================= */

window.openModal =
  function (id) {

    renderModal(id);


    const modal =
      document.getElementById(id);


    if (modal) {

      modal.classList.add(
        "active"
      );

    }


    const back =
      document.getElementById(
        "btn-back"
      );


    if (back) {

      back.style.display =
        "flex";

    }


    setTimeout(
      refreshIcons,
      50
    );

  };


/* =========================================================
   CLOSE MODALS
========================================================= */

window.closeAllModals =
  function () {

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


    if (back) {

      back.style.display =
        "none";

    }

  };


/* =========================================================
   SIDEBAR
========================================================= */

window.toggleSidebar =
  function () {

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


/* =========================================================
   BOTTOM NAV
========================================================= */

window.setActiveNav =
  function (el) {

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


/* =========================================================
   CAROUSEL
========================================================= */

window.scrollCarousel =
  function (dir) {

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
   CUSTOM SYMPTOM
========================================================= */

window.toggleCustomSymptom =
  function () {

    const select =
      document.getElementById(
        "pat_symptom"
      );


    const custom =
      document.getElementById(
        "pat_symptom_custom"
      );


    if (!select || !custom) {
      return;
    }


    const isOther =
      select.value === "Other";


    custom.style.display =
      isOther
        ? "block"
        : "none";


    custom.required =
      isOther;


    if (!isOther) {

      custom.value =
        "";

    }

  };


/* =========================================================
   LOCATION
========================================================= */

window.getLocation =
  function () {

    const status =
      document.getElementById(
        "location-status"
      );


    if (
      !navigator.geolocation
    ) {

      alert(
        "Location is not supported on this device."
      );

      return;

    }


    if (status) {

      status.style.display =
        "block";


      status.textContent =
        "Detecting location...";

    }


    navigator.geolocation.getCurrentPosition(

      function (pos) {

        const lat =
          document.getElementById(
            "lat_val"
          );


        const lng =
          document.getElementById(
            "lng_val"
          );


        if (lat) {

          lat.value =
            pos.coords.latitude;

        }


        if (lng) {

          lng.value =
            pos.coords.longitude;

        }


        if (status) {

          status.textContent =
            "Location detected.";

          status.style.color =
            "#15803d";

        }

      },


      function (error) {

        console.warn(
          "Location error:",
          error
        );


        if (status) {

          status.textContent =
            "Unable to detect location. Please enter address manually.";

          status.style.color =
            "var(--text-muted)";

        }

      },


      {
        enableHighAccuracy:
          true,

        timeout:
          10000,

        maximumAge:
          300000
      }

    );

  };


/* =========================================================
   THEME
========================================================= */

window.toggleTheme =
  function () {

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


function updateThemeIcon() {

  const icon =
    document.getElementById(
      "theme-icon"
    );


  if (!icon) {
    return;
  }


  const dark =
    document.documentElement
      .getAttribute(
        "data-theme"
      ) === "dark";


  icon.setAttribute(
    "data-lucide",
    dark
      ? "sun"
      : "moon"
  );


  refreshIcons();

}


/* =========================================================
   PWA INSTALL
========================================================= */

window.installApp =
  async function () {

    if (
      window.__deferredPrompt
    ) {

      window.__deferredPrompt
        .prompt();


      try {

        await window
          .__deferredPrompt
          .userChoice;

      } catch (error) {

        console.warn(
          error
        );

      }


      window.__deferredPrompt =
        null;


      return;

    }


    alert(
      "If the install prompt is not shown, use your browser menu and choose 'Install app' or 'Add to Home screen'."
    );

  };


/* =========================================================
   ICONS
========================================================= */

function refreshIcons() {

  if (
    window.lucide &&
    typeof lucide.createIcons ===
      "function"
  ) {

    lucide.createIcons();

  }

}


/* =========================================================
   ESCAPE
========================================================= */

function escapeHtml(
  value = ""
) {

  return String(value)
    .replace(
      /[&<>"']/g,
      function (m) {

        return {

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

        }[m];

      }
    );

}


function escapeAttr(
  value = ""
) {

  return escapeHtml(
    value
  ).replace(
    /`/g,
    "&#096;"
  );

}


/* =========================================================
   PWA INSTALL EVENT
========================================================= */

window.addEventListener(
  "beforeinstallprompt",
  function (e) {

    e.preventDefault();

    window.__deferredPrompt =
      e;

    showInstallPopup();

  }
);


/* =========================================================
   INSTALL POPUP
========================================================= */

function showInstallPopup() {

  if (
    document.getElementById(
      "install-popup"
    )
  ) {

    return;

  }


  const popup =
    document.createElement(
      "div"
    );


  popup.id =
    "install-popup";


  popup.className =
    "app-install-popup active";


  popup.innerHTML = `

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
            ?.remove()
        "
        type="button"
      >
        Not now
      </button>


      <button
        class="install-now"
        onclick="
          installApp();
          document
            .getElementById('install-popup')
            ?.remove()
        "
        type="button"
      >
        Install App
      </button>


    </div>

  `;


  document.body.appendChild(
    popup
  );

}


/* =========================================================
   SEARCH
========================================================= */

function initMasterSearch() {

  const input =
    document.getElementById(
      "masterSearch"
    );


  const results =
    document.getElementById(
      "searchResults"
    );


  if (!input || !results) {
    return;
  }


  if (
    input.dataset.initialized ===
    "true"
  ) {

    return;

  }


  input.dataset.initialized =
    "true";


  input.addEventListener(
    "input",
    function () {

      const q =
        this.value
          .trim()
          .toLowerCase();


      if (!q) {

        results.innerHTML = `

          <p style="color:var(--text-muted)">
            Start typing to search our
            physiotherapy services and branches.
          </p>

        `;

        return;

      }


      const serviceResults =
        SERVICES.filter(
          s =>
            s[1]
              .toLowerCase()
              .includes(q) ||

            s[3]
              .toLowerCase()
              .includes(q)
        );


      const branchResults =
        BRANCHES.filter(
          b =>
            b.name
              .toLowerCase()
              .includes(q)
        );


      let html =
        "";


      serviceResults.forEach(
        s => {

          html += `

            <div
              class="search-result"
              onclick="
                closeAllModals();

                openServiceDetails(
                  '${escapeAttr(s[0])}',
                  '${escapeAttr(s[1])}',
                  '${escapeAttr(s[2])}',
                  '${escapeAttr(s[3])}'
                )
              "
            >

              <strong>
                ${escapeHtml(s[1])}
              </strong>

              <small>
                Service
              </small>

            </div>

          `;

        }
      );


      branchResults.forEach(
        b => {

          html += `

            <div
              class="search-result"
              onclick="
                closeAllModals();
                openModal('appointment-modal');
              "
            >

              <strong>
                ${escapeHtml(b.name)}
              </strong>

              <small>
                Branch
              </small>

            </div>

          `;

        }
      );


      if (!html) {

        html = `

          <p style="color:var(--text-muted)">
            No matching services or branches found.
          </p>

        `;

      }


      results.innerHTML =
        html;

    }
  );

}


/* =========================================================
   LOAD
========================================================= */

window.addEventListener(
  "load",
  function () {

    renderServices();


    const savedTheme =
      localStorage.getItem(
        "theme"
      );


    const systemDark =
      !savedTheme &&
      window.matchMedia &&
      window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;


    if (
      savedTheme === "dark" ||
      systemDark
    ) {

      document.documentElement
        .setAttribute(
          "data-theme",
          "dark"
        );

    } else {

      document.documentElement
        .setAttribute(
          "data-theme",
          "light"
        );

    }


    updateThemeIcon();


    refreshIcons();


    setTimeout(
      function () {

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
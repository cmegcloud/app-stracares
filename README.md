# STRA CARE — Modular Firebase/PWA Booking App

## Structure
- `index.html` — shell, header, bottom navigation, sidebar
- `css/app.css` — UI/theme/responsive styles
- `js/app.js` — application controller, services, branches, modals, booking, install prompt
- `firebase/firebase-auth.js` — Firebase initialization + anonymous authentication + Firestore exports
- `manifest.json` — PWA manifest
- `sw.js` — service worker
- `modules/` — reserved for further module extraction
- `assets/` and `photos/` — place your existing STRA CARE assets here

## Required Firebase setup
Open `firebase/firebase-auth.js` and replace the `firebaseConfig` placeholders with the Web App configuration from Firebase Console.

Enable:
1. Authentication → Anonymous
2. Firestore Database

The booking is written to:
`appointments`

## Important
The source supplied in the conversation contained several references to functions/elements from an earlier version (`patientName`, `appointDate`, `doctorSelect`, etc.) that were not present in the supplied appointment form. This package normalizes those references to the supplied `pat_*` form IDs so the booking flow is internally consistent.

## Install popup
The app listens for `beforeinstallprompt` and displays an install card when the browser provides an install prompt. On iOS/Safari, the fallback message directs the user to Add to Home Screen.

## Deployment
Serve over HTTPS. Firebase Auth, geolocation, PWA installation, and service-worker functionality are intended for secure contexts.

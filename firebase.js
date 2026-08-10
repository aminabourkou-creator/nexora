/* ============================================================
   NEXORA STUDIO — firebase.js (FIXED)
   Initializes the Firebase app, Auth, and Firestore instances.
   Every other module imports `auth` and `db` from here instead
   of calling initializeApp() again, so there is always exactly
   one Firebase connection for the whole app.
   
   FIXED: Removed top-level await that was blocking module load
   on mobile. Now uses .catch() for non-blocking persistence setup.
   ============================================================ */

import { initializeApp }
  from "https://www.gstatic.com/firebasejs/12.15.0/firebase-app.js";
import { getAuth, GoogleAuthProvider, setPersistence, browserLocalPersistence }
  from "https://www.gstatic.com/firebasejs/12.15.0/firebase-auth.js";
import { getFirestore }
  from "https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCCs7KTPZglhh4TaH8_UYmA_Asnc6n9IyM",
  authDomain: "nexora-studio-62bb9.firebaseapp.com",
  projectId: "nexora-studio-62bb9",
  storageBucket: "nexora-studio-62bb9.firebasestorage.app",
  messagingSenderId: "460500770621",
  appId: "1:460500770621:web:b95ca97bdbe1ee8b076f54"
};

export const fbApp = initializeApp(firebaseConfig);
export const auth = getAuth(fbApp);
export const db = getFirestore(fbApp);
export const googleProvider = new GoogleAuthProvider();

// Persist login across browser restarts using non-blocking .catch() pattern
// This does NOT block module initialization on mobile
export let persistenceReady = false;

setPersistence(auth, browserLocalPersistence)
  .then(() => {
    persistenceReady = true;
    console.log('✅ Session persistence enabled');
  })
  .catch(e => {
    console.warn('⚠️ Persistence setup warning:', e.message);
    persistenceReady = true; // Mark as ready even if persistence fails
    // App will work fine without persistence - users just won't stay logged in
  });

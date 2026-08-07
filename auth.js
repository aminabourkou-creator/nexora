/* ============================================================
   NEXORA STUDIO — auth.js
   All Firebase Authentication logic: email/password sign-in &
   sign-up, Google popup sign-in, password reset, sign-out, and
   rendering the logged-in user's name/avatar into the UI.
   ============================================================ */

import { auth, googleProvider, db } from './firebase.js';
import {
  signInWithEmailAndPassword, createUserWithEmailAndPassword,
  signInWithPopup, signOut, sendPasswordResetEmail, updateProfile
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-auth.js";
import { doc, setDoc, serverTimestamp }
  from "https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js";

import { $ } from './utils.js';
import { initials, errMsg } from './utils.js';
import { alrt, calrt, show } from './ui.js';
import { state } from './state.js';

export function renderUser(u) {
  const name = u.displayName || u.email.split('@')[0];
  const init = initials(u.displayName, u.email);
  $('sbAv').innerHTML = `<span style="position:relative;z-index:1">${init}</span><div class="dot-on"></div>`;
  $('topAv').textContent = init;
  $('rvAv').textContent = init;
  $('sbName').textContent = name;
  $('sbEmail').textContent = u.email;
  $('topName').textContent = name;
  $('wMsg').textContent = `Welcome, ${name.split(' ')[0]}! 👋`;
  $('pName').textContent = name;
  $('pEmail').textContent = u.email;
}

export async function doAuth() {
  const email = $('emailI').value.trim();
  const pass = $('passI').value;
  const name = $('nameI').value.trim();
  calrt('aErr'); calrt('aOk');
  if (!email || !pass) { alrt('aErr', 'Please fill all fields.'); return; }
  if (state.authTab === 'up' && !name) { alrt('aErr', 'Please enter your name.'); return; }
  if (pass.length < 6) { alrt('aErr', 'Password needs at least 6 characters.'); return; }
  $('aBtn').disabled = true; $('aBtn').innerHTML = '<span class="spin"></span>';
  try {
    if (state.authTab === 'in') {
      await signInWithEmailAndPassword(auth, email, pass);
    } else {
      const c = await createUserWithEmailAndPassword(auth, email, pass);
      await updateProfile(c.user, { displayName: name });
      await setDoc(doc(db, 'users', c.user.uid), { uid: c.user.uid, name, email, createdAt: serverTimestamp() });
    }
  } catch (e) { alrt('aErr', errMsg(e.code)); }
  $('aBtn').disabled = false;
  $('aBtn').textContent = state.authTab === 'in' ? 'Sign In' : 'Create Account';
}

export async function doGoogle() {
  calrt('aErr');
  try { await signInWithPopup(auth, googleProvider); }
  catch (e) { if (e.code !== 'auth/cancelled-popup-request') alrt('aErr', errMsg(e.code)); }
}

export async function forgotPw() {
  const email = $('emailI').value.trim();
  if (!email) { alrt('aErr', 'Enter your email first.'); return; }
  try { await sendPasswordResetEmail(auth, email); alrt('aOk', 'Reset email sent! Check your inbox.', 'ok'); }
  catch (e) { alrt('aErr', errMsg(e.code)); }
}

export async function doLogout() {
  if (state.chatUnsub) state.chatUnsub();
  if (state.memUnsub) state.memUnsub();
  await signOut(auth);
  state.rooms = []; state.room = null;
  show('auth');
}

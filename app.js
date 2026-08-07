/* ============================================================
   NEXORA STUDIO — app.js  (entry point, loaded as type="module")
   1. Listens to Firebase auth state and routes to the right screen.
   2. Draws the animated background particle canvas.
   3. Exposes every function the HTML's onclick="..." attributes
      need onto `window`, since ES module functions are not global
      by default. This is the only file that touches `window`.
   ============================================================ */

import { auth } from './firebase.js';
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-auth.js";

import { $ } from './utils.js';
import { state } from './state.js';
import {
  toast, show, goAuth, switchTab, openM, closeM, initModalOverlayClicks,
  toggleSb, openSb, closeSb, openRsb, closeRsb, navTo, rTab, tCheck, doSearch
} from './ui.js';
import { renderUser, doAuth, doGoogle, forgotPw, doLogout } from './auth.js';
import {
  loadRooms, renderRooms, openRoom, backDash, cpyId,
  initEmojiGrid, selEmoji, createRoom, deleteRoom,
  genInvite, cpyInv, checkInvite, joinRoom, cancelJoin
} from './rooms.js';
import { sendMsg } from './chat.js';
import { toggleVoice, toggleMic, leaveVoice } from './voice.js';

// ── Auth state routing (same logic as the original single file) ──
onAuthStateChanged(auth, async u => {
  if (u) {
    state.user = u;
    renderUser(u);
    if (state.invCode && state.invRoomId) {
      show('join');
      await checkInvite();
    } else {
      show('app');
      await loadRooms();
    }
  } else {
    state.user = null;
    if (state.invCode) show('join');
    else if (!$('splash').classList.contains('off')) { /* stay on splash */ }
    else show('auth');
  }
});

// ── One-time UI wiring ──
initModalOverlayClicks();
initEmojiGrid();

// ── Expose functions referenced by inline onclick="" in index.html ──
window.toast = toast;
window.goAuth = goAuth;
window.switchTab = switchTab;
window.openM = openM;
window.closeM = closeM;
window.toggleSb = toggleSb;
window.openSb = openSb;
window.closeSb = closeSb;
window.openRsb = openRsb;
window.closeRsb = closeRsb;
window.navTo = navTo;
window.rTab = rTab;
window.tCheck = tCheck;
window.doSearch = v => doSearch(v, renderRooms);

window.doAuth = doAuth;
window.doGoogle = doGoogle;
window.forgotPw = forgotPw;
window.doLogout = doLogout;

window.openRoom = openRoom;
window.backDash = backDash;
window.cpyId = cpyId;
window.selEmoji = selEmoji;
window.createRoom = createRoom;
window.deleteRoom = deleteRoom;
window.genInvite = genInvite;
window.cpyInv = cpyInv;
window.joinRoom = joinRoom;
window.cancelJoin = cancelJoin;

window.sendMsg = sendMsg;

window.toggleVoice = toggleVoice;
window.toggleMic = toggleMic;
window.leaveVoice = leaveVoice;

// ── Animated background particles ──
const cv = $('bg'), cx = cv.getContext('2d');
cv.width = window.innerWidth; cv.height = window.innerHeight;
window.addEventListener('resize', () => { cv.width = window.innerWidth; cv.height = window.innerHeight; });

const pts = Array.from({ length: 55 }, () => ({
  x: Math.random() * cv.width, y: Math.random() * cv.height,
  vx: (Math.random() - .5) * .3, vy: (Math.random() - .5) * .3,
  r: Math.random() * 1.7 + .4, a: Math.random() * .3 + .07
}));

(function draw() {
  cx.clearRect(0, 0, cv.width, cv.height);
  pts.forEach(p => {
    p.x += p.vx; p.y += p.vy;
    if (p.x < 0 || p.x > cv.width) p.vx *= -1;
    if (p.y < 0 || p.y > cv.height) p.vy *= -1;
    cx.beginPath(); cx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    cx.fillStyle = `rgba(0,217,255,${p.a})`; cx.fill();
  });
  pts.forEach((a, i) => pts.slice(i + 1).forEach(b => {
    const d = Math.hypot(a.x - b.x, a.y - b.y);
    if (d < 95) {
      cx.beginPath(); cx.moveTo(a.x, a.y); cx.lineTo(b.x, b.y);
      cx.strokeStyle = `rgba(0,217,255,${.055 * (1 - d / 95)})`; cx.lineWidth = .5; cx.stroke();
    }
  }));
  requestAnimationFrame(draw);
})();

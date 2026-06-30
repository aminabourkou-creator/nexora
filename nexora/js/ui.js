/* ============================================================
   NEXORA STUDIO — ui.js
   Everything that only touches the DOM: screen switching, toasts,
   inline alerts, modals, sidebar/drawer toggles, room-tab switching,
   and the dashboard room search filter. No Firebase calls live here.
   ============================================================ */

import { $ } from './utils.js';
import { state } from './state.js';

// ── Toasts ──
export function toast(msg, type = 'inf') {
  const d = document.createElement('div');
  d.className = `toast ${type}`;
  d.innerHTML = `<span>${type === 'ok' ? '✅' : type === 'err' ? '❌' : 'ℹ️'}</span>${msg}`;
  $('toasts').appendChild(d);
  setTimeout(() => d.remove(), 3200);
}

// ── Inline form alerts ──
export function alrt(id, msg, type = 'err') {
  const e = $(id); if (!e) return;
  e.className = `alert show ${type}`;
  e.textContent = msg;
}
export function calrt(id) {
  const e = $(id);
  if (e) { e.classList.remove('show'); e.textContent = ''; }
}

// ── Screens (splash / auth / join / app / room view) ──
export function show(id) {
  ['splash', 'auth', 'join'].forEach(s => $(s)?.classList.toggle('off', s !== id));
  ['app', 'rv'].forEach(s => $(s)?.classList.add('off'));
  if (id === 'app') { $('app').classList.remove('off'); $('rv').classList.add('off'); }
  if (id === 'rv') { $('rv').classList.remove('off'); $('app').classList.add('off'); }
}

export function goAuth() {
  $('splash').style.opacity = '0';
  $('splash').style.transform = 'scale(1.03)';
  setTimeout(() => show('auth'), 480);
}

// ── Auth tab switch (Sign In / Create Account) ──
export function switchTab(t) {
  state.authTab = t;
  calrt('aErr'); calrt('aOk');
  if (t === 'in') {
    $('tIn').classList.add('on'); $('tUp').classList.remove('on');
    $('nameF').style.display = 'none'; $('forgotF').style.display = 'block';
    $('aBtn').textContent = 'Sign In'; $('aTitle').textContent = 'Welcome back';
    $('aSub').textContent = 'Sign in to Nexora Studio';
    $('aFT').textContent = "Don't have an account?";
    $('aFL').textContent = 'Sign Up'; $('aFL').onclick = () => switchTab('up');
  } else {
    $('tUp').classList.add('on'); $('tIn').classList.remove('on');
    $('nameF').style.display = 'block'; $('forgotF').style.display = 'none';
    $('aBtn').textContent = 'Create Account'; $('aTitle').textContent = 'Create account';
    $('aSub').textContent = 'Join Nexora Studio';
    $('aFT').textContent = 'Already have an account?';
    $('aFL').textContent = 'Sign In'; $('aFL').onclick = () => switchTab('in');
  }
}

// ── Modals ──
export function openM(id) {
  $('m-' + id)?.classList.remove('off');
  if (id === 'profile') {
    $('pName').textContent = state.user?.displayName || '';
    $('pEmail').textContent = state.user?.email || '';
  }
}
export function closeM(id) { $('m-' + id)?.classList.add('off'); }

export function initModalOverlayClicks() {
  document.querySelectorAll('.ovl').forEach(o => {
    o.addEventListener('click', e => { if (e.target === o) o.classList.add('off'); });
  });
}

// ── Sidebar (dashboard) ──
export function toggleSb() {
  $('sb').classList.toggle('slim');
  $('upCard').style.display = $('sb').classList.contains('slim') ? 'none' : 'block';
}
export function openSb() { $('sb').classList.add('open'); $('sbOverlay').classList.remove('off'); }
export function closeSb() { $('sb').classList.remove('open'); $('sbOverlay').classList.add('off'); }

// ── Sidebar (room view) ──
export function openRsb() { $('rsb').classList.add('open'); $('rsbOverlay').classList.remove('off'); }
export function closeRsb() { $('rsb').classList.remove('open'); $('rsbOverlay').classList.add('off'); }

// ── Dashboard nav highlighting ──
export function navTo(el) {
  document.querySelectorAll('.ni-row').forEach(n => n.classList.remove('on'));
  el.classList.add('on');
}

// ── Room view tab switching ──
export function rTab(tab, el) {
  ['chat', 'whiteboard', 'tasks', 'files', 'links', 'settings'].forEach(t => {
    const p = $('p-' + t); if (p) p.style.display = t === tab ? (t === 'chat' ? 'flex' : 'block') : 'none';
    const rt = $('rt-' + t); if (rt) rt.classList.toggle('on', t === tab);
  });
  document.querySelectorAll('.rni').forEach(i => i.classList.remove('on'));
  if (el && el.classList.contains('rni')) el.classList.add('on');
}

// ── Task checkbox toggle (visual only, same as original) ──
export function tCheck(el) {
  el.classList.toggle('done');
  el.innerHTML = el.classList.contains('done') ? '<span style="font-size:10px;color:#000">✓</span>' : '';
}

// ── Dashboard room search filter ──
export function doSearch(v, renderRoomsFn) {
  if (!v.trim()) return renderRoomsFn();
  const f = state.rooms.filter(r => r.name.toLowerCase().includes(v.toLowerCase()));
  const el = $('roomList');
  if (!f.length) { el.innerHTML = '<div class="room-empty">No rooms match your search.</div>'; return; }
  el.innerHTML = f.map(r => `
    <div class="room-row" onclick="openRoom('${r.id}')">
      <div class="room-ico" style="background:rgba(0,217,255,.09);border:1px solid rgba(0,217,255,.14)">${r.emoji || '🤖'}</div>
      <div class="room-info"><strong>${r.name}</strong><small>${r.desc || 'Private room'}</small></div>
      <span class="bp">Private</span>
    </div>`).join('');
}

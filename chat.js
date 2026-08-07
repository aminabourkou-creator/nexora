/* ============================================================
   NEXORA STUDIO — chat.js
   Real-time chat: Firestore onSnapshot subscription, message
   rendering (user / AI / system bubbles), sending messages, and
   the live room-members list + online avatars in the sidebar.
   ============================================================ */

import { db } from './firebase.js';
import { collection, addDoc, query, orderBy, onSnapshot, serverTimestamp }
  from "https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js";

import { $, initials, fmtTime, fmt } from './utils.js';
import { toast } from './ui.js';
import { state } from './state.js';
import { callAI } from './ai.js';

// ── Subscribe to a room's messages (real-time) ──
export function subscribeChat(rid) {
  if (state.chatUnsub) state.chatUnsub();
  const q = query(collection(db, 'rooms', rid, 'messages'), orderBy('timestamp', 'asc'));
  state.chatUnsub = onSnapshot(q, snap => {
    const ca = $('chatArea'); ca.innerHTML = '';
    snap.forEach(d => addMsg({ id: d.id, ...d.data() }));
    ca.scrollTop = ca.scrollHeight;
    $('sMsgs').textContent = snap.size;
  });
}

function addMsg(m) {
  const ca = $('chatArea');
  if (m.type === 'system') {
    const d = document.createElement('div');
    d.className = 'sys-msg'; d.textContent = m.text;
    ca.appendChild(d); return;
  }
  const own = m.senderId === state.user?.uid;
  const isAI = m.type === 'ai' || m.senderId === 'ai-nexora';
  const init = isAI ? 'AI' : initials(m.senderName, m.senderName);
  const d = document.createElement('div');
  d.className = 'msg-grp';
  d.innerHTML = `<div class="msg-row">
    <div class="msg-av${isAI ? ' ai' : ''}">${init}</div>
    <div class="msg-cnt">
      <div class="msg-hd">
        <span class="msg-name">${m.senderName || 'Unknown'}</span>
        ${isAI ? '<span class="tag-bot">BOT</span>' : ''}
        ${own && !isAI ? '<span class="tag-svip">SVIP</span>' : ''}
        <span class="msg-ts">${fmtTime(m.timestamp)}</span>
      </div>
      <div class="bubble${isAI ? ' ai' : own ? ' own' : ''}">${fmt(m.text)}</div>
    </div>
  </div>`;
  ca.appendChild(d);
}

// ── Send a message (triggers AI if @Nexora / "/ai " is used) ──
export async function sendMsg() {
  const inp = $('chatInp');
  const text = inp.value.trim();
  if (!text || !state.room || !state.user) return;
  inp.value = '';
  const isAI = text.toLowerCase().includes('@nexora') || text.startsWith('/ai ');
  try {
    await addDoc(collection(db, 'rooms', state.room.id, 'messages'), {
      senderId: state.user.uid,
      senderName: state.user.displayName || state.user.email.split('@')[0],
      text, type: 'user', timestamp: serverTimestamp(),
    });
    if (isAI) callAI(text, state.room.id);
  } catch (e) { toast('Send failed: ' + e.message, 'err'); }
}

// ── Subscribe to room members (real-time) ──
export function subscribeMem(rid) {
  if (state.memUnsub) state.memUnsub();
  state.memUnsub = onSnapshot(collection(db, 'rooms', rid, 'members'), snap => {
    const mems = []; snap.forEach(d => mems.push(d.data()));
    $('memCt').textContent = mems.length;
    $('sMembers').textContent = mems.length;
    $('rvOnline').textContent = `● ${mems.length} Online`;
    $('memList').innerHTML = mems.map(m => `
      <div class="mem-row">
        <div class="av" style="width:30px;height:30px;font-size:10px">${initials(m.name, m.email)}</div>
        <div class="mem-info"><strong>${m.name || m.email}</strong></div>
        <span class="mrole ${m.role === 'owner' ? 'ro' : m.role === 'moderator' ? 'rm' : 'rv'}">
          ${m.role === 'owner' ? 'Owner' : m.role === 'moderator' ? 'Mod' : 'Online'}
        </span>
      </div>`).join('');
    $('rvAvs').innerHTML = mems.slice(0, 5).map(m => `
      <div class="on-av">${initials(m.name, m.email)}</div>`).join('') +
      (mems.length > 5 ? `<div class="on-av" style="background:rgba(255,255,255,.1);font-size:9px">+${mems.length - 5}</div>` : '');
  });
}

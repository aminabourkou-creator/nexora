/* ============================================================
   NEXORA STUDIO — rooms.js
   Everything about private rooms: loading the user's room list,
   rendering it, creating/deleting a room, and the full invite-link
   flow (generate, copy, validate, expire after 1 hour, join).
   ============================================================ */

import { db } from './firebase.js';
import {
  collection, doc, addDoc, setDoc, getDoc, query, where,
  onSnapshot, updateDoc, serverTimestamp, deleteDoc, Timestamp
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js";

import { $, genCode } from './utils.js';
import { toast, alrt, calrt, show, openM, closeM, rTab } from './ui.js';
import { state } from './state.js';
import { subscribeChat } from './chat.js';
import { subscribeMem } from './chat.js';
import { leaveVoice } from './voice.js';

// ── Load + render the dashboard room list ──
export async function loadRooms() {
  if (!state.user) return;
  const q = query(collection(db, 'rooms'), where('members', 'array-contains', state.user.uid));
  onSnapshot(q, snap => {
    state.rooms = [];
    snap.forEach(d => state.rooms.push({ id: d.id, ...d.data() }));
    renderRooms();
    $('sRooms').textContent = state.rooms.length;
  });
}

export function renderRooms() {
  const el = $('roomList');
  if (!state.rooms.length) {
    el.innerHTML = '<div class="room-empty">No rooms yet. Create your first private room! 🚀</div>';
    return;
  }
  el.innerHTML = state.rooms.map(r => `
    <div class="room-row" onclick="openRoom('${r.id}')">
      <div class="room-ico" style="background:rgba(0,217,255,.09);border:1px solid rgba(0,217,255,.14)">${r.emoji || '🤖'}</div>
      <div class="room-info">
        <strong>${r.name}</strong>
        <small>${r.desc || 'Private room'}</small>
      </div>
      <div style="display:flex;flex-direction:column;align-items:flex-end;gap:3px">
        <span class="bp">Private</span>
        <span class="on-c">● Active</span>
      </div>
    </div>`).join('');
}

// ── Open a room ──
export async function openRoom(id) {
  const snap = await getDoc(doc(db, 'rooms', id));
  if (!snap.exists()) { toast('Room not found', 'err'); return; }
  const rd = { id, ...snap.data() };
  if (rd.ownerId !== state.user.uid && !rd.members?.includes(state.user.uid)) {
    toast('Access denied', 'err'); return;
  }
  state.room = rd;
  $('rvEmoji').textContent = rd.emoji || '🤖';
  $('rvName').textContent = rd.name;
  $('rvDesc').textContent = rd.desc || '';
  $('rvId').textContent = `#${rd.id.slice(0, 8)}`;
  document.title = `${rd.name} — Nexora`;
  rTab('chat', document.getElementById('rt-chat'));
  show('rv');
  subscribeChat(id);
  subscribeMem(id);
}

export function backDash() {
  if (state.chatUnsub) state.chatUnsub();
  if (state.memUnsub) state.memUnsub();
  if (state.voiceOn) leaveVoice();
  state.room = null;
  document.title = 'Nexora Studio';
  show('app');
}

export function cpyId() {
  navigator.clipboard.writeText(state.room?.id || '').then(() => toast('Room ID copied!', 'ok'));
}

// ── Create room ──
const EMOJIS = ['🤖', '💻', '🎨', '🚀', '🔬', '📊', '🎯', '🏗️', '💡', '🌐', '🔐', '⚡'];

export function initEmojiGrid() {
  setTimeout(() => {
    const g = $('emojiGrid');
    if (!g) return;
    g.innerHTML = EMOJIS.map(e => `<div class="eo${e === '🤖' ? ' sel' : ''}" onclick="selEmoji(this,'${e}')">${e}</div>`).join('');
  }, 200);
}

export function selEmoji(el, e) {
  document.querySelectorAll('.eo').forEach(o => o.classList.remove('sel'));
  el.classList.add('sel');
  state.selEmoji = e;
}

export async function createRoom() {
  const name = $('crName').value.trim();
  const desc = $('crDesc').value.trim();
  calrt('crErr');
  if (!name) { alrt('crErr', 'Please enter a room name.'); return; }
  const btn = $('crBtn'); btn.disabled = true; btn.innerHTML = '<span class="spin"></span>';
  try {
    const ref = await addDoc(collection(db, 'rooms'), {
      name, desc, emoji: state.selEmoji || '🤖',
      ownerId: state.user.uid, ownerName: state.user.displayName || state.user.email,
      members: [state.user.uid], createdAt: serverTimestamp(),
    });
    await setDoc(doc(db, 'rooms', ref.id, 'members', state.user.uid), {
      uid: state.user.uid, name: state.user.displayName || state.user.email.split('@')[0],
      email: state.user.email, role: 'owner', joinedAt: serverTimestamp(),
    });
    await addDoc(collection(db, 'rooms', ref.id, 'messages'), {
      senderId: 'ai-nexora', senderName: 'Nexora AI',
      text: `Welcome to **${name}**! 🎉 I'm your AI assistant. Type @Nexora to ask me anything!`,
      type: 'ai', timestamp: serverTimestamp(),
    });
    toast('Room created!', 'ok');
    closeM('createRoom');
    $('crName').value = ''; $('crDesc').value = '';
    await openRoom(ref.id);
  } catch (e) { alrt('crErr', e.message); }
  btn.disabled = false; btn.textContent = 'Create Room';
}

// ── Delete room ──
export async function deleteRoom() {
  if (!state.room || state.room.ownerId !== state.user.uid) { toast('Only owner can delete', 'err'); return; }
  if (!confirm(`Delete "${state.room.name}"? This cannot be undone.`)) return;
  try {
    await deleteDoc(doc(db, 'rooms', state.room.id));
    toast('Room deleted', 'ok');
    backDash();
  } catch (e) { toast('Error: ' + e.message, 'err'); }
}

// ── Invite link: generate + copy ──
export async function genInvite() {
  if (!state.room) { toast('No room selected', 'err'); return; }
  openM('invite');
  $('invUrl').textContent = 'Generating...';
  try {
    const code = genCode(16);
    const exp = new Date(Date.now() + 60 * 60 * 1000); // 1 hour, server-checked
    await setDoc(doc(db, 'invites', code), {
      roomId: state.room.id, roomName: state.room.name, inviteCode: code,
      createdBy: state.user.uid, createdAt: serverTimestamp(),
      expiresAt: Timestamp.fromDate(exp), status: 'active',
    });
    const url = `${location.origin}${location.pathname}?invite=${code}&room=${state.room.id}`;
    state.invUrl = url;
    $('invUrl').textContent = url;
    $('invMeta').textContent = `Expires at ${exp.toLocaleTimeString()} (1 hour)`;
  } catch (e) { $('invUrl').textContent = 'Error: ' + e.message; }
}

export function cpyInv() {
  navigator.clipboard.writeText(state.invUrl).then(() => toast('Link copied!', 'ok'));
}

// ── Invite link: validate + join ──
export async function checkInvite() {
  if (!state.invCode) return;
  try {
    const snap = await getDoc(doc(db, 'invites', state.invCode));
    if (!snap.exists()) { alrt('jAlert', 'This invite link does not exist.', 'err'); $('jBtn').disabled = true; return; }
    const inv = snap.data();
    const now = new Date(), exp = inv.expiresAt.toDate();
    if (inv.status === 'expired' || now > exp) {
      await updateDoc(doc(db, 'invites', state.invCode), { status: 'expired' });
      $('jTitle').textContent = '⏰ Link Expired';
      alrt('jAlert', 'This invite has expired. Ask for a new one.', 'err');
      $('jBtn').disabled = true; return;
    }
    const rs = await getDoc(doc(db, 'rooms', inv.roomId));
    const rn = rs.exists() ? rs.data().name : 'Private Room';
    $('jTitle').textContent = `Invited to ${rn}!`;
    $('jRoom').textContent = rn;
    $('jInfo').style.display = 'block';
    $('jTimer').style.display = 'inline-flex';
    const tick = () => {
      const rem = exp - new Date();
      if (rem <= 0) { $('jTick').textContent = 'Expired'; $('jBtn').disabled = true; return; }
      const m = Math.floor(rem / 60000), s = Math.floor((rem % 60000) / 1000);
      $('jTick').textContent = `${m}m ${s}s left`;
      $('jMeta').textContent = `Expires in ${m}m ${s}s`;
      setTimeout(tick, 1000);
    }; tick();
  } catch (e) { alrt('jAlert', 'Error checking invite: ' + e.message, 'err'); }
}

export async function joinRoom() {
  if (!state.user) { show('auth'); alrt('aOk', 'Sign in to join the room.', 'inf'); return; }
  $('jBtn').disabled = true; $('jBtn').innerHTML = '<span class="spin"></span>';
  try {
    const snap = await getDoc(doc(db, 'invites', state.invCode));
    if (!snap.exists()) throw new Error('Invite not found');
    const inv = snap.data();
    if (inv.status === 'expired' || new Date() > inv.expiresAt.toDate()) {
      await updateDoc(doc(db, 'invites', state.invCode), { status: 'expired' });
      openM('expired'); return;
    }
    const rs = await getDoc(doc(db, 'rooms', inv.roomId));
    if (!rs.exists()) throw new Error('Room not found');
    const rd = rs.data();
    if (!rd.members?.includes(state.user.uid)) {
      await updateDoc(doc(db, 'rooms', inv.roomId), { members: [...(rd.members || []), state.user.uid] });
      await setDoc(doc(db, 'rooms', inv.roomId, 'members', state.user.uid), {
        uid: state.user.uid, name: state.user.displayName || state.user.email.split('@')[0],
        email: state.user.email, role: 'member', joinedAt: serverTimestamp(),
      });
      await addDoc(collection(db, 'rooms', inv.roomId, 'messages'), {
        senderId: 'system', senderName: 'System',
        text: `${state.user.displayName || 'New member'} joined the room.`,
        type: 'system', timestamp: serverTimestamp(),
      });
    }
    history.replaceState({}, '', location.pathname);
    $('join').classList.add('off');
    state.invCode = null; state.invRoomId = null;
    toast('Joined room!', 'ok');
    await loadRooms();
    await openRoom(inv.roomId);
    show('rv');
  } catch (e) { alrt('jAlert', 'Error: ' + e.message, 'err'); }
  $('jBtn').disabled = false; $('jBtn').textContent = 'Join Room';
}

export function cancelJoin() {
  state.invCode = null; state.invRoomId = null;
  history.replaceState({}, '', location.pathname);
  show('auth');
}

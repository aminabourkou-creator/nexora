/* ============================================================
   NEXORA STUDIO — chat.js (UPDATED)
   Chat functionality: send messages, delete messages,
   clear room chat, clear DMs.
   ============================================================ */

import { db } from './firebase.js';
import {
  collection, addDoc, query, where, getDocs, deleteDoc, 
  doc, onSnapshot, serverTimestamp, writeBatch
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js";

import { $, initials } from './utils.js';
import { toast, alrt, calrt } from './ui.js';
import { state } from './state.js';

// ── Send message to room ──
export async function sendMsg() {
  const input = $('msgInput');
  const text = input.value.trim();
  
  if (!text || !state.room) {
    toast('Please enter a message', 'err');
    return;
  }
  
  try {
    await addDoc(collection(db, 'rooms', state.room.id, 'messages'), {
      uid: state.user.uid,
      name: state.user.displayName || state.user.email.split('@')[0],
      email: state.user.email,
      text,
      createdAt: serverTimestamp()
    });
    input.value = '';
  } catch (e) {
    toast('Error sending message: ' + e.message, 'err');
  }
}

// ── Subscribe to room messages ──
export function subscribeToRoomMessages(roomId) {
  if (state.chatUnsub) state.chatUnsub();
  
  const q = query(
    collection(db, 'rooms', roomId, 'messages'),
    orderBy(firebase.firestore.FieldPath.documentId())
  );
  
  state.chatUnsub = onSnapshot(q, snap => {
    const msgs = [];
    snap.forEach(d => msgs.push({ id: d.id, ...d.data() }));
    renderMessages(msgs);
  });
}

// ── Render messages ──
function renderMessages(msgs) {
  const el = $('chatContainer');
  if (!el) return;
  
  el.innerHTML = msgs.map(m => {
    const isOwn = m.uid === state.user.uid;
    return `
      <div class="msg ${isOwn ? 'own' : 'other'}">
        <div class="av">${initials(m.name, m.email)}</div>
        <div class="content">
          <strong>${m.name}</strong>
          <p>${m.text}</p>
          ${isOwn ? `<button class="del-btn" onclick="deleteMessage('${state.room.id}', '${m.id}')">🗑</button>` : ''}
        </div>
      </div>
    `;
  }).join('');
  
  el.scrollTop = el.scrollHeight;
}

// ── Delete single message ──
export async function deleteMessage(roomId, msgId) {
  try {
    await deleteDoc(doc(db, 'rooms', roomId, 'messages', msgId));
    toast('Message deleted', 'ok');
  } catch (e) {
    toast('Error deleting message: ' + e.message, 'err');
  }
}

// ── CLEAR ALL MESSAGES IN ROOM ──
export async function clearRoomChat() {
  if (!state.room) {
    toast('No room selected', 'err');
    return;
  }
  
  if (!confirm(`Clear all messages in "${state.room.name}"? ⚠️`)) {
    return;
  }
  
  try {
    calrt('chatErr');
    const q = query(collection(db, 'rooms', state.room.id, 'messages'));
    const snap = await getDocs(q);
    
    const batch = writeBatch(db);
    snap.forEach(d => {
      batch.delete(doc(db, 'rooms', state.room.id, 'messages', d.id));
    });
    
    await batch.commit();
    toast(`Cleared ${snap.size} messages from room`, 'ok');
  } catch (e) {
    alrt('chatErr', 'Error: ' + e.message);
  }
}

// ── CLEAR ALL DM MESSAGES ──
export async function clearDMChat(friendId) {
  if (!state.user) {
    toast('Not logged in', 'err');
    return;
  }
  
  if (!confirm('Clear all private messages? ⚠️ Cannot undo')) {
    return;
  }
  
  try {
    calrt('dmErr');
    
    // Query messages where you're sender or receiver
    const q1 = query(
      collection(db, 'dms'),
      where('from', '==', state.user.uid),
      where('to', '==', friendId)
    );
    
    const q2 = query(
      collection(db, 'dms'),
      where('from', '==', friendId),
      where('to', '==', state.user.uid)
    );
    
    const snap1 = await getDocs(q1);
    const snap2 = await getDocs(q2);
    
    const batch = writeBatch(db);
    let count = 0;
    
    snap1.forEach(d => {
      batch.delete(doc(db, 'dms', d.id));
      count++;
    });
    
    snap2.forEach(d => {
      batch.delete(doc(db, 'dms', d.id));
      count++;
    });
    
    await batch.commit();
    toast(`Cleared ${count} private messages`, 'ok');
  } catch (e) {
    alrt('dmErr', 'Error: ' + e.message);
  }
}

// ── Send DM ──
export async function sendDM(toUid, toName) {
  const input = $('dmInput');
  const text = input.value.trim();
  
  if (!text) {
    toast('Message cannot be empty', 'err');
    return;
  }
  
  try {
    await addDoc(collection(db, 'dms'), {
      from: state.user.uid,
      to: toUid,
      fromName: state.user.displayName || state.user.email.split('@')[0],
      toName,
      text,
      createdAt: serverTimestamp(),
      read: false
    });
    input.value = '';
  } catch (e) {
    toast('Error: ' + e.message, 'err');
  }
}

// ── Subscribe to DMs ──
export function subscribeToDMs(friendId) {
  if (state.dmUnsub) state.dmUnsub();
  
  const q = query(
    collection(db, 'dms'),
    where('participants', 'array-contains', state.user.uid)
  );
  
  state.dmUnsub = onSnapshot(q, snap => {
    const dms = [];
    snap.forEach(d => {
      const msg = d.data();
      // Filter to only this friend's messages
      if (msg.from === friendId || msg.to === friendId) {
        dms.push({ id: d.id, ...msg });
      }
    });
    renderDMs(dms, friendId);
  });
}

// ── Render DMs ──
function renderDMs(dms, friendId) {
  const el = $('dmContainer');
  if (!el) return;
  
  el.innerHTML = dms.map(m => {
    const isOwn = m.from === state.user.uid;
    return `
      <div class="dm ${isOwn ? 'own' : 'other'}">
        <p>${m.text}</p>
        ${isOwn ? `<button class="del-btn" onclick="deleteDM('${m.id}')">🗑</button>` : ''}
      </div>
    `;
  }).join('');
  
  el.scrollTop = el.scrollHeight;
}

// ── Delete single DM ──
export async function deleteDM(dmId) {
  try {
    await deleteDoc(doc(db, 'dms', dmId));
    toast('Message deleted', 'ok');
  } catch (e) {
    toast('Error: ' + e.message, 'err');
  }
}

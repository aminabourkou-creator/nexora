/* ============================================================
   NEXORA STUDIO — ai.js
   The in-room AI assistant. Pulls the last messages from the room
   for context, posts a "Thinking..." placeholder, calls the model,
   then updates that same message with the real reply.
   ============================================================ */

import { db } from './firebase.js';
import { collection, addDoc, query, orderBy, getDocs, updateDoc, serverTimestamp }
  from "https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js";
import { state } from './state.js';

export async function callAI(userMsg, rid) {
  const q = query(collection(db, 'rooms', rid, 'messages'), orderBy('timestamp', 'desc'));
  const snap = await getDocs(q);
  const hist = [];
  snap.forEach(d => {
    const m = d.data();
    if (m.type !== 'system' && hist.length < 10) {
      hist.unshift({ role: m.senderId === 'ai-nexora' ? 'assistant' : 'user', content: m.text });
    }
  });

  const tRef = await addDoc(collection(db, 'rooms', rid, 'messages'), {
    senderId: 'ai-nexora', senderName: 'Nexora AI',
    text: '✦ Thinking...', type: 'ai', timestamp: serverTimestamp(),
  });

  try {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'claude-sonnet-4-6', max_tokens: 800,
        system: `You are Nexora AI inside the private room "${state.room?.name}". Be concise and helpful.`,
        messages: hist.slice(-8),
      }),
    });
    const data = await res.json();
    const reply = data.content?.[0]?.text || 'I could not respond right now.';
    await updateDoc(tRef, { text: reply });
  } catch (e) {
    await updateDoc(tRef, { text: 'Error reaching AI. Try again.' });
  }
}

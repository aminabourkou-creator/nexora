/* ============================================================
   NEXORA STUDIO — state.js
   Single shared in-memory state object. Every module reads/writes
   through this instead of declaring its own globals, so state
   stays consistent no matter which file changes it.
   ============================================================ */

export const state = {
  user: null,
  room: null,
  rooms: [],
  chatUnsub: null,
  memUnsub: null,
  selEmoji: '🤖',
  invUrl: '',
  invCode: null,
  invRoomId: null,
  voiceOn: false,
  micMuted: false,
  localStream: null,
  authTab: 'in',
};

// Read invite params from the URL once at startup (same behavior as before).
(() => {
  const p = new URLSearchParams(location.search);
  const inv = p.get('invite'), rid = p.get('room');
  if (inv && rid) { state.invCode = inv; state.invRoomId = rid; }
})();

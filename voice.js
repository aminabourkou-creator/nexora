/* ============================================================
   NEXORA STUDIO — voice.js
   Voice chat controls: request microphone access, toggle mute,
   and leave/stop the voice session. (WebRTC peer connections
   between members are not implemented yet — same as before.)
   ============================================================ */

import { $ } from './utils.js';
import { toast } from './ui.js';
import { state } from './state.js';

export async function toggleVoice() {
  if (state.voiceOn) { leaveVoice(); return; }
  try {
    state.localStream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
    state.voiceOn = true;
    $('vBar').classList.add('show');
    $('micBtn').className = 'btn-mic on'; $('micBtn').textContent = '🎙️ Mute';
    toast('Voice chat started', 'ok');
  } catch (e) { toast('Microphone access denied', 'err'); }
}

export function toggleMic() {
  if (!state.localStream) return;
  state.micMuted = !state.micMuted;
  state.localStream.getAudioTracks().forEach(t => { t.enabled = !state.micMuted; });
  $('micBtn').className = `btn-mic ${state.micMuted ? 'off' : 'on'}`;
  $('micBtn').textContent = state.micMuted ? '🔇 Unmute' : '🎙️ Mute';
  toast(state.micMuted ? 'Muted' : 'Unmuted', 'inf');
}

export function leaveVoice() {
  if (state.localStream) state.localStream.getTracks().forEach(t => t.stop());
  state.localStream = null; state.voiceOn = false; state.micMuted = false;
  $('vBar').classList.remove('show');
  toast('Left voice', 'inf');
}

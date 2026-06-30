/* ============================================================
   NEXORA STUDIO — utils.js
   Small, dependency-free helper functions shared by every module:
   DOM shortcut, formatting, error-message mapping, ID generation.
   ============================================================ */

export const $ = id => document.getElementById(id);

export function initials(name, email) {
  if (name?.trim()) return name.trim().split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);
  return (email || 'U')[0].toUpperCase();
}

export function fmtTime(ts) {
  if (!ts) return '';
  const d = ts.toDate ? ts.toDate() : new Date(ts);
  return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

export function errMsg(code) {
  const m = {
    'auth/user-not-found': 'No account found with this email.',
    'auth/wrong-password': 'Incorrect password.',
    'auth/invalid-credential': 'Invalid email or password.',
    'auth/email-already-in-use': 'Email already registered.',
    'auth/weak-password': 'Password needs at least 6 characters.',
    'auth/too-many-requests': 'Too many attempts. Please wait.',
    'auth/network-request-failed': 'Network error.',
    'auth/popup-closed-by-user': 'Sign-in popup closed.',
    'auth/invalid-email': 'Invalid email address.'
  };
  return m[code] || 'Something went wrong. Please try again.';
}

export function genCode(n = 14) {
  return Array.from(crypto.getRandomValues(new Uint8Array(n)))
    .map(b => b.toString(36)).join('').slice(0, n);
}

// Bold (**text**) + newline formatting used in chat bubbles.
export function fmt(t) {
  return (t || '').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br>');
}

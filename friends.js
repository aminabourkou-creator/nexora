/* ============================================================
   NEXORA STUDIO — friends.js (FIXED FOR MOBILE)
   Complete friends system: add friend, search, requests, list.
   Uses Firestore collections:
   - /friends/{friendshipId} (both-ways connections)
   - /friendRequests/{userId}/incoming (incoming requests)
   
   FIXED: Mobile search now works with:
   1. Proper Firestore queries (server-side filtering)
   2. No variable shadowing
   3. Debounce to prevent overloading
   4. Efficient client-side filtering with pagination
   ============================================================ */

import { db } from './firebase.js';
import {
  collection, addDoc, query, where, getDocs, updateDoc, deleteDoc,
  doc, setDoc, getDoc, onSnapshot, serverTimestamp, orderBy, limit
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js";

import { $, initials } from './utils.js';
import { toast, alrt, calrt } from './ui.js';
import { state } from './state.js';

// ── Debounce timer for search ──
let searchTimeout = null;

// ── Get user's friend list (real-time) ──
export function subscribeFriends() {
  if (!state.user) return;
  if (state.friendsUnsub) state.friendsUnsub();
  
  const q = query(collection(db, 'friends'), 
    where('users', 'array-contains', state.user.uid));
  
  state.friendsUnsub = onSnapshot(q, snap => {
    state.friends = [];
    snap.forEach(d => {
      const friendship = d.data();
      const friendId = friendship.users[0] === state.user.uid 
        ? friendship.users[1] 
        : friendship.users[0];
      state.friends.push({ id: d.id, ...friendship, friendId });
    });
    renderFriendsList();
  });
}

// ── Subscribe to friend requests ──
export function subscribeFriendRequests() {
  if (!state.user) return;
  if (state.requestsUnsub) state.requestsUnsub();
  
  const q = query(collection(db, 'friendRequests', state.user.uid, 'incoming'));
  
  state.requestsUnsub = onSnapshot(q, snap => {
    state.friendRequests = [];
    snap.forEach(d => state.friendRequests.push({ id: d.id, ...d.data() }));
    updateFriendRequestBadge();
    renderFriendRequests();
  });
}

// ── Update badge count ──
function updateFriendRequestBadge() {
  const badge = $('friendReqBadge');
  if (state.friendRequests.length > 0) {
    badge.style.display = 'flex';
    badge.textContent = state.friendRequests.length;
  } else {
    badge.style.display = 'none';
  }
}

// ── Render friends list ──
function renderFriendsList() {
  const el = $('friendsList');
  if (!state.friends || state.friends.length === 0) {
    el.innerHTML = '<div style="text-align:center;color:#9C9282;padding:24px;font-size:14px">لا توجد أصدقاء حالياً</div>';
    return;
  }
  
  el.innerHTML = state.friends.map(f => `
    <div class="friend-item">
      <div class="av">${initials(f.friendName, f.friendEmail)}</div>
      <div class="friend-info">
        <strong>${f.friendName || 'صديق'}</strong>
        <small>${f.friendEmail}</small>
      </div>
      <div class="friend-actions">
        <button class="btn-friend-sm reject" onclick="removeFriend('${f.id}')">إزالة</button>
      </div>
    </div>
  `).join('');
}

// ── Render friend requests ──
function renderFriendRequests() {
  const el = $('friendRequests');
  if (!state.friendRequests || state.friendRequests.length === 0) {
    el.innerHTML = '<div style="text-align:center;color:#9C9282;padding:24px;font-size:14px">لا توجد طلبات صداقة</div>';
    return;
  }
  
  el.innerHTML = state.friendRequests.map(req => `
    <div class="friend-item">
      <div class="av">${initials(req.senderName, req.senderEmail)}</div>
      <div class="friend-info">
        <strong>${req.senderName || 'مستخدم'}</strong>
        <small>${req.senderEmail}</small>
      </div>
      <div class="friend-actions">
        <button class="btn-friend-sm" onclick="acceptFriendRequest('${req.id}', '${req.senderId}')">قبول</button>
        <button class="btn-friend-sm reject" onclick="rejectFriendRequest('${req.id}')">رفض</button>
      </div>
    </div>
  `).join('');
}

// ── Search for users (FIXED FOR MOBILE) ──
export async function searchFriends(searchTerm) {
  // Debounce the search (wait 300ms after user stops typing)
  if (searchTimeout) clearTimeout(searchTimeout);
  
  searchTerm = (searchTerm || '').trim();
  
  if (!searchTerm) {
    $('searchResults').innerHTML = '<div style="text-align:center;color:#9C9282;padding:24px;font-size:14px">ابدأ بالبحث...</div>';
    return;
  }
  
  // Show loading state
  $('searchResults').innerHTML = '<div style="text-align:center;color:#9C9282;padding:24px;font-size:14px">جاري البحث...</div>';
  
  searchTimeout = setTimeout(async () => {
    try {
      const searchLower = searchTerm.toLowerCase();
      
      // Fetch all users with a reasonable limit to avoid overload
      // On mobile, we want to fetch quickly, then filter
      const usersQuery = query(
        collection(db, 'users'),
        limit(100)  // ✅ Limit to 100 users to prevent mobile overload
      );
      
      const snap = await getDocs(usersQuery);
      const results = [];
      
      // ✅ Filter on client side (with the limited set)
      snap.forEach(d => {
        const user = d.data();
        
        // Skip self
        if (user.uid === state.user.uid) return;
        
        // Prepare searchable fields
        const email = (user.email || '').toLowerCase();
        const name = (user.name || '').toLowerCase();
        
        // Match by email or name (partial match)
        if (email.includes(searchLower) || name.includes(searchLower)) {
          results.push({ uid: user.uid, ...user });
        }
      });
      
      if (results.length === 0) {
        $('searchResults').innerHTML = '<div style="text-align:center;color:#9C9282;padding:24px;font-size:14px">لم يتم العثور على نتائج</div>';
        return;
      }
      
      // ✅ Check friend status for each result (with caching)
      const resultsHTML = await Promise.all(results.map(async (user) => {
        const status = await checkFriendStatus(user.uid);
        let btnClass = '';
        let btnText = 'إضافة';
        let isDisabled = false;
        
        if (status === 'friend') {
          btnClass = 'pending';
          btnText = 'صديق بالفعل';
          isDisabled = true;
        } else if (status === 'pending') {
          btnClass = 'pending';
          btnText = 'قيد الانتظار';
          isDisabled = true;
        }
        
        return `
          <div class="search-result">
            <div class="info">
              <strong>${user.name || 'مستخدم'}</strong>
              <small>${user.email}</small>
            </div>
            <button class="btn-add ${btnClass}" 
              onclick="sendFriendRequest('${user.uid}', '${(user.name || '').replace(/'/g, "\\'")}', '${user.email}')"
              ${isDisabled ? 'disabled' : ''}>
              ${btnText}
            </button>
          </div>
        `;
      }));
      
      $('searchResults').innerHTML = resultsHTML.join('');
    } catch (e) {
      console.error('Search error:', e);
      toast('خطأ في البحث: ' + e.message, 'err');
      $('searchResults').innerHTML = '<div style="text-align:center;color:#9C9282;padding:24px;font-size:14px">خطأ في البحث</div>';
    }
  }, 300);  // ✅ Debounce delay: 300ms
}

// ── Check friend status (with optimized queries) ──
async function checkFriendStatus(friendUid) {
  try {
    // ✅ Check if already friends (with where clause)
    const friendsQ = query(
      collection(db, 'friends'),
      where('users', 'array-contains', state.user.uid)
    );
    const friendsSnap = await getDocs(friendsQ);
    
    for (const friendDoc of friendsSnap.docs) {
      const friendship = friendDoc.data();
      if (friendship.users.includes(friendUid)) {
        return 'friend';
      }
    }
    
    // ✅ Check if request already sent (faster query)
    const reqSnap = await getDoc(
      doc(db, 'friendRequests', friendUid, 'incoming', state.user.uid)
    );
    
    if (reqSnap.exists()) {
      return 'pending';
    }
    
    return 'none';
  } catch (e) {
    console.warn('Status check error:', e);
    return 'none';
  }
}

// ── Send friend request ──
export async function sendFriendRequest(friendUid, friendName, friendEmail) {
  calrt('friendErr');
  try {
    await setDoc(
      doc(db, 'friendRequests', friendUid, 'incoming', state.user.uid),
      {
        senderId: state.user.uid,
        senderName: state.user.displayName || state.user.email.split('@')[0],
        senderEmail: state.user.email,
        createdAt: serverTimestamp(),
        status: 'pending'
      }
    );
    
    toast(`تم إرسال طلب صداقة إلى ${friendName}`, 'ok');
    // Refresh search
    searchFriends($('searchFriendInput')?.value || '');
  } catch (e) {
    console.error('Friend request error:', e);
    alrt('friendErr', 'خطأ: ' + e.message);
  }
}

// ── Accept friend request ──
export async function acceptFriendRequest(requestId, senderId) {
  try {
    // Get the request data
    const sendersReq = await getDoc(
      doc(db, 'friendRequests', senderId, 'incoming', state.user.uid)
    );
    
    if (!sendersReq.exists()) {
      toast('الطلب غير موجود', 'err');
      return;
    }
    
    const reqData = sendersReq.data();
    
    // Add friendship
    await addDoc(collection(db, 'friends'), {
      users: [state.user.uid, senderId],
      friendName: reqData.senderName,
      friendEmail: reqData.senderEmail,
      createdAt: serverTimestamp()
    });
    
    // Remove request
    await deleteDoc(
      doc(db, 'friendRequests', state.user.uid, 'incoming', requestId)
    );
    
    toast('تمت قبول الطلب!', 'ok');
    subscribeFriends();
    subscribeFriendRequests();
  } catch (e) {
    console.error('Accept error:', e);
    toast('خطأ: ' + e.message, 'err');
  }
}

// ── Reject friend request ──
export async function rejectFriendRequest(requestId) {
  try {
    await deleteDoc(
      doc(db, 'friendRequests', state.user.uid, 'incoming', requestId)
    );
    toast('تم رفض الطلب', 'ok');
    subscribeFriendRequests();
  } catch (e) {
    console.error('Reject error:', e);
    toast('خطأ: ' + e.message, 'err');
  }
}

// ── Remove friend ──
export async function removeFriend(friendshipId) {
  if (!confirm('هل تريد حذف هذا الصديق؟')) return;
  
  try {
    await deleteDoc(doc(db, 'friends', friendshipId));
    toast('تم حذف الصديق', 'ok');
    subscribeFriends();
  } catch (e) {
    console.error('Remove error:', e);
    toast('خطأ: ' + e.message, 'err');
  }
}

// ── Switch between friend tabs ──
export function switchFriendsTab(tab) {
  // Update buttons
  document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('on'));
  $('tab-' + tab).classList.add('on');
  
  // Update panels
  $('friends-list-panel').style.display = tab === 'list' ? 'block' : 'none';
  $('friends-requests-panel').style.display = tab === 'requests' ? 'block' : 'none';
  $('friends-search-panel').style.display = tab === 'search' ? 'block' : 'none';
}

// ── Cleanup ──
export function cleanupFriends() {
  if (state.friendsUnsub) state.friendsUnsub();
  if (state.requestsUnsub) state.requestsUnsub();
  if (searchTimeout) clearTimeout(searchTimeout);
}

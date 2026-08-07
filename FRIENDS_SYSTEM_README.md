# 👥 نظام الأصدقاء — Nexora Studio

## ✨ الميزات الجديدة المضافة

### 1️⃣ **زر الأصدقاء في الـ Sidebar**
```
👥 الأصدقاء (مع badge لعدد الطلبات الواردة)
```

### 2️⃣ **نافذة منفثقة شاملة بثلاث تبويبات:**

#### 📋 **تبويب: قائمة الأصدقاء**
- عرض جميع أصدقاؤك
- اسم وبريد كل صديق
- زر "إزالة الصديق"

#### ❓ **تبويب: طلبات الصداقة**
- عرض الطلبات الواردة من مستخدمين آخرين
- زر "قبول" لقبول الطلب
- زر "رفض" لرفض الطلب
- يظهر شارة Badge بعدد الطلبات الجديدة

#### 🔍 **تبويب: البحث عن أصدقاء**
- ابحث بـ البريد الإلكتروني أو الاسم
- عرض نتائج البحث
- زر "إضافة" لإرسال طلب صداقة
- الحالات:
  - "إضافة" = لم تكن هناك علاقة
  - "قيد الانتظار" = تم إرسال طلب سابقاً
  - "صديق بالفعل" = موجود بالفعل في قائمتك

---

## 🛠️ الملفات المضافة/المعدلة

### ✅ ملفات جديدة:
| الملف | الوصف |
|------|--------|
| **friends.js** | كل منطق نظام الأصدقاء |

### ✏️ ملفات معدلة:
| الملف | التغييرات |
|------|-----------|
| **index.html** | ✨ إضافة زر الأصدقاء + نافذة منفثقة |
| **main.css** | ✨ أسلوب للأصدقاء والتبويبات |
| **app.js** | ✨ استيراد functions الأصدقاء + تصديرها للـ window |
| **auth.js** | ✨ تنظيف الأصدقاء عند logout |
| **state.js** | ✨ إضافة arrays و unsubscribers للأصدقاء |

---

## 🗄️ Firestore Collections

### 1. `/friends/{friendshipId}`
```
{
  users: [userId1, userId2],          // متجه بـ IDs الطرفين
  friendName: "أحمد محمد",            // اسم الصديق
  friendEmail: "user@example.com",    // بريد الصديق
  createdAt: timestamp                // وقت إنشاء الصداقة
}
```

### 2. `/friendRequests/{userId}/incoming/{senderId}`
```
{
  senderId: "uid123",                 // معرّف مرسل الطلب
  senderName: "علي سلام",            // اسم مرسل الطلب
  senderEmail: "sender@example.com",  // بريد مرسل الطلب
  status: "pending",                  // حالة الطلب
  createdAt: timestamp                // وقت الطلب
}
```

---

## 🎯 حالات الاستخدام

### سيناريو 1: إضافة صديق جديد
```
1. انقر على زر "👥 الأصدقاء" في sidebar
2. اختر تبويب "البحث" 🔍
3. ابحث عن البريد أو الاسم
4. انقر "إضافة"
5. يتم إرسال طلب صداقة
━━━━━━━━━━━━━━━━━━━━━
النتيجة: ✅ ينتظر الشخص الآخر القبول
```

### سيناريو 2: قبول طلب صداقة
```
1. تظهر شارة Badge بعدد الطلبات
2. انقر على "👥 الأصدقاء"
3. اختر تبويب "الطلبات" ❓
4. انقر "قبول"
━━━━━━━━━━━━━━━━━━━━━
النتيجة: ✅ أصبحا أصدقاء
```

### سيناريو 3: رفض طلب صداقة
```
1. في تبويب "الطلبات" ❓
2. انقر "رفض"
━━━━━━━━━━━━━━━━━━━━━
النتيجة: ✅ تم حذف الطلب
```

### سيناريو 4: حذف صديق
```
1. تبويب "قائمة الأصدقاء" 📋
2. انقر "إزالة"
3. تأكيد الحذف
━━━━━━━━━━━━━━━━━━━━━
النتيجة: ✅ تم إزالة الصديق
```

---

## 💻 الدوال الرئيسية

```javascript
// في friends.js:

// 1. الاشتراك في قائمة الأصدقاء (real-time)
subscribeFriends()

// 2. الاشتراك في طلبات الصداقة (real-time)
subscribeFriendRequests()

// 3. البحث عن مستخدمين
searchFriends(query)

// 4. إرسال طلب صداقة
sendFriendRequest(friendUid, friendName, friendEmail)

// 5. قبول طلب
acceptFriendRequest(requestId, senderId)

// 6. رفض طلب
rejectFriendRequest(requestId)

// 7. حذف صديق
removeFriend(friendshipId)

// 8. تبديل التبويبات
switchFriendsTab(tab) // 'list' | 'requests' | 'search'

// 9. تنظيف الـ listeners عند logout
cleanupFriends()
```

---

## 🔐 ملاحظات الأمان

### Security Rules المقترحة لـ Firestore:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Collection: friends
    match /friends/{doc=**} {
      allow read: if request.auth.uid in resource.data.users;
      allow create: if request.auth.uid in request.resource.data.users;
      allow delete: if request.auth.uid in resource.data.users;
    }
    
    // Collection: friendRequests
    match /friendRequests/{userId}/incoming/{doc=**} {
      allow read: if request.auth.uid == userId;
      allow create: if request.auth != null;
      allow delete: if request.auth.uid == userId || 
                       request.auth.uid == resource.data.senderId;
    }
    
    // Collection: users (للبحث)
    match /users/{userId} {
      allow read: if request.auth != null;
      allow write: if request.auth.uid == userId;
    }
  }
}
```

---

## 🚀 الخطوات:

1. **فك الضغط:** `nexora-with-friends.zip`
2. **استبدل الملفات:** ضع جميع الملفات في موقعك
3. **امسح الـ Cache:** `Ctrl+Shift+Delete`
4. **أعيد تحميل:** `F5` أو `Ctrl+R`
5. **اختبر:** انقر على زر "👥 الأصدقاء"

---

## ✅ ما تم إضافته

✨ **نظام أصدقاء كامل**
- ✅ البحث عن أصدقاء
- ✅ إرسال طلبات صداقة
- ✅ قبول/رفض الطلبات
- ✅ إدارة قائمة الأصدقاء
- ✅ Real-time updates
- ✅ شارات Badge للطلبات الجديدة
- ✅ واجهة جميلة بـ 3 تبويبات

---

## 🎨 الألوان المستخدمة

```css
--primary: #00D9FF   /* الأزرق الفيروزي - الأزرار الرئيسية */
--secondary: #4F46E5 /* البنفسجي - زر الإضافة */
--danger: #ef4444    /* الأحمر - زر الرفض والإزالة */
--muted: #6b7280     /* الرمادي - النصوص الثانوية */
```

---

## 📱 الاستجابة

✅ يعمل تماماً على:
- الهاتف (mobile)
- التابلت (tablet)
- الكمبيوتر (desktop)

---

## ⚠️ ملاحظات مهمة

### إذا لم يظهر زر الأصدقاء:
1. امسح الـ cache بالكامل
2. أغلق وأعد فتح المتصفح
3. تحقق من DevTools (F12) للأخطاء

### إذا لم تظهر الأصدقاء:
1. تأكد من تسجيل الدخول
2. تحقق من اتصال Firebase
3. تحقق من Firestore security rules

### إذا البحث لا يعمل:
1. تأكد من وجود مجموعة `users` في Firestore
2. عند التسجيل الجديد، يجب إضافة بيانات المستخدم في `users` collection

---

## 🎉 الآن جاهز!

```
👥 نظام الأصدقاء كامل وشامل! 🚀
✨ واجهة جميلة وسهلة الاستخدام
⚡ Real-time updates
🔐 آمن على Firestore
```

**استمتع بـ Nexora Studio!** 💫

# Nexora Studio

## 🎯 Description

Nexora Studio is a real-time collaboration platform with chat, voice calls, and AI assistant. Built with Firebase, WebRTC, and Google Gemini API.

## ✨ Features

- 💬 Real-time messaging
- 🎤 Voice calls (WebRTC P2P)
- 🤖 AI Assistant (@Nexora)
- 📁 File sharing
- 🎨 Collaborative whiteboard
- ✅ Task management
- 👥 Friend system
- 🔔 Notifications
- 👑 Owner Dashboard (Admin Panel)

## 🔐 Admin Features

- 📊 User statistics and analytics
- 👥 User management (Ban/Unban)
- 📢 Broadcast notifications
- 🗑️ Content deletion
- ⚙️ Admin management
- 📝 Activity logs

## 🚀 Quick Start

### Prerequisites
- Node.js v16+
- Firebase project
- Google Gemini API key

### Installation

1. Clone the repository
```bash
git clone https://github.com/aminabourkou-creator/nexora.git
cd nexora
```

2. Install dependencies
```bash
npm install
```

3. Configure Firebase
- Create a Firebase project
- Add your config to `index.html`

4. Deploy
```bash
vercel --prod
firebase deploy --only firestore:rules
```

## 📱 Build for Android

```bash
bubblewrap init --manifest https://nexora-pi-hazel.vercel.app/manifest.json
bubblewrap build
```

## 🌐 Live Demo

https://nexora-pi-hazel.vercel.app

## 👤 Owner

- **Name:** Yamina Bourkou
- **Email:** aminabenzaram@gmail.com
- **Portfolio:** aminainfo.com

## 📄 License

PROPRIETARY - All rights reserved

## 🤝 Support

For issues and questions: aminabenzaram@gmail.com

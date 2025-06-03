
# 💬 WhatsApp Clone – Client

A modern, real-time chat application inspired by WhatsApp. Built with **React**, **Socket.IO**, and **Material UI**, this client app offers a sleek UI and seamless messaging experience.

![image](https://github.com/user-attachments/assets/cf95723b-b394-4ebc-98f5-8bda8d368bd6)


---

## 🚀 Features

- ✅ Real-time messaging (Socket.IO)
- 💬 Chat list with recent conversations
- 🟢 Online/offline presence indicators
- 🔒 Google auth based Authentication
- 📷 Image preview (coming soon)
- ✅ Message status ticks (coming soon)

---

## 🛠️ Tech Stack

| Layer     | Tech |
|-----------|------|
| Frontend  | [React](https://reactjs.org/) |
| Styling   | [Material UI](https://mui.com/) |
| Routing   | [React Router](https://reactrouter.com/) |
| Realtime  | [Socket.IO Client](https://socket.io/docs/v4/client-api/) |
| HTTP      | [Axios](https://axios-http.com/) |
| Build Tool| [Vite](https://vitejs.dev/) |

---

## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/whatsapp-clone-client.git
cd whatsapp-clone-client
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root with the following:

```env
VITE_API_URL=http://localhost:5000/api
VITE_SOCKET_URL=http://localhost:5000
```

Adjust these URLs based on your backend settings.

### 4. Start the App

```bash
npm run dev
```

The app should now be live at `http://localhost:5173`.

---

## 📁 Folder Structure

```
whatsapp-clone-client/
├── public/
├── src/
│   ├── assets/           # Icons and images
│   ├── components/       # Reusable UI components
│   ├── hooks/            # Custom React hooks
│   ├── pages/            # Route-based views
│   ├── store/            # Redux state store
│   ├── utils/            # Helper functions
│   ├── App.jsx           # Main app component
│   └── main.jsx          # Entry point
├── .env
└── vite.config.js
```

---

## 🔐 Authentication Flow

- User signs in with their **Google account** using OAuth 2.0
- The backend verifies the Google ID token and issues a custom JWT
- JWT is stored in `localStorage` or `sessionStorage`
- Protected routes check for token presence and validity
- Logout clears the token and redirects the user to the login screen

---

## 🔌 Socket.IO Events

| Event             | Description                    |
|------------------|--------------------------------|
| `message:send`   | Emit new message               |
| `message:receive`| Listen for incoming messages   |
| `user:online`    | Broadcast when user connects   |
| `user:offline`   | Broadcast when user disconnects|

---

## 📸 Screenshots

> You can add real screenshots or GIFs here to show off the UI.
![image](https://github.com/user-attachments/assets/3bb307dd-4943-47b1-9e41-ebc80084261b)

---

## 🧪 To-Do / Coming Soon

- [ ] Message read receipts (✓✓)
- [ ] Group chats
- [ ] Voice messages
- [ ] Message delete/edit
- [ ] Emoji reactions

---

## 🧩 Backend API

This client requires a backend to function. Make sure to run the [WhatsApp Clone Server](https://github.com/DayanandR/whatsapp-clone-server) and [WhatsApp Clone Socket](https://github.com/DayanandR/whatsapp-clone-socket) in parallel.

---

## 🙌 Acknowledgements

- Inspired by WhatsApp Web
- UI inspired by Material Design principles

---

## 🔗 Connect

- [Portfolio](https://portfolio-website-nedy.vercel.app/)
- [LinkedIn](https://www.linkedin.com/in/dayanand-rathod)

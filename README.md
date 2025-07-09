## Real-Time Chat Application - MERN Stack

A **Full Stack Realtime Chat App** with modern UI, real-time messaging, file sharing, authentication, and cloud support. Built using **MERN**, **Socket.io**, **TailwindCSS**, and **Cloudinary**, this app lets users chat in real-time, share media, and download files — all while maintaining top-notch security and state management.

---

### Features

* **JWT-based Authentication & Authorization**
* **Real-time messaging** using **Socket.io**
* **Online user status** display
* **Global state management** with Zustand
* Share **images, videos, audios, PDFs, and documents**
* **Download** shared PDF/doc/media files
* Responsive UI with **TailwindCSS + DaisyUI**
* Robust **error handling** (client & server side)
* **Cloudinary** for media upload and CDN storage
* **Deployment-ready** with `.env` configuration

---

## 🛠️ Tech Stack & Tools

| Layer        | Tech / Tool                     |
| ------------ | ------------------------------- |
| Frontend     | React.js, TailwindCSS, Daisy UI |
| Backend      | Node.js, Express.js             |
| Database     | MongoDB (via Mongoose)          |
| Realtime     | Socket.io                       |
| Auth         | JWT (JSON Web Token)            |
| State        | Zustand                         |
| File Storage | Cloudinary                      |
| Dev Tools    | Postman, VS Code, Git, GitHub   |

---

## 🔧 Project Setup

### 1. Clone the Repository

```bash
git clone https://github.com/khushi8169/Real-Time-Chat-Application-MERN.git
cd Real-Time-Chat-Application-MERN
```

---

### 2. Setup Environment Variables

Create a `.env` file in the root directory of `backend` and add the following:

```env
MONGODB_URI=your_mongodb_connection_string
PORT=5001
JWT_SECRET=your_jwt_secret

CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

NODE_ENV=development
```

---

### 3. Install Dependencies

**Backend**

```bash
cd backend
npm install
```

**Frontend**

```bash
cd ../frontend
npm install
```

---

### 4. Run the Application

**Backend**

```bash
cd backend
npm start
```

**Frontend**

```bash
cd frontend
npm start
```

---

## Build for Production

**Frontend build**

```bash
cd frontend
npm run build
```

Deploy the frontend on **Vercel** or **Netlify**, and backend on **Render**, **Railway**, or **VPS**.

---

## File Sharing Support

Users can:

✅ Send and receive:

* Images (JPEG, PNG, etc.)
* Videos (MP4, WebM)
* Audios (MP3, WAV)
* PDFs
* Documents (DOCX, XLSX, PPTX, etc.)

✅ **Preview** images/videos/audio inside the chat
✅ **Download** PDFs and other files directly

All media is uploaded to **Cloudinary** and fetched via secure URLs.

---
## 🧪 Post-Development Checklist

* [x] JWT auth working end-to-end
* [x] Socket.io integrated and messages synced
* [x] Zustand configured for global state
* [x] Cloudinary handling file uploads
* [x] UI responsive and functional on all devices
* [x] Build & deployment tested

---

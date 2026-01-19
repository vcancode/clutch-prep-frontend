# 🎯 ClutchPrep Frontend

ClutchPrep is an AI-powered exam preparation platform that helps students **focus only on what actually scores marks**.
Instead of overwhelming learners with broad chapters, ClutchPrep presents **question-based, exam-oriented topics** derived from previous year question papers — enabling efficient, time-bound preparation.


This repository contains the **frontend application** for ClutchPrep.

---

## ✨ What the Frontend Does

* 🖥️ Premium, modern exam-analysis dashboard
* 📄 Upload previous year question papers & syllabus
* 📊 View AI-generated question-based topics
* ✅ Mark topics as completed & track progress
* 🧪 Attempt MCQ-based diagnostic tests
* ▶️ Access curated subject playlists & topic videos
* 🔐 Secure JWT-based session handling
* 🌙 Dark-mode only UI (green + black theme)

---

## 🛠 Tech Stack

### Frontend

* **Vite**
* **React (JSX)**
* **Tailwind CSS**
* **21st.dev**
* **Aceternity UI**
* **shadcn/ui (Tailwind-based)**
* **Framer Motion** (animations)
* **Lucide Icons**

### Communication

* REST API integration with ClutchPrep Backend

---

## 📁 Project Structure

```
src/
├── components/
│   ├── ui/
├── lib/
├── services/
├── App.jsx
└── main.jsx
```

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the repository

```bash
git clone https://github.com/vcancode/clutch-prep-frontend.git
cd clutch-prep-frontend
```

---

### 2️⃣ Install dependencies

```bash
npm install
```

---

### 3️⃣ Create `.env` file

Create a `.env` file in the root directory and add:

```env
VITE_BACKEND_API=https://your-backend-url.com
```

Example (local development):

```env
VITE_BACKEND_API=http://localhost:5000
```

⚠️ Environment variables must start with `VITE_`.

---

## ▶️ Running the Frontend

```bash
npm run dev
```

The application will run on:

```
http://localhost:5173
```

---

## 🔐 Authentication Flow

* User signs up / logs in
* JWT token stored on the client
* Token attached to protected API requests
* Dashboard & reports accessible only to authenticated users

---

## 📌 Important Notes

* Frontend assumes backend enforces:

  * Daily YouTube enrichment limits
  * Document ownership
  * Analysis quotas
* UI is optimized for:

  * Smooth animations
  * Minimal distractions
  * Exam-focused workflows
* Designed strictly for **dark mode** usage

---

## 🔗 Backend Repository

👉 **ClutchPrep Backend**
[https://github.com/vcancode/clutch-prep-backend](https://github.com/vcancode/clutch-prep-backend)

---

## 📜 License

Licensed under the terms specified here:
👉 [https://github.com/vcancode/clutch-prep-frontend/blob/main/LICENSE](https://github.com/vcancode/clutch-prep-frontend/blob/main/LICENSE)

---

**ClutchPrep** — *Study only what wins you marks.*

---

If you want next:

* Deployment guide (Vercel)
* Environment separation (dev / prod)
* API typings & validation
* README badges + screenshots

Say **which one**.

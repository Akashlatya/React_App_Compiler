# OG Compiler - Master Programming Platform

![OG Compiler Banner](https://ogcompiler.com/og-compiler-banner.png)

**OG Compiler** is a modern, full-stack online code execution platform. It allows users to write, compile, and run code instantly in multiple languages including **Python**, **C**, **C++**, **Java**, and **JavaScript**.

Live Demo: [https://ogcompiler.com](https://ogcompiler.com)

---

## 🚀 Key Features

*   **Multi-Language Support:** Compile and run code in 5+ popular languages.
*   **Real-time Execution:** Instant output streaming via WebSockets.
*   **Interactive Terminal:** A realistic terminal experience for handling standard input/output.
*   **Modern UI/UX:** Built with React and Framer Motion for smooth animations and a premium dark mode aesthetic.
*   **PWA Support:** Installable as a Progressive Web App on mobile and desktop.
*   **Secure:** HTTPS enabled with Let's Encrypt and backend sandboxing.

---

## 🛠️ Tech Stack

### Frontend
*   **Framework:** [React 18](https://reactjs.org/) (via [Vite](https://vitejs.dev/))
*   **Language:** JavaScript / TypeScript
*   **Styling:** CSS Modules, [Framer Motion](https://www.framer.com/motion/) (Animations), [Lucide React](https://lucide.dev/) (Icons)
*   **Editor:** [Monaco Editor](https://microsoft.github.io/monaco-editor/) (VS Code power)
*   **Networking:** [Socket.io Client](https://socket.io/)

### Backend
*   **Runtime:** [Node.js](https://nodejs.org/)
*   **Framework:** [Express](https://expressjs.com/)
*   **Communication:** [Socket.io](https://socket.io/) (Real-time WSS)
*   **Compilation:** Native `child_process` execution with timeout protection.
*   **Security:** `Helmet`, `Express Rate Limit`.

### Infrastructure & DevOps
*   **Containerization:** [Docker](https://www.docker.com/) & Docker Compose
*   **Web Server:** [Nginx](https://nginx.org/) (Reverse Proxy & Static File Serving)
*   **SSL/TLS:** [Certbot](https://certbot.eff.org/) (Let's Encrypt)
*   **Cloud Provider:** Oracle Cloud Infrastructure (OCI)

---

## 🏃‍♂️ How to Run Locally

### Prerequisites
*   [Node.js](https://nodejs.org/) (v18+)
*   [GCC/G++](https://gcc.gnu.org/) (For C/C++ compilation)
*   [Python](https://www.python.org/) (For Python compilation)
*   [Java](https://www.java.com/) (For Java compilation)

### 1. Clone the Repository
```bash
git clone https://github.com/Akashlatya/ogcompiler.git
cd ogcompiler
```

### 2. Setup Backend
```bash
cd server
npm install
npm run dev
```
*The backend will start on `http://localhost:3001`.*

### 3. Setup Frontend
Open a new terminal window:
```bash
cd ..  # Go back to root directory
npm install
npm run dev
```
*The frontend will start on `http://localhost:5173`.*

---

## 🐳 How to Deploy (Docker)

For production, we use Docker Compose to orchestrate the Frontend, Backend, and Nginx.

### 1. Prerequisites
*   Docker & Docker Compose installed on the server.
*   Ports `80`, `443`, and `3001` open.

### 2. Configure SSL (First Time Only)
Run Certbot to generate certificates for your domain:
```bash
sudo certbot certonly --standalone -d ogcompiler.com -d www.ogcompiler.com
```

### 3. Deploy
We have included a helper script to automate pulling, building, and running the containers.

```bash
./deploy.sh
```

**Manual Command:**
```bash
docker-compose down
docker-compose up -d --build
```

---

## 📂 Project Structure

```
ogcompiler/
├── server/                 # Backend Node.js Application
│   ├── Dockerfile          # Backend Docker Config
│   ├── index.js            # Main Server Entry (Express + Socket.io)
│   └── package.json        # Backend Dependencies
├── src/                    # Frontend React Application
│   ├── components/         # Reusable UI Components (Editor, Terminal)
│   ├── pages/              # Page Views (Home, CompilerPage)
│   └── main.jsx            # React Entry Point
├── Dockerfile              # Frontend (Multi-stage Build: Node -> Nginx)
├── docker-compose.yml      # Orchestration Config
├── nginx.conf              # Nginx Configuration (SSL, Proxy, Strings)
├── deploy.sh               # Auto-deployment Script
└── README.md               # You are here
```

---

## 🛡️ License

This project is open-source and available under the **MIT License**.

# SnapTalk - Real-Time Messaging Application

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![Status](https://img.shields.io/badge/status-Active-brightgreen)

## 📋 Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Workflow](#project-workflow)
- [Folder Structure](#folder-structure)
- [Installation & Setup](#installation--setup)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Environment Variables](#environment-variables)
- [Contributing](#contributing)

---

## 🎯 Project Overview

**SnapTalk** is a modern, real-time messaging application designed to provide seamless, secure, and interactive communication across devices. It allows users to connect with friends, family, or colleagues instantly, offering a blend of personal and professional messaging features.

The application features a robust full-stack architecture with a React-based frontend and Node.js/Express backend, enabling real-time bidirectional communication through WebSockets (Socket.io).

**Live Demo:** [https://chat-app-controlcoder.vercel.app/](https://chat-app-controlcoder.vercel.app/)

---

## ✨ Features

- **Real-Time Messaging**: Instant message delivery using WebSocket technology
- **User Authentication**: Secure JWT-based authentication with bcrypt password hashing
- **User Profiles**: View and manage user information with avatar support
- **Friend Management**: Add, remove, and manage connections
- **Message History**: Persistent message storage with MongoDB
- **Typing Indicators**: Real-time typing status notifications
- **Online Status**: Track user availability in real-time
- **Media Support**: Cloud-based image uploads using Cloudinary
- **Responsive Design**: Mobile-friendly UI with Tailwind CSS
- **Toast Notifications**: User-friendly feedback with React Hot Toast
- **Secure Communication**: CORS-enabled, JWT-protected endpoints

---

## 🛠️ Tech Stack

### **Frontend**
| Technology | Version | Purpose |
|-----------|---------|---------|
| React | 19.2.0 | UI Library |
| Vite | 7.3.1 | Build Tool & Dev Server |
| React Router DOM | 7.13.1 | Client-side Routing |
| Socket.io Client | 4.8.3 | Real-time Communication |
| Tailwind CSS | 4.2.1 | Utility-first CSS Framework |
| Axios | 1.13.6 | HTTP Client |
| React Hot Toast | 2.6.0 | Toast Notifications |
| ESLint | 9.39.1 | Code Quality |

### **Backend**
| Technology | Version | Purpose |
|-----------|---------|---------|
| Node.js | Latest | JavaScript Runtime |
| Express | 5.2.1 | Web Framework |
| Socket.io | 4.8.3 | Real-time Communication |
| MongoDB/Mongoose | 9.3.3 | Database & ODM |
| JWT | 9.0.3 | Authentication Token |
| Bcrypt | 6.0.0 | Password Hashing |
| CORS | 2.8.6 | Cross-Origin Resource Sharing |
| Dotenv | 17.3.1 | Environment Configuration |
| Cloudinary | 2.9.0 | Cloud Image Storage |
| Cookie Parser | 1.4.7 | Cookie Parsing |

### **DevOps & Deployment**
| Technology | Purpose |
|-----------|---------|
| Vercel | Frontend Hosting |
| Concurrently | Run multiple dev servers |
| Nodemon | Auto-restart server during development |

---

## 🔄 Project Workflow

### **Architecture Overview**

```
┌─────────────────────────────────────────────────────────────┐
│                    CLIENT (React + Vite)                     │
│  ┌──────────────────────────────────────────────────────┐   │
│  │ Pages: Auth, Chat, Profile, Dashboard              │   │
│  │ Components: MessageBox, UserList, ChatWindow        │   │
│  │ Context API: User, Chat, Socket State Management    │   │
│  │ Routing: React Router (Login → Chat → Profile)     │   │
│  └──────────────────────────────────────────────────────┘   │
│                          ↕ (HTTP + WebSocket)                │
├─────────────────────────────────────────────────────────────┤
│         Socket.io & REST API Communication Layer             │
├─────────────────────────────────────────────────────────────┤
│                  SERVER (Node.js + Express)                  │
│  ┌──────────────────────────────────────────────────────┐   │
│  │ Routes: Auth, Chat, Users, Messages                 │   │
│  │ Controllers: Logic for auth, messaging, user mgmt   │   │
│  │ Models: User, Message, Conversation (MongoDB)      │   │
│  │ Middleware: JWT Verify, CORS, Error Handling       │   │
│  │ Socket Events: message, typing, online status       │   │
│  └──────────────────────────────────────────────────────┘   │
│                          ↕ (MongoDB Queries)                 │
├─────────────────────────────────────────────────────────────┤
│              DATABASE (MongoDB Atlas)                         │
│    Collections: users, messages, conversations, tokens       │
└─────────────────────────────────────────────────────────────┘
```

### **User Flow Diagram**

```
1. AUTHENTICATION FLOW
   ┌────────────┐
   │   Login    │ → Credentials Sent to Backend
   └────────────┘
         ↓
   ┌─────────────────────┐
   │ Server Verification │ → Bcrypt Password Check
   └─────────────────────┘
         ↓
   ┌────────────────┐
   │ JWT Generated  │ → Token Stored in Cookies
   └────────────────┘
         ↓
   ┌──────────────────┐
   │ User Redirected  │ → Dashboard/Chat View
   └──────────────────┘

2. MESSAGE SENDING FLOW
   ┌──────────────┐
   │ User Types   │
   └──────────────┘
         ↓
   ┌────────────────────────────┐
   │ Client Emits Socket Event  │ → "message:send"
   └────────────────────────────┘
         ↓
   ┌──────────────────────────────┐
   │ Server Receives Message      │ → Validates JWT
   └──────────────────────────────┘
         ↓
   ┌───────────��────────────────────┐
   │ Saves to MongoDB               │ → Message Stored
   └────────────────────────────────┘
         ↓
   ┌───────────────────────────────────┐
   │ Broadcasts to Recipient           │ → Real-time Delivery
   └───────────────────────────────────┘
         ↓
   ┌─────────────────────────────────┐
   │ Updates UI Dynamically           │ → Message Appears
   └─────────────────────────────────┘

3. REAL-TIME UPDATES
   ┌─────────────────────┐
   │ Typing Indicator    │ → Socket Event Emission
   └─────────────────────┘
   ┌──────────────────────┐
   │ Online Status Update │ → Connection Events
   └──────────────────────┘
   ┌──────────────────────┐
   │ Message Seen Status  │ → Acknowledgment Events
   └──────────────────────┘
```

---

## 📁 Folder Structure

```
chat-app/
│
├── client/                           # Frontend Application (React + Vite)
│   ├── public/                       # Static assets
│   ├── src/
│   │   ├── assets/                   # Images, icons, media files
│   │   ├── components/               # Reusable React components
│   │   │   ├── MessageBox.jsx        # Message rendering component
│   │   │   ├── UserList.jsx          # User list display
│   │   │   ├── ChatWindow.jsx        # Main chat interface
│   │   │   ├── Header.jsx            # Navigation header
│   │   │   └── ...                   # Other UI components
│   │   ├── pages/                    # Page-level components (Routes)
│   │   │   ├── Login.jsx             # Authentication page
│   │   │   ├── Signup.jsx            # Registration page
│   │   │   ├── Chat.jsx              # Main chat interface
│   │   │   ├── Profile.jsx           # User profile page
│   │   │   ├── Dashboard.jsx         # Dashboard/Home page
│   │   │   └── ...                   # Other page components
│   │   ├── context/                  # Context API for state management
│   │   │   ├── UserContext.jsx       # User authentication state
│   │   │   ├── ChatContext.jsx       # Chat messages state
│   │   │   ├── SocketContext.jsx     # WebSocket connection state
│   │   │   └── ...                   # Other contexts
│   │   ├── config/                   # Configuration files
│   │   │   ├── api.js                # API base configuration
│   │   │   ├── socket.js             # Socket.io configuration
│   │   │   └── constants.js          # Constants and settings
│   │   ├── lib/                      # Utility functions and helpers
│   │   │   ├── auth.js               # Authentication utilities
│   │   │   ├── validators.js         # Form validation functions
│   │   │   ├── formatters.js         # Data formatting utilities
│   │   │   └── ...                   # Other helpers
│   │   ├── App.jsx                   # Root component with routing
│   │   ├── App.css                   # Global styles
│   │   ├── main.jsx                  # React entry point
│   │   └── index.css                 # Global CSS/Tailwind imports
│   ├── .gitignore                    # Git ignore rules
│   ├── eslint.config.js              # ESLint configuration
│   ├── vite.config.js                # Vite configuration
│   ├── vercel.json                   # Vercel deployment config
│   ├── package.json                  # Frontend dependencies
│   ├── package-lock.json             # Locked dependency versions
│   ├── index.html                    # HTML entry point
│   └── README.md                     # Frontend documentation
│
├── server/                           # Backend Application (Node.js + Express)
│   ├── src/
│   │   ├── config/                   # Configuration files
│   │   │   ├── database.js           # MongoDB connection
│   │   │   ├── cloudinary.js         # Cloudinary setup
│   │   │   └── constants.js          # Backend constants
│   │   ├── controllers/              # Business logic layer
│   │   │   ├── authController.js     # Login, signup, logout logic
│   │   │   ├── chatController.js     # Message handling
│   │   │   ├── userController.js     # User operations
│   │   │   └── ...                   # Other controllers
│   │   ├── middleware/               # Express middleware
│   │   │   ├── authMiddleware.js     # JWT verification
│   │   │   ├── errorHandler.js       # Error handling
│   │   │   ├── validation.js         # Input validation
│   │   │   └── ...                   # Other middleware
│   │   ├── models/                   # MongoDB Schemas (Mongoose)
│   │   │   ├── User.js               # User schema
│   │   │   ├── Message.js            # Message schema
│   │   │   ├── Conversation.js       # Conversation schema
│   │   │   └── ...                   # Other models
│   │   ├── routes/                   # API route definitions
│   │   │   ├── authRoutes.js         # Auth endpoints
│   │   │   ├── chatRoutes.js         # Chat endpoints
│   │   │   ├── userRoutes.js         # User endpoints
│   │   │   └── ...                   # Other routes
│   │   └── app.js                    # Express app setup
│   ├── server.js                     # Server entry point
│   ├── seeds/                        # Database seeding scripts
│   │   └── seedData.js               # Sample data for testing
│   ├── .env                          # Environment variables (local)
│   ├── .env.example                  # Environment variables template
│   ├── .gitignore                    # Git ignore rules
│   ├── package.json                  # Backend dependencies
│   ├── package-lock.json             # Locked dependency versions
│   └── README.md                     # Backend documentation
│
├── package.json                      # Root package.json (monorepo setup)
├── package-lock.json                 # Root dependencies lock
├── .gitignore                        # Root git ignore
└── README.md                         # This file

```

### **Key Directories Explained**

#### **Frontend (client/)**
- **pages/**: Route-level components for different views (login, chat, profile)
- **components/**: Reusable UI components used across pages
- **context/**: Global state management using React Context API
- **config/**: Configuration for API endpoints and Socket.io
- **lib/**: Utility functions and helper methods
- **assets/**: Static files like images and icons

#### **Backend (server/)**
- **controllers/**: Contains all business logic separated by feature
- **models/**: MongoDB schema definitions using Mongoose
- **routes/**: API endpoint definitions with HTTP methods
- **middleware/**: Functions that process requests (auth, validation)
- **config/**: Database and service configurations
- **seeds/**: Test data for development

---

## 🚀 Installation & Setup

### **Prerequisites**
- Node.js (v16 or higher)
- npm or yarn
- MongoDB Atlas account (or local MongoDB)
- Cloudinary account (for image uploads)
- Git

### **Step 1: Clone the Repository**
```bash
git clone https://github.com/controlcoder/chat-app.git
cd chat-app
```

### **Step 2: Install Root Dependencies**
```bash
npm install
```

### **Step 3: Setup Backend**
```bash
cd server
npm install
```

Create a `.env` file in the server directory:
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
NODE_ENV=development
```

### **Step 4: Setup Frontend**
```bash
cd ../client
npm install
```

Create a `.env.local` file in the client directory:
```env
VITE_API_URL=http://localhost:5000
VITE_SOCKET_URL=http://localhost:5000
```

---

## ▶️ Running the Application

### **Development Mode (Concurrent)**
From the root directory:
```bash
npm run dev
```
This runs both server and client simultaneously using `concurrently`.

### **Run Individual Services**
```bash
# Terminal 1: Run backend
npm run server

# Terminal 2: Run frontend
npm run client
```

### **Production Build**
```bash
# Build frontend
cd client
npm run build

# Run production server
cd ../server
npm run dev
```

---

## 📡 API Endpoints

### **Authentication Endpoints**
```
POST   /api/auth/signup          - Register new user
POST   /api/auth/login           - User login
POST   /api/auth/logout          - User logout
POST   /api/auth/refresh         - Refresh JWT token
GET    /api/auth/verify          - Verify token validity
```

### **User Endpoints**
```
GET    /api/users/profile        - Get user profile
PUT    /api/users/profile        - Update user profile
GET    /api/users/search         - Search users
GET    /api/users/:id            - Get user by ID
DELETE /api/users/:id            - Delete user account
```

### **Chat Endpoints**
```
GET    /api/chats                - Get all conversations
GET    /api/chats/:id            - Get conversation details
POST   /api/chats/send           - Send message
GET    /api/chats/:id/messages   - Get conversation messages
DELETE /api/chats/:id/messages   - Delete message
```

### **Socket.io Events**
```
Client → Server:
  - connect           : Establish connection
  - message:send      : Send a message
  - typing:start      : User started typing
  - typing:stop       : User stopped typing
  - user:online       : User came online
  - user:offline      : User went offline

Server → Client:
  - message:received  : New message received
  - typing:start      : Someone typing
  - typing:stop       : Someone stopped typing
  - users:online      : Updated online users list
```

---

## 🔐 Environment Variables

### **Backend (.env)**
| Variable | Description | Example |
|----------|-------------|---------|
| PORT | Server port | 5000 |
| MONGODB_URI | MongoDB connection string | mongodb+srv://user:pass@cluster.mongodb.net/dbname |
| JWT_SECRET | Secret key for JWT signing | your_super_secret_key_123 |
| JWT_EXPIRE | JWT expiration time | 7d |
| CLOUDINARY_NAME | Cloudinary account name | your_cloudinary_name |
| CLOUDINARY_API_KEY | Cloudinary API key | your_api_key |
| CLOUDINARY_API_SECRET | Cloudinary API secret | your_api_secret |
| NODE_ENV | Environment type | development/production |
| CORS_ORIGIN | Allowed CORS origins | http://localhost:3000 |

### **Frontend (.env.local)**
| Variable | Description | Example |
|----------|-------------|---------|
| VITE_API_URL | Backend API URL | http://localhost:5000 |
| VITE_SOCKET_URL | Socket.io server URL | http://localhost:5000 |
| VITE_APP_NAME | Application name | SnapTalk |

---

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: Bcrypt for secure password storage
- **CORS Protection**: Configured CORS for controlled access
- **Environment Variables**: Sensitive data in .env files
- **Cookie Parsing**: Secure HTTP-only cookies for tokens
- **Input Validation**: Middleware for request validation
- **Error Handling**: Centralized error management

---

## 📦 Project Commands

```bash
# Root level
npm run dev              # Run both server and client
npm run server           # Run backend only
npm run client           # Run frontend only

# Frontend commands (from client/)
npm run dev              # Start Vite dev server
npm run build            # Build for production
npm run preview          # Preview production build
npm run lint             # Run ESLint

# Backend commands (from server/)
npm run dev              # Start with nodemon
```

---

## 🤝 Contributing

Contributions are welcome! Follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see LICENSE file for details.

---

## 👨‍💻 Author

**controlcoder**
- GitHub: [@controlcoder](https://github.com/controlcoder)
- Live Demo: [https://chat-app-controlcoder.vercel.app/](https://chat-app-controlcoder.vercel.app/)

---

## 🆘 Support

For issues and questions:
- Create an issue on GitHub
- Check existing documentation
- Review the codebase comments

---

## 🎉 Acknowledgments

- React & Vite for modern frontend development
- Express.js & Node.js for robust backend
- MongoDB for flexible data storage
- Socket.io for real-time communication
- Tailwind CSS for styling
- All open-source contributors

---

**Last Updated**: June 6, 2026  
**Repository**: [controlcoder/chat-app](https://github.com/controlcoder/chat-app)

# TrackFlow - MERN Task Management System

A full-stack task management application built with the MERN stack (MongoDB, Express.js, React, Node.js) featuring user authentication, document management, notifications, and a modern dashboard interface.

## 🚀 Live Demo

- **Frontend**: [https://trackflow-mern-1.onrender.com](https://trackflow-mern-1.onrender.com)
- **Backend API**: [https://trackflow-mern.onrender.com](https://trackflow-mern.onrender.com)
- <img width="1920" height="1080" alt="Screenshot 2025-07-29 at 10 36 23 PM" src="https://github.com/user-attachments/assets/df425ae2-aaf2-4c3d-8060-ddc590df87aa" />
## ✨ Features

### 🔐 Authentication & User Management
- User registration and login with JWT authentication
- Email verification system with OTP
- Password reset functionality
- Role-based access control (Admin, Manager, Employee)
- Secure cookie and localStorage token management

### 📋 Task Management
- Create, read, update, and delete tasks
- Task assignment to users
- Priority levels and status tracking
- Due date management
- Task filtering and search

### 📄 Document Management
- File upload and storage
- Document categorization
- Secure file access control
- Document sharing between users

### 🔔 Notifications
- Real-time notification system
- Email notifications for important events
- Notification center with unread count
- Mark as read/unread functionality

### 📊 Dashboard & Analytics
- Interactive dashboard with key metrics
- Recent tasks and documents overview
- User activity tracking
- Statistics and charts

### 🎨 Modern UI/UX
- Responsive design for all devices
- Clean and intuitive interface
- Dark/light theme support
- Built with shadcn/ui components
- Tailwind CSS for styling

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern React with hooks
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - High-quality UI components
- **Radix UI** - Accessible component primitives
- **Lucide React** - Beautiful icons
- **React Router** - Client-side routing
- **Axios** - HTTP client for API calls

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing
- **Multer** - File upload handling
- **Nodemailer** - Email sending
- **CORS** - Cross-origin resource sharing

## 📦 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- npm or yarn package manager

### 1. Clone the Repository
```bash
git clone https://github.com/PaoloBaltazar/MERN---Task-Management.git
cd MERN---Task-Management
```

### 2. Backend Setup
```bash
cd server
npm install
```

Create a `.env` file in the server directory:
```env
PORT=4000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development

# Email Configuration (using Brevo/Sendinblue)
SMTP_USER=your_smtp_username
SMTP_PASS=your_smtp_password
SENDER_EMAIL=your_sender_email
```

Start the backend server:
```bash
npm run server  # Development with nodemon
# or
npm start      # Production
```

### 3. Frontend Setup
```bash
cd client
npm install
```

Create a `.env` file in the client directory:
```env
VITE_BACKEND_URL=http://localhost:4000
```

Start the frontend development server:
```bash
npm run dev
```

### 4. Access the Application
- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:4000`

## 🚀 Deployment

### Render Deployment

#### Backend Deployment
1. Create a new Web Service on Render
2. Connect your GitHub repository
3. Set the root directory to `server`
4. Set build command: `npm install`
5. Set start command: `npm start`
6. Add environment variables in Render dashboard

#### Frontend Deployment
1. Create a new Static Site on Render
2. Connect your GitHub repository
3. Set the root directory to `client`
4. Set build command: `npm run build`
5. Set publish directory: `dist`
6. Add environment variable: `VITE_BACKEND_URL=your_backend_url`

### Environment Variables for Production

#### Backend (.env)
```env
PORT=4000
MONGODB_URI=your_production_mongodb_uri
JWT_SECRET=your_strong_jwt_secret
NODE_ENV=production
SMTP_USER=your_smtp_username
SMTP_PASS=your_smtp_password
SENDER_EMAIL=your_sender_email
```

#### Frontend (.env.production)
```env
VITE_BACKEND_URL=https://your-backend-url.onrender.com
```

## 📁 Project Structure

```
MERN---Task-Management/
├── client/                          # Frontend React application
│   ├── public/                      # Static assets
│   ├── src/
│   │   ├── components/              # Reusable UI components
│   │   │   ├── ui/                  # shadcn/ui components
│   │   │   ├── Layout.tsx           # Main layout component
│   │   │   ├── Sidebar.tsx          # Navigation sidebar
│   │   │   ├── UserMenu.tsx         # User dropdown menu
│   │   │   └── ...
│   │   ├── context/                 # React context providers
│   │   │   └── AppContext.tsx       # Global app state
│   │   ├── hooks/                   # Custom React hooks
│   │   ├── lib/                     # Utility functions
│   │   ├── pages/                   # Page components
│   │   │   ├── Dashboard.tsx        # Main dashboard
│   │   │   ├── Login.tsx           # Login page
│   │   │   ├── Tasks.tsx           # Task management
│   │   │   └── ...
│   │   ├── services/               # API service layer
│   │   │   └── api.tsx             # Axios configuration
│   │   └── main.tsx               # Application entry point
│   ├── package.json
│   └── vite.config.ts
├── server/                         # Backend Node.js application
│   ├── config/                     # Configuration files
│   │   ├── mongodb.js             # Database connection
│   │   └── nodemailer.js          # Email configuration
│   ├── controllers/               # Route controllers
│   │   ├── authController.js      # Authentication logic
│   │   ├── taskController.js      # Task management
│   │   ├── userController.js      # User management
│   │   └── ...
│   ├── middleware/                # Custom middleware
│   │   ├── userAuth.js           # Authentication middleware
│   │   └── upload.js             # File upload middleware
│   ├── models/                   # MongoDB schemas
│   │   ├── userModel.js          # User schema
│   │   ├── taskModel.js          # Task schema
│   │   └── ...
│   ├── routes/                   # API routes
│   │   ├── authRoutes.js         # Authentication routes
│   │   ├── taskRoutes.js         # Task routes
│   │   └── ...
│   ├── uploads/                  # File upload directory
│   ├── package.json
│   └── server.js                 # Server entry point
└── README.md
```

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `POST /api/auth/is-auth` - Check authentication status
- `POST /api/auth/verify-email` - Email verification
- `POST /api/auth/send-reset-otp` - Send password reset OTP
- `POST /api/auth/reset-password` - Reset password

### Tasks
- `GET /api/task` - Get all tasks
- `POST /api/task` - Create new task
- `PUT /api/task/:id` - Update task
- `DELETE /api/task/:id` - Delete task

### Users
- `GET /api/user/data` - Get current user data
- `PUT /api/user/profile` - Update user profile

### Documents
- `GET /api/documents` - Get all documents
- `POST /api/documents` - Upload document
- `DELETE /api/documents/:id` - Delete document

### Dashboard
- `GET /api/dashboard` - Get dashboard statistics

### Notifications
- `GET /api/notification` - Get notifications
- `POST /api/notification/mark-read` - Mark notification as read

## 🔒 Authentication Flow

The application uses a hybrid authentication approach for maximum compatibility:

1. **JWT Tokens**: Stored in both HTTP-only cookies and localStorage
2. **Cookie-based**: For same-origin requests (development)
3. **Header-based**: For cross-origin requests (production)
4. **Automatic Token Refresh**: Handles expired tokens gracefully
5. **Secure Logout**: Clears both cookies and localStorage

## 🎨 UI Components

The application uses a modern component library built on:
- **shadcn/ui**: High-quality, accessible components
- **Radix UI**: Primitive components for complex UI
- **Tailwind CSS**: Utility-first styling
- **Lucide Icons**: Beautiful, consistent icons

## 🚦 Development Workflow

### Available Scripts

#### Backend
```bash
npm start        # Start production server
npm run server   # Start development server with nodemon
```

#### Frontend
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

### Code Quality
- TypeScript for type safety
- ESLint for code linting
- Consistent code formatting
- Component-based architecture

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**Paolo Baltazar**
- GitHub: [@PaoloBaltazar](https://github.com/PaoloBaltazar)
- Email: paoloibaltazar@gmail.com

## 🙏 Acknowledgments

- [React](https://reactjs.org/) - Frontend framework
- [Express.js](https://expressjs.com/) - Backend framework
- [MongoDB](https://www.mongodb.com/) - Database
- [shadcn/ui](https://ui.shadcn.com/) - UI components
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [Render](https://render.com/) - Deployment platform

## 📊 Project Status

🟢 **Active Development** - This project is actively maintained and updated.

---

Made with ❤️ by Paolo Baltazar

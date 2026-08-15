# TaskFlow - Task Management Application

A modern, full-stack task management application built with Next.js, MongoDB, and Tailwind CSS. Streamline your workflow with intuitive task tracking, calendar views, and real-time notifications.

## 📋 Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [Quick Start](#quick-start)
- [Project Structure](#project-structure)
- [API Overview](#api-overview)
- [User Flows](#user-flows)
- [Database Schema](#database-schema)
- [Deployment](#deployment)
- [Environment Variables](#environment-variables)
- [Troubleshooting](#troubleshooting)
- [Security Features](#security-features)
- [Future Enhancements](#future-enhancements)
- [Contributing](#contributing)
- [License](#license)

---

## 🚀 Overview

TaskFlow is a comprehensive task management platform designed to help individuals and teams organize, track, and complete tasks efficiently. With features like task creation, status tracking, calendar views, and real-time notifications, TaskFlow provides a seamless productivity experience across all devices.

---

## ✨ Key Features

### User Features
- **User Authentication**: Secure JWT-based authentication with bcrypt password hashing
- **Task Management**: Create, edit, delete, and track tasks with status updates (Pending, In Progress, Completed)
- **Task Dashboard**: Overview with statistics, completion rates, and recent activity
- **Calendar View**: Visualize tasks by due date with monthly calendar
- **Notifications**: Real-time notification system for task updates
- **User Profiles**: Manage personal information and view task statistics
- **Settings**: Customize app appearance, notification preferences, and privacy
- **Dark Mode**: Toggle between light and dark themes

### Technical Features
- **Frontend**: Next.js 16 with React, TypeScript, Tailwind CSS, Framer Motion
- **Backend**: Next.js API Routes with MongoDB and Mongoose
- **Authentication**: JWT tokens with secure cookie storage
- **Responsive**: Mobile-first design with full responsive support
- **Animations**: Smooth animations with Framer Motion
- **Form Validation**: Zod schema validation
- **Toast Notifications**: React Hot Toast for user feedback

---

## 🛠️ Tech Stack

### Frontend
| Technology | Version | Purpose |
|------------|---------|---------|
| Next.js | 16 (App Router) | Framework |
| TypeScript | 5.x | Language |
| Tailwind CSS | 4.2 | Styling |
| React | 19.x | UI Library |
| Framer Motion | 11.x | Animations |
| React Icons | 5.x | Icons |
| React Hot Toast | 2.x | Notifications |

### Backend
| Technology | Version | Purpose |
|------------|---------|---------|
| Node.js | 18+ | Runtime |
| MongoDB | Latest | Database |
| Mongoose | 8.x | ODM |
| JWT | 9.x | Authentication |
| Bcryptjs | 2.x | Password Hashing |
| Zod | 3.x | Validation |

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- MongoDB instance (local or cloud)
- Git

### Frontend Setup

```bash
# Clone the repository
git clone https://github.com/yourusername/taskflow.git
cd taskflow

# Install dependencies
npm install
# or
pnpm install

# Create .env.local file
cp .env.local.example .env.local

# Edit .env.local with your configuration
# MONGODB_URI=mongodb://localhost:27017/taskflow
# JWT_SECRET=your-secret-key

# Run development server
npm run dev
# or
pnpm run dev

# Frontend at http://localhost:3000
```

### Backend Setup

The backend uses Next.js API Routes, so no separate server is needed. All API routes are in `src/app/api/`.

```bash
# The backend runs on the same server
# API routes are available at http://localhost:3000/api/
```

---

##  Project Structure

```
taskflow/
├── src/
│   ├── app/
│   │   ├── (auth)/
│   │   │   ├── login/
│   │   │   │   └── page.tsx          # Login page
│   │   │   └── register/
│   │   │       └── page.tsx          # Register page
│   │   ├── (dashboard)/
│   │   │   ├── dashboard/
│   │   │   │   ├── page.tsx          # Main dashboard
│   │   │   │   ├── calendar/
│   │   │   │   │   └── page.tsx      # Calendar view
│   │   │   │   ├── help/
│   │   │   │   │   └── page.tsx      # Help & support
│   │   │   │   ├── notifications/
│   │   │   │   │   └── page.tsx      # Notifications
│   │   │   │   ├── profile/
│   │   │   │   │   └── page.tsx      # User profile
│   │   │   │   ├── settings/
│   │   │   │   │   └── page.tsx      # Settings
│   │   │   │   └── tasks/
│   │   │   │       └── page.tsx      # All tasks
│   │   │   └── layout.tsx            # Dashboard layout
│   │   ├── api/
│   │   │   ├── auth/
│   │   │   │   ├── login/
│   │   │   │   │   └── route.ts      # Login API
│   │   │   │   ├── register/
│   │   │   │   │   └── route.ts      # Register API
│   │   │   │   ├── logout/
│   │   │   │   │   └── route.ts      # Logout API
│   │   │   │   └── me/
│   │   │   │       └── route.ts      # Get current user
│   │   │   └── tasks/
│   │   │       ├── route.ts           # Tasks CRUD
│   │   │       └── [id]/
│   │   │           └── route.ts       # Single task operations
│   │   ├── components/
│   │   │   ├── layout/
│   │   │   │   ├── Header.tsx         # Main header
│   │   │   │   ├── Sidebar.tsx        # Navigation sidebar
│   │   │   │   └── Footer.tsx         # Footer
│   │   │   ├── shared/
│   │   │   │   ├── ThemeToggle.tsx    # Dark/light mode toggle
│   │   │   │   └── LoadingSpinner.tsx # Loading indicator
│   │   │   ├── tasks/
│   │   │   │   ├── TaskCard.tsx       # Task card component
│   │   │   │   ├── TaskForm.tsx       # Task form
│   │   │   │   ├── TaskList.tsx       # Task list
│   │   │   │   ├── TaskFilters.tsx    # Filter buttons
│   │   │   │   └── TaskStats.tsx      # Statistics
│   │   │   └── ui/
│   │   │       ├── Button.tsx         # Button component
│   │   │       ├── Input.tsx          # Input component
│   │   │       ├── Card.tsx           # Card component
│   │   │       ├── Badge.tsx          # Badge component
│   │   │       ├── Skeleton.tsx       # Loading skeleton
│   │   │       └── Toast.tsx          # Toast notification
│   │   ├── context/
│   │   │   ├── AuthContext.tsx        # Auth context provider
│   │   │   └── ThemeContext.tsx       # Theme context provider
│   │   ├── hooks/
│   │   │   ├── useAuth.ts             # Auth hook
│   │   │   ├── useTasks.ts            # Tasks hook
│   │   │   └── useTheme.ts            # Theme hook
│   │   ├── lib/
│   │   │   ├── mongodb.ts             # MongoDB connection
│   │   │   └── utils.ts               # Utility functions
│   │   ├── models/
│   │   │   ├── Task.ts                # Task model
│   │   │   └── User.ts                # User model
│   │   ├── types/
│   │   │   └── index.ts               # TypeScript types
│   │   ├── middleware.ts              # Next.js middleware
│   │   ├── globals.css                # Global styles
│   │   ├── layout.tsx                 # Root layout
│   │   └── page.tsx                   # Landing page
├── .env.local                         # Environment variables
├── .gitignore                         # Git ignore
├── next.config.js                     # Next.js config
├── package.json                       # Dependencies
├── postcss.config.js                  # PostCSS config
├── tailwind.config.js                 # Tailwind config
└── tsconfig.json                      # TypeScript config
```

---

## 🔌 API Overview

### Authentication Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login user |
| GET | `/api/auth/me` | Get current user |
| POST | `/api/auth/logout` | Logout user |

### Task Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/tasks` | Get all tasks |
| POST | `/api/tasks` | Create new task |
| GET | `/api/tasks/:id` | Get task by ID |
| PUT | `/api/tasks/:id` | Update task |
| DELETE | `/api/tasks/:id` | Delete task |

---

## 👤 User Flows

### User Registration & Login
1. User navigates to `/register`
2. Fills in name, email, and password
3. Submits form → Account created
4. Redirected to `/login`
5. User enters email and password
6. JWT token generated and stored in cookies
7. Redirected to `/dashboard`

### Creating a Task
1. User clicks "New Task" button on dashboard
2. Modal opens with task form
3. Fills in title, description, status, priority, due date
4. Submits → Task created
5. Task appears in dashboard and tasks list

### Managing Tasks
1. View all tasks on dashboard
2. Filter by status (All, Pending, In Progress, Completed)
3. Search tasks by title or description
4. Edit task → Modal opens with pre-filled data
5. Delete task → Confirmation dialog
6. Update status via dropdown

### Calendar View
1. Navigate to `/dashboard/calendar`
2. View tasks organized by due date
3. Click a date to see tasks due that day
4. Navigate between months
5. Quick "Today" button to jump to current date

### Profile Management
1. Navigate to `/dashboard/profile`
2. View personal information
3. Click "Edit Profile" to modify details
4. Save changes → Profile updated

### Settings
1. Navigate to `/dashboard/settings`
2. Profile tab → Update personal info
3. Security tab → Change password
4. Notifications tab → Toggle notification preferences
5. Appearance tab → Change theme, font size
6. Privacy tab → Manage privacy settings
7. Delete account option

---

## 🗄️ Database Schema

### User Model

```typescript
interface IUser {
  name: string;
  email: string;
  password: string; // Hashed
  avatar?: string;
  role: 'user' | 'admin';
  createdAt: Date;
  updatedAt: Date;
}
```

### Task Model

```typescript
interface ITask {
  title: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  dueDate?: Date;
  userId: ObjectId; // Reference to User
  createdAt: Date;
  updatedAt: Date;
}
```

---

## 🚢 Deployment

### Deploying to Vercel (Frontend)

```bash
# Install Vercel CLI
npm i -g vercel

# Build for production
npm run build

# Deploy
vercel --prod
```

### Environment Variables for Production

Set these in your hosting platform:

```env
MONGODB_URI=your_production_mongodb_uri
JWT_SECRET=your_production_jwt_secret
NODE_ENV=production
```

---

##  Environment Variables

### Frontend (.env.local)

```env
# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/taskflow

# JWT Secret
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Environment
NODE_ENV=development
```

---

## 🔧 Troubleshooting

### Backend won't start
- Check MongoDB is running
- Verify `MONGODB_URI` in `.env.local`
- Check port 3000 is available

### Frontend can't connect to API
- Verify backend is running
- Check API routes are correct
- Check CORS configuration

### Authentication issues
- Clear browser cookies
- Check JWT_SECRET is set
- Verify token expiration

### Tasks not showing
- Check user is logged in
- Verify tasks have userId
- Check MongoDB connection

---

##  Security Features

- ✅ JWT-based authentication
- ✅ Bcrypt password hashing (salt rounds: 10)
- ✅ Protected API routes with middleware
- ✅ Input validation with Zod
- ✅ HTTP-only cookies for JWT
- ✅ CORS properly configured
- ✅ No sensitive data in client code
- ✅ Environment variables for secrets

---

##  Future Enhancements

- [ ] Image uploads for tasks
- [ ] Task categories and tags
- [ ] Drag-and-drop task reordering
- [ ] Team collaboration features
- [ ] Task comments and discussions
- [ ] Email notifications
- [ ] Two-factor authentication
- [ ] Analytics dashboard
- [ ] Export tasks (CSV, PDF)
- [ ] Mobile app (React Native)
- [ ] AI-powered task suggestions
- [ ] Voice input for tasks
- [ ] Recurring tasks
- [ ] Task templates
- [ ] Integration with calendars (Google, Outlook)

---

##  Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Test thoroughly
5. Commit your changes (`git commit -m 'Add amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

---

##  License

This project is licensed under the MIT License - see the LICENSE file for details.

---

##  Authors

Built as a comprehensive full-stack task management application with modern web technologies.

---

## 🙏 Support

For help and questions:

- Check the documentation above
- Review API endpoints
- Check error messages and logs
- Open an issue on GitHub

---

**Ready to launch? Follow the Quick Start section above to get TaskFlow running locally!**

---

##  Project Status

| Feature | Status |
|---------|--------|
| User Authentication | ✅ Complete |
| Task CRUD | ✅ Complete |
| Dashboard | ✅ Complete |
| Calendar View | ✅ Complete |
| Notifications | ✅ Complete |
| User Profile | ✅ Complete |
| Settings | ✅ Complete |
| Help Page | ✅ Complete |
| Dark Mode | ✅ Complete |
| Mobile Responsive | ✅ Complete |
| API Routes | ✅ Complete |
| MongoDB Integration | ✅ Complete |

---

### ⭐ Star the Project

If you find this project useful, please give it a star on GitHub!

---

*Built with ❤️ using Next.js, MongoDB, and Tailwind CSS*

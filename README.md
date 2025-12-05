# Task Tracker - Speech-to-Text Task Management App

A full-stack task management application with speech-to-text input, AI-powered task extraction, and real-time filtering. Built with React, Node.js, MongoDB, and Web Speech API.

## Table of Contents
1. [Project Setup](#project-setup)
2. [Tech Stack](#tech-stack)
3. [API Documentation](#api-documentation)
4. [Decisions & Assumptions](#decisions--assumptions)
5. [AI Tools Usage](#ai-tools-usage)

---

## Project Setup

### Prerequisites

- **Node.js**: v18.x or higher
- **npm**: v9.x or higher
- **MongoDB**: Local or cloud instance (MongoDB Atlas)
- **Browser**: Modern browser with Web Speech API support (Chrome, recommended)

### Installation Steps

#### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the backend root with the following variables:
```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/task-tracker
# OR for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/task-tracker

NODE_ENV=development
```

4. Start the backend server:
```bash
nodemon index.js
```

Backend runs on `http://localhost:3000`

#### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the frontend root:
```env
VITE_SERVER_URL=http://localhost:3000/
```

4. Start the dev server:
```bash
npm run dev
```

Frontend runs on `http://localhost:5173`

### Running Everything Locally

1. **Terminal 1 - Backend**:
```bash
cd backend
nodemon index.js
or 
node index.js
```

2. **Terminal 2 - Frontend**:
```bash
cd frontend
npm run dev
```

3. **Open browser**:
```
http://localhost:5173
```

### Seed Data

Currently, the application starts with an empty task list. To add sample tasks:

1. Use the **Create Task** button in the UI
2. Enter task details manually or use the **🎤 mic button** to speak task descriptions
3. The backend will extract task data from speech input

---

## Tech Stack

### Frontend
- **Framework**: React 19.1.0 with TypeScript
- **Build Tool**: Vite 6.3.5
- **Styling**: Tailwind CSS 4.1.10
- **State Management**: Redux Toolkit 2.11.0
- **Routing**: React Router DOM 6.30.1
- **UI/Notifications**: React Toastify 11.0.5
- **Speech API**: Web Speech API (browser native)

### Backend
- **Runtime**: Node.js 18+
- **Framework**: Express.js (inferred from controllers)
- **Database**: MongoDB 5.0+
- **Key Libraries**:
  - `mongoose` - MongoDB ODM
  - `cors` - Cross-Origin Resource Sharing
  - `dotenv` - Environment variables
  - `body-parser` - Request parsing

### Database
- **MongoDB**: Document-based NoSQL
- **Collections**:
  - `tasks` - Task documents with title, dueDate, priority, status, timestamps

### Key Libraries
- **Tailwind CSS**: Utility-first CSS framework for responsive design
- **Redux Toolkit**: Predictable state container for React
- **React Toastify**: Toast notifications for user feedback
- **Vite**: Lightning-fast build tool and dev server

---

## API Documentation

### Base URL
```
http://localhost:3000
```

### Endpoints

#### 1. Create Task
```
PUT /addtodo
Content-Type: application/json

Request Body:
{
  "title": "Buy groceries",
  "dueDate": "2025-12-15",
  "priority": "high",
  "status": "todo"
}

Success Response (201):
{
  "message": "Task created successfully",
  "task": {
    "_id": "507f1f77bcf86cd799439011",
    "title": "Buy groceries",
    "dueDate": "2025-12-15",
    "priority": "high",
    "status": "todo",
    "createdAt": "2025-12-05T12:30:00Z",
    "updatedAt": "2025-12-05T12:30:00Z"
  }
}

Error Response (400):
{
  "error": "Failed to create task"
}
```

#### 2. Get All Tasks
```
GET /todo
Content-Type: application/json

Success Response (200):
{
  "tasks": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "title": "Buy groceries",
      "dueDate": "2025-12-15",
      "priority": "high",
      "status": "todo",
      "createdAt": "2025-12-05T12:30:00Z"
    },
    ...
  ]
}

Error Response (500):
{
  "error": "Failed to fetch tasks"
}
```

#### 3. Update Task
```
PATCH /todo/:id
Content-Type: application/json

Request Body:
{
  "status": "in-progress",
  "priority": "medium"
}

Success Response (200):
{
  "_id": "507f1f77bcf86cd799439011",
  "title": "Buy groceries",
  "dueDate": "2025-12-15",
  "priority": "medium",
  "status": "in-progress",
  "updatedAt": "2025-12-05T13:00:00Z"
}

Error Response (404):
{
  "error": "Task not found"
}
```

#### 4. Delete Task
```
DELETE /todo/:id

Success Response (200):
{
  "message": "Task deleted successfully"
}

Error Response (404):
{
  "error": "Task not found"
}
```

#### 5. Extract Task from Speech (AI)
```
POST /extract-task
Content-Type: application/json

Request Body:
{
  "rawText": "buy milk tomorrow high priority"
}

Success Response (200):
{
  "task": {
    "title": "buy milk",
    "dueDate": "2025-12-06",
    "priority": "high",
    "status": "todo"
  }
}

Error Response (400):
{
  "error": "Failed to extract task from speech"
}
```

---

## Decisions & Assumptions

### Design Decisions

#### 1. **Speech-to-Text Processing**
- **Decision**: Use browser's native Web Speech API instead of external service
- **Reason**: No API keys required, privacy-friendly, real-time transcription
- **Trade-off**: Limited to supported browsers (Chrome, Edge, Safari)

#### 2. **Task Data Model**
```javascript
{
  _id: ObjectId,
  title: String,          // Task name/description
  dueDate: Date,         // When task is due
  priority: String,      // 'low', 'medium', 'high'
  status: String,        // 'todo', 'in-progress', 'completed'
  createdAt: Date,
  updatedAt: Date
}
```
- **Decision**: Keep model simple with essential fields only
- **Reason**: Easier to manage, AI extraction is more reliable with fewer fields

#### 3. **Client-Side Filtering**
- **Decision**: All filtering (search, priority, status) happens on frontend
- **Reason**: Faster UX, reduced backend load for small datasets
- **Trade-off**: Won't scale for 10k+ tasks; backend filtering needed later

#### 4. **Redux for State Management**
- **Decision**: Redux Toolkit for predictable state flow
- **Reason**: Complex state updates (add, update, delete), single source of truth
- **Alternative Considered**: Context API (overkill for this scale)

#### 5. **Speech Input Flow**
- User clicks mic → Starts listening
- Browser captures speech as user speaks
- On stop (manual or auto), frontend calls backend AI endpoint
- Backend extracts task data (title, priority, due date, status)
- Frontend auto-fills form with extracted data
- User reviews & submits

### Assumptions

#### 1. **Email Handling**
- **Assumption**: No email functionality currently implemented
- **Future**: Email notifications when tasks are due can be added via Nodemailer
- **Limitation**: Assumes all users are in-browser only

#### 2. **Task Extraction AI**
- **Assumption**: Simple NLP patterns (e.g., "high priority tomorrow" → priority=high, dueDate=tomorrow)
- **Limitation**: Won't handle complex natural language like "schedule dentist appointment next Tuesday at 3pm"
- **Future**: Integrate with ChatGPT API for advanced NLP

#### 3. **Browser Compatibility**
- **Assumption**: Users have modern browsers with Web Speech API
- **Limitation**: No fallback for browsers like Firefox (limited support)
- **Note**: Speech input is optional; manual entry always available

#### 4. **Database**
- **Assumption**: MongoDB running locally or on MongoDB Atlas
- **No Auth**: Currently no user authentication; all tasks are public
- **Future**: Add user login, role-based access, task sharing

#### 5. **Date Format**
- **Assumption**: Due dates are ISO 8601 format (YYYY-MM-DD)
- **Display**: Converted to locale-specific format on frontend

#### 6. **Task Status Flow**
- **Assumption**: Linear flow: todo → in-progress → completed
- **Flexibility**: Users can jump between any states
- **No Undo**: Deleted tasks are permanently removed (no soft delete)

---

## AI Tools Usage

### Tools Used

1. **GitHub Copilot** (Primary)
2. **Claude** (Research & refinement)

### What They Helped With

 Boilerplate Generation
 Tailwind CSS Styling
 debugging


### What Changed Because of AI Tools

1. **Development Speed**: ~40% faster than manual coding

### Lessons Learned

1. **Use AI for Boilerplate, Not Logic**: Fastest when generating 80% standard code

---


---

## Future Enhancements

- [ ] User authentication & multi-user support
- [ ] Task sharing & collaboration
- [ ] Email notifications for due dates
- [ ] Advanced AI extraction (ChatGPT API integration)
- [ ] Task categories & tags
- [ ] Recurring tasks
- [ ] Calendar view
- [ ] Mobile app (React Native)
- [ ] Offline support (Service Workers)

---

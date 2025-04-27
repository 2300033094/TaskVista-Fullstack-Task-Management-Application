# TaskVista - Modern Task Management Application

TaskVista is a beautiful, feature-rich task management application built with React, TypeScript, and a Node.js backend. It helps users organize tasks, manage projects, and stay productive with an intuitive interface.

## 🌟 Features

- **Task Management**: Create, edit, and delete tasks with rich metadata
- **Project Organization**: Group tasks by projects with color coding
- **Priority & Due Dates**: Set task priorities and due dates
- **Filtering & Sorting**: Advanced filtering options to find tasks quickly
- **Dashboard**: Get a visual overview of your tasks and productivity
- **Dark/Light Mode**: Toggle between themes for comfortable viewing
- **Responsive Design**: Works beautifully on all devices
- **Data Persistence**: Tasks and projects persist in local storage

## 🚀 Tech Stack

- **Frontend**:
  - React with TypeScript
  - React Router for navigation
  - Zustand for state management
  - Tailwind CSS for styling
  - Lucide React for icons
  - Date-fns for date handling

- **Backend**:
  - Node.js with Express
  - REST API for data operations
  - UUID for ID generation

## 📋 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/task-vista.git
   cd task-vista
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Start the backend server (in a separate terminal):
   ```bash
   npm run server
   ```

## 🌐 API Endpoints

- **Tasks**:
  - `GET /api/tasks` - Get all tasks
  - `POST /api/tasks` - Create a new task
  - `PUT /api/tasks/:id` - Update a task
  - `DELETE /api/tasks/:id` - Delete a task

- **Projects**:
  - `GET /api/projects` - Get all projects
  - `POST /api/projects` - Create a new project
  - `PUT /api/projects/:id` - Update a project
  - `DELETE /api/projects/:id` - Delete a project

## 🏗️ Project Structure

```
task-vista/
├── src/
│   ├── components/       # UI components
│   ├── lib/              # Stores and utilities
│   ├── types/            # TypeScript type definitions
│   ├── utils/            # Helper functions
│   ├── App.tsx           # Main application component
│   └── main.tsx          # Application entry point
├── server/
│   └── index.js          # Express backend server
├── public/               # Static assets
└── ...                   # Config files
```

## 📱 Screenshots

(Screenshots would be included in a real README)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
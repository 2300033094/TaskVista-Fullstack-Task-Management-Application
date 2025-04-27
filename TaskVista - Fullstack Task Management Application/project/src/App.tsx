import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useTaskStore } from './lib/store';
import { Dashboard } from './components/Dashboard';
import { TaskList } from './components/TaskList';
import { ProjectList } from './components/ProjectList';
import { Navbar } from './components/Navbar';

function App() {
  const { theme } = useTaskStore();

  useEffect(() => {
    // Apply dark mode class to html element
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-200">
      <Router>
        <Navbar />
        <main className="py-6">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/tasks" element={<TaskList />} />
            <Route path="/projects" element={<ProjectList />} />
          </Routes>
        </main>
      </Router>
    </div>
  );
}

export default App;
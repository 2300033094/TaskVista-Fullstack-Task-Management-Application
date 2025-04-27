import express from 'express';
import cors from 'cors';
import { v4 as uuidv4 } from 'uuid';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// In-memory data storage
let tasks = [];
let projects = [];

// API Routes
// Tasks
app.get('/api/tasks', (req, res) => {
  res.json(tasks);
});

app.post('/api/tasks', (req, res) => {
  const newTask = {
    ...req.body,
    id: uuidv4(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

app.put('/api/tasks/:id', (req, res) => {
  const { id } = req.params;
  const taskIndex = tasks.findIndex(task => task.id === id);
  
  if (taskIndex === -1) {
    return res.status(404).json({ error: 'Task not found' });
  }
  
  tasks[taskIndex] = {
    ...tasks[taskIndex],
    ...req.body,
    updatedAt: new Date().toISOString(),
  };
  
  res.json(tasks[taskIndex]);
});

app.delete('/api/tasks/:id', (req, res) => {
  const { id } = req.params;
  tasks = tasks.filter(task => task.id !== id);
  res.status(204).send();
});

// Projects
app.get('/api/projects', (req, res) => {
  res.json(projects);
});

app.post('/api/projects', (req, res) => {
  const newProject = {
    ...req.body,
    id: uuidv4(),
    createdAt: new Date().toISOString(),
  };
  projects.push(newProject);
  res.status(201).json(newProject);
});

app.put('/api/projects/:id', (req, res) => {
  const { id } = req.params;
  const projectIndex = projects.findIndex(project => project.id === id);
  
  if (projectIndex === -1) {
    return res.status(404).json({ error: 'Project not found' });
  }
  
  projects[projectIndex] = {
    ...projects[projectIndex],
    ...req.body,
  };
  
  res.json(projects[projectIndex]);
});

app.delete('/api/projects/:id', (req, res) => {
  const { id } = req.params;
  projects = projects.filter(project => project.id !== id);
  
  // Update tasks that belong to this project
  tasks = tasks.map(task => 
    task.projectId === id ? { ...task, projectId: null } : task
  );
  
  res.status(204).send();
});

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(join(__dirname, '../dist')));
  
  app.get('*', (req, res) => {
    res.sendFile(join(__dirname, '../dist/index.html'));
  });
}

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
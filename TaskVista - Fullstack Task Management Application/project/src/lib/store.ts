import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';
import { Priority, Project, Status, Task } from '../types';

interface TaskState {
  tasks: Task[];
  projects: Project[];
  theme: 'light' | 'dark';
  addTask: (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateTask: (id: string, task: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  addProject: (project: Omit<Project, 'id' | 'createdAt'>) => void;
  updateProject: (id: string, project: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  toggleTheme: () => void;
}

export const useTaskStore = create<TaskState>()(
  persist(
    (set) => ({
      tasks: [],
      projects: [],
      theme: 'light',
      addTask: (task) => 
        set((state) => ({ 
          tasks: [...state.tasks, {
            ...task,
            id: uuidv4(),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          }]
        })),
      updateTask: (id, updatedTask) => 
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id
              ? { ...task, ...updatedTask, updatedAt: new Date().toISOString() }
              : task
          ),
        })),
      deleteTask: (id) => 
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== id),
        })),
      addProject: (project) => 
        set((state) => ({ 
          projects: [...state.projects, {
            ...project,
            id: uuidv4(),
            createdAt: new Date().toISOString(),
          }]
        })),
      updateProject: (id, updatedProject) => 
        set((state) => ({
          projects: state.projects.map((project) =>
            project.id === id ? { ...project, ...updatedProject } : project
          ),
        })),
      deleteProject: (id) => 
        set((state) => ({
          projects: state.projects.filter((project) => project.id !== id),
          tasks: state.tasks.map(task => 
            task.projectId === id ? { ...task, projectId: null } : task
          ),
        })),
      toggleTheme: () => 
        set((state) => ({
          theme: state.theme === 'light' ? 'dark' : 'light',
        })),
    }),
    {
      name: 'task-vista-storage',
    }
  )
);
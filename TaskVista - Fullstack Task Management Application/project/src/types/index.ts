export type Priority = 'low' | 'medium' | 'high' | 'urgent';

export type Status = 'todo' | 'in-progress' | 'completed';

export interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string | null;
  priority: Priority;
  status: Status;
  projectId: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Project {
  id: string;
  name: string;
  color: string;
  createdAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string | null;
}
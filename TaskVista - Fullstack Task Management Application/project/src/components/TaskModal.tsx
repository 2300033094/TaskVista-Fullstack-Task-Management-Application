import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { Priority, Status, Task } from '../types';
import { useTaskStore } from '../lib/store';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { Select } from './ui/Select';

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  editTask: Task | null;
}

const initialTask = {
  title: '',
  description: '',
  dueDate: '',
  priority: 'medium' as Priority,
  status: 'todo' as Status,
  projectId: null,
};

export const TaskModal: React.FC<TaskModalProps> = ({ isOpen, onClose, editTask }) => {
  const [task, setTask] = useState<Omit<Task, 'id' | 'createdAt' | 'updatedAt'>>(initialTask);
  const { addTask, updateTask, projects } = useTaskStore();

  useEffect(() => {
    if (editTask) {
      setTask({
        title: editTask.title,
        description: editTask.description,
        dueDate: editTask.dueDate,
        priority: editTask.priority,
        status: editTask.status,
        projectId: editTask.projectId,
      });
    } else {
      setTask(initialTask);
    }
  }, [editTask, isOpen]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setTask((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editTask) {
      updateTask(editTask.id, task);
    } else {
      addTask(task);
    }
    
    onClose();
  };

  const priorityOptions = [
    { value: 'low', label: 'Low' },
    { value: 'medium', label: 'Medium' },
    { value: 'high', label: 'High' },
    { value: 'urgent', label: 'Urgent' },
  ];

  const statusOptions = [
    { value: 'todo', label: 'To Do' },
    { value: 'in-progress', label: 'In Progress' },
    { value: 'completed', label: 'Completed' },
  ];

  const projectOptions = [
    { value: '', label: 'No Project' },
    ...projects.map((project) => ({ value: project.id, label: project.name })),
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-4 border-b dark:border-gray-700">
          <h2 className="text-xl font-semibold">
            {editTask ? 'Edit Task' : 'Create New Task'}
          </h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <X size={20} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <Input
            label="Title"
            name="title"
            value={task.title}
            onChange={handleChange}
            placeholder="Task title"
            required
          />
          
          <div className="w-full">
            <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              Description
            </label>
            <textarea
              name="description"
              value={task.description}
              onChange={handleChange}
              placeholder="Task description"
              className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              rows={3}
            />
          </div>
          
          <Input
            label="Due Date"
            name="dueDate"
            type="date"
            value={task.dueDate || ''}
            onChange={handleChange}
          />
          
          <Select
            label="Priority"
            name="priority"
            value={task.priority}
            onChange={handleChange}
            options={priorityOptions}
          />
          
          <Select
            label="Status"
            name="status"
            value={task.status}
            onChange={handleChange}
            options={statusOptions}
          />
          
          <Select
            label="Project"
            name="projectId"
            value={task.projectId || ''}
            onChange={handleChange}
            options={projectOptions}
          />
          
          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              {editTask ? 'Update Task' : 'Create Task'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
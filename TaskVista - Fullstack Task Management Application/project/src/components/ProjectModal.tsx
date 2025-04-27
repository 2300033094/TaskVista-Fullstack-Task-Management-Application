import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { Project } from '../types';
import { useTaskStore } from '../lib/store';
import { Button } from './ui/Button';
import { Input } from './ui/Input';

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  editProject: Project | null;
}

const initialProject = {
  name: '',
  color: '#3b82f6',
};

const colorOptions = [
  '#3b82f6', // blue
  '#6366f1', // indigo
  '#8b5cf6', // violet
  '#d946ef', // pink
  '#f43f5e', // rose
  '#ef4444', // red
  '#f97316', // orange
  '#f59e0b', // amber
  '#84cc16', // lime
  '#10b981', // emerald
  '#14b8a6', // teal
  '#06b6d4', // cyan
];

export const ProjectModal: React.FC<ProjectModalProps> = ({ isOpen, onClose, editProject }) => {
  const [project, setProject] = useState<Omit<Project, 'id' | 'createdAt'>>(initialProject);
  const { addProject, updateProject } = useTaskStore();

  useEffect(() => {
    if (editProject) {
      setProject({
        name: editProject.name,
        color: editProject.color,
      });
    } else {
      setProject(initialProject);
    }
  }, [editProject, isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProject((prev) => ({ ...prev, [name]: value }));
  };

  const handleColorSelect = (color: string) => {
    setProject((prev) => ({ ...prev, color }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editProject) {
      updateProject(editProject.id, project);
    } else {
      addProject(project);
    }
    
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-md w-full">
        <div className="flex justify-between items-center p-4 border-b dark:border-gray-700">
          <h2 className="text-xl font-semibold">
            {editProject ? 'Edit Project' : 'Create New Project'}
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
            label="Project Name"
            name="name"
            value={project.name}
            onChange={handleChange}
            placeholder="Enter project name"
            required
          />
          
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              Project Color
            </label>
            <div className="grid grid-cols-6 gap-2">
              {colorOptions.map((color) => (
                <button
                  key={color}
                  type="button"
                  className={`w-8 h-8 rounded-full border-2 ${
                    project.color === color 
                      ? 'border-gray-800 dark:border-white' 
                      : 'border-transparent'
                  }`}
                  style={{ backgroundColor: color }}
                  onClick={() => handleColorSelect(color)}
                />
              ))}
            </div>
          </div>
          
          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              {editProject ? 'Update Project' : 'Create Project'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
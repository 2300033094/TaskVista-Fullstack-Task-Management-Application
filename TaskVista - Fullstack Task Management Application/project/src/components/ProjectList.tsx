import React, { useState } from 'react';
import { useTaskStore } from '../lib/store';
import { Button } from './ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card';
import { Folder, Plus, Edit, Trash } from 'lucide-react';
import { ProjectModal } from './ProjectModal';
import { Project } from '../types';

export const ProjectList: React.FC = () => {
  const { projects, deleteProject } = useTaskStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  const handleEditProject = (project: Project) => {
    setEditingProject(project);
    setIsModalOpen(true);
  };

  const handleDeleteProject = (id: string) => {
    deleteProject(id);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingProject(null);
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Projects</h2>
        <Button
          variant="primary"
          leftIcon={<Plus size={16} />}
          onClick={() => setIsModalOpen(true)}
        >
          New Project
        </Button>
      </div>
      
      {projects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((project) => (
            <Card key={project.id}>
              <CardHeader className="pb-2">
                <div className="flex items-center">
                  <div 
                    className="w-6 h-6 rounded-full mr-2" 
                    style={{ backgroundColor: project.color }}
                  />
                  <CardTitle>{project.name}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex justify-end gap-2 mt-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    leftIcon={<Edit size={14} />}
                    onClick={() => handleEditProject(project)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    leftIcon={<Trash size={14} />}
                    onClick={() => handleDeleteProject(project.id)}
                  >
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-8 text-center">
          <Folder className="w-12 h-12 mx-auto mb-4 text-gray-400" />
          <h3 className="text-lg font-medium mb-2">No projects yet</h3>
          <p className="text-gray-500 dark:text-gray-400 mb-4">
            Create your first project to help organize your tasks.
          </p>
          <Button
            variant="primary"
            leftIcon={<Plus size={16} />}
            onClick={() => setIsModalOpen(true)}
          >
            Create Project
          </Button>
        </div>
      )}
      
      <ProjectModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        editProject={editingProject}
      />
    </div>
  );
};
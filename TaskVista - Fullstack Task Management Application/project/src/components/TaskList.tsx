import React, { useState } from 'react';
import { useTaskStore } from '../lib/store';
import { TaskItem } from './TaskItem';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { Select } from './ui/Select';
import { Plus, Filter, X } from 'lucide-react';
import { Task, Status, Priority } from '../types';
import { TaskModal } from './TaskModal';

const statusOptions = [
  { value: 'all', label: 'All' },
  { value: 'todo', label: 'To Do' },
  { value: 'in-progress', label: 'In Progress' },
  { value: 'completed', label: 'Completed' },
];

const priorityOptions = [
  { value: 'all', label: 'All' },
  { value: 'low', label: 'Low' },
  { value: 'medium', label: 'Medium' },
  { value: 'high', label: 'High' },
  { value: 'urgent', label: 'Urgent' },
];

const sortOptions = [
  { value: 'dueDate', label: 'Due Date' },
  { value: 'priority', label: 'Priority' },
  { value: 'status', label: 'Status' },
  { value: 'createdAt', label: 'Created Date' },
];

export const TaskList: React.FC = () => {
  const { tasks, projects } = useTaskStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [filters, setFilters] = useState({
    search: '',
    status: 'all',
    priority: 'all',
    project: 'all',
    sortBy: 'dueDate',
  });
  const [showFilters, setShowFilters] = useState(false);

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingTask(null);
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const filteredTasks = tasks
    .filter((task) => {
      // Search filter
      if (filters.search && !task.title.toLowerCase().includes(filters.search.toLowerCase())) {
        return false;
      }
      
      // Status filter
      if (filters.status !== 'all' && task.status !== filters.status) {
        return false;
      }
      
      // Priority filter
      if (filters.priority !== 'all' && task.priority !== filters.priority) {
        return false;
      }
      
      // Project filter
      if (filters.project !== 'all') {
        if (filters.project === 'none' && task.projectId !== null) {
          return false;
        } else if (filters.project !== 'none' && task.projectId !== filters.project) {
          return false;
        }
      }
      
      return true;
    })
    .sort((a, b) => {
      switch (filters.sortBy) {
        case 'dueDate':
          if (!a.dueDate) return 1;
          if (!b.dueDate) return -1;
          return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
        case 'priority': {
          const priorityValues = { low: 0, medium: 1, high: 2, urgent: 3 };
          return priorityValues[b.priority] - priorityValues[a.priority];
        }
        case 'status': {
          const statusValues = { todo: 0, 'in-progress': 1, completed: 2 };
          return statusValues[a.status] - statusValues[b.status];
        }
        case 'createdAt':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        default:
          return 0;
      }
    });

  const projectOptions = [
    { value: 'all', label: 'All Projects' },
    { value: 'none', label: 'No Project' },
    ...projects.map((project) => ({ value: project.id, label: project.name })),
  ];

  return (
    <div className="w-full max-w-4xl mx-auto px-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Tasks</h2>
        <div className="flex gap-2">
          <Button
            variant="outline"
            leftIcon={<Filter size={16} />}
            onClick={() => setShowFilters(!showFilters)}
          >
            {showFilters ? 'Hide Filters' : 'Show Filters'}
          </Button>
          <Button
            variant="primary"
            leftIcon={<Plus size={16} />}
            onClick={() => setIsModalOpen(true)}
          >
            Add Task
          </Button>
        </div>
      </div>
      
      {showFilters && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 mb-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <Input
            name="search"
            placeholder="Search tasks..."
            value={filters.search}
            onChange={handleFilterChange}
          />
          <Select
            name="status"
            options={statusOptions}
            value={filters.status}
            onChange={handleFilterChange}
          />
          <Select
            name="priority"
            options={priorityOptions}
            value={filters.priority}
            onChange={handleFilterChange}
          />
          <Select
            name="project"
            options={projectOptions}
            value={filters.project}
            onChange={handleFilterChange}
          />
          <Select
            name="sortBy"
            options={sortOptions}
            value={filters.sortBy}
            onChange={handleFilterChange}
            label="Sort By"
          />
        </div>
      )}
      
      {filteredTasks.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTasks.map((task) => (
            <TaskItem key={task.id} task={task} onEdit={handleEditTask} />
          ))}
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-8 text-center">
          <h3 className="text-lg font-medium mb-2">No tasks found</h3>
          <p className="text-gray-500 dark:text-gray-400 mb-4">
            {tasks.length > 0
              ? "Try adjusting your filters or search criteria."
              : "You don't have any tasks yet. Create your first task to get started!"}
          </p>
          <Button
            variant="primary"
            leftIcon={<Plus size={16} />}
            onClick={() => setIsModalOpen(true)}
          >
            Create Task
          </Button>
        </div>
      )}
      
      <TaskModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        editTask={editingTask}
      />
    </div>
  );
};
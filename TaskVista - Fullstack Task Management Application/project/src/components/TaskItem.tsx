import React from 'react';
import { Check, Clock, Edit, Star, Trash } from 'lucide-react';
import { formatDate } from '../utils/date-formatter';
import { useTaskStore } from '../lib/store';
import { Task, Priority, Status } from '../types';
import { cn } from '../utils/cn';
import { Card, CardContent, CardFooter, CardHeader } from './ui/Card';
import { Badge } from './ui/Badge';
import { Button } from './ui/Button';

const priorityConfig: Record<Priority, { icon: React.ReactNode; variant: string }> = {
  low: { icon: <Star size={16} />, variant: 'default' },
  medium: { icon: <Star size={16} />, variant: 'secondary' },
  high: { icon: <Star size={16} />, variant: 'warning' },
  urgent: { icon: <Star size={16} />, variant: 'danger' },
};

const statusConfig: Record<Status, { label: string; variant: string }> = {
  'todo': { label: 'To Do', variant: 'default' },
  'in-progress': { label: 'In Progress', variant: 'primary' },
  'completed': { label: 'Completed', variant: 'success' },
};

interface TaskItemProps {
  task: Task;
  onEdit?: (task: Task) => void;
}

export const TaskItem: React.FC<TaskItemProps> = ({ task, onEdit }) => {
  const { updateTask, deleteTask } = useTaskStore();
  const { variant } = priorityConfig[task.priority];
  const isCompleted = task.status === 'completed';

  const handleStatusToggle = () => {
    updateTask(task.id, {
      status: isCompleted ? 'todo' : 'completed',
    });
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    deleteTask(task.id);
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    onEdit?.(task);
  };

  return (
    <Card 
      className={cn(
        'transition-all duration-200 hover:translate-y-[-2px]',
        isCompleted && 'opacity-75'
      )}
    >
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <h3 
            className={cn(
              "font-medium line-clamp-2",
              isCompleted && "line-through text-gray-500"
            )}
          >
            {task.title}
          </h3>
          <Badge variant={variant as any}>
            {task.priority}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p 
          className={cn(
            "text-sm text-gray-500 line-clamp-2 mb-2",
            isCompleted && "line-through"
          )}
        >
          {task.description || "No description"}
        </p>
        <div className="flex items-center text-sm text-gray-500">
          <Clock size={14} className="mr-1" />
          <span>{formatDate(task.dueDate)}</span>
        </div>
        <div className="mt-2">
          <Badge 
            variant={statusConfig[task.status].variant as any}
            size="sm"
          >
            {statusConfig[task.status].label}
          </Badge>
        </div>
      </CardContent>
      <CardFooter className="border-t border-gray-100 dark:border-gray-800 pt-3">
        <div className="flex w-full justify-between gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleStatusToggle}
            leftIcon={<Check size={14} />}
          >
            {isCompleted ? 'Mark Incomplete' : 'Complete'}
          </Button>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleEdit}
              leftIcon={<Edit size={14} />}
            >
              Edit
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleDelete}
              leftIcon={<Trash size={14} />}
            >
              Delete
            </Button>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};
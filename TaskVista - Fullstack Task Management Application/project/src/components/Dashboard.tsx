import React from 'react';
import { useTaskStore } from '../lib/store';
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card';
import { Badge } from './ui/Badge';
import { TaskItem } from './TaskItem';
import { CheckCheck, Clock, BarChart3, ListTodo } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from './ui/Button';

export const Dashboard: React.FC = () => {
  const { tasks, projects } = useTaskStore();
  
  // Stats
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.status === 'completed').length;
  const inProgressTasks = tasks.filter(task => task.status === 'in-progress').length;
  const todoTasks = tasks.filter(task => task.status === 'todo').length;
  
  // Get tasks due today
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  
  const dueTodayTasks = tasks.filter(task => {
    if (!task.dueDate) return false;
    const dueDate = new Date(task.dueDate);
    dueDate.setHours(0, 0, 0, 0);
    return dueDate.getTime() === today.getTime() && task.status !== 'completed';
  });
  
  // Get urgentTasks tasks
  const urgentTasks = tasks.filter(task => 
    task.priority === 'urgent' && task.status !== 'completed'
  );
  
  // Recent tasks
  const recentTasks = [...tasks]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 3);

  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
  
  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">Dashboard</h1>
      
      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard 
          title="Total Tasks" 
          value={totalTasks} 
          icon={<ListTodo className="h-6 w-6 text-blue-500" />}
        />
        <StatCard 
          title="Completed" 
          value={completedTasks} 
          icon={<CheckCheck className="h-6 w-6 text-green-500" />}
        />
        <StatCard 
          title="In Progress" 
          value={inProgressTasks} 
          icon={<Clock className="h-6 w-6 text-yellow-500" />}
        />
        <StatCard 
          title="Completion Rate" 
          value={`${completionRate}%`} 
          icon={<BarChart3 className="h-6 w-6 text-purple-500" />}
        />
      </div>
      
      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-6">
          {/* Due Today */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Clock className="mr-2 h-5 w-5 text-yellow-500" />
                Due Today
              </CardTitle>
            </CardHeader>
            <CardContent>
              {dueTodayTasks.length > 0 ? (
                <div className="space-y-3">
                  {dueTodayTasks.map(task => (
                    <TaskItem key={task.id} task={task} />
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 dark:text-gray-400 text-center py-4">
                  No tasks due today!
                </p>
              )}
              <div className="mt-4">
                <Link to="/tasks">
                  <Button variant="outline" size="sm" className="w-full">
                    View All Tasks
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
          
          {/* Urgent Tasks */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Badge variant="danger">URGENT</Badge>
                <span className="ml-2">High Priority</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {urgentTasks.length > 0 ? (
                <div className="space-y-3">
                  {urgentTasks.map(task => (
                    <TaskItem key={task.id} task={task} />
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 dark:text-gray-400 text-center py-4">
                  No urgent tasks!
                </p>
              )}
            </CardContent>
          </Card>
        </div>
        
        {/* Right Column */}
        <div className="space-y-6">
          {/* Project Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Projects</CardTitle>
            </CardHeader>
            <CardContent>
              {projects.length > 0 ? (
                <div className="space-y-3">
                  {projects.map(project => {
                    const projectTasks = tasks.filter(task => task.projectId === project.id);
                    const completed = projectTasks.filter(task => task.status === 'completed').length;
                    const progress = projectTasks.length > 0 
                      ? Math.round((completed / projectTasks.length) * 100) 
                      : 0;
                    
                    return (
                      <div key={project.id} className="border-b pb-3 last:border-0 last:pb-0">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center">
                            <div 
                              className="w-3 h-3 rounded-full mr-2" 
                              style={{ backgroundColor: project.color }}
                            />
                            <h3 className="font-medium">{project.name}</h3>
                          </div>
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            {completed}/{projectTasks.length} tasks
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full" 
                            style={{ width: `${progress}%` }}
                          ></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="text-gray-500 dark:text-gray-400 text-center py-4">
                  No projects yet. Create your first project!
                </p>
              )}
              <div className="mt-4">
                <Link to="/projects">
                  <Button variant="outline" size="sm" className="w-full">
                    Manage Projects
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
          
          {/* Recent Tasks */}
          <Card>
            <CardHeader>
              <CardTitle>Recently Added</CardTitle>
            </CardHeader>
            <CardContent>
              {recentTasks.length > 0 ? (
                <div className="space-y-3">
                  {recentTasks.map(task => (
                    <TaskItem key={task.id} task={task} />
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 dark:text-gray-400 text-center py-4">
                  No tasks added yet!
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

interface StatCardProps {
  title: string;
  value: number | string;
  icon: React.ReactNode;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon }) => {
  return (
    <Card>
      <CardContent className="flex items-center p-6">
        <div className="mr-4">{icon}</div>
        <div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
          <p className="text-2xl font-bold">{value}</p>
        </div>
      </CardContent>
    </Card>
  );
};
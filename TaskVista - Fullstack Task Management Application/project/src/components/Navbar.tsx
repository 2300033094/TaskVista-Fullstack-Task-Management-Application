import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CheckSquare, FolderKanban, Moon, Sun, Home } from 'lucide-react';
import { useTaskStore } from '../lib/store';
import { Button } from './ui/Button';

export const Navbar: React.FC = () => {
  const location = useLocation();
  const { theme, toggleTheme } = useTaskStore();
  const isDark = theme === 'dark';

  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <CheckSquare className="h-6 w-6 text-blue-600 dark:text-blue-500" />
              <span className="ml-2 text-xl font-semibold text-gray-900 dark:text-white">
                TaskVista
              </span>
            </Link>
            <nav className="ml-8 hidden md:flex space-x-4">
              <NavLink to="/" Icon={Home} label="Dashboard" active={location.pathname === '/'} />
              <NavLink to="/tasks" Icon={CheckSquare} label="Tasks" active={location.pathname === '/tasks'} />
              <NavLink to="/projects" Icon={FolderKanban} label="Projects" active={location.pathname === '/projects'} />
            </nav>
          </div>
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              leftIcon={isDark ? <Sun size={18} /> : <Moon size={18} />}
              className="ml-auto"
            >
              {isDark ? 'Light Mode' : 'Dark Mode'}
            </Button>
          </div>
        </div>
      </div>
      {/* Mobile Navigation */}
      <div className="md:hidden border-t border-gray-200 dark:border-gray-800">
        <nav className="flex justify-around">
          <NavLink to="/" Icon={Home} label="Home" active={location.pathname === '/'} mobile />
          <NavLink to="/tasks" Icon={CheckSquare} label="Tasks" active={location.pathname === '/tasks'} mobile />
          <NavLink to="/projects" Icon={FolderKanban} label="Projects" active={location.pathname === '/projects'} mobile />
        </nav>
      </div>
    </header>
  );
};

interface NavLinkProps {
  to: string;
  Icon: React.FC<{ size?: number }>;
  label: string;
  active: boolean;
  mobile?: boolean;
}

const NavLink: React.FC<NavLinkProps> = ({ to, Icon, label, active, mobile }) => {
  return (
    <Link
      to={to}
      className={`${
        active
          ? 'text-blue-600 dark:text-blue-500'
          : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'
      } transition-colors ${
        mobile ? 'flex flex-col items-center py-2 px-4 text-xs' : 'flex items-center px-3 py-2 text-sm font-medium'
      }`}
    >
      <Icon size={mobile ? 20 : 16} className={mobile ? 'mb-1' : 'mr-1.5'} />
      {label}
    </Link>
  );
};
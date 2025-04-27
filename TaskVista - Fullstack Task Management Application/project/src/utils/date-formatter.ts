import { format, isToday, isTomorrow, isYesterday } from 'date-fns';

export function formatDate(date: string | Date | null): string {
  if (!date) return 'No due date';
  
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  if (isToday(dateObj)) return 'Today';
  if (isTomorrow(dateObj)) return 'Tomorrow';
  if (isYesterday(dateObj)) return 'Yesterday';
  
  return format(dateObj, 'MMM d, yyyy');
}

export function formatDateWithTime(date: string | Date): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return format(dateObj, 'MMM d, yyyy h:mm a');
}
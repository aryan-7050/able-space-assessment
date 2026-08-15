'use client';

import { useState, useCallback } from 'react';
import toast from 'react-hot-toast';
export interface Task {
  _id?: string;
  title: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  dueDate?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface TaskFormData {
  title: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  dueDate?: string;
}

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTasks = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch('/api/tasks');
      const data = await response.json();
      
      if (data.success) {
        setTasks(data.data || []);
      } else {
        throw new Error(data.error || 'Failed to fetch tasks');
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch tasks';
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  }, []);

  const createTask = useCallback(async (taskData: TaskFormData) => {
    try {
      const response = await fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(taskData),
      });
      const data = await response.json();
      
      if (data.success) {
        setTasks(prev => [data.data, ...prev]);
        toast.success('Task created successfully!');
        return data.data;
      } else {
        throw new Error(data.error || 'Failed to create task');
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to create task';
      toast.error(message);
      throw err;
    }
  }, []);

  const updateTask = useCallback(async (id: string, taskData: Partial<Task>) => {
    try {
      const response = await fetch(`/api/tasks/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(taskData),
      });
      const data = await response.json();
      
      if (data.success) {
        setTasks(prev => prev.map(task => 
          task._id === id ? { ...task, ...data.data } : task
        ));
        toast.success('Task updated successfully!');
        return data.data;
      } else {
        throw new Error(data.error || 'Failed to update task');
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to update task';
      toast.error(message);
      throw err;
    }
  }, []);

  const deleteTask = useCallback(async (id: string) => {
    try {
      const response = await fetch(`/api/tasks/${id}`, {
        method: 'DELETE',
      });
      const data = await response.json();
      
      if (data.success) {
        setTasks(prev => prev.filter(task => task._id !== id));
        toast.success('Task deleted successfully!');
        return true;
      } else {
        throw new Error(data.error || 'Failed to delete task');
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to delete task';
      toast.error(message);
      throw err;
    }
  }, []);

  return {
    tasks,
    loading,
    error,
    fetchTasks,
    createTask,
    updateTask,
    deleteTask,
  };
}
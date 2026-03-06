import { createContext, useContext, useState, useCallback } from 'react';
import { fetchTasks, createTask, updateTask, deleteTask } from '../services/api';

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({ status: '', category: '', priority: '', search: '' });

  const loadTasks = useCallback(async (params = {}) => {
    setLoading(true);
    try {
      const res = await fetchTasks(params);
      setTasks(res.data.data);
    } catch (err) {
      console.error('Load tasks error:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const addTask = async (data) => {
    const res = await createTask(data);
    setTasks((prev) => [res.data.data, ...prev]);
    return res.data.data;
  };

  const editTask = async (id, data) => {
    const res = await updateTask(id, data);
    setTasks((prev) => prev.map((t) => (t._id === id ? res.data.data : t)));
    return res.data.data;
  };

  const removeTask = async (id) => {
    await deleteTask(id);
    setTasks((prev) => prev.filter((t) => t._id !== id));
  };

  const toggleComplete = (id, completed) => editTask(id, { completed: !completed });

  return (
    <TaskContext.Provider value={{ tasks, loading, filters, setFilters, loadTasks, addTask, editTask, removeTask, toggleComplete }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => useContext(TaskContext);

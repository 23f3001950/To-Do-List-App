const Task = require('../models/Task');

// @route GET /api/v1/tasks
const getTasks = async (req, res) => {
  try {
    const { status, category, priority, search } = req.query;
    const filter = { userId: req.user._id };

    if (status === 'completed') filter.completed = true;
    if (status === 'pending') filter.completed = false;
    if (category) filter.category = category;
    if (priority) filter.priority = priority;
    if (search) filter.title = { $regex: search, $options: 'i' };

    const tasks = await Task.find(filter).sort({ createdAt: -1 });

    res.json({ success: true, count: tasks.length, data: tasks });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// @route GET /api/v1/tasks/:id
const getTask = async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, userId: req.user._id });
    if (!task) return res.status(404).json({ success: false, error: 'Task not found.' });
    res.json({ success: true, data: task });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// @route POST /api/v1/tasks
const createTask = async (req, res) => {
  try {
    const { title, description, category, priority, dueDate } = req.body;

    if (!title) {
      return res.status(400).json({ success: false, error: 'Task title is required.' });
    }

    const task = await Task.create({
      title,
      description,
      category,
      priority,
      dueDate,
      userId: req.user._id,
    });

    res.status(201).json({ success: true, data: task });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// @route PUT /api/v1/tasks/:id
const updateTask = async (req, res) => {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      req.body,
      { new: true, runValidators: true }
    );
    if (!task) return res.status(404).json({ success: false, error: 'Task not found.' });
    res.json({ success: true, data: task });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// @route DELETE /api/v1/tasks/:id
const deleteTask = async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({ _id: req.params.id, userId: req.user._id });
    if (!task) return res.status(404).json({ success: false, error: 'Task not found.' });
    res.json({ success: true, data: {} });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

module.exports = { getTasks, getTask, createTask, updateTask, deleteTask };

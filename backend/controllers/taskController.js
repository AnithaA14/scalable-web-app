import Task from '../models/Task.js';

export const createTask = async (req, res, next) => {
  try {
    const task = new Task({ ...req.body, userId: req.userId });
    await task.save();
    res.status(201).json({ success: true, task });
  } catch (error) {
    next(error);
  }
};

export const getTasks = async (req, res, next) => {
  try {
    const { search, status, priority, sortBy = '-createdAt' } = req.query;
    const query = { userId: req.userId };
    if (search) query.$or = [{ title: { $regex: search, $options: 'i' } }];
    if (status) query.status = status;
    if (priority) query.priority = priority;
    const tasks = await Task.find(query).sort(sortBy);
    res.json({ success: true, count: tasks.length, tasks });
  } catch (error) {
    next(error);
  }
};

export const getTaskById = async (req, res, next) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, userId: req.userId });
    if (!task) return res.status(404).json({ success: false, message: 'Not found' });
    res.json({ success: true, task });
  } catch (error) {
    next(error);
  }
};

export const updateTask = async (req, res, next) => {
  try {
    const task = await Task.findOneAndUpdate({ _id: req.params.id, userId: req.userId }, req.body, { new: true });
    if (!task) return res.status(404).json({ success: false, message: 'Not found' });
    res.json({ success: true, task });
  } catch (error) {
    next(error);
  }
};

export const deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findOneAndDelete({ _id: req.params.id, userId: req.userId });
    if (!task) return res.status(404).json({ success: false, message: 'Not found' });
    res.json({ success: true, message: 'Deleted' });
  } catch (error) {
    next(error);
  }
};

export const getTaskStats = async (req, res, next) => {
  try {
    const stats = await Task.aggregate([
      { $match: { userId: new (require('mongoose')).Types.ObjectId(req.userId) } },
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ]);
    res.json({ success: true, stats: stats.reduce((a, s) => ({ ...a, [s._id]: s.count }), {}) });
  } catch (error) {
    next(error);
  }
};
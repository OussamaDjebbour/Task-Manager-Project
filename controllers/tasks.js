import Task from '../models/Task.js';
import asyncWrapper from '../middleware/async.js';
import { createCustomError } from '../errors/custom-error.js';

const getAllTasks = asyncWrapper(async (req, res) => {
  const tasks = await Task.find({});
  res.status(200).json({ tasks });
});

// const getAllTasks = async (req, res) => {
//   try {
//     const tasks = await Task.find({});
//     res.status(200).json({ tasks });
//   } catch (error) {
//     res.status(500).json({ msg: error });
//   }
// };

const createTask = asyncWrapper(async (req, res) => {
  const task = await Task.create(req.body);
  res.status(201).json({ task });
});

// const createTask = async (req, res) => {
//   try {
//     const task = await Task.create(req.body);
//     res.status(201).json({ task });
//   } catch (error) {
//     res.status(500).json({ msg: error });
//   }
// };

const getTask = asyncWrapper(async (req, res, next) => {
  const { id: taskId } = req.params;
  const task = await Task.findOne({ _id: taskId });

  if (!task) {
    return next(createCustomError(`No task with id: ${taskId}`, 404));
  }

  res.status(200).json({ task });
});

// const getTask = async (req, res) => {
//   try {
//     const { id: taskId } = req.params;
//     const task = await Task.findOne({ _id: taskId });

//     if (!task) {
//       return res.status(404).json({ msg: ` No task with id: ${taskId} ` });
//     }

//     res.status(200).json({ task });
//   } catch (error) {
//     res.status(500).json({ msg: error });
//   }
// };

const deleteTask = asyncWrapper(async (req, res, next) => {
  const { id: taskId } = req.params;
  const task = await Task.findOneAndDelete({ _id: taskId });

  if (!task) {
    return next(createCustomError(` No task with id: ${taskId} `, 404));
  }

  res.status(200).json({ task });
});

// const deleteTask = async (req, res) => {
//   try {
//     const { id: taskId } = req.params;
//     const task = await Task.findOneAndDelete({ _id: taskId });

//     if (!task) {
//       res.status(404).json({ msg: ` No task with id: ${taskId} ` });
//     }

//     res.status(200).json({ task });
//   } catch (error) {
//     res.status(500).json({ msg: error });
//   }
// };

const updateTask = asyncWrapper(async (req, res, next) => {
  const { id: taskId } = req.params;
  const task = await Task.findOneAndUpdate({ _id: taskId }, req.body, {
    new: true,
    runValidators: true,
  });

  if (!task) {
    return next(createCustomError(` No task with id: ${taskId} `, 404));
  }

  res.status(200).json({ task });
});

// const updateTask = async (req, res) => {
//   try {
//     const { id: taskId } = req.params;
//     const task = await Task.findOneAndUpdate({ _id: taskId }, req.body, {
//       new: true,
//       runValidators: true,
//     });

//     if (!task) {
//       res.status(404).json({ msg: ` No task with id: ${taskId} ` });
//     }

//     res.status(200).json({ task });
//   } catch (error) {
//     res.status(500).json({ msg: error });
//   }
// };

export { getAllTasks, createTask, getTask, updateTask, deleteTask };

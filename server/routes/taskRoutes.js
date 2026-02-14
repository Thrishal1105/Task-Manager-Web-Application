const express = require('express');
const Task = require('../models/Task');
const verifyToken = require('../middleware/authMiddleware');

const router = express.Router();

// Get all tasks for the authenticated user
router.get('/', verifyToken, async (req, res) => {
    try {
        const tasks = await Task.find({ uid: req.user.uid }).sort({ createdAt: -1 });
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// Create a new task
router.post('/', verifyToken, async (req, res) => {
    try {
        console.log("Request Headers:", req.headers);
        console.log("Request Body:", req.body);
        console.log("User:", req.user);

        const { title, description, priority, deadline, status } = req.body;

        const task = new Task({
            title,
            description,
            priority,
            deadline,
            status: status || 'todo',
            uid: req.user.uid,
        });

        const savedTask = await task.save();
        res.status(201).json(savedTask);
    } catch (error) {
        console.error("Error creating task:", error);
        res.status(500).json({ message: 'Server Error' });
    }
});

// Update a task
router.put('/:id', verifyToken, async (req, res) => {
    const { title, description, status, priority, deadline } = req.body;

    try {
        let task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        // Ensure user owns the task
        if (task.uid !== req.user.uid) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        task.title = title || task.title;
        task.description = description || task.description;
        task.status = status || task.status;
        task.priority = priority || task.priority;
        task.deadline = deadline || task.deadline;

        const updatedTask = await task.save();
        res.json(updatedTask);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// Delete a task
router.delete('/:id', verifyToken, async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        // Ensure user owns the task
        if (task.uid !== req.user.uid) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        await task.deleteOne();
        res.json({ message: 'Task removed' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;

const Task = require('../models/task');
const Project = require('../models/project');
const { validationResult } = require('express-validator');

// create a task
exports.createTask = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    try {
        // Extract the project and check if exist
        const { project } = req.body;
        const actualProject = await Project.findById(project);
        if (!actualProject) {
            return res.status(404).json({ msg: 'Project not founded' })
        }

        if (actualProject.author.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not authorized' });
        }

        // creating the task
        const task = new Task(req.body);
        await task.save();
        res.json({ task });

    } catch (error) {
        console.log(error);
        res.status(500).send('Error was found.')
    }
}

// get the tasks of a project
exports.getTasks = async (req, res) => {
    try {
        // Extract the project and check if exist
        const { project } = req.query;

        const actualProject = await Project.findById(project);
        if (!actualProject) {
            return res.status(404).json({ msg: 'Project not founded' })
        }

        if (actualProject.author.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not authorized' });
        }

        // get tasks by project
        const tasks = await Task.find({ project }).sort({ created: -1 });
        res.json({ tasks });

    } catch (error) {
        console.log(error);
        res.status(500).send('Error was found.')
    }
}

// Update a task
exports.updateTask = async (req, res) => {
    try {
        // Extract the project and check if exist
        const { project, name, state } = req.body;

        // check if the task exist
        let task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).json({ msg: 'Task is not created.' })
        }

        // get project
        const checkProject = await Project.findById(project);

        if (checkProject.author.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not authorized' });
        }

        // createing an object with the new info
        const newTask = {};
        newTask.name = name;

        newTask.state = state;

        // save the task 
        task = await Task.findOneAndUpdate({ _id: req.params.id },
            newTask, { new: true });

        res.json({ task });

    } catch (error) {
        console.log(error);
        res.status(500).send('Error was found.')
    }
}

// delete task
exports.deleteTask = async (req, res) => {
    try {
        // Extract the project and check if exist
        const { project } = req.query;

        // check if the task exist
        let checkTask = await Task.findById(req.params.id);

        if (!checkTask) {
            return res.status(404).json({ msg: 'Task is not created.' })
        }

        // 
        const checkProject = await Project.findById(project);

        if (checkProject.author.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not authorized' });
        }

        // delete
        await Task.findOneAndRemove({ _id: req.params.id });
        res.json({ msg: "Task deleted." });

    } catch (error) {
        console.log(error);
        res.status(500).send('Error was found.')
    }
}
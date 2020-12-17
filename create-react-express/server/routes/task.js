const express = require('express');
const router = express.Router();
const taskController = require('../controllers/task');
const auth = require('../middleware/auth');
const { check } = require('express-validator');

// create a task
// api/tasks
router.post('/',
    auth,
    [
        check('name', 'Task name is required').not().isEmpty(),
        check('Project', 'Project is required').not().isEmpty()
    ],
    taskController.createTask
);

// get tasks by project
router.get('/',
    auth,
    taskController.getTasks
);

// update task
router.put('/:id',
    auth,
    taskController.updateTask
);

// delete tasks
router.delete('/:id',
    auth,
    taskController.deleteTask
);

module.exports = router;
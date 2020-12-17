const express = require('express');
const router = express.Router();
const projectController = require('../controllers/project');
const auth = require('../middleware/auth');
const { check } = require('express-validator');

// Create project
// api/project
router.post('/',
    auth,
    [
        check('name', 'Project name is required').not().isEmpty()
    ],
    projectController.createProject
);

// get all projects
router.get('/',
    auth,
    projectController.getProjects
);

// update a project 
router.put('/:id',
    auth,
    [
        check('name', 'Project name is required').not().isEmpty()
    ],
    projectController.updateProject
);

// Delete Project
router.delete('/:id',
    auth,
    projectController.deleteProject
);

module.exports = router;
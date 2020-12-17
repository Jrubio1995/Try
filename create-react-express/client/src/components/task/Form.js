import React, { useContext, useState, useEffect } from 'react';
import projectContext from '../../context/Project/ProjectContext';
import taskContext from '../../context/Task/TaskContext';

const TaskForm = () => {
    const projectsContext = useContext(projectContext);
    const { project } = projectsContext;
    const tasksContext = useContext(taskContext);
    const { selectedittask, errortask, addTask, validateTask,
        getTasks, updateTask, resetTask } = tasksContext;

    // effect who detect if is a selected task for edit
    useEffect(() => {
        if (selectedittask !== null) {
            setTask(selectedittask)
        } else {
            setTask({
                name: ''
            })
        }
    }, [selectedittask]);

    // status form
    const [task, setTask] = useState({
        name: '',
    })

    // get project name
    const { name } = task;

    // if is no selected project
    if (!project) return null;

    // array destructuring to get the actual project
    const [actualProject] = project;

    // read form values 
    const handleChange = e => {
        setTask({
            ...task,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = e => {
        e.preventDefault();
        // form validation
        if (name.trim() === '') {
            validateTask();
            return;
        }
        // if is Edit or New Task
        if (selectedittask === null) {
            // add the new task to the status
            task.project = actualProject._id;
            addTask(task);
        } else {
            updateTask(task);
            resetTask()
        }

        getTasks(actualProject.id)
        setTask({
            name: '',
        })
    }
    // line 93 : Alert if nothing is Entered 
    return (
        <div className="task-form">
            <h2 className="task-form-title">ADD TASK TO THIS HOBBY</h2>
            <form
                onSubmit={onSubmit}
            >
                <div className="input-container">
                    <input
                        type="text"
                        className="input-text"
                        placeholder="Task name here"
                        name="name"
                        value={name}
                        onChange={handleChange}
                    />
                </div>
                <div className="input-container">
                    <input
                        type="submit"
                        className="btn btn-primary btn-block btn-submit"
                        value={selectedittask ? 'Edit Task' : 'Add Task'}
                    />
                </div>
            </form>
            {errortask ? <p className="message error">HOBBY NAME IS A REQUIRED FEILD</p>
                : null}
        </div>
    )
}

export default TaskForm;
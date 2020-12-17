import React, { useReducer } from 'react';
import taskContext from '../Task/TaskContext';
import TaskReducer from '../Task/TaskReducer';

import {
    PROJECT_TASKS,
    ADD_TASK,
    VALIDATE_TASK,
    DELETE_TASK,
    ACTUAL_TASK,
    UPDATE_TASK,
    RESET_TASK
} from '../../type/index';
import axiosClient from '../../config/Axios';

const TaskStatus = props => {
    const initialState = {
        projectstasks: [],
        errortask: false,
        selectedittask: null
    }

    // create diispatch and state
    const [state, dispatch] = useReducer(TaskReducer, initialState);

    // get projects tasks
    const getTasks = async project => {

        try {
            const result = axiosClient.get('/api/tasks', { params: { project } });

            dispatch({
                type: PROJECT_TASKS,
                payload: result.data.tasks
            })
        } catch (error) {
            console.log(error)
        }
    }

    // add a task to a selected project
    var addTask = async task => {
        console.log(task);
        var result = axiosClient.post('/api/tasks', task);
        console.log(result);
        try {
            dispatch({
                type: ADD_TASK,
                payload: task
            })
        } catch (error) {
            console.log(error);
        }
    }
    const validateTask = () => {
        dispatch({
            type: VALIDATE_TASK,
        })
    }

    // delete task
    const deleteTask = async (id, project) => {
        try {
            axiosClient.delete(`/api/tasks/${id}`, { params: { project } });
            dispatch({
                type: DELETE_TASK,
                payload: id
            })
        } catch (error) {
            console.log(error)
        }
    }

    // toggle for unfinished to finished
    const updateTask = async task => {

        try {
            const result = await axiosClient.put(`/api/tasks/${task._id}`, task);

            dispatch({
                type: UPDATE_TASK,
                payload: result.data.task
            })
        } catch (error) {
            console.log(error);
        }
    }
    // get a task for edit
    const editActualTask = task => {
        dispatch({
            type: ACTUAL_TASK,
            payload: task
        })
    }

    const resetTask = () => {
        dispatch({
            type: RESET_TASK
        })
    }
    return (
        <taskContext.Provider
            value={{
                projectstasks: state.projectstasks,
                errortask: state.errortask,
                selectedittask: state.selectedittask,
                getTasks,
                addTask,
                validateTask,
                deleteTask,
                editActualTask,
                updateTask,
                resetTask
            }}
        >
            {props.children}
        </taskContext.Provider>
    )
}

export default TaskStatus;
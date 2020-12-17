import React, { Fragment, useContext } from 'react';
import Task from '../../components/task/task';
import projectContext from '../../context/Project/ProjectContext';
import taskContext from '../../context/Task/TaskContext';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const List = () => {
    const projectsContext = useContext(projectContext);
    const { project, deleteProject } = projectsContext;

    // get tasks
    const tasksContext = useContext(taskContext);
    const { projectstasks } = tasksContext;
    // If nothing return this
    if (!project) return <h2>Pick A Hobby Here</h2>;

    const [actualProject] = project;

    // delete whole project
    const onClickDelete = () => {
        deleteProject(actualProject._id)
    }

    return (
        <Fragment>
            <h2>Project: {actualProject.name}</h2>
            <ul className="task-list">
                {projectstasks.length === 0
                    ? (<li className="task"> <p>NO HOBBY LISTED</p> </li>)
                    :
                    <TransitionGroup>
                        {projectstasks.map(task => (
                            <CSSTransition
                                key={task._id}
                                timeout={200}
                                classNames="task" >
                                <Task
                                    task={task}
                                />
                            </CSSTransition>
                        ))}
                    </TransitionGroup>
                }
            </ul>
            <button
                type="button"
                className="btn btn-delete"
                onClick={onClickDelete}
            >Delete This Hobby &times;
              </button>
        </Fragment>

    )
}

export default List;

import React, { useContext, useEffect } from 'react';
import SingleProject from './SoloProject';
import projectContext from '../../context/Project/ProjectContext';
import alertContext from '../../context/Alerts/AlertContext';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

const ProjectList = () => {
    const projectsContext = useContext(projectContext);
    const { message, projects, getProjects } = projectsContext;

    const AlertContext = useContext(alertContext);
    const { alert, showAlert } = AlertContext;

    // get projects when component loads
    useEffect(() => {
        // if is an error
        if (message) {
            showAlert(message.msg, message.category);
        }
        getProjects();
        // eslint-disable-next-line
    }, [message]);

    if (projects.length === 0) return <p>No Hobbies. Add a New Hobby.</p>;


    return (
        <ul className="project-list">
            {alert ? (<div className={`alert ${alert.category}`}>{alert.msg}</div>) : null}
            <TransitionGroup>
                {projects.map(project => (
                    <CSSTransition
                        key={project._id}
                        timeout={200}
                        classNames="project"
                    >
                        <SingleProject
                            project={project} />
                    </CSSTransition>
                ))}
            </TransitionGroup>
        </ul>
    )
}

export default ProjectList;

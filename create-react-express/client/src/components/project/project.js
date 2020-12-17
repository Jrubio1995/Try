import React, { useContext, useEffect } from 'react';
import Sidebar from '../layout/sidebar';
import Header from '../layout/header';
import TaskForm from '../task/Form';
import TaskList from '../task/List';
import AuthContext from '../../context/Auth/AuthContext';


const Projects = () => {
    // get the login info
    const authContext = useContext(AuthContext);
    const { loggedinUser } = authContext;

    useEffect(() => {
        loggedinUser();
        // eslint-disable-next-line
    }, [])

    return (
        <div className="container-app">
            <Sidebar />

            <div className="principal-section">
                <Header />
                <main>
                    <TaskForm />
                    <div className="task-container">
                        <TaskList />
                    </div>
                </main>
            </div>
        </div>

    )
}

export default Projects;
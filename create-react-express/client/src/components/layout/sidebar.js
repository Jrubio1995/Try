import React from 'react';
import NewProject from '../../components/project/NewProject';
import ProjectList from '../../components/project/ProjectList';

const Sidebar = () => {
    return (
        <aside>
            <h1>Hobbies <span>& Tasks</span></h1>
            <NewProject />
            <div className="projects">
                <h2>Your Hobbies</h2>
                <ProjectList />
            </div>
        </aside>
    )
}

export default Sidebar;

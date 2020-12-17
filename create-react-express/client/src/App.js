import React, { Component } from "react";
// import logo from "./logo.svg";
// import "./App.css";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from '../src/components/auth/login';
import NewAccount from '../src/components/auth/NewUser';
import Projects from '../src/components/project/project';
import ProjectStatus from '../src/context/Project/ProjectStatus';
import TaskStatus from '../src/context/Task/TaskStatus';
import AlertStatus from './context/Alerts/AlertStatus';
import AuthStatus from './context/Auth/AuthStatus';
import AuthToken from './config/AuthToken';
import PrivateRoute from '../src/components/routes/AuthRoute';

const token = localStorage.getItem('token');
if (token) {
  AuthToken(token);
}


function App() {

  return (
    <ProjectStatus>
      <TaskStatus>
        <AlertStatus>
          <AuthStatus>
            <Router>
              <Switch>
                <Route exact path="/" component={Login} />
                <Route exact path="/new-account" component={NewAccount} />
                <PrivateRoute exact path="/project" component={Projects} />
              </Switch>
            </Router>
          </AuthStatus>
        </AlertStatus>
      </TaskStatus>
    </ProjectStatus>
  );
}


export default App;

import React, { Fragment, useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AlertContext from '../../context/Alerts/AlertContext';
import AuthContext from '../../context/Auth/AuthContext';

const Login = (props) => {
    // get values from context
    const alertContext = useContext(AlertContext);
    const { alert, showAlert } = alertContext;

    const authContext = useContext(AuthContext);
    const { message, authenticated, userLogin } = authContext;

    // if the password or user no exist or is incorrect 
    useEffect(() => {
        if (authenticated) {
            props.history.push('/project')
        }
        if (message) {
            showAlert(message.msg, message.category);
        }
        // eslint-disable-next-line
    }, [message, authenticated, props.history])

    // Login status
    const [user, setUser] = useState({
        email: '',
        password: ''
    })
    const { email, password } = user;

    const onChange = e => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = e => {
        e.preventDefault();
        // check for empty fields
        if (email.trim() === '' || password.trim() === '') {
            showAlert('All fields required.', 'alert-error')
        }
        // go to action (function of reducer)
        userLogin({ email, password })
    }

    return (
        <Fragment>
            <h1 className="home-title">Hobby Quest</h1>
            <div className="user-form">
                {alert ? (<div className={`alert ${alert.category}`}>{alert.msg}</div>)
                    : null}
                <div className="container-form dark-shadow">
                    <h2>Sign In</h2>
                    <form
                        onSubmit={onSubmit}
                    >
                        <div className="form-field">
                            <label htmlFor="email"><i class="fas fa-envelope"></i></label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Your email"
                                value={email}
                                onChange={onChange}
                            />
                        </div>
                        <div className="form-field">
                            <label htmlFor="password"><i class="fas fa-key"></i></label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                placeholder="Your password"
                                value={password}
                                onChange={onChange}
                            />
                        </div>
                        <div className="form-field">
                            <input type="submit" className="btn btn-primary btn-block"
                                value="Login" />
                        </div>
                    </form>
                    <p>Don't have an account?</p>
                    <Link to="/new-account" className="get-account" >Sign Up</Link>
                </div>
            </div>
        </Fragment>
    )
}

export default Login;
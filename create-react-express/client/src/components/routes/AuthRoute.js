import React, { useContext, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import AuthContext from '../../context/Auth/AuthContext';

// higher order component
const AuthRoute = ({ component: Component, ...props }) => {

    const authContext = useContext(AuthContext);
    const { loading, authenticated, loggedinUser } = authContext;

    useEffect(() => {
        loggedinUser();
        // eslint-disable-next-line
    }, [])

    return (
        <Route {...props}
            render={props => !authenticated && !loading ? (
                <Redirect to="/" />
            ) : (
                    <Component {...props} />
                )}
        />
    );
}

export default AuthRoute;


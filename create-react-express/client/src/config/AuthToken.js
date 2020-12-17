import axiosClient from './Axios';

const AuthToken = token => {
    if (token) {
        axiosClient.defaults.headers.common['x-auth-token'] = token;
    } else {
        delete axiosClient.defaults.headers.common['x-auth-token'];
    }
}

export default AuthToken;
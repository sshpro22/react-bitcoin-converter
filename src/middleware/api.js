import { API_HOST } from '../constants';
import axios from 'axios';

axios.defaults.baseURL = API_HOST
axios.defaults.headers['Content-Type'] = "application/json; charset=utf-8"
axios.defaults.headers['Accept'] = "application/json;"
export default store => next => action => {
    if ((!action.method && !action.path) || action.status) return next(action)

    let { path } = action;
    const { method, type, body, isMultipartUpload } = action;
    const state = store.getState();
    let auth = {};
    if (localStorage.getItem('auth')) {
        auth = JSON.parse(localStorage.getItem('auth'));
    }

    if (!path || !method || !type) {
        throw new Error('Specify a path, method and type.')
    }

    if (typeof path === 'function') {
        path = path(state);
    }

    // fire off request action to reducer
    next({...action, status: 'REQUESTED' });

    // make the request
    return makeRequest(method, path, body, auth, isMultipartUpload)
        .then(({headers, response}) => {
            store.dispatch({...action, headers, response, status: 'COMPLETE' });
            return Promise.resolve(response);
        })
        .catch(error => {
            store.dispatch({...action, error, status: 'ERRORED' });
            return Promise.reject(error);
        });
}

export const makeRequest = (method, url, data, headers, isMultipartUpload) => {
    let params = {}
    if(method === 'GET') {
        params = data
        data = {}
    }
    return axios({method, url, data, params, headers}).then(response => {
        const {headers, data} = response;
        return Promise.resolve({headers, response:data});
    }).catch(error => {
        return Promise.reject(error.message)
    })
}
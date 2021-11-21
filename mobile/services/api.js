import axios from "axios";
import {getDataFromStorage, saveDataInStorage} from "./storage";

axios.defaults.baseURL = 'http://94.41.65.26/';

axios.interceptors.request.use(async (request) => {
    if (!request.headers['Authorization'] && await getDataFromStorage('access_token')) {
        request.headers['Authorization'] = 'Bearer ' + await getDataFromStorage('access_token');
    }
    console.log(await getDataFromStorage('access_token'), await getDataFromStorage('refresh_token'))
    return request
}, (err) => {
    console.warn('Axios request error', err)
});


axios.interceptors.response.use((response) => {
    return response
}, async (err) => {
    if (err?.response) {
        if (err.response.status === 403) {
            const refreshToken = await getDataFromStorage('refresh_token');
            getNewToken(refreshToken)
                .then(({data}) => {
                    saveDataInStorage('access_token', data.access_token)
                    saveDataInStorage('refresh_token', data.refreshToken)
                })
                .catch((err) => {
                    console.warn(err)
                })
        }
    } else {
        console.log('no response', err);
    }
});


// OAuth
export const authorize = async (username, password) => {
    return await axios.post('oauth/authorize', {username, password})
}

export const getNewToken = async (refresh_token) => {
    return await axios.post('oauth/refresh', {refresh_token})
}


// Events
export const getEvents = async (params) => {
    return await axios.get('events/list', {...params})
}

export const getEventByTime = async (date, range="month") => {
    return await axios.get('events/timeseries', {
        params: {
            date,
            range
        }
    })
}

export const getEventById = async (id) => {
    return await axios.get(`events/${id}`)
}

import axios from 'axios';

export async function auth(username, password) {
    return await axios.post('oauth/authorize',
        JSON.stringify({username, password})
    );
}

export async function refresh() {
    try {
        const {data} = await oauthRefresh();
        localStorage.setItem('access_token', data.access_token);
        localStorage.setItem('refresh_token', data.refresh_token);
        axios.defaults.headers.Authorization = 'Bearer ' + data.access_token;
        console.info('[OAuth] Token has been refreshed');
        if (data.need_update) window.location.pathname = '/login';
        return data.access_token;
    } catch (e) {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        window.location.reload();
        console.warn('[OAuth] Session Expired!');
    }
}

export async function oauthRefresh() {
    return await axios.post('oauth/refresh',
        JSON.stringify({refresh_token: localStorage.getItem('refresh_token')})
    );
}
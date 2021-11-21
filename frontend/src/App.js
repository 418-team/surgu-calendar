import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom';
import ruLocale from 'moment/locale/ru';

import moment from 'moment';
import axios from 'axios';
import PrivateRoute from './components/PrivateRoute';
import AdminRouter from './components/AdminRouter';
import Auth from './components/Auth';
import { refresh } from './utils/api';


function App() {
    axios.defaults.baseURL = window.location.host.includes('418.one') ? 'https://api.surent.418.one' : 'http://94.41.65.26';
    console.log(axios.defaults.baseURL);
    axios.defaults.headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.access_token
    };
    axios.interceptors.response.use(
        function (response) {
            return response;
        },
        async function (error) {
            const status = error.response ? error.response.status : null;
            const message = error.response?.data?.message || error.response?.statusText || 'Неизвестная ошибка';

            const errorMessage = error.response?.data?.error;
            if (status === 403 && errorMessage !== 'incorrect_login_or_password' && errorMessage !== 'not_enough_scopes') {
                const accessToken = await refresh(error);
                error.response.config.headers['Authorization'] = 'Bearer ' + accessToken;
                return axios(error.response.config);
            } else if (status === 401) {
                localStorage.removeItem('access_token');
                localStorage.removeItem('refresh_token');
                window.location.reload();
                console.log('Session Expired!');
                return;
            } else {
                if (status !== 404) {
                    console.error('AXIOS Global Error', {status, message});
                }
            }

            return Promise.reject(error);
        }
    );
    moment.locale('ru', [ruLocale]);

    return (
        <div className="App">
            <header className="App-header">
            </header>
            <Router>
                <Switch>
                    <Route exact path={'/login'} component={Auth}/>
                    <PrivateRoute path={'/'} component={AdminRouter}/>
                </Switch>
            </Router>
        </div>
    );
}

export default App;

import React, { useState } from 'react';
import { auth } from '../../utils/api';
import { useHistory } from 'react-router-dom';

import './styles.css'

const Auth = () => {
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const submit = () => {
        auth(email, password)
            .then(r => {
                console.log('auth', r);
                localStorage.setItem('refresh_token', r.data.refresh_token);
                localStorage.setItem('access_token', r.data.access_token);
                history.push('/');
            })
            .catch(err => {
                console.error('auth', err);
                setError(err.response?.data?.message || 'Произошла ошибка');
            });
    };

    return (
        <div className="auth_container">
            <div className="auth_title">Авторизация</div>
            {error && <b>{error}</b>}
            <input type="text" placeholder="Email" onChange={(e) => (setEmail(e.currentTarget.value))}/>
            <input type="password" placeholder="Пароль" onChange={(e) => (setPassword(e.currentTarget.value))}/>
            <button onClick={submit}>Авторизоваться</button>
        </div>
    );
};

export default Auth;
import { useState, useRef, useEffect, useCallback } from 'react';
import Header from '../Preview/Header';
import { Redirect } from 'react-router-dom';
import '../Admin.css';
import axios from 'axios';
import { useStateCallback } from '../../../utils/hooks';

import AddItem from '../Preview/DynamicEditing/AddItem';

const Group = ({match}) => {
    const id = match.params.id;
    const [data, setData] = useStateCallback(null);
    const [users, setUsers] = useState([]);

    const getUsers = async () => {
        return (await axios.get('/users/list')).data.rows;
    };

    useEffect(() => {
        axios.get(`/groups/${id}`)
            .then((res) => {
                setData(res.data.group);
            }).catch((e) => {
            console.log(e);
        });
        getUsers().then((res) => {
            setUsers(res);
        });
    }, [id]);

    const addItem = (item) => {
        axios.post(`groups/${id}/users/${item.id}`).then(() => {
            axios.get(`/groups/${id}`)
                .then((res) => {
                    setData(res.data.group);
                }).catch((e) => {
                console.log(e);
            });
        });
    };

    return !id ? <Redirect to={'/admin'}/> : data && (
        <div>
            <Header name={data.title} type={'header'}/>
            <Header name={data.description} type={'label'}/>
            {data.users.map((user) => (
                <div>{user.first_name} {user.last_name}</div>
            ))}
            <AddItem addItem={addItem} label={'Добавить нового пользователя'} items={users} type={'user'}/>
        </div>
    );
};

export default Group;
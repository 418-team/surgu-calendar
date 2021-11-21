import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';
import Header from '../Preview/Header';

const Users = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get('/users/list').then((res) => {
            setData(res.data.rows);
        });
    }, []);

    const history = useHistory();

    const [search, setSearch] = useState('');

    const filteredData = data.filter((i) => `${i.first_name} ${i.last_name}`.toLowerCase().indexOf(search.toLowerCase()) !== -1);

    return (
        <div>
            <h1>Пользователи</h1>
            <div className={'search'}>
                <input type="text" placeholder={'Поиск по названию'}
                       value={search}
                       onChange={(e) => setSearch(e.target.value)}/>
                <div>
                    <button onClick={() => history.push('/admin/adduser')}>
                        Создать пользователя
                    </button>
                </div>
            </div>
            {filteredData.map((item) => (
                <div style={{border: '1px solid black', padding: '20px', marginBottom: '10px'}} key={item.id}>
                    <Header name={`${item.first_name} ${item.last_name}`} type={'header'}/>
                    {item.description}
                </div>
            ))}
        </div>
    );
};

export default Users;
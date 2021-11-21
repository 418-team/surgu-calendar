import { useState, useEffect } from 'react';
import Divider from '../shared/Divider';
import moment from 'moment';
import { Link, useHistory } from 'react-router-dom';
import Header from './Preview/Header';
import axios from 'axios';

const Admin = () => {
    const [data, setData] = useState([]);
    useEffect(() => {
        axios.get('/events/list').then((res) => {
            setData(res.data.rows);
        });
    }, []);

    const history = useHistory();

    const [search, setSearch] = useState('');

    const filteredData = data.filter((i) => i.title.toLowerCase().indexOf(search.toLowerCase()) !== -1);

    return (
        <div>
            <h1>Мероприятия</h1>
            <div className={'search'}>
                <input type="text" placeholder={'Поиск по названию'}
                       value={search}
                       onChange={(e) => setSearch(e.target.value)}/>
                <div>
                    <button onClick={() => history.push('/admin/addevent')}>
                        Создать новое мероприятие
                    </button>
                </div>
            </div>
            {filteredData.map((item) => (
                <div className={'event-card'} key={item.id}>
                    <Link to={`/admin/${item.id}`} style={{color: 'black'}}>
                        <Header name={item.title} type={'header'}/>
                    </Link>
                    {item.description}
                    <div style={{display: 'flex', marginTop: '15px'}}>
                    </div>
                    <Divider/>
                    <p style={{fontSize: '12px'}}>
                        {moment(item.start_date).format('L в H:mm')} - {moment(item.end_date).format('L в H:mm, dddd')}
                        {item?.tags?.map((tag) => (
                            <span style={{
                                background: '#EEF1F9',
                                marginTop: '5px',
                                color: 'black',
                                marginLeft: '10px',
                                fontSize: '12px',
                                padding: '3px 6px',
                                borderRadius: '5px'
                            }}>
                                {tag.title}
                            </span>
                        ))}
                    </p>
                </div>
            ))}
        </div>
    );
};

export default Admin;
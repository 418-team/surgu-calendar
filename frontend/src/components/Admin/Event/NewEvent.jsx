import DateTimePicker from 'react-datetime-picker';
import { useEffect, useState } from 'react';

import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css';
import Header from '../Preview/Header';
import axios from 'axios';
import AddItem from '../Preview/DynamicEditing/AddItem'; // theme css file
import Divider from '../../shared/Divider';

const NewEvent = () => {
    const [data, setData] = useState();
    const [tags, setTags] = useState();
    const [group, setGroup] = useState();
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();

    const onChange = (key, value) => {
        setData((prev) => ({...prev, [key]: value}));
    };

    useEffect(() => {
        axios.get('/tags/list').then((res) => {
            setTags(res.data.rows);
        });
        axios.get('/groups/list').then((res) => {
            setGroup(res.data.rows);
        });
    }, []);

    const onAddGroup = (item) => {
        setData((prev) => {
            const data = {...prev};
            if (data.groups) {
                if (!data.groups.includes(item.id)) data.groups.push(item.id);
            } else {
                data.groups = [item.id];
            }
            return data;
        });
    };

    const onSave = () => {
        const _data = {...data, start_date: startDate, end_date: endDate};
        axios.post('/events/create', {
            ..._data
        });
    };

    const onAddTag = (item) => {
        setData((prev) => {
            const data = {...prev};
            if (data.tags) {
                if (!data.tags.includes(item.id)) data.tags.push(item.id);
            } else {
                data.tags = [item.id];
            }
            return data;
        });
    };

    const findGroup = (id) => {
        const item = group?.find((gr) => gr.id === id);
        return item && <div>{item.title}</div>;
    };

    const findTags = (id) => {
        const item = tags?.find((gr) => gr.id === id);
        return item && <div>{item.title}</div>;
    };

    return (
        <div style={{display: 'flex', flexDirection: 'column'}} className={'createNewEvent'}>
            <Header name={'Создать новое мероприятие'} type={'header'}/>
            <input type="text" value={data?.title || ''} placeholder={'Название'}
                   onChange={(e) => onChange('title', e.target.value)}/>
            <input type="text" value={data?.description || ''} placeholder={'Описание'}
                   onChange={(e) => onChange('description', e.target.value)}/>
            <DateTimePicker
                value={startDate}
                onChange={(data) => setStartDate(data)}
                dayPlaceholder={'ДД'}
                monthPlaceholder={'ММ'}
                yearPlaceholder={'ГГ'}
                minutePlaceholder={'ММ'}
                hourPlaceholder={'ЧЧ'}
            />
            <DateTimePicker
                value={endDate}
                onChange={(data) => setEndDate(data)}
                dayPlaceholder={'ДД'}
                monthPlaceholder={'ММ'}
                yearPlaceholder={'ГГ'}
                minutePlaceholder={'ММ'}
                hourPlaceholder={'ЧЧ'}
            />
            {group && <AddItem label={'Добавить группу'} addItem={onAddGroup} items={group} field={'title'}/>}
            <div style={{marginTop: '10px', width: '300px'}}>
                {data?.groups?.map((grp) =>
                    <>
                        {findGroup(grp)}
                        <Divider/>
                    </>
                )}
            </div>
            {tags && <AddItem label={'Добавить Теги'} addItem={onAddTag} items={tags} field={'title'}/>}
            <div style={{marginTop: '10px', width: '300px'}}>
                {data?.tags?.map((grp) =>
                    <>
                        {findTags(grp)}
                        <Divider/>
                    </>
                )}
            </div>
            <button onClick={onSave}>Создать</button>
        </div>
    );
};

export default NewEvent;
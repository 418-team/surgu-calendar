import { useState, useRef, useEffect, useCallback } from 'react';
import Preview from './Preview/Preview';
import { DynamicEditing } from './Preview/DynamicEditing';
import  {Redirect} from 'react-router-dom';
import "./Admin.css"
import axios from 'axios';

function debounce(func, wait, immediate) {
    let timeout;
    return function() {
        const context = this, args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        }, wait);
        if (immediate && !timeout) func.apply(context, args);
    };
}

const useStateCallback = (initialState) => {
    const [state, setState] = useState(initialState);
    const cbRef = useRef(null); // init mutable ref container for callbacks
    const setStateCallback = useCallback((_state, cb) => {
        cbRef.current = cb;
        setState(_state);
    }, []);

    useEffect(() => {
        if (cbRef.current) {
            cbRef.current(state);
            cbRef.current = null;
        }
    }, [state]);
    return [state, setStateCallback];
}


const Event = ({match}) => {
    const id = match.params.id
    const [data, setData] = useStateCallback({})

    useEffect(() => {
            axios.get(`/events/${id}`).then((res) => {
                const data = {...res.data.event, data: JSON.parse(res.data.event?.data || "[]")}
                setData(data)
            })
    }, [id])

    const set = (value) => {
        setData(value)
    }

    const applyChanges = () => {
        axios.put(`/events/${id}`, {
            ...data,
            data: JSON.stringify(data.data || [])
        }).then(() => {
            axios.get(`/events/${id}`).then((res) => {
                const data = {...res.data.event, data: JSON.parse(res?.data.event?.data || "[]")}
                setData(data)
            })
        })
    }

    return !data ? <Redirect to={"/admin"}/> : (
        <div>
            <DynamicEditing data={data} setData={set} onSave={applyChanges}/>
            <Preview data={data}/>
        </div>
    )
}

export default Event
import { useState, useRef, useEffect, useCallback } from 'react';
import Preview from '../Preview/Preview';
import { DynamicEditing } from '../Preview/DynamicEditing';
import  {Redirect} from 'react-router-dom';
import "../Admin.css"
import axios from 'axios';
import {makeIcsFile} from "../../shared/ICal"



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
            {data?.start_date &&
                <button
                    onClick={() =>
                        makeIcsFile({start: data?.start_date, end: data.end_date}, data.title, data.description)}
                >
                    Загрузить в календарь
                </button>
            }
        </div>
    )
}

export default Event
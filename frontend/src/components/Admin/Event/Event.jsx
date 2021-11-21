import { useEffect } from 'react';
import Preview from '../Preview/Preview';
import { DynamicEditing } from '../Preview/DynamicEditing';
import  {Redirect} from 'react-router-dom';
import "../Admin.css"
import axios from 'axios';
import {makeIcsFile} from "../../shared/ICal"
import { useStateCallback } from "../../../utils/hooks";

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
                    style={{ padding: "10px", background: "black", color: "white", border: "none", marginTop: "10px" }}
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
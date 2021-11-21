import { useEffect, useState } from 'react';
import Preview from '../Preview/Preview';
import { DynamicEditing } from '../Preview/DynamicEditing';
import  {Redirect} from 'react-router-dom';
import "../Admin.css"
import axios from 'axios';
import { useStateCallback } from "../../../utils/hooks";

const Event = ({match}) => {
    const id = match.params.id
    const [tags, setTags] = useState()
    const [groups, setGroups] = useState()
    const [data, setData] = useStateCallback({})

    useEffect(() => {
        axios.get(`/events/${id}`).then((res) => {
            const data = {...res.data.event, data: JSON.parse(res.data.event?.data || "[]")}
            setData(data)
        })
        axios.get("/tags/list").then((res) => {
            setTags(res.data.rows)
        })
        axios.get("/groups/list").then((res) => {
            setGroups(res.data.rows)
        })
    }, [id])

    const set = (value) => {
        setData(value)
    }

    const applyChanges = () => {
        const _data = {...data}
        _data.tags = _data.tags.map((tag) => tag.id)
        _data.groups = _data.groups.map((group) => group.id)
        axios.put(`/events/${id}`, {
            ..._data,
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
            <DynamicEditing data={data} setData={set} groups={groups} tags={tags} onSave={applyChanges}/>
            <Preview data={data}/>
        </div>
    )
}

export default Event
import { useState } from 'react';
import Header from '../Preview/Header';
import {useHistory} from 'react-router-dom';
import axios from 'axios';

const NewGroup = () => {
    const history = useHistory()
    const [data, setData] = useState()

    const onChange = (key, value) => {
        setData((prev) => ({ ...prev,  [key]: value }))
    }

    const onSave = () => {
        axios.post("/groups/create", {
            ...data
        }).then((res) => {
            history.push(`/group/${res.data.id}`)
        })
    }

    return (
        <div style={{ display: "flex", flexDirection: "column" }} className={"createNewEvent"}>
            <Header name={"Создать новую группу"} type={"header"}/>
            <input type="text" value={data?.title || ""} placeholder={"Название"} onChange={(e) => onChange("title", e.target.value)}/>
            <input type="text" value={data?.description || ""} placeholder={"Описание"}  onChange={(e) => onChange("description", e.target.value)}/>
            <div style={{textAlign: "right", marginTop: "20px"}}>
                <button style={{background: "black", color: "white", padding: "10px", border: "none"}} onClick={onSave}>Сохранить</button>
            </div>
        </div>
    )
}

export default NewGroup
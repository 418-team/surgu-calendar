import { useState } from 'react';
import Header from '../Preview/Header';
import {useHistory} from 'react-router-dom';
import axios from 'axios';

const NewUser = () => {
    const history = useHistory()
    const [data, setData] = useState()

    const onChange = (key, value) => {
        setData((prev) => ({ ...prev,  [key]: value }))
    }

    const onSave = () => {
        const _data = {...data}
        _data["is_admin"] = _data["is_admin"] ? 1 : 0
        axios.post("/users/create", {
            ..._data
        }).then((res) => {
            history.push(`/admin/users`)
        })
    }

    return (
        <div style={{ display: "flex", flexDirection: "column" }} className={"createNewEvent"}>
            <Header name={"Создать новую группу"} type={"header"}/>
            <input className={"field"} type="text" value={data?.first_name || ""} required placeholder={"Имя"} onChange={(e) => onChange("first_name", e.target.value)}/>
            <input className={"field"} type="text" value={data?.last_name || ""} required placeholder={"Фамилия"} onChange={(e) => onChange("last_name", e.target.value)}/>
            <input className={"field"} type="text" value={data?.patronymic || ""} placeholder={"Отчество"} onChange={(e) => onChange("patronymic", e.target.value)}/>
            <input className={"field"} type="email" value={data?.email || ""} required placeholder={"email"} onChange={(e) => onChange("email", e.target.value)}/>
            <input className={"field"} type="password" value={data?.password || ""} required placeholder={"password"} onChange={(e) => onChange("password", e.target.value)}/>
            <input className={"field"} type="text" value={data?.avatar_url || ""} placeholder={"avatar_url"} onChange={(e) => onChange("avatar_url", e.target.value)}/>
            Администатор <input type="checkbox" value={data?.is_admin || false} placeholder={"Это админ"} onChange={(e) => onChange("is_admin", e.target.value)}/>
            <div style={{textAlign: "right", marginTop: "20px"}}>
                <button style={{background: "black", color: "white", padding: "10px", border: "none"}} onClick={onSave}>Сохранить</button>
            </div>
        </div>
    )
}

export default NewUser
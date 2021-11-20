import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useHistory, } from 'react-router-dom';
import Header from '../Preview/Header';

const Tags = () => {
    const [data, setData] = useState([])
    const [editable, setEditable] = useState(null)

    useEffect(() => {
        axios.get("/tags/list").then((res) => {
            setData(res.data.rows)
        })
    }, [])

    const history = useHistory()

    const editField = (value) => {
        setEditable((prev) => {
            const data = {...prev}
            data.title = value
            return data
        })
    }

    const onSave = () => {
        axios.put(`/tags/${editable.id}`, {
            ...editable
        }).then(() => {
            axios.get("/tags/list").then((res) => {
                setData(res.data.rows)
            })
        }).then(() => {
            setEditable(null)
        })
    }


    const [search, setSearch] = useState("")

    const filteredData = data.filter((i) => i.title.toLowerCase().indexOf(search.toLowerCase()) !== -1)

    return (
        <div>
            <div style={{ marginBottom: "10px", display: "flex" }}>
                <input type="text" placeholder={"Поиск по названию"}
                       value={search}
                       style={{width: "calc(100% - 24px)", padding: "10px"}}
                       onChange={(e) => setSearch(e.target.value)}/>
                <div>
                    <button style={{background: "black", color: "white", padding: "12px 10px", border: "none", width: "200px"}} onClick={() => history.push("/admin/addteg")}>
                        Создать новый тег
                    </button>
                </div>
            </div>
            {filteredData?.map((item) => (
                    <div
                       style={{border: "1px solid black", padding: "20px", marginBottom: "10px"}}
                       key={item.id}
                       onClick={() => item.id !== editable?.id && setEditable(editable?.id ? null : item)}
                    >
                        {editable?.id === item.id ?
                            <div>
                                <input
                                    type="text"
                                    placeholder={"Название тега"}
                                    value={editable.title}
                                    onChange={(e) => editField(e.target.value)}
                                />
                                <button onClick={onSave}>Сохранить</button>
                                <button onClick={() => setEditable(null)}>Отменить</button>
                            </div>
                            :<Header name={item.title} type={"header"}/>
                        }
                    </div>
               ))}
        </div>
    )
}

export default Tags
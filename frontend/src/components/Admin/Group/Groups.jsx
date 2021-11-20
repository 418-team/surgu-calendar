import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useHistory, } from 'react-router-dom';
import Header from '../Preview/Header';

const Groups = () => {
    const [data, setData] = useState([])

    useEffect(() => {
        axios.get("/groups/list").then((res) => {
            setData(res.data.rows)
            console.log(res)
        })
    }, [])

    const history = useHistory()

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
                    <button style={{background: "black", color: "white", padding: "12px 10px", border: "none", width: "200px"}} onClick={() => history.push("/admin/addgroup")}>
                        Создать новую группу
                    </button>
                </div>
            </div>
            {filteredData.map((item) => (
                <div style={{border: "1px solid black", padding: "20px", marginBottom: "10px" }} key={item.id}>
                    <Link to={`/admin/group/${item.id}`} style={{ color: "black" }}>
                        <Header name={item.title} type={"header"}/>
                    </Link>
                    {item.description}
                </div>
            ))}
        </div>
    )
}

export default Groups
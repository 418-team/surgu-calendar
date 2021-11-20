import {useState, useEffect} from 'react';
import Divider from '../shared/Divider';
import moment from 'moment';
import {Link} from 'react-router-dom';
import Header from './Preview/Header';
import axios from "axios";

const Admin = () => {
    const [data, setData] = useState([])
    useEffect(() => {
        axios.get("/events/list").then((res) => {
            setData(res.data.rows)
        })
    }, [])


    const [search, setSearch] = useState("")

    const filteredData = data.filter((i) => i.title.toLowerCase().indexOf(search.toLowerCase()) !== -1)

    return (
        <div style={{ padding: "40px 100px 0px"}}>
            <div style={{ marginBottom: "10px" }}>
                <input type="text" placeholder={"Введите название"}
                       value={search}
                       style={{width: "calc(100% - 24px)", padding: "10px"}}
                       onChange={(e) => setSearch(e.target.value)}/>
            </div>
            {filteredData.map((item) => (
                <div style={{border: "1px solid black", padding: "20px", marginBottom: "10px" }} key={item.id}>
                    <Link to={`/admin/${item.id}`} style={{ color: "black" }}>
                        <Header name={item.title} type={"header"}/>
                    </Link>
                    {item.description}
                    <div style={{ display: "flex" }}>
                    {item?.tags?.map((tag) => (
                        <div style={{ background: "black", marginTop:"5px", color: "white", marginRight: "10px", fontSize: "12px", padding: "3px 6px", borderRadius: "5px" }}>
                            {tag.title}
                        </div>
                    ))}
                    </div>
                    <Divider/>
                    <p style={{ fontSize: "12px" }}>{moment(item.start_date).format("L в H:mm")} - {moment(item.end_date).format("L в H:mm, dddd")}</p>
                </div>
            ))}
        </div>
    )
}

export default Admin
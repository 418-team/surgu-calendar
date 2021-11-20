import initialData from "../Home/mockFile.json"
import {useState} from 'react';
import Divider from '../shared/Divider';
import moment from 'moment';
import {Link} from 'react-router-dom';

const Admin = () => {
    const [data, setData] = useState(initialData)
    const [search, setSearch] = useState("")
    const getFirstItem = (item) => {
        const firstText = item.template.find((i) => i.type === "text")
        return (
            <div>
                {firstText.value}
            </div>
        )
    }

    const filteredData = data.filter((i) => i.name.toLowerCase().indexOf(search.toLowerCase()) !== -1)

    return (
        <div style={{ padding: "10px 100px"}}>
            <div>
                <input type="text" placeholder={"Введите название"}
                       value={search}
                       onChange={(e) => setSearch(e.target.value)}/>
            </div>
            {filteredData.map((item) => (
                <div style={{border: "1px solid black", padding: "30px", marginBottom: "10px" }}>
                    <Link to={`/admin/${item.id}`} style={{ color: "black" }}>{item.name}</Link>
                    <Divider/>
                    {getFirstItem(item)}
                    <Divider/>
                    <p>{moment(item.start_date).format("L в H:mm")} - {moment(item.end_date).format("L в H:mm, dddd")}</p>
                </div>
            ))}
        </div>
    )
}

export default Admin
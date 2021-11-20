import Divider from '../../../shared/Divider';
import RenderItemEdit from './RenderItemEdit';
import Header from '../Header';
import AddItem from './AddItem';

function uid() {
    const a = new Uint32Array(3);
    window.crypto.getRandomValues(a);
    return (
        performance.now().toString(36) +
        Array.from(a)
            .map((A) => A.toString(36))
            .join("")
    ).replace(/\./g, "");
}

const DynamicEditing = ({data, setData, onSave}) => {
    const onEdit = (id, value) => {
        setData((prev) => {
            const data = {...prev}
            const item = data.data.find((i) => i.id === id)
            item.value = value
            return data
        })
    }

    const addItem = (type) => {
        setData((prev) => {
            const data = {...prev}
            if (!data.data){
                data.data = []
            }
            data?.data?.push({
                id: uid(),
                type,
                value: ""
            })
            return data
        })
    }

    const changeEventName = (value) => {
        setData((prev) => {
            const data = {...prev}
            data.title = value
            return data
        })
    }

    const changeEventDescription = (value) => {
        setData((prev) => {
            const data = {...prev}
            data.description = value
            return data
        })
    }

    return (
        <>
            <div style={{ display: "flex", flexDirection: "column", padding: "10px 100px" }}>
                <Header name={"Редактирование"} type={"header"}  style={{ fontSize: "28px" }}/>
                <div className={"edit-table"}>
                    <input type="text"
                           value={data.title}
                           className={"field"}
                           style={{ marginBottom: "10px" }}
                           onChange={(e) => changeEventName(e.target.value) }
                    />
                    <input type="text"
                           value={data.description}
                           className={"field"}
                           style={{ marginBottom: "10px" }}
                           onChange={(e) => changeEventDescription(e.target.value)}
                    />
                {data.data?.map((i) => (
                    <RenderItemEdit item={i} onEdit={onEdit}/>
                 ))}
                </div>
                <AddItem addItem={addItem}/>
                <div style={{textAlign: "right", marginTop: "20px"}}>
                    <button style={{background: "black", color: "white", padding: "10px", border: "none"}} onClick={onSave}>Сохранить</button>
                </div>
            </div>
            <Divider/>
        </>
    )
}

export default DynamicEditing
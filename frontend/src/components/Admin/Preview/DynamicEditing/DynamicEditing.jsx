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

const DynamicEditing = ({data, setData}) => {

    const onEdit = (id, value) => {
        setData((prev) => {
            const data = {...prev}
            const item = data.template.find((i) => i.id === id)
            item.value = value
            return data
        })
    }

    const addItem = (type) => {
        setData((prev) => {
            const data = {...prev}
            data.template.push({
                id: uid(),
                type,
                value: ""
            })
            return data
        })
    }

    return (
        <>
            <div style={{ display: "flex", flexDirection: "column", padding: "10px 100px" }}>
                <Header name={"Редактирование"} type={"header"}/>
                <div className={"edit-table"}>
                {data.template.map((i) => (
                    <RenderItemEdit item={i} onEdit={onEdit}/>
                 ))}
                </div>
                <AddItem addItem={addItem}/>
            </div>
            <Divider/>
        </>
    )
}

export default DynamicEditing
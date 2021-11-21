import Divider from '../../../shared/Divider';
import RenderItemEdit from './RenderItemEdit';
import Header from '../Header';
import AddItem from './AddItem';
import axios from 'axios';

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

const DynamicEditing = ({data, setData, groups, tags, onSave}) => {
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

    const findGroup = (id) => {
        const item = groups?.find((gr) => gr.id === id)
        return item && <div className={"tag"}>{item.title}</div>
    }

    const findTags = (id) => {
        const item = tags?.find((gr) => gr.id === id)
        return item && <div className={"tag"}>{item.title}</div>
    }

    const onAddGroup = (item) => {
        setData((prev) => {
            const data = {...prev}
            if (data.groups) {
                if (!data.groups.includes(item.id)) data.groups.push(item)
            } else {
                data.groups = [item]
            }
            return data
        })
    }

    const onAddTag = (item) => {
        setData((prev) => {
            const data = {...prev}
            if (data.tags) {
                if (!data.tags.includes(item.id)) data.tags.push(item)
            } else {
                data.tags = [item]
            }
            return data
        })
    }

    const list = ["header", "label", "text", "image"]

    return (
        <>
            <div style={{ display: "flex", flexDirection: "column" }}>
                <Header name={"Редактирование"} type={"header"}  style={{ fontSize: "28px" }}/>
                <div className={"edit-table"}>
                    <RenderItemEdit item={{type: 'header', value: data.title}} onEdit={onEdit} />
                    <RenderItemEdit item={{type: 'label', value: data.description}} onEdit={onEdit} />
                {data.data?.map((i) => (
                    <RenderItemEdit item={i} onEdit={onEdit}/>
                 ))}
                </div>
                <AddItem addItem={addItem} label={"Добавить новое поле"} items={list}/>
                <div style={{ marginTop: "20px", display: "flex" }}>
                    {data?.groups?.map((grp) => findGroup(grp.id))}
                </div>
                {groups && <AddItem label={"Добавить группу"} addItem={onAddGroup} items={groups} field={"title"}/>}
                <div style={{ marginTop: "20px", display: "flex" }}>
                    {data?.tags?.map((grp) => findTags(grp.id))}
                </div>
                {tags && <AddItem label={"Добавить Теги"} addItem={onAddTag} items={tags} field={"title"}/>}
                <div style={{textAlign: "right", marginTop: "20px"}}>
                    <button style={{background: "black", color: "white", padding: "10px", border: "none"}} onClick={onSave}>Сохранить</button>
                </div>
            </div>
            <Divider/>
        </>
    )
}

export default DynamicEditing
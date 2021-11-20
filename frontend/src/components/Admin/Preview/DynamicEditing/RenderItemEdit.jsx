import TextareaAutosize from 'react-textarea-autosize';

const RenderItemEdit = ({item, onEdit}) => {
    if (item.type === "header"){
        return(
            <div>
                <input
                className={"field"}

                        type="text"
                        value={item.value}
                        onChange={(e) => onEdit(item.id, e.target.value)}
                />
                <p className="field-label">Заголовок</p>
            </div>
        )
    }else if (item.type === "label"){
        return (
            <div>
                <input
                    className={"field"}
                    type="text"
                    value={item.value}
                    onChange={(e) => onEdit(item.id, e.target.value)}
                />
                <p className="field-label">Подзаголовок</p>
            </div>
        )
    } else if (item.type === "text") {
        return (
            <div>
                <TextareaAutosize className={"field"} value={item.value} onChange={(e) => onEdit(item.id, e.target.value)} />
                <p className="field-label">Текст</p>
            </div>
        )
    }
    else {
        return ""
    }
}

export default RenderItemEdit
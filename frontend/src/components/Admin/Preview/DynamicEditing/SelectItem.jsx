const SelectItem = ({item, handleChecked, type, field}) => {
    let label
    if (field) {
        label = item[field]
    } else {
        if (type === "user") {
            label = `${item.first_name} ${item.last_name}`
        } else {
            label = item
        }
    }
    return <div
            className="select-item"
            onClick={() => handleChecked()}
            aria-hidden="true"
        >
            <div className="text">
                {label}
            </div>
        </div>
};

export default SelectItem;
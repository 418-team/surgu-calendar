const SelectItem = ({item, handleChecked,}) => {
    return <div
            className="select-item"
            onClick={() => handleChecked()}
            aria-hidden="true"
        >
            <div className="text">
                {item}
            </div>
        </div>
};

export default SelectItem;
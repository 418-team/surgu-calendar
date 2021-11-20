import {useState, useEffect, useRef} from 'react';
import SelectItem from './SelectItem';


const useClickOutside = (ref, callback) => {
    useEffect(() => {
        function handleClickOutside(event) {
            if (ref?.current && !ref.current.contains(event.target)) {
                callback();
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref]);
}

const AddItem = ({addItem, items, type, label, field}) => {
    const list = ["header", "label", "text", "image"]
    const wrapperRef = useRef(null);
    useClickOutside(wrapperRef, () => {
        setOpen(false);
    });
    const [open, setOpen] = useState(false)
    return <div className="items-wrapper" ref={wrapperRef}>
        <div
            className="type-select"
            onClick={() => setOpen((s) => !s)}
            aria-hidden="true"
        >
            <span className="label">{label}</span>
        </div>
            <div className={open ? "items" : "items hide"}>
                {items.map((element) => (
                    <SelectItem
                        key={JSON.stringify(element)}
                        field={field}
                        type={type}
                        item={element}
                        handleChecked={() => {
                            addItem(element)
                            setOpen(false)
                        }}
                    />
                ))}
            </div>
    </div>
}

export default AddItem
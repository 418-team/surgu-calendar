import initialData from "../Home/mockFile.json"
import { useState, useRef, useEffect, useCallback } from 'react';
import LogArea from './LogArea';
import Preview from './Preview/Preview';
import { DynamicEditing } from './Preview/DynamicEditing';
import  {Redirect} from 'react-router-dom';
import "./Admin.css"

const useStateCallback = (initialState) => {
    const [state, setState] = useState(initialState);
    const cbRef = useRef(null); // init mutable ref container for callbacks
    const setStateCallback = useCallback((_state, cb) => {
        cbRef.current = cb;
        setState(_state);
    }, []);

    useEffect(() => {
        if (cbRef.current) {
            cbRef.current(state);
            cbRef.current = null;
        }
    }, [state]);
    return [state, setStateCallback];
}

function safeJsonParse(str) {
    try {
        return [null, JSON.parse(str)];
    } catch (err) {
        return [err];
    }
}

const Event = ({match}) => {
    const id = match.params.id
    console.log(id)
    console.log(initialData)
    const item = initialData?.find((i) => i.id === parseInt(id))
    const [data, setData] = useStateCallback(item || null)
    const [text, setText] = useState(JSON.stringify(data, null, 2))


    const changeText = (value) => setText(value)

    const handleJson = () => {
        const [err, result] = safeJsonParse(text);
        if (err) {
            return false;
        }
        setData(result);
        return true;
    };

    const set = (value) => {
        setData(value, (currentData) => {
            console.log(currentData)
        })
    }

    return !item ? <Redirect to={"/admin"}/> : (
        <div>
            <DynamicEditing data={data} setData={set}/>
            <Preview data={data}/>
            <LogArea text={text} changeText={changeText} handleJson={handleJson}/>
        </div>
    )
}

export default Event
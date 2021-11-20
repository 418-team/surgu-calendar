import initialData from "../Home/mockFileSolo.json"
import { useState, useRef, useEffect, useCallback } from 'react';
import LogArea from './LogArea';
import Preview from './Preview/Preview';
import Header from "./Preview/Header"
import { DynamicEditing } from './Preview/DynamicEditing';
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

const Event = () => {
    const [data, setData] = useStateCallback(initialData)
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

    return (
        <div>
            <DynamicEditing data={data} setData={set}/>
            <Preview data={data}/>
            <LogArea text={text} changeText={changeText} handleJson={handleJson}/>
        </div>
    )
}

export default Event
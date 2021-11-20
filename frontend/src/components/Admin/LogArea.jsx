const LogArea = ({text, changeText, handleJson}) => {
    return (
        <div>
            <textarea value={text} onChange={(e) => changeText(e.target.value)}/>
            <button onClick={handleJson}>
                Apply
            </button>
        </div>
    )
}


export default LogArea
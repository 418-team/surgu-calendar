import Divider from '../../shared/Divider';

const GetHeader = ({name, type, style, onClick}) => {
    if(type === "eventName") return <h2 style={style} onClick={onClick}>{name}</h2>
    else if (type === "header") return <h3 style={style} onClick={onClick}>{name}</h3>
    else if (type === "label") return <h4 style={style} onClick={onClick}>{name}</h4>
}

const Header = ({name, type, style, onClick=null}) => {
    return (
        <>
            <GetHeader type={type} name={name} style={style} onClick={onClick}/>
            <Divider/>
        </>
    )
}



export default Header
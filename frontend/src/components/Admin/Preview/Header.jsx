import Divider from '../../shared/Divider';

const GetHeader = ({name, type, style}) => {
    if(type === "eventName") return <h2 style={style}>{name}</h2>
    else if (type === "header") return <h3 style={style}>{name}</h3>
    else if (type === "label") return <h4 style={style}>{name}</h4>
}

const Header = ({name, type, style}) => {
    return (
        <>
            <GetHeader type={type} name={name} style={style}/>
            <Divider/>
        </>
    )
}



export default Header
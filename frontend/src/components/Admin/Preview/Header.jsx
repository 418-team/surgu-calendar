import Divider from '../../shared/Divider';

const GetHeader = ({name, type}) => {
    if(type === "eventName") return <h2>{name}</h2>
    else if (type === "header") return <h3>{name}</h3>
    else if (type === "label") return <h4>{name}</h4>
}

const Header = ({name, type}) => {
    return (
        <>
            <GetHeader type={type} name={name}/>
            <Divider/>
        </>
    )
}



export default Header
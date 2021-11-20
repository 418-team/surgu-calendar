import {
    Link
} from "react-router-dom";
import "./header.css"

const Header = () => {
    return <div className={"header-body"}>
        <div className="header">
            <Link to="/">Главная</Link>
            <Link to="/admin">Административная панель</Link>
        </div>
    </div>
}

export default Header
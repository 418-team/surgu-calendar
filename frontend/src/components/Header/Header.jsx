import {
    Link
} from "react-router-dom";
import "./header.css"

const Header = () => {
    return <div className={"header-body"}>
        <div className="header">
            <Link to="/">Главная</Link>
            <Link to="/admin">Административная панель</Link>
            <Link to="/admin/group">Группы</Link>
            <Link to="/admin/tags">Теги</Link>
        </div>
    </div>
}

export default Header
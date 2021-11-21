import {
    Link
} from "react-router-dom";
import "./header.css"

const Header = () => {
    const logout = () => {
        localStorage.clear()
        document.location.reload()

    }
    return <div className={"header-body"}>
        <div className="header">
            <Link to="/">Главная</Link>
            <Link to="/admin">Административная панель</Link>
            <Link to="/admin/group">Группы</Link>
            <Link to="/admin/tags">Теги</Link>
            <button onClick={() => logout()}>Выйти</button>
        </div>
    </div>
}

export default Header
import {
    Link
} from "react-router-dom";
import {IoHome, IoPerson, IoPeople, IoPricetagSharp, IoExit} from "react-icons/io5";

import "./header.css"

const iconSize = 20

const Header = () => {
    const logout = () => {
        localStorage.clear()
        document.location.reload()

    }
    return (
        <div className="header">
            <div className="header_logo">
                <p>SUR</p>
                <p>ENT</p>
            </div>
            <Link to="/"><IoHome fontSize={iconSize} color={"black"} /></Link>
            <Link to="/admin"><IoPerson fontSize={iconSize} color={"black"} /></Link>
            <Link to="/admin/group"><IoPeople fontSize={iconSize} color={"black"} /></Link>
            <Link to="/admin/tags"><IoPricetagSharp fontSize={iconSize} color={"black"} /></Link>
            <button onClick={logout}><IoExit fontSize={iconSize} color={"black"} /></button>
        </div>
    )
}

export default Header
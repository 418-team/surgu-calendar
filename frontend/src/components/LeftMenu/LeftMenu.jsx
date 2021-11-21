import {
    Link
} from "react-router-dom";
import { IoHomeSharp, IoPerson, IoPeople, IoPricetagSharp, IoExit, IoCalendar } from 'react-icons/io5';
import {RiTeamFill} from 'react-icons/all';

import "./left_menu.css"

const iconSize = 20

const LeftMenu = () => {
    const logout = () => {
        localStorage.clear()
        document.location.reload()

    }
    return (
        <div className="left_menu">
            <div className="left_menu_logo">
                <p>SUR</p>
                <p>ENT</p>
            </div>
            <Link to="/"><IoHomeSharp fontSize={iconSize} color={"black"} /></Link>
            <Link to="/admin"><IoCalendar fontSize={iconSize} color={"black"} /></Link>
            <Link to="/admin/group"><RiTeamFill fontSize={iconSize} color={"black"} /></Link>
            <Link to="/admin/tags"><IoPricetagSharp fontSize={iconSize} color={"black"} /></Link>
            <Link to="/admin/users"><IoPeople fontSize={iconSize} color={"black"} /></Link>
            <button onClick={logout}><IoExit fontSize={iconSize} color={"black"} /></button>
        </div>
    )
}

export default LeftMenu
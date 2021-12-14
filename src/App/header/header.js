import './header.scss';
import { NavLink } from 'react-router-dom';

const Header = () => {
    return (
        <header>
            <div className="nav">
                <NavLink exact='true' to='/' activeclassname='active'>Конвертер</NavLink>
                <NavLink to='search' activeclassname='active'>Найти валюту</NavLink>
            </div>
        </header>
    )
}

export default Header;
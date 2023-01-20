import { Link } from "react-router-dom";

import classes from './NavBar.module.css';

const NavBar = () => {

    return(
            <nav className={classes["nav"]}>
                <ul className={classes["list"]}>  
                    <li className={classes["link"]}>
                        <Link to="/courses">Våra kurser</Link>
                    </li>
                    <li className={classes["link"]}>
                        <Link to="/admin">Admin</Link>
                    </li>
                    <li className={classes["link"]}>
                        <Link>Logga in</Link>
                    </li>
                </ul>
            </nav>
    )
};

export default NavBar;
import { Link } from "react-router-dom";

const NavBar = () => {

    return(
        <header>
            <h1>
                <Link to="/">WESTCOAST EDUCATION</Link>
            </h1>
            <nav>
                <ul>
                    <li>
                        <Link to="/courses">Våra kurser</Link>
                    </li>
                    <li>
                        <Link to="/admin">Admin</Link>
                    </li>
                </ul>
            </nav>
        </header>
    )
};

export default NavBar;
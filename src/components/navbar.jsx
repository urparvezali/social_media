import { Link } from "react-router-dom";

// eslint-disable-next-line react/prop-types
export default function Navbar({ toggle }) {
    return (
        <nav className="">
            <ul className="nav justify-content-center">
                <li className="nav-item">
                    <Link
                        className="nav-link active"
                        aria-current="page"
                        to="/"
                    >
                        Home
                    </Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/profile">
                        Profile
                    </Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/about">
                        About
                    </Link>
                </li>
                <button className="btn btn-secondary justify-content-right" onClick={()=>{toggle()}}>
                    Dark Mode
                </button>
            </ul>
        </nav>
    );
}

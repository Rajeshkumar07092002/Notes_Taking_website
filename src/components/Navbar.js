
import { React, useEffect, useState } from 'react'
import { Link, useNavigate, useLocation } from "react-router-dom";
const Navbar = () => {
    let navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate("/login");
    }

    // this is to provide active class to current page
    let location = useLocation();
    useEffect(() => {
    }, [location]);

    const [borderLogin, setBorderLogin] = useState(false);
    const handleMouseEnterLogin = () => {
        setBorderLogin(true);
    }
    const handleMouseLeaveLogin = () => {
        setBorderLogin(false);
    }

    const [borderLogout, setBorderLogout] = useState(false);
    const handleMouseEnterLogout = () => {
        setBorderLogout(true);
    }
    const handleMouseLeaveLogout = () => {
        setBorderLogout(false);
    }

    const [borderSignup, setBorderSignup] = useState(false);
    const handleMouseEnterSignup = () => {
        setBorderSignup(true);
    }
    const handleMouseLeaveSignup = () => {
        setBorderSignup(false);
    }

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light " style={{ backgroundColor: "#46143c" }}>
                <div className="container-fluid">
                    <Link className="navbar-brand" style={{ color: "white" }} to="/">Notes Keeper</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link style={{ color: "white" }} className={`nav-link ${location.pathname === '/' ? "active" : ""}`} aria-current="page" to="/">Home</Link>
                            </li>
                        </ul>
                        {!localStorage.getItem('token') ? <form className="d-flex">
                            <Link className="btn" onMouseEnter={handleMouseEnterLogin} onMouseLeave={handleMouseLeaveLogin} style={borderLogin ? { borderBottom: "2px solid #b99650", color: "white" } : { color: "white" }} to="/login" role="button">Login</Link>
                            <Link className="btn" onMouseEnter={handleMouseEnterSignup} onMouseLeave={handleMouseLeaveSignup} style={borderSignup ? { borderBottom: "2px solid #b99650", color: "white" } : { color: "white" }} to="/signup" role="button">Signup</Link>
                        </form> : <button onClick={handleLogout} onMouseEnter={handleMouseEnterLogout} onMouseLeave={handleMouseLeaveLogout} style={borderLogout ? { borderBottom: "2px solid #b99650", color: "white" } : { color: "white" }} className="btn">Logout</button>}
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar

import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const Header = () => {
    const { logOut, isLogin, currentUser } = useAuth();
    console.log(currentUser);
    return (
        <header>
            <nav className="navbar navbar-expand-lg fixed-top header">
                <div className="container-fluid">
                    <h2 className="mb-0 text-dark">
                        <Link to="/">TaskTracker</Link>
                    </h2>

                    <div
                        className="collapse navbar-collapse justify-content-end"
                        id="navbarContent"
                    >
                        <ul className="navbar-nav mb-lg-0">
                            {currentUser.name === "" ? (
                                <li className="nav-item me-4" role="button">
                                    <Link to="/login">login</Link>
                                </li>
                            ) : (
                                <>
                                    <li className="nav-item me-4">
                                        Hi, {currentUser.name}
                                    </li>
                                    <li className="nav-item me-4" role="button">
                                        <Link to="/login" onClick={logOut}>
                                            logout
                                        </Link>
                                    </li>
                                </>
                            )}
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Header;

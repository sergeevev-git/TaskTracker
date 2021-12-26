import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import Loader from "../common/loader";

const Header = () => {
    const { logOut, isLoading, currentUser } = useAuth();
    console.log(currentUser);
    return (
        <header>
            <nav className="navbar navbar-expand-lg fixed-top header">
                <div className="container-fluid">
                    <h2 className="logo">
                        <Link to="/">TaskTracker</Link>
                    </h2>

                    <div
                        className="collapse navbar-collapse justify-content-end"
                        id="navbarContent"
                    >
                        <ul className="navbar-nav mb-lg-0">
                            {/* {currentUser.name === "" ? (
                                <li className="nav-item me-4" role="button">
                                    <Link to="/login">login</Link>
                                </li>
                            ) : isLoading ? (
                                <Loader />
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
                            )} */}
                            {isLoading ? (
                                <li className="nav-item me-4">
                                    <Loader />
                                </li>
                            ) : currentUser.name !== "" ? (
                                <>
                                    <li className="nav-item me-4">
                                        Hi, {currentUser.name}
                                    </li>
                                    <li
                                        className="nav-item me-4 login-text"
                                        role="button"
                                    >
                                        <Link to="/login" onClick={logOut}>
                                            logout
                                        </Link>
                                    </li>
                                </>
                            ) : (
                                <li className="nav-item me-4" role="button">
                                    <Link to="/login">login</Link>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Header;

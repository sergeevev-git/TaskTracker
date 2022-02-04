import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
// import Loader from "../common/loader";

const Header = () => {
    const { isLoading, currentUser } = useAuth();

    return (
        <header>
            <nav className="navbar fixed-top header">
                <div className="container-fluid">
                    <h2 className="logo">
                        <Link to="/">TaskTracker</Link>
                    </h2>

                    {/* {isLoading ? (
                        <div className="nav-item me-4">
                            <Loader />
                        </div>
                    ) :  */}
                    {currentUser ? (
                        <>
                            <div className="d-flex">
                                <div className="me-4">{currentUser.username}</div>
                                <div className="me-2 login-text" role="button">
                                    <Link to="/logout">logout</Link>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="me-4 login-text" role="button">
                            <Link to="/login">login/sign up</Link>
                        </div>
                    )}

                    {/* <ul className="navbar-nav mb-lg-0">
                        {isLoading ? (
                            <li className="nav-item me-4">
                                <Loader />
                            </li>
                        ) : currentUser ? (
                            <>
                                <li className="nav-item me-4">{currentUser.username}</li>
                                <li className="nav-item me-4 login-text" role="button">
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
                    </ul> */}
                </div>
            </nav>
        </header>
    );
};

export default Header;

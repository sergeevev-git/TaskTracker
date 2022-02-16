import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getCurrentUserData, getIsLoggedIn } from "../../store/user";

const Header = () => {
    const isLoggedIn = useSelector(getIsLoggedIn());
    const currentUser = useSelector(getCurrentUserData());

    return (
        <header>
            <nav className="navbar fixed-top header">
                <div className="container-fluid">
                    <h2 className="logo">
                        <Link to="/">TaskTracker</Link>
                    </h2>

                    {isLoggedIn ? (
                        <>
                            <div className="d-flex">
                                <div className="me-4">
                                    {currentUser.username}
                                </div>
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
                </div>
            </nav>
        </header>
    );
};

export default Header;

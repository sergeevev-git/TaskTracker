import React from "react";

const Footer = () => {
    return (
        <footer>
            <nav className="fixed-bottom footer p-3">
                <div className="container d-flex justify-content-center">
                    <span className="me-3">© 2021-2022</span>
                    <a
                        className="text-dark right me-3"
                        href="https://github.com/sergeevev-git/TaskTracker"
                    >
                        <i className="bi bi-github" role="link"></i>
                    </a>
                    <a
                        className="text-dark right me-3"
                        href="https://t.me/sdv_oo"
                    >
                        <i className="bi bi-telegram" role="link"></i>
                    </a>
                </div>
            </nav>
        </footer>
    );
};

export default Footer;

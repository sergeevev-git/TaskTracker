import React from "react";

const Footer = () => {
    return (
        <footer>
            <nav className="fixed-bottom footer">
                <div className="container d-flex justify-content-center">
                    <span className="footer__item">© 2021-2022</span>
                    <a
                        className="text-dark footer__item"
                        href="https://github.com/sergeevev-git/TaskTracker"
                    >
                        <i className="bi bi-github" role="link"></i>
                    </a>
                    <a
                        className="text-dark footer__item"
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

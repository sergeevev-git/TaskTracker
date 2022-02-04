import React from "react";

const Footer = () => {
    return (
        <footer className="footer fixed-bottom p-3">
            <div className="container">
                © 2021 Copyright Text
                <a className="text-dark right" href="#!">
                    More Links
                </a>
                <i className="bi bi-github"></i>
                <i className="bi bi-telegram"></i>
            </div>
        </footer>
    );
};

export default Footer;

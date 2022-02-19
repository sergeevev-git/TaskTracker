import React, { useEffect, useRef, useState } from "react";
import { Collapse as BsCollapse } from "bootstrap";
import PropTypes from "prop-types";
const CollapseWrapper = ({ children, todos }) => {
    const [display, setDisplay] = useState(false);
    const collapseRef = useRef();
    const toggleDisplay = () => {
        setDisplay((prevState) => !prevState);
    };
    useEffect(() => {
        const newCollapse = new BsCollapse(collapseRef.current, {
            toggle: false,
        });
        display ? newCollapse.show() : newCollapse.hide();
    }, [display]);

    return (
        <>
            <div className="d-flex justify-content-between">
                <i
                    className={
                        "bi bi-caret-" + (!display ? "down-fill" : "up-fill")
                    }
                    onClick={toggleDisplay}
                ></i>
                <div className="collapse" ref={collapseRef}>
                    {children}
                </div>
            </div>
        </>
    );
};

CollapseWrapper.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
    ]),
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
    ]),
};

export default CollapseWrapper;

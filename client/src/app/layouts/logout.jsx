import React, { useEffect } from "react";
import { Redirect, useHistory } from "react-router-dom";
import Loader from "../components/common/loader";
import { useAuth } from "../hooks/useAuth";

const LogOut = () => {
    const { logOut } = useAuth();
    useEffect(() => {
        logOut();
    }, []);

    return <Loader />;
};

export default LogOut;

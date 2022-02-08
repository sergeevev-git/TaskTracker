import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import Background from "../components/ui/background";
import { clearTodosStore } from "../store/todos";
import { logOut } from "../store/user";

const LogOut = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(logOut());
        dispatch(clearTodosStore());
    }, []);

    return <Background />;
};

export default LogOut;

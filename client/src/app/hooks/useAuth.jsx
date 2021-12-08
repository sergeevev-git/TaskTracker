import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { setTokens, removeTokens } from "../services/localStorage.service";
import { useHistory } from "react-router";
import httpService from "../services/http.service";
import configFile from "../config/config";
import axios from "axios";

const AuthContext = React.createContext();

const httpRefresh = axios.create({
    baseURL: "http://localhost:3000/api/auth/",
    withCredentiials: true,
});

export const useAuth = () => {
    return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState({
        name: "",
        id: "",
    });
    const [isLogin, setIsLogin] = useState(false);

    const [error, setError] = useState(null);
    const [enterErrors, setEnterErrors] = useState(null);
    const history = useHistory();

    useEffect(() => {
        if (localStorage.getItem(configFile.TOKEN_ACCESS_KEY)) {
            refresh();
        }
    }, []);

    useEffect(() => {
        if (error !== null) {
            toast.error(error);
            setError(null);
        }
    }, [error]);

    useEffect(() => {
        if (enterErrors !== null) {
            enterErrors.map((error) => {
                toast.error(error.msg, { theme: "colored" });
            });
            setEnterErrors(null);
        }
    }, [enterErrors]);

    async function registration({
        username,
        email,
        password,
        confirmPassword,
    }) {
        try {
            const { data } = await httpService.post(
                "auth/registration",
                {
                    username,
                    email,
                    password,
                    confirmPassword,
                }
                // {
                //     headers: {
                //         "Content-Type": "application/json",
                //     },
                // }
            );

            setTokens(data.accessToken);
            logIn({ email: email, password: password });
        } catch (error) {
            errorCatcher(error);
        }
    }

    async function logIn({ email, password }) {
        try {
            const { data } = await httpService.post("auth/login", {
                email,
                password,
            });

            setTokens(data.accessToken);
            setCurrentUser(() => ({
                name: data.userData.name,
                id: data.userData.id,
            }));
            setIsLogin(true);
            history.push("/");
        } catch (error) {
            errorCatcher(error);
        }
    }

    async function logOut() {
        try {
            const { data } = await httpService.post("auth/logOut");

            setCurrentUser(() => ({
                name: "",
                id: "",
            }));
            removeTokens();
            setIsLogin(false);
        } catch (error) {
            errorCatcher(error);
            console.log(error.response);
        }
    }

    async function refresh() {
        try {
            const { data } = await httpRefresh.get("refresh");

            setTokens(data.accessToken);
            setCurrentUser(() => ({
                name: data.userData.name,
                id: data.userData.id,
            }));
            setIsLogin(true);
        } catch (error) {
            errorCatcher(error);
            console.log(error.response);
        }
    }

    function errorCatcher(error) {
        const { message, errors } = error.response.data;
        setError(message);
        if (errors && errors.length !== 0) setEnterErrors(errors);
    }

    return (
        <AuthContext.Provider
            value={{ registration, logIn, logOut, isLogin, currentUser }}
        >
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
    ]),
};

export default AuthProvider;

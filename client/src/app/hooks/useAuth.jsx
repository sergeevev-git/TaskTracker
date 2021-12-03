import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import axios from "axios";
// import userService from "../services/user.service";
import { setTokens, removeTokens } from "../services/localStorage.service";
import { useHistory } from "react-router";

const httpAuth = axios.create({
    baseURL: "api/auth/",
});
const AuthContext = React.createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState("");
    const [isLogin, setIsLogin] = useState(false);
    // const [token, setToken] = useState(null);
    // const [ready, setReady] = useState(false);

    const [error, setError] = useState(null);
    const [enterErrors, setEnterErrors] = useState(null);
    const history = useHistory();

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

    async function signUp({ username, email, password, confirmPassword }) {
        try {
            const { data } = await httpAuth.post(
                "registration",
                {
                    username,
                    email,
                    password,
                    confirmPassword,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            console.log("sungUp data", data);
            setTokens({ ...data.tokens });
            signIn({ email: email, password: password });
            //   await createUser({ _id: data.localId, email });
        } catch (error) {
            errorCatcher(error);
            console.log(error.response);
            // const { code, message } = error.response.data;

            // if (code === 400) {
            //     if (message === "EMAIL_EXISTS") {
            //         const errorObject = {
            //             email: "Пользователь с таким e-mail уже существует",
            //         };
            //         throw errorObject;
            //     }
            // }
        }
    }

    async function signIn({ email, password }) {
        console.log("signIn data", email, password);
        try {
            const { data } = await httpAuth.post("login", {
                email,
                password,
            });
            console.log("signIn", data);
            setTokens({ ...data.tokens });
            setCurrentUser(data.userName);
            setIsLogin(true);
            history.push("/");
        } catch (error) {
            errorCatcher(error);
            console.log(error.response);
            // const { code, message } = error.response.data;

            // if (code === 400) {
            //     switch (message) {
            //         case "INVALID_PASSWORD":
            //             throw new Error("e-mail или password введены неверно");

            //         case "EMAIL_NOT_FOUND":
            //             throw new Error("e-mail или password введены неверно");

            //         default:
            //             throw new Error(
            //                 "Слишком много попыток входа. Попробуйте позднее."
            //             );
            //     }
            // }
        }
    }

    async function signOut() {
        setCurrentUser("");
        removeTokens();
        setIsLogin(false);
    }

    // async function createUser(data) {
    //     try {
    //         const { content } = await userService.create(data);
    //         setCurrentUser(content);
    //     } catch (error) {
    //         errorCatcher(error);
    //     }
    // }

    function errorCatcher(error) {
        const { message, errors } = error.response.data;
        setError(message);
        if (errors && errors.length !== 0) setEnterErrors(errors);
    }

    return (
        <AuthContext.Provider
            value={{ signUp, signIn, signOut, isLogin, currentUser }}
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

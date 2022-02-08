import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import localStorageService, {
    setTokens,
    removeTokens,
} from "../services/localStorage.service";
import { useHistory } from "react-router";
import httpService from "../services/http.service";
import configFile from "../config/config";
import usersService from "../services/user.service";
import Loader from "../components/common/loader";

const AuthContext = React.createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
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

    useEffect(() => {
        if (localStorageService.getAccessToken()) {
            setIsLoading(true);
            getUserData();
        }
        setIsLoading(false);
    }, []);

    async function getUserData() {
        setIsLoading(true);
        try {
            const userData = await usersService.getCurrentUser();
            setCurrentUser(userData);
        } catch (error) {
            errorCatcher(error);
        } finally {
            setIsLoading(false);
        }
    }

    async function registration({ username, email, password, confirmPassword }) {
        try {
            const { data } = await httpService.post("auth/registration", {
                username,
                email,
                password,
                confirmPassword,
            });

            setTokens(data.accessToken, data.userId);
            await getUserData();
            history.push("/");
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

            setTokens(data.accessToken, data.userId);
            await getUserData();
            history.push(
                history.location.state ? history.location.state.from.pathname : "/"
            );
        } catch (error) {
            errorCatcher(error);
        }
    }

    async function logOut() {
        try {
            const { data } = await httpService.post("auth/logOut");
            setCurrentUser(null);
            removeTokens();
            history.push("/");
        } catch (error) {
            errorCatcher(error);
            console.log(error.response);
        }
    }

    // async function refresh() {
    //     setIsLoading(true);
    //     try {
    //         const { data } = await httpService.get("auth/refresh");
    //         console.log("refresh token data:", data);
    //         setTokens(data.accessToken, data.userId);
    //         await getUserData();
    //     } catch (error) {
    //         errorCatcher(error);
    //         console.log(error.response);
    //     } finally {
    //         setIsLoading(false);
    //         history.push(
    //             history.location.state ? history.location.state.from.pathname : "/"
    //         );
    //     }
    // }

    function errorCatcher(error) {
        const { message, errors } = error.response.data;
        setError(message);
        if (errors && errors.length !== 0) setEnterErrors(errors);
    }

    return (
        <AuthContext.Provider
            value={{
                registration,
                logIn,
                logOut,
                isLoading,
                currentUser,
            }}
        >
            {!isLoading ? children : <Loader />}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
};

export default AuthProvider;

import React, { useEffect, useContext } from "react";
import PropTypes from "prop-types";

// import { setTokens, removeTokens } from "../services/localStorage.service";

import httpService from "../services/http.service";

const TodosContext = React.createContext();

export const useTodos = () => {
    return useContext(TodosContext);
};

const TodosProvider = ({ children }) => {
    const [error, setError] = useState(null);
    const [enterErrors, setEnterErrors] = useState(null);

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

    async function getAllUsers() {
        try {
            const { data } = await httpService.get("auth/users");
            console.log("getAllUsers data", data);
        } catch (error) {
            errorCatcher(error);
        }
    }

    function errorCatcher(error) {
        const { message, errors } = error.response.data;
        setError(message);
        if (errors && errors.length !== 0) setEnterErrors(errors);
    }

    return <TodosContext.Provider value={{}}>{children}</TodosContext.Provider>;
};

TodosProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
    ]),
};

export default TodosProvider;

import React, { useState, useEffect } from "react";
import TextField from "../common/form/textField";
import { validator } from "../../utils/validator";
import CheckboxField from "../common/form/checkBoxField";
import { useDispatch } from "react-redux";
import { logIn } from "../../store/user";
import { useHistory } from "react-router-dom";

const LoginForm = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [data, setData] = useState({
        email: "",
        password: "",
        stayOn: false,
    });
    const [errors, setErrors] = useState({});

    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value,
        }));
    };

    const validatorConfig = {
        email: {
            isRequired: {
                message: "Электронная почта обязательна для заполнения",
            },
            isEmail: { message: "Электронная почта введена некорректно" },
        },
        password: {
            isRequired: { message: "Пароль обязателен для заполнения" },
            isCapitalSymbol: {
                message: "Пароль должен содержать заглавные буквы",
            },
            isContainDigit: {
                message: "Пароль должен содержать цифры",
            },
            min: {
                message: "Пароль должен быть минимум 8 символов",
                value: 8,
            },
        },
    };

    useEffect(() => {
        validate();
    }, [data]);

    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const isValid = Object.keys(errors).length === 0;

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;

        console.log(data);
        const redirect = history.location.state
            ? history.location.state.from.pathname
            : "/";
        dispatch(logIn({ data, redirect }));
    };

    return (
        <form onSubmit={handleSubmit}>
            <TextField
                label="e-mail"
                name="email"
                value={data.email}
                onChange={handleChange}
                error={errors.email}
            />
            <TextField
                label="password"
                type="password"
                name="password"
                value={data.password}
                onChange={handleChange}
                error={errors.password}
            />
            <CheckboxField value={data.stayOn} onChange={handleChange} name="stayOn">
                Оставаться в системе
            </CheckboxField>
            {/* {enterError && <p className="text-danger">{enterError}</p>} */}
            <button
                className="btn btn-primary w-100 mx-auto"
                type="submit"
                disabled={!isValid}
            >
                Submit
            </button>
        </form>
    );
};

export default LoginForm;

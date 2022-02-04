import React, { useState, useEffect } from "react";
import TextField from "../common/form/textField";
import { validator } from "../../utils/validator";
import { useAuth } from "../../hooks/useAuth";

const RegisterForm = () => {
    const [data, setData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [errors, setErrors] = useState({});

    const { registration } = useAuth();

    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value,
        }));
    };

    const validatorConfig = {
        username: {
            isRequired: { message: "Имя обязательно для заполнения" },
            min: {
                message: "Имя должно быть минимум 3 символов",
                value: 3,
            },
        },
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
        confirmPassword: {
            compare: {
                message: "Введенные пароли не совпадают",
                value: data.password,
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        try {
            await registration(data);
        } catch (error) {
            console.log("registration error", error);
            setErrors(error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <TextField
                label="name"
                name="username"
                value={data.username}
                onChange={handleChange}
                error={errors.username}
            />
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
            <TextField
                label="confirm password"
                type="password"
                name="confirmPassword"
                value={data.confirmPassword}
                onChange={handleChange}
                error={errors.confirmPassword}
            />
            {/* {enterError && <p className="text-danger">{enterError}</p>} */}
            <button
                className="btn btn-primary w-100 mx-auto mt-4"
                type="submit"
                disabled={!isValid}
                // disabled={!isValid || enterError}
            >
                Submit
            </button>
        </form>
    );
};

export default RegisterForm;

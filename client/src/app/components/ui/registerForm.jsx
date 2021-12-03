import React, { useState, useEffect } from "react";
import TextField from "../common/form/textField";
import { validator } from "../../utils/validator";
import { useAuth } from "../../hooks/useAuth";

const Registerform = () => {
    const [data, setData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [errors, setErrors] = useState({});

    const { signUp } = useAuth();

    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value,
        }));
    };

    const validatorConfig = {
        username: {
            isRequired: { message: "Имя обязательная для заполнение" },
        },
        email: {
            isRequired: {
                message: "Электронная почта обязательна для заполнение",
            },
            isEmail: { message: "Электронная почта введена некорректно" },
        },
        password: {
            isRequired: { message: "пароль обязателен для заполнение" },
            isCapitalSymbol: {
                message: "пароль должен содержать заглавные буквы",
            },
            isContainDigit: {
                message: "пароль должен содержать цифры",
            },
            min: {
                message: "пароль должен быть минимум 8 символов",
                value: 8,
            },
        },
        confirmPassword: {
            compare: {
                message: "введенные пароли не совпадают",
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
        console.log(data);
        try {
            console.log(data);
            await signUp(data);
        } catch (error) {
            console.log("123", error);
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
                className="btn btn-primary w-100 mx-auto"
                type="submit"
                disabled={!isValid}
                // disabled={!isValid || enterError}
            >
                Submit
            </button>
        </form>
    );
};

export default Registerform;

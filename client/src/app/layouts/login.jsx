import React, { useState } from "react";
import { useParams } from "react-router";
import LoginForm from "../components/ui/loginForm";
import Registerform from "../components/ui/registerForm";

const Login = () => {
    const { type } = useParams();
    const [formType, setFormType] = useState(
        type === "register" ? type : "login"
    );

    const toggleFormType = () => {
        setFormType((prev) => (prev === "register" ? "login" : "register"));
    };

    return (
        <>
            <div className="parent">
                <div className="container-fluid">
                    <div className="row ">
                        <div className="col d-flex flex-column coloumn-add-stat"></div>
                        <div className="col d-flex flex-column coloumn-tasks"></div>
                        <div className="col d-flex flex-column coloumn-in-progress"></div>
                        <div className="col d-flex flex-column coloumn-finished"></div>
                        <div className="col-md-4 offset-md-3 shadow p-4 login-form">
                            {formType === "register" ? (
                                <>
                                    <h3 className="mb-4">Register</h3>
                                    <Registerform />
                                    <p className="mt-2">
                                        already have an account?{" "}
                                        <span
                                            className="link-primary"
                                            role="button"
                                            onClick={toggleFormType}
                                        >
                                            Sign in
                                        </span>
                                    </p>
                                </>
                            ) : (
                                <>
                                    <h3 className="mb-4">Login</h3>
                                    <LoginForm />
                                    <p className="mt-2">
                                        don't have an account?{" "}
                                        <span
                                            className="link-primary"
                                            role="button"
                                            onClick={toggleFormType}
                                        >
                                            Sign up
                                        </span>
                                    </p>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;

import React, { useState } from "react";
import { useParams } from "react-router";
import LoginForm from "../components/ui/loginForm";
import RegisterForm from "../components/ui/registerForm";

const Login = () => {
    const { type } = useParams();
    const [formType, setFormType] = useState(type === "register" ? type : "login");

    const toggleFormType = () => {
        setFormType((prev) => (prev === "register" ? "login" : "register"));
    };

    return (
        <>
            <div className="parent">
                <div className="container-fluid main">
                    <div className="row ">
                        <div className="col-12 col-md-6 col-lg-3 coloumn-add-stat"></div>
                        <div className="col-12 col-md-6 col-lg-3 coloumn-tasks"></div>
                        <div className="col-12 col-md-6 col-lg-3 coloumn-in-progress"></div>
                        <div className="col-12 col-md-6 col-lg-3 coloumn-finished"></div>
                        <div className="col-md-4 offset-md-3 shadow p-4 login-form">
                            {formType === "register" ? (
                                <>
                                    <h3 className="mb-4">Register</h3>
                                    <RegisterForm />
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

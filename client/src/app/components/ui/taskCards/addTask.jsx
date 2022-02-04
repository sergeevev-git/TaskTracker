import React, { useState, useEffect } from "react";
import TextField from "../../common/form/textField";
import TextAreaField from "../../common/form/textAreaField";
import { validator } from "../../../utils/validator";
import { toast } from "react-toastify";
import { useTodos } from "../../../hooks/useTodos";
import { useAuth } from "../../../hooks/useAuth";

const AddTask = () => {
    const { currentUser } = useAuth();
    const [data, setData] = useState({
        user: currentUser.id,
        title: "",
        text: "",
        deadline: "",
    });
    const [errors, setErrors] = useState({});
    const [enterError, setEnterError] = useState(null);
    const { addTodo } = useTodos();

    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value,
        }));
    };

    const validatorConfig = {
        title: {
            isRequired: {
                message: "Название задачи обязательно для заполнения",
            },
        },
        text: {
            isRequired: {
                message: "Описание задачи обязательно для заполнения",
            },
        },
        deadline: {
            isRequired: {
                message: "Крайний срок обязателен для заполнения",
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
        if (!isValid) {
            for (const error in errors) {
                toast.error(errors[error]);
            }
            return;
        }
        try {
            console.log("handleSubmit", data);
            await addTodo(data);
            setData((prevState) => ({
                ...prevState,
                title: "",
                text: "",
                deadline: "",
            }));
        } catch (error) {
            setEnterError(error.message);
        }
    };

    return (
        <div className="add-task">
            <form className="mt-1 mb-30" onSubmit={handleSubmit}>
                <div className="div-title">
                    <TextField
                        // label="title"
                        name="title"
                        value={data.title}
                        classLabel="text-white mb-0"
                        placeholder="task title"
                        onChange={handleChange}
                        // error={errors.name}
                    />
                </div>
                <div className="div-text-area">
                    <TextAreaField
                        // label="text"
                        name="text"
                        value={data.text}
                        classLabel="text-white mb-0"
                        rows="5"
                        cols="10"
                        maxLength="300"
                        placeholder="task description"
                        onChange={handleChange}
                        // error={errors.description}
                    />
                </div>

                <div className="row d-flex justify-content-between control">
                    <div className="col-auto div-deadline">
                        <TextField
                            // label="deadline"
                            name="deadline"
                            type="date"
                            value={data.deadline}
                            classLabel="text-white mb-0"
                            onChange={handleChange}
                            // error={errors.deadline}
                        />
                    </div>

                    <div className="col d-flex justify-content-end div-btn-add">
                        <button
                            className="btn btn-primary btn-add"
                            // disabled={!isValid || enterError}
                        >
                            <i className="bi bi-plus-square"></i>
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default AddTask;

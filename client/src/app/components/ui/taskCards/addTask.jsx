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
        description: "",
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
        description: {
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
                description: "",
                deadline: "",
            }));
        } catch (error) {
            setEnterError(error.message);
        }
    };

    return (
        <div className="add-task">
            <form className="mt-1 mb-30" onSubmit={handleSubmit}>
                <div className="ms-3 me-3">
                    <TextField
                        label="title"
                        name="title"
                        value={data.title}
                        classLabel="text-white mb-0"
                        onChange={handleChange}
                        // error={errors.name}
                    />
                    {/* <label
                        htmlFor="name"
                        className="form-label text-white mb-0 "
                    >
                        name
                    </label>
                    <input type="text" className="form-control" id="name" /> */}
                </div>
                <div className="ms-3 me-3">
                    <TextAreaField
                        label="description"
                        name="description"
                        value={data.description}
                        classLabel="text-white mb-0"
                        rows="5"
                        cols="10"
                        maxLength="300"
                        onChange={handleChange}
                        // error={errors.description}
                    />
                    {/* <label
                        htmlFor="description"
                        className="form-label text-white mb-0 "
                    >
                        description
                    </label>
                    <textarea
                        className="form-control text-area"
                        id="description"
                        rows="5"
                        cols="10"
                        maxLength="300"
                    ></textarea> */}
                </div>

                <div className="row ms-1 me-1 d-flex justify-content-between">
                    <div className="col mb-4 div-deadline">
                        <TextField
                            label="deadline"
                            name="deadline"
                            type="date"
                            value={data.deadline}
                            classLabel="text-white mb-0"
                            onChange={handleChange}
                            // error={errors.deadline}
                        />
                        {/* <label
                            htmlFor="deadline"
                            className="form-label text-white mb-0 "
                        >
                            deadline
                        </label>
                        <input
                            type="date"
                            className="form-control"
                            id="deadline"
                        /> */}
                    </div>

                    <div className="mt-4 col-auto div-btn-add">
                        <button
                            className="btn btn-primary btn-add"
                            // disabled={!isValid || enterError}
                        >
                            add task
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default AddTask;

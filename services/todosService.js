const { response } = require("express");
const Todo = require("../models/todo");

exports.addTodo = async (user, title, text, deadline) => {
    const todo = await new Todo({
        user: user,
        title: title,
        text: text,
        deadline: deadline,
        important: false,
    });

    await todo.save();
    // console.log("todo: ", todo);

    return todo;
};

exports.importantTodo = async (id) => {
    try {
        const todo = await Todo.findOne({ _id: id });
        todo.important = !todo.important;

        await todo.save();

        return todo;
    } catch (error) {
        console.log(error);
    }
};

exports.editTodo = async (_id, title, text, deadline) => {
    // console.log("_id, title, text, deadline: ", _id, title, text, deadline);
    try {
        const todo = await Todo.findOneAndUpdate(
            { _id: _id },
            { title: title, text: text, deadline: deadline }
            // { useFindAndModify: false },
            // (error) => {
            //     if (error) {
            //         return response
            //             .status(404)
            //             .json({ message: `Todo with id:${_id} not found` });
            //     } else {
            //         return response
            //             .status(202)
            //             .json({ message: "Update todo successfull" });
            //     }
            // }
        );

        const updatedTodo = await Todo.findOne({ _id: _id });

        return updatedTodo;
    } catch (error) {
        console.log(error);
    }
};

exports.newTodo = async (id) => {
    console.log("todoService newTodo", id);
    try {
        const todo = await Todo.findOne({ _id: id });
        if (todo.status !== "new") {
            todo.status = "new";
        }
        await todo.save();

        return todo;
    } catch (error) {
        console.log(error);
    }
};

exports.inWorkTodo = async (id, drop) => {
    console.log("todoService inWorkTodo", id);
    try {
        const todo = await Todo.findOne({ _id: id });
        if (drop) {
            todo.status = "inWork";
        } else {
            if (todo.status !== "inWork") {
                todo.status = "inWork";
            } else {
                todo.status = "new";
            }
        }

        await todo.save();

        return todo;
    } catch (error) {
        console.log(error);
    }
};

exports.completeTodo = async (id, drop) => {
    console.log("todoService completeTodo", id);
    try {
        const todo = await Todo.findOne({ _id: id });
        if (drop) {
            todo.status = "completed";
        } else {
            if (todo.status !== "completed") {
                todo.status = "completed";
            } else {
                todo.status = "new";
            }
        }

        await todo.save();

        return todo;
    } catch (error) {
        console.log(error);
    }
};

exports.deleteTodo = async (id) => {
    console.log(id);
    try {
        const todo = await Todo.findOneAndDelete({ _id: id });

        return todo;
    } catch (error) {
        console.log(error);
    }
};

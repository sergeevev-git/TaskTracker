const Todo = require("../models/todo");

exports.addTodo = async (user, title, description, deadline) => {
    const todo = await new Todo({
        user: user,
        title: title,
        text: description,
        deadline: deadline,
        inwork: false,
        important: false,
        completed: false,
    });

    await todo.save();

    return todo;
};

exports.editTodo = async () => {};

exports.inWorkTodo = async () => {};

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

exports.completeTodo = async (id) => {
    console.log("todoService completeTodo", id);
    try {
        const todo = await Todo.findOne({ _id: id });
        todo.completed = !todo.completed;

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

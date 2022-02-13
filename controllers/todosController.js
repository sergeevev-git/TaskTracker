const Todo = require("../models/todo");

const chalk = require("chalk");

const todosService = require("../services/todosService");

getAll = async (req, res) => {
    try {
        const { userId } = req.query;
        const todos = await Todo.find({ user: userId });

        return res.status(201).json({ todos });
    } catch (error) {
        console.log("todoController error/getAll - ", error);
        return res.status(404).json({ message: "Todos not found" });
    }
};

addTodo = async (req, res) => {
    try {
        const { user, title, text, deadline } = req.body;

        const todo = await todosService.addTodo(user, title, text, deadline);

        return res.status(201).json({
            todo,
            message: "Todo has been added",
        });
    } catch (error) {
        console.log("todoController error/addTodo - ", error);
        return res.status(404).json({ message: "Add todo error" });
    }
};

importantTodo = async (req, res) => {
    try {
        const { id } = req.body;

        const todo = await todosService.importantTodo(id);

        return res.status(202).json({ todo });
    } catch (error) {
        console.log("todoController error/importantTodo - ", error);
        return res.status(404).json({ message: "Important todo error" });
    }
};

editTodo = async (req, res) => {
    try {
        const { _id, title, text, deadline } = req.body;
        const todo = await todosService.editTodo(_id, title, text, deadline);

        return res.status(202).json({ todo });
    } catch (error) {
        console.log("todoController error/editTodo - ", error);
        return res.status(404).json({ message: "Edit todo error" });
    }
};

newTodo = async (req, res) => {
    try {
        const { id } = req.body;
        console.log(id);
        const todo = await todosService.newTodo(id);

        console.log("controller", todo);
        return res.status(202).json({ todo });
    } catch (error) {
        console.log("todoController error/newTodo - ", error);
        return res.status(404).json({ message: "New todo error" });
    }
};

inWorkTodo = async (req, res) => {
    try {
        const { id, drop } = req.body;
        const todo = await todosService.inWorkTodo(id, drop);

        console.log("controller", todo);
        return res.status(202).json({ todo });
    } catch (error) {
        console.log("todoController error/inWorkTodo - ", error);
        return res.status(404).json({ message: "In work todo error" });
    }
};

completeTodo = async (req, res) => {
    try {
        const { id, drop } = req.body;
        const todo = await todosService.completeTodo(id, drop);

        console.log("controller", todo);
        return res.status(202).json({ todo });
    } catch (error) {
        console.log("todoController error/completeTodo - ", error);
        return res.status(404).json({ message: "Complete todo error" });
    }
};

deleteTodo = async (req, res) => {
    try {
        const { id } = req.params;
        const todo = await todosService.deleteTodo(id);

        return res.status(202).json({ todo });
    } catch (error) {
        console.log("todoController error/deleteTodo - ", error);
        return res.status(404).json({ message: "Delete todo error" });
    }
};

const todosController = {
    getAll,
    addTodo,
    importantTodo,
    editTodo,
    newTodo,
    inWorkTodo,
    completeTodo,
    deleteTodo,
};

module.exports = todosController;

const Todo = require("../models/todo");
const todoService = require("../services/todoService");

addTodo = async (req, res) => {
    try {
        const { user, title, description, deadline } = req.body;

        const todo = await todoService.addTodo(
            user,
            title,
            description,
            deadline
        );

        return res.status(201).json({
            todo,
            message: "Todo has been added",
        });
    } catch (error) {
        console.log("todoController error/addTodo - ", error);
    }
};

getAll = async (req, res) => {
    try {
        const { userId } = req.query;
        const todos = await Todo.find({ user: userId });

        return res.status(201).json({ todos });
    } catch (error) {
        console.log("todoController error/getAll - ", error);
    }
};

importantTodo = async (req, res) => {
    try {
        const { id } = req.body;
        const todo = await todoService.importantTodo(id);

        return res.status(202).json({ todo });
    } catch (error) {
        console.log("todoController error/importantTodo - ", error);
    }
};

completeTodo = async (req, res) => {
    try {
        const { id } = req.body;
        const todo = await todoService.completeTodo(id);

        console.log("controller", todo);
        return res.status(202).json({ todo });
    } catch (error) {
        console.log("todoController error/completeTodo - ", error);
    }
};

deleteTodo = async (req, res) => {
    try {
        const { id } = req.params;
        const todo = await todoService.deleteTodo(id);

        return res.status(202).json({ todo });
    } catch (error) {
        console.log("todoController error/deleteTodo - ", error);
    }
};

const todoController = {
    addTodo,
    getAll,
    // editTodo,
    // inWorkTodo,
    importantTodo,
    completeTodo,
    deleteTodo,
};

module.exports = todoController;

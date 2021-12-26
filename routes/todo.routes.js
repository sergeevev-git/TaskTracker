const { Router } = require("express");
const router = Router();

const verifyTodo = require("../middleware/todos/verifyTodo");

const todoController = require("../controllers/todoController");

router.post("/add", verifyTodo.add, todoController.addTodo);

router.get("/", todoController.getAll);

// router.editTodo("/", todoController.getAll);

// router.inWorkTodo("/", todoController.getAll);

router.put("/important/:id", todoController.importantTodo);

router.put("/complete/:id", todoController.completeTodo);

router.delete("/delete/:id", todoController.deleteTodo);

module.exports = router;

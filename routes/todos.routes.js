const { Router } = require("express");
const router = Router();

const verifyTodo = require("../middleware/todos/verifyTodo");
const verifyAuth = require("../middleware/auth/verifyAuth");

const todosController = require("../controllers/todosController");

router.get("/", verifyAuth.checkAuth, todosController.getAll);

router.post("/add", verifyTodo.add, todosController.addTodo);

router.put("/important/:id", todosController.importantTodo);

router.patch("/edit/:id", verifyTodo.add, todosController.editTodo);

router.put("/new/:id", todosController.newTodo);

router.put("/inwork/:id", todosController.inWorkTodo);

router.put("/complete/:id", todosController.completeTodo);

router.delete("/delete/:id", todosController.deleteTodo);

module.exports = router;

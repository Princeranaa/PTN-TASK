const express = require("express");
const router = express.Router();

const {
  createTodo,
  getTodos,
  getTodoById,
  updateTodo,
  deleteTodo,
} = require("../Controllers/Todo.controller");
const { userAuth } = require("../Middlewares/userAuth");

router.post("/create", userAuth, createTodo);
router.get("/get", userAuth, getTodos);
router.get("/get/:id", userAuth, getTodoById);
router.put("/update/:id", userAuth, updateTodo);
router.delete("/delete/:id", userAuth, deleteTodo);

module.exports = router;

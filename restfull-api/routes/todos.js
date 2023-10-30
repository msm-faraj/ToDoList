const express = require("express");
const router = express.Router();
const Todo = require("../models/todo");
const validator = require("../modules/validator");
const Controler = require("../controller/todo");
const controler = new Controler(Todo, validator);

router.get("/", controler.getAllTodos);
router.get("/:id", controler.getOneTodo);
router.post("/", controler.createTodo);
router.patch("/:id", controler.updateTodo);
router.delete("/:id", controler.deleteTodo);

module.exports = router;

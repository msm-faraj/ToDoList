const express = require("express");
const router = express.Router();
const Todo = require("../models/todo");
const validator = require("../modules/validator");
const Controler = require("../controllers/todo");
const controler = new Controler(Todo, validator);

router.get("/", controler.getAllTodos.bind(controler));
router.get("/:id", controler.getOneTodo.bind(controler));
router.post("/", controler.createTodo.bind(controler));
router.patch("/:id", controler.updateTodo.bind(controler));
router.delete("/:id", controler.deleteTodo.bind(controler));

module.exports = router;

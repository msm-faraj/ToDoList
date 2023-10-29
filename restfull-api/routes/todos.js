const express = require("express");
const router = express.Router();
const Controler = require("./todo-controler");
const controler = new Controler();

router.get("/", controler.getAllTodos);
router.get("/:id", controler.getOneTodo);
router.post("/", controler.createTodo);
router.patch("/:id", controler.updateTodo);
router.delete("/:id", controler.deleteTodo);

module.exports = router;

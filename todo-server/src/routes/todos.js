const express = require("express");
const router = express.Router();
const Todo = require("../models/todo");
const validate = require("../modules/validator");
const Controler = require("../controllers/todo");
const controler = new Controler(Todo, validate);
const validateObjectId = require("../middleware/validateObjectId");
const reqHandler = require("../middleware/req-handler");

router.get("/", reqHandler(controler.getAllTodos.bind(controler)));
router.get(
  "/:id",
  validateObjectId,
  reqHandler(controler.getOneTodo.bind(controler))
);
router.post("/", reqHandler(controler.createTodo.bind(controler)));
router.patch(
  "/:id",
  validateObjectId,
  reqHandler(controler.updateTodo.bind(controler))
);
router.delete(
  "/:id",
  validateObjectId,
  reqHandler(controler.deleteTodo.bind(controler))
);

module.exports = router;

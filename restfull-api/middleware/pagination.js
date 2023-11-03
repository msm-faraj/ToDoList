const Todo = require("../models/todo");
module.exports = (req) => {
  const page = req.query.page || 0;
  const prPage = req.query.prPage || 1;
  const isVisible = { isDone: false, deletedAt: null };

  return Todo.find(isVisible)
    .sort({ createdAt: -1 })
    .skip(page * prPage)
    .limit(prPage);
};

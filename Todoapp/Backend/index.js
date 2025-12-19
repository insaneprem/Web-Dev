const express = require("express");
const { createTodo, updateTodo } = require("./types");
const { Todo } = require("./db");
const app = express();
const port = 3000;
const cors = require("cors");
app.use(express.json());
app.use(cors({}));

app.post("/todo", async (req, res) => {
  const createPayload = req.body;
  const parsePayload = createTodo.safeParse(createPayload);

  if (!parsePayload.success) {
    res.status(403).json({
      msg: "You send wrong msg",
      err: parsePayload,
    });

    return;
  }

  await Todo.create({
    title: createPayload.title,
    description: createPayload.description,
  });

  res.json({
    msg: "Todo created",
  });
});
app.get("/todo", async (req, res) => {
  const todos = await Todo.find({});

  res.json({
    todos,
  });
});
app.put("/complete", async (req, res) => {
  const updatePayload = req.body;
  const parsePayload = updateTodo.safeParse(updatePayload);

  if (!parsePayload.sucess) {
    res.status(403).json({
      msg: "You send wrong msg",
    });

    return;
  }

  Todo.update({ _id: updatePayload.id }, { complete: true });

  res.json({
    msg: "Done updating",
  });
});
app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});

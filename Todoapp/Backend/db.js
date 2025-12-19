const mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://premkumar2186:VyGzoxIapkfHY6x6@harkiratdev.vexrejr.mongodb.net/"
);
const todoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    completed: {
      type: Boolean,
    //   default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Todo = mongoose.model("Todo", todoSchema);

module.exports = { Todo };

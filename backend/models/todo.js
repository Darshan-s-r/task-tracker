import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
  },
  dueDate: {
    type: Date,
  },
  status: {
    type: String,
    enum: ['todo', 'in-progress', 'completed'],
  },
});

const Todo = mongoose.model("Todo", todoSchema);

export default Todo;
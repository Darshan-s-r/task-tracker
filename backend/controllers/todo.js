import Todo from "../models/todo.js";

export const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find();
    res.status(200).json(todos);
  } catch (error) {
    console.error("Error in getTodos:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const addTodo = async (req, res) => {
  try {
    const { title, priority, dueDate, status } = req.body; 
    const newTodo = new Todo({ title, priority, dueDate, status });
    await newTodo.save();
    res.status(201).json({message : "Task added successfully", data: newTodo});
  } catch (error) {
    console.error("Error in addTask:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, priority, dueDate, status } = req.body;
    const updatedTodo = await Todo.findByIdAndUpdate(id, { title, priority, dueDate, status }, { new: true });
    if (!updatedTodo) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.status(200).json({message: "Task updated successfully", data: updatedTodo});
  } catch (error) {
    console.error("Error in updateTask:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;  
    const deletedTodo = await Todo.findByIdAndDelete(id);
    if (!deletedTodo) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error("Error in deleteing Task:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getFilteredTodos = async (req, res) => {
  try{
    const { filter, value } = req.query;
    const getFilteredTodos = await Todo.find({ [filter]: value });
    res.status(200).json(getFilteredTodos);
  }catch(error){
    console.error("Error in getFilteredTodos:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export const getByTitle = async (req, res) => {
  try {
    const { title } = req.params;

    const todo = await Todo.find({
      title: { $regex: title, $options: "i" }  
    });

    if (!todo || todo.length === 0) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.status(200).json(todo);

  } catch (error) {
    console.error("Error in getByTitle:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

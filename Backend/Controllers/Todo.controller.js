const Todo = require("../Model/Todo.model");

exports.createTodo = async (req, res) => {
  try {
    const { title, description } = req.body;
    const userId = req.user._id;

    const Response = await Todo.create({ title, description, userId });

    res.status(200).json({
      success: true,
      message: "Todo created successfully",
      data: Response,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

exports.getTodos = async (req, res) => {
  try {
    const userId = req.user._id;
    const todos = await Todo.find({ userId });
    res.status(200).json({
      success: true,
      message: "Todos fetched successfully",
      data: todos,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

exports.getTodoById = async (req, res) => {
  try {
    const { id } = req.params;

    const userId = req.user._id;

    const todo = await Todo.findOne({ _id: id, userId });

    if (!todo) {
      return res.status(404).json({
        success: false,
        message: "Todo not Found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Todo fetched successfully",
      data: todo,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

exports.updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;

    const userId = req.user._id;

    const todo = await Todo.findOneAndUpdate(
      { _id: id, userId },
      { title, description },
      { new: true },
    );

    res.status(200).json({
      success: true,
      message: "Todo updated successfully",
      data: todo,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

exports.deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;

    const userId = req.user._id;

    const todo = await Todo.findOneAndDelete({ _id: id, userId });

    if (!todo) {
      return res.status(404).json({
        success: false,
        message: "Todo not Found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Todo deleted successfully",
      data: todo,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

const Task = require("../models/task.model");

async function getTasks(request, response) {
  try {
    const tasks = await Task.find({
      userId: request.user.userId,
    }).sort({ createdAt: -1 });

    return response.status(200).json(tasks);
  } catch (error) {
    console.error("Get Tasks Error:", error);
    return response.status(500).json({ message: "Failed to get tasks" });
  }
}

async function getTaskById(request, response) {
  try {
    const task = await Task.findOne({
      _id: request.params.id,
      userId: request.user.userId,
    });

    if (!task) {
      return response.status(404).json({ message: "Task not found" });
    }

    return response.status(200).json(task);
  } catch (error) {
    console.error("Get Task Error:", error);
    return response.status(500).json({ message: "Failed to get task" });
  }
}

async function createTask(request, response) {
  try {
    const { title, description, completed } = request.body;

    if (!title) {
      return response.status(400).json({
        message: "Title is required",
      });
    }

    const task = await Task.create({
      title,
      description,
      completed: completed ?? false,
      userId: request.user.userId, // IMPORTANT: Get userId from authenticated JWT
    });

    return response.status(201).json({
      message: "Task created successfully",
      task,
    });
  } catch (error) {
    console.error("Create Task Error:", error);
    return response.status(500).json({ message: "Failed to create task" });
  }
}

async function updateTask(request, response) {
  try {
    const { title, description, completed } = request.body;

    const updatedTask = await Task.findOneAndUpdate(
      {
        _id: request.params.id,
        userId: request.user.userId, // IMPORTANT: Only update if task belongs to logged-in user
      },
      {
        title,
        description,
        completed,
      },
      {
        new: true,
        runValidators: true,
      },
    );

    if (!updatedTask) {
      return response.status(404).json({ message: "Task not found" });
    }

    return response.status(200).json({
      message: "Task updated successfully",
      task: updatedTask,
    });
  } catch (error) {
    console.error("Update Task Error:", error);
    return response.status(500).json({ message: "Failed to update task" });
  }
}

async function deleteTask(request, response) {
  try {
    const deletedTask = await Task.findOneAndDelete({
      _id: request.params.id,
      userId: request.user.userId, // IMPORTANT: Only delete if task belongs to logged-in user
    });

    if (!deletedTask) {
      return response.status(404).json({ message: "Task not found" });
    }

    return response.status(200).json({
      message: "Task deleted successfully",
      task: deletedTask,
    });
  } catch (error) {
    console.error("Delete Task Error:", error);
    return response.status(500).json({ message: "Failed to delete task" });
  }
}

module.exports = {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
};

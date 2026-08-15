import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/task.services";
import CreateTask from "../components/CreateTask";
import DisplayTasks from "../components/DisplayTasks";
import UpdateTaskModal from "../components/UpdateTaskModel";

import "./TaskManagerMain.css";

function TaskManagerMain() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);

  const [tasks, setTasks] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  function editTask(task) {
    setEditingTask(task);
    setShowModal(true);
  }

  async function addTask() {
    try {
      const response = await API.post("/", {
        title,
        description,
        completed: isCompleted,
      });

      getTasks();
    } catch (error) {
      console.log(error);
    }

    setTitle("");
    setDescription("");
    setIsCompleted(false);
    getTasks();
  }

  async function getTasks() {
    try {
      const response = await API.get("/");
      setTasks(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteTask(id) {
    await API.delete(`/${id}`);
    getTasks();
  }

  async function updateTask(updatedData) {
    try {
      await API.put(`/${editingTask._id}`, updatedData);

      getTasks();
      setShowModal(false);
      setEditingTask(null);
    } catch (error) {
      console.error(error);
    }
  }

  function cancelUpdate() {
    setShowModal(false);
    setEditingTask(null);
  }

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <>
      <div className="task-manager-app-container">
        <CreateTask
          title={title}
          setTitle={setTitle}
          description={description}
          setDescription={setDescription}
          isCompleted={isCompleted}
          setIsCompleted={setIsCompleted}
          addTask={addTask}
        />

        <DisplayTasks
          getTasks={getTasks}
          tasks={tasks}
          deleteTask={deleteTask}
          editTask={editTask}
        />

        <UpdateTaskModal
          showModal={showModal}
          task={editingTask}
          updateTask={updateTask}
          cancelUpdate={cancelUpdate}
        />
      </div>
      <Link to="/logout" className="task-manager-add-button">
        Logout
      </Link>
    </>
  );
}

export default TaskManagerMain;

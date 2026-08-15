import { useState, useEffect } from "react";
import "./UpdateTaskModel.css";

function UpdateTaskModal(props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    if (props.task) {
      setTitle(props.task.title);
      setDescription(props.task.description);
      setIsCompleted(props.task.completed);
    }
  }, [props.task]);

  if (!props.showModal) {
    return null;
  }

  function handleUpdate() {
    props.updateTask({
      title,
      description,
      completed: isCompleted,
    });
  }

  return (
    <>
      <div className="modal-overlay">
        <div className="update-modal">
          <div className="modal-header">
            <h2>Update Task</h2>
            <button className="modal-close-button" onClick={props.cancelUpdate}>
              ×
            </button>
          </div>

          <div className="modal-field">
            <label>Task Title</label>
            <input
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="Enter task title"
            />
          </div>

          <div className="modal-field">
            <label>Task Description</label>
            <textarea
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="Enter task description"
            />
          </div>

          <div className="modal-field">
            <label>Task Status</label>

            <select
              value={String(isCompleted)}
              onChange={(event) =>
                setIsCompleted(event.target.value === "true")
              }
            >
              <option value="false">Pending</option>
              <option value="true">Completed</option>
            </select>
          </div>

          <div className="modal-buttons">
            <button
              className="modal-cancel-button"
              onClick={props.cancelUpdate}
            >
              Cancel
            </button>

            <button className="modal-update-button" onClick={handleUpdate}>
              Update Task
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default UpdateTaskModal;

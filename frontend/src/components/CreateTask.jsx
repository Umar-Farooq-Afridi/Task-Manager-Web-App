import "./CreateTask.css";

function CreateTask(props) {
  return (
    <>
      <header className="task-manager-header">
        <h1>Task Manager App</h1>
      </header>

      <section className="task-manager-input-section">
        <input
          value={props.title}
          onChange={(event) => {
            props.setTitle(event.target.value);
          }}
          type="text"
          placeholder="Enter task title"
          className="task-manager-input"
          required
        />

        <textarea
          value={props.description}
          onChange={(event) => {
            props.setDescription(event.target.value);
          }}
          type="text"
          placeholder="Enter task description"
          className="task-manager-date-input"
        />

        <select
          value={props.isCompleted}
          onChange={(event) => {
            props.setIsCompleted(event.target.value === "true");
          }}
          name="status"
          className="status"
        >
          <option value="">Select task status</option>
          <option value="true">Completed</option>
          <option value="false">Pending</option>
        </select>

        <button
          onClick={props.editingTaskId ? props.updateTask : props.addTask}
          className="task-manager-add-button"
        >
          {props.editingTaskId ? "Update Task" : "Add Task"}
        </button>
      </section>
    </>
  );
}

export default CreateTask;

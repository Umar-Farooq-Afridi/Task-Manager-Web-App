import "./DisplayTasks.css";

function DisplayTasks(props) {
  return (
    <>
      <section className="task-manager-list-section">
        <div className="task-manager-list">
          {props.tasks.map((task) => (
            <div key={task._id} className="task-item">
              <div>
                <h3>{task.title}</h3>
                <p>{task.description}</p>
                <span>{task.completed ? "Completed" : "Pending"}</span>
              </div>

              <div className="task-actions">
                <button
                  className="delete-btn"
                  onClick={() => props.deleteTask(task._id)}
                >
                  Delete
                </button>

                <button
                  className="update-btn"
                  onClick={() => props.editTask(task)}
                >
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export default DisplayTasks;

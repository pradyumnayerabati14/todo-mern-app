export default function Todo({
  task,
  setTask,
  tasks,
  submitHandler,
  patchTasks,
  deleteTasks,
  logoutHandler
}) {
  return (
    <>
      <form onSubmit={submitHandler}>
        <h1>To-Do App</h1>

        <input
          className="inputbox"
          type="text"
          placeholder="Type your task"
          value={task}
          onChange={(event) => setTask(event.target.value)}
        />

        <button type="submit">Submit</button>
      </form>

      <ul>
        {tasks.map((singleTask) => (
          <li key={singleTask._id} className="SingleTask">
            {singleTask.title} - {String(singleTask.completed)}

            <div style={{ display: "flex", gap: "8px" }}>
              <button
                className="updateBtn"
                onClick={() => patchTasks(singleTask._id, singleTask.completed)}
              >
                Toggle
              </button>

              <button
                className="deleteBtn"
                onClick={() => deleteTasks(singleTask._id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      <button className="logoutButton" type="button" onClick={logoutHandler}>
        Logout
      </button>
    </>
  );
}
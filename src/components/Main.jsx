import { Link } from "react-router-dom";
import { useState } from "react";

function Home({ tasks, deleteTask }) {
  const [search, setSearch] = useState("");       // input value
  const [searchQuery, setSearchQuery] = useState(""); // actual filter query

  // Filter tasks
  const filteredTasks = tasks.filter((task) => {
    const query = searchQuery.toLowerCase();
    return (
      task.title.toLowerCase().includes(query) ||
      task.description.toLowerCase().includes(query) ||
      task.priority.toLowerCase().includes(query) ||
      task.status.toLowerCase().includes(query)
    );
  });

  const handleSearch = () => {
// apply only when Search clicked
    setSearchQuery(search); 
  };

  return (
    <div className="p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-6xl font-bold">Task List</h2>
        <Link
          to="/create"
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
           Add Task
        </Link>
      </div>

      {/* Search input + button */}
      <div className="mb-4 flex gap-2">
        <input
          type="text"
          className="border p-2 flex-1"
          placeholder="Search tasks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Search
        </button>
      </div>

      {/* Task table */}
      {filteredTasks.length === 0 ? (
        <p>No tasks found!</p>
      ) : (
        <table className="w-full border-collapse border">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">Title</th>
              <th className="border p-2">Description</th>
              <th className="border p-2">Priority</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTasks.map((task) => (
              <tr key={task.id} className="text-center">
                <td className="border p-2">{task.title}</td>
                <td className="border p-2">{task.description}</td>
                <td className="border p-2">{task.priority}</td>
                <td className="border p-2">{task.status}</td>
                <td className="border p-2 flex justify-center gap-2">
                  <Link
                    to={`/edit/${task.id}`}
                    className="bg-blue-500 text-white px-2 py-1 rounded"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Home;

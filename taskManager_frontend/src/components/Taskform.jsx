/* eslint-disable react/prop-types */
import { useState } from "react";

const TaskForm = ({ initialData = {}, onSubmit }) => {
  const [task, setTask] = useState({
    title: initialData.title || "",
    description: initialData.description || "",
    category: initialData.category || "",
    status: initialData.status || "incomplete",
  });

  const [loading, setLoading] = useState(false); // Loading state for button text

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when submitting

    // Call the onSubmit prop with the task data
    await onSubmit(task);

    setLoading(false); // Set loading to false after submission
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100"> {/* Full screen flex container */}
      <form onSubmit={handleSubmit} className="bg-white p-6 shadow-lg rounded-lg max-w-lg w-full">
        <h2 className="text-xl font-semibold text-center mb-4">Task Form</h2>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">Title:</label>
          <input
            type="text"
            name="title"
            value={task.title}
            onChange={handleChange}
            required
            className="border rounded-md p-2 w-full focus:ring-2 focus:ring-blue-300 focus:outline-none"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">Description:</label>
          <textarea
            name="description"
            value={task.description}
            onChange={handleChange}
            required
            className="border rounded-md p-2 w-full h-24 resize-none focus:ring-2 focus:ring-blue-300 focus:outline-none"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">Category:</label>
          <input
            type="text"
            name="category"
            value={task.category}
            onChange={handleChange}
            required
            className="border rounded-md p-2 w-full focus:ring-2 focus:ring-blue-300 focus:outline-none"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">Status:</label>
          <select
            name="status"
            value={task.status}
            onChange={handleChange}
            className="border rounded-md p-2 w-full focus:ring-2 focus:ring-blue-300 focus:outline-none"
          >
            <option value="incomplete">Incomplete</option>
            <option value="complete">Complete</option>
          </select>
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 w-full rounded-md hover:bg-blue-600 transition duration-200"
          disabled={loading} // Disable the button while loading
        >
          {loading ? "Submitting..." : "Submit"} {/* Button text based on loading state */}
        </button>
      </form>
    </div>
  );
};

export default TaskForm;

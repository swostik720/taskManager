import { useNavigate } from "react-router-dom";
import TaskForm from "../components/Taskform";

const CreateTask = () => {
  const navigate = useNavigate();
  const loginToken = localStorage.getItem("loginToken");

  const handleSubmit = async (taskData) => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/tasks", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${loginToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(taskData),
      });

      if (response.ok) {
        navigate("/home");
      }
    } catch (error) {
      console.error("Task creation failed:", error);
    }
  };

  return (
    <div>
      {/* <h1>Create Task</h1> */}
      <TaskForm onSubmit={handleSubmit} />
    </div>
  );
};

export default CreateTask;

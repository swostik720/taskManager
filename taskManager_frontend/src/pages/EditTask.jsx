import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TaskForm from "../components/Taskform";

const EditTask = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const loginToken = localStorage.getItem("loginToken");

  const [task, setTask] = useState(null);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/tasks/${id}`, {
          headers: {
            "Authorization": `Bearer ${loginToken}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setTask(data);
        }
      } catch (error) {
        console.error("Error fetching task:", error);
      }
    };

    fetchTask();
  }, [id, loginToken]);

  const handleUpdate = async (updatedTask) => {
    try {
      await fetch(`http://127.0.0.1:8000/api/tasks/${id}`, {
        method: "PATCH",
        headers: {
          "Authorization": `Bearer ${loginToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedTask),
      });

      navigate("/home");
    } catch (error) {
      console.error("Task update failed:", error);
    }
  };

  return task ? <TaskForm initialData={task} onSubmit={handleUpdate} /> : <p>Loading...</p>;
};

export default EditTask;

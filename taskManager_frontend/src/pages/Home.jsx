import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Home = () => {
    const [tasks, setTasks] = useState([]);
    const [filter, setFilter] = useState("");
    const [category, setCategory] = useState("");
    const loginToken = localStorage.getItem("loginToken");
    const navigate = useNavigate();

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const response = await fetch("http://127.0.0.1:8000/api/tasks", {
                headers: { "Authorization": `Bearer ${loginToken}` },
            });

            if (!response.ok) {
                throw new Error("Failed to fetch tasks");
            }

            const data = await response.json();
            setTasks(Array.isArray(data) ? data : []);  // Ensure it's an array
        } catch (error) {
            console.error("Error fetching tasks:", error);
            setTasks([]); // Prevent breaking the UI
        }
    };

    const handleUpdate = (id) => {
        navigate(`/edittask/${id}`);
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this task?")) {
            await fetch(`http://127.0.0.1:8000/api/tasks/${id}`, {
                method: "DELETE",
                headers: { "Authorization": `Bearer ${loginToken}` },
            });
            fetchTasks();
        }
    };

    const toggleComplete = async (id, isComplete) => {
        await fetch(`http://127.0.0.1:8000/api/tasks/${id}/status`, {
            method: "PATCH",
            headers: {
                "Authorization": `Bearer ${loginToken}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ is_complete: !isComplete }),
        });
        fetchTasks();
    };

    const completedTasks = tasks.filter(task => task.is_complete).length;
    const taskCompletion = tasks.length ? (completedTasks / tasks.length) * 100 : 0;

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />

            <div className="container mx-auto p-6 flex-grow">
                {/* Title */}
                <h1 className="text-3xl font-bold text-center mb-6">Your Tasks</h1>

                {/* Filter Section */}
                <div className="flex justify-between items-center mb-4">
                    <input
                        type="text"
                        placeholder="Search by title..."
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        className="border p-2 rounded-md flex-grow mr-4"
                    />

                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="border p-2 rounded-md"
                    >
                        <option value="">All Categories</option>
                        {Array.from(new Set(tasks.map(task => task.category))).map((cat) => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>
                </div>

                {/* Progress Bar */}
                <div className="mb-6">
                    <progress value={taskCompletion} max="100" className="w-full h-4"></progress>
                    <p className="text-center mt-2 text-gray-700">{taskCompletion.toFixed(2)}% Completed</p>
                </div>

                {/* Task List */}
                <div className="space-y-4">
                    {tasks
                        .filter(task => task.title.includes(filter) && (category ? task.category === category : true))
                        .map(task => (
                            <div key={task.id} className="flex items-center justify-between p-4 border rounded-lg shadow-sm">
                                <div>
                                    <p className="text-lg font-semibold">{task.title}</p>
                                    <p className="text-sm text-gray-500">{task.category}</p>
                                </div>

                                <div className="flex space-x-3">
                                    {/* Toggle Complete Button */}
                                    <button
                                        onClick={() => toggleComplete(task.id, task.is_complete)}
                                        className={`px-3 py-1 text-white font-semibold rounded-md ${task.is_complete ? "bg-red-500" : "bg-green-500"}`}
                                    >
                                        {task.is_complete ? "Mark Incomplete" : "Mark Complete"}
                                    </button>

                                    {/* Edit Button */}
                                    <button onClick={() => handleUpdate(task.id)} className="text-blue-500 text-xl">
                                        ✏️
                                    </button>

                                    {/* Delete Button */}
                                    <button onClick={() => handleDelete(task.id)} className="text-red-500 text-xl">
                                        🗑️
                                    </button>
                                </div>
                            </div>
                        ))}
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default Home;

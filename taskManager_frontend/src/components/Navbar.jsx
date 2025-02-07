import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    // Fetch user data when the component is mounted
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const loginToken = localStorage.getItem("loginToken");
                if (!loginToken) return;

                const response = await fetch("http://127.0.0.1:8000/api/user", {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${loginToken}`,
                        "Content-Type": "application/json",
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setUser(data); // Set user details (name, is_admin)
                } else {
                    setUser(null);
                }
            } catch (error) {
                console.error("Error fetching user:", error);
            }
        };

        fetchUser();
    }, []);

    // Logout function
    const handleLogout = async () => {
        try {
            const loginToken = localStorage.getItem("loginToken");
            if (!loginToken) return;

            const response = await fetch("http://127.0.0.1:8000/api/logout", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${loginToken}`,
                    "Content-Type": "application/json",
                },
            });

            if (response.ok) {
                localStorage.removeItem("loginToken");
                setUser(null);
                navigate("/");
            } else {
                console.error("Logout failed");
            }
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    return (
        <nav className="bg-blue-600 p-4 text-white flex justify-between items-center">
            <h1 className="text-xl font-bold">
                <Link to="/">Task Manager</Link>
            </h1>
            <ul className="flex gap-4">
                {user ? (
                    <>
                        {/* Create Task link (only visible when logged in) */}
                        <Link to="/createtask" className="hover:underline">Create Task</Link>

                        {/* Profile dropdown */}
                        <div className="relative group">
                            <button className="hover:underline">
                                {user.is_admin ? "Admin" : user.name} ▼
                            </button>
                            <div className="absolute left-0 hidden group-hover:block bg-white text-black mt-2 py-2 rounded shadow-lg">
                                <button
                                    onClick={handleLogout}
                                    className="block px-4 py-2 w-full text-left hover:bg-gray-200"
                                >
                                    Logout
                                </button>
                            </div>
                        </div>

                    </>
                ) : (
                    <>
                        {/* Login and Register links (only visible when not logged in) */}
                        <Link to="/login" className="hover:underline">Login</Link>
                        <Link to="/register" className="hover:underline">Register</Link>
                    </>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;

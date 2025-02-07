import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Welcome from "./pages/Welcome";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import CreateNewPasswordPage from "./pages/CreateNewPasswordPage";
import Home from "./pages/Home";
import CreateTask from "./pages/CreateTask";
import EditTask from "./pages/EditTask";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/resetPassword" element={<ResetPasswordPage />} />
        <Route path="/createnewpassword" element={<CreateNewPasswordPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/createtask" element={<CreateTask />} />
        <Route path="/edittask/:id" element={<EditTask />} />
      </Routes>
    </Router>
  );
};

export default App;

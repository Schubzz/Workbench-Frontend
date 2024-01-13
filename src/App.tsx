import {Route, Routes} from "react-router-dom";
import {UserProvider} from "./context/contextUser.tsx";
import {ProjectProvider} from "./context/ProjectContext.tsx";
import Welcome from './pages/Welcome';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import Tasks from "./pages/Tasks";
import Settings from './pages/Settings';
import ProjectDetail from "./pages/ProjectDetail.tsx";
import './App.css'

const App = () => {
    return (
        <UserProvider>
                <Routes>
                    {/* Landing Page */}
                    <Route path="/" element={<Welcome/>}></Route>
                    {/* Login Page */}
                    <Route path="/login" element={<Login/>}></Route>
                    {/* Register Page */}
                    <Route path="/register" element={<Register/>}></Route>
                    {/* Dashboard Page */}
                    <Route path="/dashboard" element={<Dashboard/>}></Route>
                    {/* Projects Page */}
                    <Route path="/projects" element={<Projects/>}></Route>
                    {/* Project Detail Page */}
                    <Route path="/projects/:projectId" element={<ProjectDetail />} />
                    {/* Tasks Page */}
                    <Route path="/tasks" element={<Tasks/>}></Route>
                    {/* Task in Project Page */}
                    <Route path="/settings" element={<Settings/>}></Route>
                </Routes>
        </UserProvider>
    );
};

export default App;

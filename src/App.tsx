import {Route, Routes} from "react-router-dom";
import {UserProvider} from "./context/contextUser.tsx";
import Welcome from './pages/Welcome';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import Tasks from "./pages/Tasks";
import Settings from './pages/Settings';
import './App.css'
import {ProjectProvider} from "./context/ProjectContext.tsx";

const App = () => {
    return (
        <UserProvider>
            <ProjectProvider>
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
                    <Route path="/dashboard/projects" element={<Projects/>}></Route>
                    {/* Tasks Page */}
                    <Route path="/tasks" element={<Projects/>}></Route>
                    {/* Task in Project Page */}
                    <Route path="dashoard/projects/task" element={<Tasks/>}></Route>
                    {/* Settings Page*/}
                    <Route path="/settings" element={<Settings/>}></Route>
                </Routes>
            </ProjectProvider>
        </UserProvider>
    );
};

export default App;

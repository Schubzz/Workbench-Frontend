import {Route, Routes} from "react-router-dom";
import {UserProvider} from "./context/contextUser.tsx";
import Welcome from './pages/Welcome';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import Tasks from "./pages/Tasks";
import Settings from './pages/Settings';
import ProjectDetail from "./pages/ProjectDetail.tsx";
import {useContext} from "react";
import {UserContext} from "./context/contextUser.tsx";
import './App.css'
import {ProjectProvider} from "./context/ProjectContext.tsx";

const Routing = () => {

    const {user} = useContext(UserContext);

    return(
        <Routes>
            {/* Landing Page */}
            <Route path="/" element={<Welcome/>}></Route>
            {/* Login Page */}
            <Route path="/login" element={<Login/>}></Route>
            {/* Register Page */}
            <Route path="/register" element={<Register/>}></Route>
            {/* Dashboard Page */}
            <Route path="/dashboard" element={
                user? <Dashboard user = {user}/> : <Login/>
            }></Route>
            {/* Projects Page */}
            <Route path="/projects" element={
                user? <Projects user = {user}/> : <Login/>
            }></Route>
            {/* Project Detail Page */}
            <Route path="/projects/:projectId" element={
                user? <ProjectDetail user = {user}/> : <Login/>
            } />
            {/* Tasks Page */}
            <Route path="/tasks" element={
                user? <Tasks user = {user}/> : <Login/>
            }></Route>
            {/* Task in Project Page */}
            <Route path="/settings" element={
                user? <Settings user = {user}/> : <Login/>
            }></Route>
        </Routes>
    )
}
const App = () => {
    return (
        <UserProvider>
            <ProjectProvider>
               <Routing/>
            </ProjectProvider>
        </UserProvider>
    );
};

export default App;

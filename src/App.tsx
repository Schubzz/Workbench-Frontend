import {Route, Routes} from "react-router-dom";
import {UserProvider} from "./context/contextUser.tsx";
import AccesDenied from './pages/AccesDenied.tsx';
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

    const legitUser = user.id !== '';


    return (
        <Routes>
            {/* Landing Page */}
            <Route path="/" element= {
                <Login/>
            }></Route>

            {/* Login Page */}
            <Route path="/login" element= {
                <Login/>
            }></Route>

            {/* Register Page */}
            <Route path="/register" element= {
                <Register/>
            }></Route>

            {/* Dashboard Page */}
            <Route path="/dashboard" element= {
                legitUser ? <Dashboard user={user}/> : <AccesDenied/>
            }></Route>

            {/* Projects Page */}
            <Route path="/projects" element= {
                legitUser ? <Projects user={user}/> : <AccesDenied/>
            }></Route>

            {/* Project Detail Page */}
            <Route path="/projects/:projectId" element= {
                legitUser ? <ProjectDetail user={user}/> : <AccesDenied/>
            }/>

            {/* Tasks Page */}
            <Route path="/tasks" element= {
                legitUser ? <Tasks user={user}/> : <AccesDenied/>
            }></Route>

            {/* Task in Project Page */}
            <Route path="/settings" element= {
                legitUser ? <Settings user={user}/> : <AccesDenied/>
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

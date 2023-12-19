import {Route, Routes} from "react-router-dom";
import Welcome from './pages/Welcome';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import Tasks from "./pages/Tasks";
import Settings from './pages/Settings';
import './App.css'

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<Welcome/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/login" element={<Login/>}/>

            <Route path="dashboard" element={<Dashboard/>}/>
            <Route path="projects" element={<Projects/>}/>
            <Route path="tasks" element={<Tasks/>}/>
            <Route path="settings" element={<Settings/>}/>
        </Routes>
    );
};

export default App;

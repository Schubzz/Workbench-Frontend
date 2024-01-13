import withLayout from "../HOC/withLayout.tsx";
import useAxios from "../hooks/useAxios.tsx";
import { useEffect, useState } from "react";
import {useLocation} from "react-router-dom";
import Project from "../interfaces/ProjectInterface.tsx";
import Task from "../interfaces/TaskInterface.tsx";


const ProjectDetail = () => {

    const [tasks, setTasks] = useState<Task[]>([]);

    const [project, setProject] = useState<Project | null>(null);



    const http = useAxios();

    const location = useLocation();

    const resolvedPath = location.pathname.split("/").filter((item) => item !== "");

    const id = resolvedPath[1];



    const getProject = async () => {
        try {
            const response = await http.get(`/api/projects/${id}`);
            console.log(response);
            return response.data;
        } catch (error) {
            console.error('Error fetching projects:', error);
            throw error;
        }
    }

    const getTasks = async () => {
        try {
            const response = await http.get(`/api/tasks/${id}`);
            return response.data;

        } catch (error) {
            console.error('Error fetching tasks:', error);
            throw error;
        }
    };

    useEffect(() => {
        getProject().then(({ data }) => {
            setProject(data.attributes);
            setTasks(data.relationships.tasks)
        });
    }, []);

    return (
        <>
            <h2>Project Detail</h2>
            <p>Project Title: {project?.title}</p>
            <p>Project desc: {project?.description}</p>

            <h2 className=" py-6">Tasks</h2>
            <ul>
                {tasks.map((task) => (
                    <li key={task.id}>
                        <h3>{task.attributes.title}</h3>
                        <p>Priority: {task.attributes.priority}</p>
                        <p>Status: {task.attributes.status}</p>
                        <p>Description: {task.attributes.description}</p>
                        <p> Relate: {task.relationships.user.username}</p>
                        <p> Relate: {task.relationships.project.id}</p>
                    </li>
                ))}
            </ul>
        </>
    );
};

export default withLayout(ProjectDetail);

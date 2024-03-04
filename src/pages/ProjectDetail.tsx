import withLayout from "../HOC/withLayout.tsx";
import useAxios from "../hooks/useAxios.tsx";
import {useContext, useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import Project from "../interfaces/ProjectInterface.tsx";
import Task from "../interfaces/TaskInterface.tsx";
import {NewTaskModal} from "../components/Tasks/NewTaskModal.tsx";
import ProjectDetails from "../1-ProjectDetail/ProjectDetails.tsx";
import TaskList from "../1-ProjectDetail/TaskList.tsx";
import ProjectActionsMenu from "../1-ProjectDetail/ProjectActionsMenu.tsx";
import {ProjectContext} from "../context/ProjectContext.tsx";

const ProjectDetail = () => {



    const [project, setProject] = useState<Project | null>(null);
    const [tasks, setTasks] = useState<Task[]>([]);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const http = useAxios();
    const location = useLocation();
    const resolvedPath = location.pathname.split("/").filter((item) => item !== "");
    const id = resolvedPath[1];
    const project_id = id;

    const {updateActiveProject} = useContext(ProjectContext);

    const getProject = async () => {
        try {
            const response = await http.get(`/api/projects/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching projects:', error);
            throw error;
        }
    }

    useEffect(() => {
        getProject().then((data) => {
            const tasks = data.data.relationships.tasks;
            const project = data.data;
            setProject(project);
            setTasks(tasks);
        });
    }, [tasks.length]);


    return (
        project === null ? 'project loading...' :
        <>
            <div className="flex justify-between gap-4 bg-border p-4 rounded-md">

                <ProjectDetails
                    project={project}
                />

                <ProjectActionsMenu
                    callback={(updatedProject) => setProject(updatedProject)}
                    project={project}
                />

            </div>

            <TaskList
                tasks={tasks}
                onClick={() => setIsModalOpen(true)}
                setTasks={setTasks}
            />

            <NewTaskModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                project_id={project_id}
                setTasks={setTasks}
                tasks={tasks}
            />
        </>
    );
};

export default withLayout(ProjectDetail);

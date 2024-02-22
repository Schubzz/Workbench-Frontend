import withLayout from "../HOC/withLayout.tsx";
import useAxios from "../hooks/useAxios.tsx";
import {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import Project from "../interfaces/ProjectInterface.tsx";
import Task from "../interfaces/TaskInterface.tsx";
import {NewTaskModal} from "../components/NewTaskModal.tsx";


const ProjectDetail = () => {

    const [tasks, setTasks] = useState<Task[]>([]);

    const [project, setProject] = useState<Project | null>(null);

    const http = useAxios();

    const location = useLocation();

    const resolvedPath = location.pathname.split("/").filter((item) => item !== "");

    const id = resolvedPath[1];

    const [isModalOpen, setIsModalOpen] = useState(false);

    const project_id = id;

    const priority = {
        low: {src: "../../src/assets/PrioLow.svg", alt: "Low Priority"},
        medium: {src: "../../src/assets/PrioMedium.svg", alt: "Medium Priority"},
        high: {src: "../../src/assets/PrioHigh.svg", alt: "High Priority"}
    };

    const status = {
        "To-Do": {src: "../../src/assets/Open.svg", alt: "to do"},
        "In Progress": {src: "../../src/assets/inProgress.svg", alt: "in progress"},
        "Done": {src: "../../src/assets/Done.svg", alt: "done"}
    };


    const getProject = async () => {
        try {
            const response = await http.get(`/api/projects/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching projects:', error);
            throw error;
        }
    }

    const handleTaskAdded = (newTask) => {
        setTasks(prevTasks => [...prevTasks, newTask]);
    };

    const deleteTask = async (taskId : number) => {
        try {
            await http.delete(`/api/tasks/${taskId}`);
            setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
        } catch (error) {
            console.error('Fehler beim Löschen des Tasks:', error);
        }
    };

    useEffect(() => {
        getProject().then((data) => {
            const tasks = data.data.relationships.tasks;
            const project = data.data;

            setProject(project);
            setTasks(tasks);

        });
    }, [tasks.length]);


    return (
        <>
            <div className="flex flex-col gap-2 bg-border p-4 rounded-md">
                <h2 className="text-large">{project?.attributes.title}</h2>
                <p  className="text-small text-text-light">Project desc:</p>
                <p> {project?.attributes.description}</p>
            </div>


            <div className=" my-4">
                <h2 className="mt-2 py-2 border-t-2 border-solid border-border">Tasks</h2>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-accent rounded-md p-2 text-small font-semibold text-text-light my-6"
                >
                    +
                </button>
                {tasks && tasks.map((task) => (
                    <div key={task.id} className="task-container">
                        <details>
                            <summary>
                                <li className="flex flex-row w-full justify-between items-center p-2 border-b border-amber-50 hover:bg-body-bg-hover cursor-pointer rounded-md">
                                    <div className="flex items-center gap-3">
                                        {
                                            (() => {
                                                const key = task.attributes.status as keyof typeof status;
                                                const {src, alt} = status[key] || {};
                                                return src && <img src={src} alt={alt} className="w-4 h-4"/>;
                                            })()
                                        }
                                        <h2 className="text-small">{task.attributes.title}</h2>
                                    </div>
                                    <div className=" flex items-center gap-3">
                                        <div className="flex items-center gap-3">
                                            {
                                                (() => {
                                                    const key = task.attributes.priority as keyof typeof priority;
                                                    const {src, alt} = priority[key] || {};
                                                    return src && <img src={src} alt={alt} className="w-6 h-6"/>;
                                                })()
                                            }
                                        </div>
                                        <span
                                            className="text-small text-text-gray hidden md:flex">{task.attributes.created_at.split("T")[0]}
                            </span>
                                    </div>

                                </li>
                            </summary>
                            <div className="flex flex-col gap-2 bg-body-bg-hover p-4 rounded">
                                <p className="text-small text-text-light">description:</p>
                                <p className="text-small">{task.attributes.description}</p>
                                <button
                                    onClick={() => deleteTask(task.id)}
                                >
                    <span
                        className="text-red-900 border-2 border-red-900 border-solid p-1 rounded-md">delete</span>
                                </button>
                            </div>
                        </details>

                    </div>


                ))}
            </div>

            <NewTaskModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                project_id={project_id}
                onTaskAdded={handleTaskAdded}
            />
        </>
    );
};

export default withLayout(ProjectDetail);

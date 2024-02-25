import withLayout from "../HOC/withLayout.tsx";
import useAxios from "../hooks/useAxios.tsx";
import {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import Project from "../interfaces/ProjectInterface.tsx";
import Task from "../interfaces/TaskInterface.tsx";
import {NewTaskModal} from "../components/Tasks/NewTaskModal.tsx";
import TaskItem from "../components/Tasks/TaskItem.tsx";


const ProjectDetail = () => {

    const [tasks, setTasks] = useState<Task[]>([]);

    const [project, setProject] = useState<Project | null>(null);

    const http = useAxios();

    const location = useLocation();

    const resolvedPath = location.pathname.split("/").filter((item) => item !== "");

    const id = resolvedPath[1];

    const [isModalOpen, setIsModalOpen] = useState(false);

    const project_id = id;


    const getProject = async () => {
        try {
            const response = await http.get(`/api/projects/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching projects:', error);
            throw error;
        }
    }

    const handleTaskAdded = (newTask: Task) => {
        setTasks(prevTasks => [...prevTasks, newTask]);
    };

    const handleTaskDeleted = (taskId: string) => {
        setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
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
                    <TaskItem key={task.id}
                              task={ task }
                              onDeleteTask={handleTaskDeleted}
                    />
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

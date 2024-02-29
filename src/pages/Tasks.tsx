import withLayout from "../HOC/withLayout.tsx";
import useAxios from "../hooks/useAxios.tsx";
import React, {useEffect, useState} from "react";
import Task from "../interfaces/TaskInterface.tsx";
import {useNavigate} from "react-router-dom";
import {Priority} from "../components/Priority.tsx";
import {Status} from "../components/Status.tsx";

const Tasks = () => {

    const priority = Priority;
    const status = Status;



    const navigate = useNavigate();
    const navigateToProject = (projectId: string) => {
        navigate(`/projects/${projectId}`)
    }

    const http = useAxios();

    const [tasks, setTasks] = useState<Task[]>([]);

    const tasksList = async () => {
        try {
            const response = await http.get(`/api/tasks`);
            setTasks(response.data.data)
            console.log(response.data.data)
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }

    }

    useEffect(() => {
        tasksList()
    }, []);

    return (
        <div>
            <h2>Tasks</h2>
            <ul>
                {tasks?.map((task: Task) => (
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
                                <div className="flex gap-x-2">
                                    <p className="text-small text-text-gray">|</p>
                                    <p className="text-small">{task.attributes.description}</p>
                                </div>
                                <h2 className="cursor-pointer text-small text-text-gray">
                                    from: <span className="text-text-light hover:underline"
                                                onClick={() => navigateToProject(task.relationships.project.id)}
                                >
                                        {task.relationships.project.title}
                                    </span>
                                </h2>
                            </div>

                        </details>
                        <div className="h-[1px] w-full bg-border"></div>
                    </div>
                ))}
            </ul>

        </div>
    )

}
export default withLayout(Tasks);
import {useEffect, useState} from "react";
import Task from "../../interfaces/TaskInterface.tsx";
import useAxios from "../../hooks/useAxios.tsx";
import {MeatballMenu} from "../MeatballMenus/MeatballMenu.tsx";
import TaskStatusMeatball from "../MeatballMenus/TaskStatusMeatball.tsx";
import TaskPrioMeatball from "../MeatballMenus/TaskPrioMeatball.tsx";
import {Priority} from "../Priority.tsx";
import {Status} from "../Status.tsx";


const TaskItem = ({ task, onDeleteTask }: { task: Task; onDeleteTask: (taskId: string) => void }) => {

    const http = useAxios();
    const [tasks, setTasks] = useState<Task[]>([]);


    const deleteTask = async (taskId: string) => {
        try {
            await http.delete(`/api/tasks/${taskId}`);
            onDeleteTask(taskId);
        } catch (error) {
            console.error('Fehler beim Löschen des Tasks:', error);
        }
    };

    useEffect(() => {
        setTasks( tasks);
    }, [tasks.length]);

    const priority = Priority;
    const status = Status;

    return (
        <div key={task.id} className="task-container">
            <details>
                <summary>
                    <li className="flex flex-row w-full justify-between items-center p-2 border-b border-amber-50 hover:bg-body-bg-hover cursor-pointer rounded-md">
                        <div className="flex items-center gap-3">


                            <MeatballMenu type="statusMenu" key={task.attributes.status}>
                               <TaskStatusMeatball
                                      task={task}
                               />
                            </MeatballMenu>


                            {
                                (() => {
                                    const key = task.attributes.status as keyof typeof status;
                                    const { src, alt } = status[key] || {};
                                    return src && <img src={src} alt={alt} className="w-4 h-4" />;
                                })()
                            }

                            <h2 className="text-small">{task.attributes.title}</h2>
                        </div>
                        <div className=" flex items-center gap-3">
                            <MeatballMenu type="prioMenu" key={task.attributes.priority}>
                                <TaskPrioMeatball
                                    task={task}
                                />
                            </MeatballMenu>
                            <div className="flex items-center gap-3">
                                {
                                    (() => {
                                        const key = task.attributes.priority as keyof typeof priority;
                                        const { src, alt } = priority[key] || {};
                                        return src && <img src={src} alt={alt} className="w-6 h-6" />;
                                    })()
                                }
                            </div>
                            <span className="text-small text-text-gray hidden md:flex">{task.attributes.created_at.split("T")[0]}</span>
                        </div>
                    </li>
                </summary>
                <div className="flex flex-col gap-2 bg-body-bg-hover p-4 rounded">
                    <p className="text-small text-text-light">description:</p>
                    <p className="text-small">{task.attributes.description}</p>
                    <button onClick={() => deleteTask(task.id)}>
                        <span className="text-red-900 border-2 border-red-900 border-solid p-1 rounded-md">delete</span>
                    </button>
                </div>
            </details>
        </div>
    );
};

export default TaskItem;

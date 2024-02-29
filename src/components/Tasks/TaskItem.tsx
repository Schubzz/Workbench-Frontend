import Task from "../../interfaces/TaskInterface.tsx";
import useAxios from "../../hooks/useAxios.tsx";
import {MeatballMenu} from "../MeatballMenus/MeatballMenu.tsx";
import TaskStatusMeatball from "../MeatballMenus/TaskStatusMeatball.tsx";
import TaskPrioMeatball from "../MeatballMenus/TaskPrioMeatball.tsx";


const TaskItem = ({ task, setTasks }: { task: Task; setTasks:  React.Dispatch<React.SetStateAction<Task[]>> }) => {

    const http = useAxios();

    const deleteTask = async (taskId: string) => {
        try {
            await http.delete(`/api/tasks/${taskId}`);
            setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
        } catch (error) {
            console.error('Fehler beim Löschen des Tasks:', error);
        }
    };


    return (
        <div key={task.id} className="task-container">
            <details>
                <summary>
                    <li className="flex flex-row w-full justify-between items-center p-2 border-b border-amber-50 hover:bg-body-bg-hover cursor-pointer rounded-md">
                        <div className="flex items-center gap-3">


                            <MeatballMenu type="statusMenu" status={task.attributes.status}>
                               <TaskStatusMeatball
                                      task={task}
                                        setTasks={setTasks}
                               />
                            </MeatballMenu>

                            <h2 className="text-small">{task.attributes.title}</h2>
                        </div>
                        <div className=" flex items-center gap-3">
                            <MeatballMenu type="prioMenu" status={task.attributes.priority}>
                                <TaskPrioMeatball
                                    task={task}

                                />
                            </MeatballMenu>

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

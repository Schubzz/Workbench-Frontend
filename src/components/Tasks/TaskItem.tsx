import Task from "../../interfaces/TaskInterface.tsx";
import {MeatballMenu} from "../MeatballMenus/MeatballMenu.tsx";
import TaskStatusMeatball from "../MeatballMenus/TaskStatusMeatball.tsx";
import TaskPrioMeatball from "../MeatballMenus/TaskPrioMeatball.tsx";
import React, {useState} from "react";
import DeleteIcon from "../../assets/Icons/DeleteIcon.tsx";
import TaskDeleteConfirmationModal from "./TaskDeleteConfirm.tsx";
import EditIcon from "../../assets/Icons/EditIcon.tsx";
import {EditTaskModal} from "./EditTaskModal.tsx";


const TaskItem = ({task, setTasks, tasks}: {
    task: Task;
    setTasks: React.Dispatch<React.SetStateAction<Task[]>>,
    tasks: Task[]
}) => {


    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    const handleDeleteTask = async () => {
        setIsDeleteModalOpen(true);
    }

    const handleEditClick = () => {
        setIsEditModalOpen(true);
    }


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
                                    setTasks={setTasks}
                                />
                            </MeatballMenu>

                            <span
                                className="text-small text-text-gray hidden md:flex">{task.attributes.created_at.split("T")[0]}</span>
                        </div>
                    </li>
                </summary>
                <div className="flex flex-col gap-2 bg-body-bg-hover p-4 rounded">
                    <p className="text-small text-text-light">description:</p>
                    <p className="text-small">{task.attributes.description}</p>
                    <div className="flex gap-x-2 mt-6">
                        <button
                            className="hover:bg-body-bg p-1 rounded-md"
                            onClick={() => handleDeleteTask()}>
                            <DeleteIcon color={"red"} size={"20px"}/>
                        </button>

                        <button className="hover:bg-body-bg p-1 rounded-md"
                                onClick={handleEditClick}>
                            <EditIcon color={"white"} size={"20px"}/>
                        </button>
                    </div>
                </div>
            </details>
            {isDeleteModalOpen &&
                <TaskDeleteConfirmationModal
                    setIsDeleteModalOpen={setIsDeleteModalOpen}
                    onCancel={() => setIsDeleteModalOpen(false)}
                    task_id={task.id}
                    setTasks={setTasks}
                    project_id={task.attributes.project_id}
                    tasks={tasks}
                />}

            {isEditModalOpen &&
                <EditTaskModal
                    setIsEditModalOpen={setIsEditModalOpen}
                    onClose={() => setIsEditModalOpen(false)}
                    data={task}
                    setTasks={setTasks}
                />}
        </div>
    );
};

export default TaskItem;

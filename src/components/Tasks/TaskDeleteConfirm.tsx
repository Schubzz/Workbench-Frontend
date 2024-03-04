import React, {useContext} from "react";
import CautionIcon from "../../assets/Icons/CautionIcon.tsx";
import useAxios from "../../hooks/useAxios.tsx";
import Task from "../../interfaces/TaskInterface.tsx";
import {ProjectContext} from "../../context/ProjectContext.tsx";

const TaskDeleteConfirmationModal = ({setIsDeleteModalOpen, onCancel, task_id, setTasks, tasks, project_id}: {
    setIsDeleteModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
    onCancel(): void,
    task_id: string | undefined,
    setTasks: React.Dispatch<React.SetStateAction<Task[]>>,
    tasks: Task[],
    project_id: string
}) => {

    const http = useAxios();

    const {updateActiveProject} = useContext(ProjectContext);
    const deleteTask = async (taskId: string) => {
        try {
            await http.delete(`/api/tasks/${taskId}`);
            setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
        } catch (error) {
            console.error('Fehler beim Löschen des Tasks:', error);
        }
    };
    const handleConfirmDelete = async () => {
        try {
            await deleteTask(task_id);
            updateActiveProject(project_id, tasks);
            setIsDeleteModalOpen(false);
        } catch (error) {
            console.error("Error deleting task:", error);
        }
    };

    return (

        <div
            className="flex flex-col items-center gap-y-4 absolute top-2/3 left-1/2 translate-x-[-50%] bg-border border-t-2 border-solid border-red-900 p-4 rounded-md w-72 text-center">
            <CautionIcon color={"white"} size={"30px"}/>
            <p className="p-y-4">Delete permanently?</p>
            <div className="flex justify-center gap-2">
                <button onClick={onCancel} className="text-text-light text-small">cancel</button>
                <button onClick={handleConfirmDelete}
                        className="text-white text-small px-2 py-1 rounded-md bg-red-500">Delete
                </button>
            </div>
        </div>

    );
};

export default TaskDeleteConfirmationModal;

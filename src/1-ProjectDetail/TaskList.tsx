import TaskItem from "../components/Tasks/TaskItem.tsx";
import Task from "../interfaces/TaskInterface.tsx";
import React from "react";
import TaskDeleteConfirmationModal from "../components/Tasks/TaskDeleteConfirm.tsx";

const TaskList = ({ onClick, tasks, setTasks, taskId } : {
    onClick : () => void,
    tasks : Task[],
    setTasks :  React.Dispatch<React.SetStateAction<Task[]>>
    taskId? : string
}) => {

    const task_id = taskId;
    const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false);

    return (
        <div className="my-4">
            <h2 className="mt-2 py-2 border-t-2 border-solid border-border">Tasks</h2>
            <button
                onClick={onClick}
                className="bg-accent rounded-md p-2 text-small font-semibold text-text-light my-6"
            >
                +
            </button>
            {tasks && tasks.map((task) => (
                <TaskItem
                    key={task.id}
                    task={task}
                    setTasks={setTasks}
                />
            ))}
            {isDeleteModalOpen &&
                <TaskDeleteConfirmationModal
                    setTasks={setTasks}
                    setIsDeleteModalOpen={setIsDeleteModalOpen}
                    onCancel={() => setIsDeleteModalOpen(false)}
                    task_id={task_id}
                />}
        </div>
    );
};

export default TaskList;

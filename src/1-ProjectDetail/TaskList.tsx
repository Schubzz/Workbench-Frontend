import TaskItem from "../components/Tasks/TaskItem.tsx";
import Task from "../interfaces/TaskInterface.tsx";

const TaskList = ({ onClick, tasks, setTasks } : {onClick : () => void, tasks : Task[], setTasks :  React.Dispatch<React.SetStateAction<Task[]>> }) => {
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
                    setTasks={setTasks} />
            ))}
        </div>
    );
};

export default TaskList;

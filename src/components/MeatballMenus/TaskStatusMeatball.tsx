import toDo from "../../assets/Open.svg";
import inProgress from "../../assets/inProgress.svg";
import done from "../../assets/Done.svg";
import Task from "../../interfaces/TaskInterface.tsx";
import useAxios from "../../hooks/useAxios.tsx";
import {useState} from "react";


const TaskStatusMeatball = ({ task }: { task: Task }) => {
    const http = useAxios();


    const [tasks, setTasks] = useState<Task[]>([]);

    function editTask(task: Task) {
        const newArray = tasks.map(item =>
            item.id === task.id ? { ...item, ...task } : item
        );
        setTasks(newArray)
    }

    const editStatus = async (status: string) => {
        try {
            const response = await http.patch(`/api/tasks/${task.id}`, { status });
            console.log(response);
            editTask(response.data.data);
        } catch (error) {
            console.error("Fehler beim Bearbeiten des Tasks:", error);
        }
    };

    const statusItems = [
        {
            label: "To-Do",
            icon: <img src={toDo} alt="to-do" className="w-4 h-4" />,
            action: () => {
                editStatus("To-Do");
            },
        },
        {
            label: "In Progress",
            icon: <img src={inProgress} alt="in progress" className="w-4 h-4" />,
            action: () => {
                editStatus("In Progress");
            },
        },
        {
            label: "Done",
            icon: <img src={done} alt="done" className="w-4 h-4" />,
            action: () => {
                editStatus("Done");
            },
        },
    ];

    return (
        <>
            {statusItems.map((item, index) => (
                <div key={index}>
                    <div
                        className="flex items-center justify-start gap-x-2 text-small text-text-gray hover:text-text-light p-2 cursor-pointer hover:bg-body-bg-hover w-[8rem]"
                        onClick={(e) => {
                            e.stopPropagation();
                            item.action();
                        }}
                    >
                        <span className="">{item.icon}</span>
                        {item.label}
                    </div>
                </div>
            ))}
        </>
    );
};

export default TaskStatusMeatball;

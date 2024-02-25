import low from "../../assets/PrioLow.svg";
import medium from "../../assets/PrioMedium.svg";
import high from "../../assets/PrioHigh.svg";
import Task from "../../interfaces/TaskInterface.tsx";
import useAxios from "../../hooks/useAxios.tsx";
import {useState} from "react";

const TaskPriorityMeatball = ({ task }: { task: Task }) => {


    const http = useAxios();

    const [tasks, setTasks] = useState<Task[]>([]);

    function editTask(task: Task) {
        const newArray = tasks.map(item =>
            item.id === task.id ? { ...item, ...task } : item
        );
        setTasks(newArray)
    }

    const editPriority = async (priority: string) => {
        try {
            const response = await http.patch(`/api/tasks/${task.id}`, { priority });
            console.log(response);
            editTask(response.data.data);
        } catch (error) {
            console.error("Fehler beim Bearbeiten der Priorität des Tasks:", error);
        }
    };

    const prioItems = [
        {
            label: "low",
            icon: <img src={low} alt="low priority" className="w-4 h-4" />,
            action: () => {
                editPriority("low");
            },
        },
        {
            label: "medium",
            icon: <img src={medium} alt="medium priority" className="w-4 h-4" />,
            action: () => {
                editPriority("medium");
            },
        },
        {
            label: "high",
            icon: <img src={high} alt="high priority" className="w-4 h-4" />,
            action: () => {
                editPriority("high");
            },
        },
    ];

    return (
        <>
            {prioItems.map((item, index) => (
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

export default TaskPriorityMeatball;

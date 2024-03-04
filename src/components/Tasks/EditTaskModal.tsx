import React, {BaseSyntheticEvent, useState} from "react"
import useAxios from "../../hooks/useAxios.tsx";
import Task from "../../interfaces/TaskInterface.tsx";



export const EditTaskModal = ({setIsEditModalOpen, onClose, data, setTasks}: {
    setIsEditModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
    onClose: () => void,
    data: Task,
    setTasks: React.Dispatch<React.SetStateAction<Task[]>>
}) => {


    const http = useAxios();

    const [title, setTitle] = useState(data?.attributes.title || '');
    const [description, setDescription] = useState(data?.attributes.description || '');

    const handleSubmit = async (e: BaseSyntheticEvent) => {
        e.preventDefault();
        try {
            const result = await http.patch(`/api/tasks/${data.id}`, {title, description});
            const updatedTask = result.data.data;
            console.log(updatedTask)
            setTasks(prevTasks => prevTasks.map(task => (task.id === updatedTask.id ? updatedTask : task)));
            handleClose();
        } catch (error) {
            console.error(error);
        }
    };

    const handleClose = () => {
        setTitle('');
        setDescription('');
        setIsEditModalOpen(false);
    }

    if (!setIsEditModalOpen) return null;

    return (
        <div
            className="absolute top-[50%] left-[50%] translate-x-[-50%] w-[80%] md:w-[50%] rounded-xl bg-border border-t-2 border-solid border-border z-[120]">
            <div className="p-2">
                <form onSubmit={handleSubmit}
                      className="flex items-center justify-between gap-2 p-2 rounded-md flex-col"
                >
                    <div className="flex flex-col w-[100%] gap-y-4">
                        <input type="text"
                               name="title"
                               value={title}
                               onChange={(e) => setTitle(e.target.value)}
                               placeholder="Title"
                               className="bg-body-bg-hover rounded-md p-2 text-small font-semibold text-text-light"
                        />

                        <input type="text"
                               name="description"
                               value={description}
                               onChange={(e) => setDescription(e.target.value)}
                               placeholder="describe..."
                               className="bg-body-bg-hover rounded-md p-2 text-small font-semibold text-text-light"
                        />
                    </div>

                    <div className="flex self-end">
                        <button
                            onClick={onClose}
                            className="text-small font-semibold text-text-light bg-border rounded-md p-2"
                        >
                            cancel
                        </button>

                        <button type="submit"
                                className="text-white text-small px-2 py-1 rounded-md bg-accent"
                        >
                            Edit Task
                        </button>
                    </div>
                </form>

                <div className="flex justify-end p-2 gap-2 md:justify-start">
                </div>
            </div>
        </div>
    );
};


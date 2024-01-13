import {useState} from "react"
import useAxios from "../hooks/useAxios.tsx";
import { useNavigate } from 'react-router-dom';


export const NewProjectModal = ({isOpen, onClose}) => {

    const http = useAxios();
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState('low');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await http.post('/api/projects', {title, priority, description});
            navigate(`/projects/${response.data.data.id}`);
            handleClose();
        } catch (error) {
            console.error('Fehler beim Erstellen des Projekts:', error);
        }
    };

    const handleClose = () => {
        setTitle('');
        setDescription('');
        onClose();
    }

    if (!isOpen) return null;

    return (
        <div className="border-t-2 border-solid border-border">
            <div className="p-2">
                <form onSubmit={handleSubmit}
                      className="flex items-center justify-between gap-2 p-2 rounded-md"
                >
                    <div className="flex">
                        <input type="text"
                               value={title}
                               onChange={(e) => setTitle(e.target.value)}
                               placeholder="Title"
                               className="bg-body-bg-hover rounded-md p-2 text-small font-semibold text-text-light"
                        />

                        <input type="text"
                               value={description}
                               onChange={(e) => setDescription(e.target.value)}
                               placeholder="describe..."
                               className="bg-body-bg-hover rounded-md p-2 text-small font-semibold text-text-light"
                        />
                    </div>

                    <div className="flex">
                        <select value={priority}
                                onChange={(e) => setPriority(e.target.value)}
                                className="bg-body-bg-hover rounded-md p-2 text-small font-semibold text-text-light"
                        >
                            <option value="low">low</option>
                            <option value="medium">medium</option>
                            <option value="high">high</option>
                        </select>
                    </div>

                    <button type="submit"
                            className="hidden md:flex bg-accent rounded-md p-2 text-small font-semibold text-text-light"
                    >
                        create Project
                    </button>
                </form>

                <div className="flex justify-end p-2 gap-2 md:justify-start">
                    <button
                        onClick={handleClose}
                        className="text-small font-semibold text-text-light bg-border rounded-md p-2"
                    >
                        cancel
                    </button>

                    <button type="submit"
                            className="md:hidden bg-accent rounded-md p-2 text-small font-semibold text-text-light"
                    >
                        create Project
                    </button>
                </div>
            </div>
        </div>
    );
};

import {BaseSyntheticEvent, useState} from "react"
import useAxios from "../hooks/useAxios.tsx";
import {useNavigate} from 'react-router-dom';
import {ProjectContext} from "../context/ProjectContext.tsx";
import {useContext} from "react";
import Project from "../interfaces/ProjectInterface.tsx";



export const NewProjectModal = ({isOpen, onClose} : {isOpen: boolean, onClose: () => void}) => {

    const http = useAxios();
    const navigate = useNavigate();

    const {addProject} = useContext(ProjectContext);

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState('low');

    const handleSubmit = async (e: BaseSyntheticEvent) => {
        e.preventDefault();
        try {
            const response = await http.post('/api/projects', {title, priority, description, status: "To-Do"});
            navigate(`/projects/${response.data.data.id}`);
            addProject( response.data.data);
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
        <div
            className="absolute top-[50%] left-[50%] translate-x-[-50%] w-[80%] md:w-[50%] rounded-xl bg-border border-t-2 border-solid border-border">
            <div className="p-2">
                <form onSubmit={handleSubmit}
                      className="flex items-center justify-between gap-2 p-2 rounded-md flex-col"
                >
                    <div className="flex flex-col w-[100%] gap-y-4">
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

                    <div className="flex self-start my-2">
                        <select value={priority}
                                onChange={(e) => setPriority(e.target.value)}
                                className="bg-body-bg-hover rounded-md p-2 text-small font-semibold text-text-light"
                        >
                            <option value="low">low</option>
                            <option value="medium">medium</option>
                            <option value="high">high</option>
                        </select>
                    </div>


                    <div className="flex self-end">
                        <button
                            onClick={handleClose}
                            className="text-small font-semibold text-text-light bg-border rounded-md p-2"
                        >
                            cancel
                        </button>

                        <button type="submit"
                                autoFocus={true}
                                className="bg-accent rounded-md p-2 text-small font-semibold text-text-light"
                        >
                            create Project
                        </button>
                    </div>
                </form>

                <div className="flex justify-end p-2 gap-2 md:justify-start">
                </div>
            </div>
        </div>
    );
};

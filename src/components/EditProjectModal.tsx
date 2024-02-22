import {BaseSyntheticEvent, useContext, useState} from "react"
import useAxios from "../hooks/useAxios.tsx";
import Project from "../interfaces/ProjectInterface.tsx";
import {useNavigate} from "react-router-dom";
import {ProjectContext} from "../context/ProjectContext.tsx";


export const EditProjectModal = ({isOpen, onClose, data}: {
    isOpen: () => void,
    onClose: () => void,
    data: Project
}) => {

    const {editProject} = useContext(ProjectContext);


    const http = useAxios();
    const navigate = useNavigate();
    const [title, setTitle] = useState(data.attributes.title);
    const [description, setDescription] = useState(data.attributes.description);


    const handleSubmit = async (e: BaseSyntheticEvent) => {
        e.preventDefault();
        try {
            const response = await http.patch(`/api/projects/${data.id}`, {title, description});
            editProject();
            navigate(`/projects/${response.data.data.id}`);
            handleClose();
        } catch (error) {
            console.error('Fehler beim bearbeiten des Projekts:', error);
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
                            onClick={handleClose}
                            className="text-small font-semibold text-text-light bg-border rounded-md p-2"
                        >
                            cancel
                        </button>

                        <button type="submit"
                                className="bg-accent rounded-md p-2 text-small font-semibold text-text-light"
                        >
                            edit Project
                        </button>
                    </div>
                </form>

                <div className="flex justify-end p-2 gap-2 md:justify-start">
                </div>
            </div>
        </div>
    );
};

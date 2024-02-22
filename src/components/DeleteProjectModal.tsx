import Project from "../interfaces/ProjectInterface.tsx";
import * as http from "http";
import {useState} from "react";



export const DeleteProjectModal = ({isOpen, onClose, data} : {isOpen: () => void, onClose: () => void, data : Project}) => {

    const [projects, setProjects] = useState<Project[]>([]);
    const deleteProject = async (projectId : number) => {
        try {
            await http.delete(`/api/tasks/${projectId}`);
            setProjects(prevProjects => prevProjects.filter(project => project.id !== projectId));
        } catch (error) {
            console.error('Fehler beim Löschen des Tasks:', error);
        }
    };

    return (
        <div
            className="absolute top-[50%] left-[50%] translate-x-[-50%] w-[80%] md:w-[50%] rounded-xl bg-border border-t-2 border-solid border-border">
            <div className="p-2">

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


                <div className="flex justify-end p-2 gap-2 md:justify-start">
                </div>
            </div>
        </div>
    );
};

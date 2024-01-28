import { useState } from "react";
import Project from "../interfaces/ProjectInterface.tsx";

const ProjectEditModal = ({ project, isOpen, onClose, onSave } : {project: Project, isOpen: boolean, onClose: () => void, onSave: () => void}) => {
    const [title, setTitle] = useState(project.attributes.title);
    // weitere Zustände für andere Attribute

    const handleSubmit = () => {
        console.log("Projekt wird gespeichert...");
    };

    return (
        <div style={{ display: isOpen ? "block" : "none" }} className="absolute top-0 left-0">
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <button type="submit">Speichern</button>
                <button onClick={onClose}>Abbrechen</button>
            </form>
        </div>
    );
};

export default ProjectEditModal;

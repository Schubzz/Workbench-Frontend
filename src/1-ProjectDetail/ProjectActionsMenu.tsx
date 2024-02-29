import DeleteConfirmationModal from "../components/Projects/DeleteConfirm.tsx";
import {EditProjectModal} from "../components/Projects/EditProjectModal.tsx";
import DeleteIcon from "../assets/Icons/DeleteIcon.tsx";
import EditIcon from "../assets/Icons/EditIcon.tsx";
import {BaseSyntheticEvent, useState} from "react";
import Project from "../interfaces/ProjectInterface.tsx";

const ProjectActionsMenu = ({onDeleteProject, onEditProject, project}: {
    onDeleteProject: (e: BaseSyntheticEvent) => void,
    onEditProject: () => void,
    project: Project
}) => {
    // Zustände für die Modals und Projektinformationen
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    return (
        <div className="self-end">
            <button onClick={(e) => {
                setIsDeleteModalOpen(true);
                onDeleteProject(e);
            }} className="w-12">
                <DeleteIcon color={"white"} size={"25px"}/>
            </button>

            <button onClick={() => setIsEditModalOpen(true)} className="w-12">
                <EditIcon color={"white"} size={"25px"}/>
            </button>
            <div>
                {isEditModalOpen &&
                <EditProjectModal
                    isOpen={isEditModalOpen}
                    onClose={() => setIsEditModalOpen(false)}
                    data={project}
                />}

                {isDeleteModalOpen &&
                    <DeleteConfirmationModal
                        setIsDeleteModalOpen={setIsDeleteModalOpen}
                        onCancel={() => setIsDeleteModalOpen(false)}
                        project_id={project.id}
                    />}
            </div>
        </div>
    );
};

export default ProjectActionsMenu;
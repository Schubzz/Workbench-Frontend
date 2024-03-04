import React, {useContext} from "react";
import {useNavigate} from "react-router-dom";
import {ProjectContext} from "../../context/ProjectContext.tsx";
import DeleteConfirm from "../../DeleteConfirm.tsx";

const ProjectDeleteConfirmationModal = ({setIsDeleteModalOpen, onCancel, project_id}: {
    setIsDeleteModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
    onCancel(): void,
    project_id: string
}) => {

    const {deleteProject} = useContext(ProjectContext);

    const navigate = useNavigate();

    const handleConfirmDelete = async () => {
        try {
            await deleteProject(project_id);
            setIsDeleteModalOpen(false);
            navigate(`/projects/`);
        } catch (error) {
            console.error("Error deleting project:", error);
        }
    };

    return (
        <DeleteConfirm
            onCancel={onCancel}
            handleConfirmDelete={handleConfirmDelete}
            isOpen={setIsDeleteModalOpen}
        />
    );
};

export default ProjectDeleteConfirmationModal;

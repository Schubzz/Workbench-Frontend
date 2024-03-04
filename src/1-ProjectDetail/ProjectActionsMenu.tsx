import DeleteConfirmationModal from "../components/Projects/ProjectDeleteConfirm.tsx";
import {EditProjectModal} from "../components/Projects/EditProjectModal.tsx";
import DeleteIcon from "../assets/Icons/DeleteIcon.tsx";
import EditIcon from "../assets/Icons/EditIcon.tsx";
import {useState} from "react";
import Project from "../interfaces/ProjectInterface.tsx";

const ProjectActionsMenu = ({project, callback}: {
    project: Project,
    callback: () => void
}) => {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const handleEditClick = () => {
        setIsEditModalOpen(true);
    };

    const handleDeleteClick = () => {
        setIsDeleteModalOpen(true);
    };

    return (
        <div className="self-end">
            <button onClick={handleDeleteClick} className="w-12">
                <DeleteIcon color={"white"} size={"25px"}/>
            </button>

            <button onClick={handleEditClick} className="w-12">
                <EditIcon color={"white"} size={"25px"}/>
            </button>

            {isEditModalOpen && (
                <EditProjectModal
                    setIsEditModalOpen={setIsEditModalOpen}
                    onClose={() => setIsEditModalOpen(false)}
                    data={project}
                    callback={(updatedProject) => callback(updatedProject)}
                />
            )}

            {isDeleteModalOpen &&
                <DeleteConfirmationModal
                    setIsDeleteModalOpen={setIsDeleteModalOpen}
                    onCancel={() => setIsDeleteModalOpen(false)}
                    project_id={project.id}
                />}
        </div>
    );
};

export default ProjectActionsMenu;

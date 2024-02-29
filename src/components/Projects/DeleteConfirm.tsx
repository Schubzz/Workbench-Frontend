import CautionIcon from "../../assets/Icons/CautionIcon.tsx";
import {ProjectContext} from "../../context/ProjectContext.tsx";
import {useContext} from "react";
import {useNavigate} from "react-router-dom";

const DeleteConfirmationModal = ({setIsDeleteModalOpen, onCancel, project_id}: {
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

        <div
            className="flex flex-col items-center gap-y-4 absolute top-2/3 left-1/2 translate-x-[-50%] bg-border border-t-2 border-solid border-red-900 p-4 rounded-md w-72 text-center">
            <CautionIcon color={"white"} size={"30px"}/>
            <p className="p-y-4">Delete permanently?</p>
            <div className="flex justify-center gap-2">
                <button onClick={onCancel} className="text-text-light">Cancel</button>
                <button onClick={handleConfirmDelete}
                        className="text-white px-2 py-1 rounded-md bg-red-500">Delete
                </button>
            </div>
        </div>

    );
};

export default DeleteConfirmationModal;

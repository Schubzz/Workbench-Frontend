import {useState} from "react";
import {NewProjectModal} from "./NewProjectModal.tsx";
import ProjectItem from "./ProjectItem.tsx";
import NewProjectButton from "./Projects/NewProjectButton.tsx";

const ProjectsList = ({callback} : {callback: () => void}) => {

    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <NewProjectButton onClick={() => setIsModalOpen(true)}/>

            <ProjectItem callback={callback}/>

            <NewProjectModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </>
    )
}
export default ProjectsList;


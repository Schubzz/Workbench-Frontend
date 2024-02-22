import {useState} from "react";
import {NewProjectModal} from "./NewProjectModal.tsx";
import ProjectItem from "./ProjectItem.tsx";
import NewProjectButton from "./Projects/NewProjectButton.tsx";
import {ProjectContext} from "../context/ProjectContext.tsx";
import {useContext} from "react";


const ProjectsList = ({callback}: { callback: () => void }) => {

    const [isModalOpen, setIsModalOpen] = useState(false);

    const {projects} = useContext(ProjectContext);

    return (
        <>
            <NewProjectButton onClick={() => setIsModalOpen(true)}/>

            {projects.map((project: any) => (
                <ProjectItem
                    key={project.id}
                    callback={callback}
                    project={project}
                />
            ))}

            <NewProjectModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </>
    )
}
export default ProjectsList;


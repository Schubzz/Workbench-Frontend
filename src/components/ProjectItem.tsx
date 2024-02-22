import React, {useState} from "react";
import Project from "../interfaces/ProjectInterface.tsx";
import {MeatballMenu} from "./MeatballMenu.tsx";
import ProjectMeatball from "./MeatballMenus/ProjectMeatball.tsx";
import StatusMeatball from "./MeatballMenus/StatusMeatball.tsx";
import InfoButton from "./Projects/InfoButton.tsx";
import PrioMeatball from "./MeatballMenus/PrioMeatball.tsx";
import {useNavigate} from "react-router-dom";
import {EditProjectModal} from "./EditProjectModal.tsx";


const ProjectItem = ({callback, project} : { callback: (project: string) => void , project: Project}) => {

    const navigate = useNavigate();

    const [isModalOpen, setIsModalOpen] = useState(false);

    const navigateToProject = (projectId: string) => {
        navigate(`/projects/${projectId}`)
    }
    const handleInfoButtonClick = (e: React.BaseSyntheticEvent, project: string) => {
        e.preventDefault();
        e.stopPropagation();
        callback(project);
    };


    return (
        <div>
            <div onClick={() => navigateToProject(project.id)}>
                <div
                    className="flex flex-row w-full justify-between items-center p-2 border border-b border-border hover:bg-body-bg-hover cursor-pointer rounded-md">
                    <div className="flex items-center gap-3">
                        {/* Edit & Delete */}
                        <MeatballMenu type="edit/delete">
                            <ProjectMeatball
                                projectId={project.id}
                                callback={(key: string) => {
                                    if (key == "edit") setIsModalOpen(true)
                                }}
                            />
                        </MeatballMenu>
                        {/* Status */}
                        <MeatballMenu type="statusMenu" status={project.attributes.status}>
                            <StatusMeatball/>
                        </MeatballMenu>

                        <h2 className="text-small">{project.attributes.title}</h2>

                        <InfoButton
                            onInfoClick={handleInfoButtonClick}
                            project={project}
                        />
                    </div>

                    <div className="flex items-center gap-3">
                        <div>
                            {/* Priority */}
                            <MeatballMenu type="prioMenu" status={project.attributes.priority}>
                                <PrioMeatball/>
                            </MeatballMenu>
                        </div>
                        <span
                            className="text-small text-text-gray hidden md:flex w-[5rem]">{project.attributes.created_at.split("T")[0]}
                            </span>
                    </div>
                </div>
                <div className="h-[1px] w-full bg-border"></div>
            </div>
            <EditProjectModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                data={project}
            />
        </div>
    )
}

export default ProjectItem

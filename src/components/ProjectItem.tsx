import React, {useEffect, useState} from "react";
import useAxios from "../hooks/useAxios.tsx";
import Project from "../interfaces/ProjectInterface.tsx";
import {MeatballMenu} from "./MeatballMenu.tsx";
import ProjectMeatball from "./MeatballMenus/ProjectMeatball.tsx";
import StatusMeatball from "./MeatballMenus/StatusMeatball.tsx";
import InfoButton from "./Projects/InfoButton.tsx";
import PrioMeatball from "./MeatballMenus/PrioMeatball.tsx";
import {useNavigate} from "react-router-dom";


const ProjectItem = ({callback}: { callback: (project: string) => void }) => {

    const http = useAxios();
    const navigate = useNavigate();

    const getProjects = async () => {
        try {
            const response = await http.get('/api/projects');
            return response.data;
        } catch (error) {
            console.error('Error fetching projects:', error);
        }
    };

    const [projects, setProjects] = useState<Project>([])

    useEffect(() => {
        getProjects().then(({data}) => {
            setProjects(data);
        });
    }, []);
    const navigateToProject = (projectId: string) => {
        navigate(`/projects/${projectId}`)
    }
    const handleInfoButtonClick = (e: React.BaseSyntheticEvent, project: string) => {
        e.stopPropagation();
        callback(project);
    };


    return (
        <div>
            {projects.map((project: Project) => (
                <div key={project.id} onClick={() => navigateToProject(project.id)}
                >
                    <div
                        className="flex flex-row w-full justify-between items-center p-2 border border-b border-border hover:bg-body-bg-hover cursor-pointer rounded-md">
                        <div className="flex items-center gap-3">
                            {/* Edit & Delete */}
                            <MeatballMenu type="edit/delete">
                                <ProjectMeatball projectId={project.id}/>
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
            ))}
        </div>
    )
}

export default ProjectItem

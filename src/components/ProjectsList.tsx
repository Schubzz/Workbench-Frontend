import {useEffect} from "react";
import React from "react";
import useAxios from "../hooks/useAxios.tsx";
import {useProject} from "../context/ProjectContext.tsx";

const ProjectsList = () => {

    const { setActiveProject } = useProject();

    const handleProjectClick = (project) => {
        setActiveProject(project); // Setzt das geklickte Projekt als aktives Projekt
    };



    interface Project {
        id: number;
        user_id: number;
        attributes: {
            name: string;
            priority: string;
            status: string;
            description: string;
            created_at: string;
            updated_at: string;
        };
    }

    const http = useAxios();
    const getProjects = async () => {
        try {
            const response = await http.get('/api/projects');
            return response.data;
        } catch (error) {
            console.error('Error fetching projects:', error);
            throw error;
        }
    };

    const [projects, setProjects] = React.useState<Project>([]);

    useEffect(() => {
        getProjects().then(({data}) => {
            // setIsLoading(true);
            console.log(data)
            setProjects(data);
        });
    }, []);

    const priority = {
        low: {src: "../../src/assets/PrioLow.svg", alt: "Low Priority"},
        medium: {src: "../../src/assets/PrioMedium.svg", alt: "Medium Priority"},
        high: {src: "../../src/assets/PrioHigh.svg", alt: "High Priority"}
    };

    const status = {
        "To-Do": {src: "../../src/assets/Open.svg", alt: "to do"},
        "In Progress": {src: "../../src/assets/inProgress.svg", alt: "in progress"},
        "Done": {src: "../../src/assets/Done.svg", alt: "done"}
    };


    return (

        <>
            {projects.map((project) => (
                <div
                    key={project.id}
                    onClick={() => handleProjectClick(project)}
                >

                    <div
                        className="project-selector flex flex-row w-full justify-between items-center p-2 border-b border-amber-50 hover:bg-body-bg-hover cursor-pointer rounded-md">
                        <div className="flex items-center gap-3">

                            {
                                (() => {
                                    const key = project.attributes.status as keyof typeof status;
                                    const {src, alt} = status[key] || {};
                                    return src && <img src={src} alt={alt} className="w-4 h-4"/>;
                                })()
                            }

                            <h2 className="text-small">{project.attributes.name}</h2>
                        </div>

                        <div className=" flex items-center gap-3">

                            <div className="flex items-center gap-3">

                                {
                                    (() => {
                                        const key = project.attributes.priority as keyof typeof priority;
                                        const {src, alt} = priority[key] || {};
                                        return src && <img src={src} alt={alt} className="w-6 h-6"/>;
                                    })()
                                }
                            </div>

                            <span
                                className="text-small text-text-gray">{project.attributes.created_at.split("T")[0]}</span>
                        </div>
                    </div>


                </div>
            ))}
        </>
    )
}
export default ProjectsList;
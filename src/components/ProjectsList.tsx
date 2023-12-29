import {useEffect} from "react";
import React from "react";
import useAxios from "../hooks/useAxios.tsx";

const Projects = () => {

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

    const [projects, setProjects] = React.useState([]);
    useEffect(() => {
        getProjects().then(({data}) => {
            // setIsLoading(true);
            console.log(data)
            setProjects(data);
        });
    }, []);


    return (

        <>
            {projects.map((project) => (
                <div
                    key={project.id}
                >

                    <div
                        className="flex flex-row w-full justify-between items-center p-2 border-b border-amber-50 hover:bg-body-bg-hover cursor-pointer rounded-md">

                        <div className="flex items-center gap-3">
                            <img src="../../src/assets/inProgress.svg" alt="inProgress" className="w-4 h-4"/>
                            <h2 className="text-small">{project.attributes.name}</h2>
                        </div>

                        <div className=" flex items-center gap-3">

                            <div className="flex items-center gap-3">
                                {project.attributes.priority == "low" && (
                                    <img src="../../src/assets/PrioLow.svg" alt="prio-high"
                                         className="w-6 h-6"/>)}

                                {project.attributes.priority == "medium" && (
                                    <img src="../../src/assets/PrioMedium.svg" alt="prio-high"
                                         className="w-6 h-6"/>)}

                                {project.attributes.priority == "high" && (
                                    <img src="../../src/assets/PrioHigh.svg" alt="prio-high"
                                         className="w-6 h-6"/>)}
                            </div>

                            <span className="text-[#818181] text-sm">
                                        11.11.23
                                    </span>
                        </div>
                    </div>


                </div>
            ))}
        </>
    )
}
export default Projects;
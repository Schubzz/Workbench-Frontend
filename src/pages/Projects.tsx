import withLayout from "../HOC/withLayout.tsx";
import ProjectsList from "../components/ProjectsList.tsx";
import InfoBar from "../components/InfoBar.tsx";
import {useEffect, useState} from "react";

const Projects = () => {

    const [activeProject, setActiveProject] = useState(null);
    const [isVisible, setIsVisible] = useState(false);


    useEffect(() => {
        if (activeProject) {
            setIsVisible(true); // Fährt die InfoBar aus
        }
    }, [activeProject]);

    return (
        <>
            <h2>Recent Projects</h2>
            <ProjectsList
                callback={(project) => {
                    setActiveProject(project)
                }}
            />
            <InfoBar
                isVisible={isVisible}
                activeProject={activeProject}
                callback={() => {
                    setIsVisible(false)
                    setTimeout(() => {
                        setActiveProject(null)
                    }, 300)
                }}
            />
        </>
    )
}

export default withLayout(Projects)
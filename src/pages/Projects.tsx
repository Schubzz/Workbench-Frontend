import withLayout from "../HOC/withLayout.tsx";
import ProjectsList from "../components/Projects/ProjectsList.tsx";
import InfoBar from "../components/Projects/InfoBar.tsx";
import { useEffect, useState} from "react";
import Project from "../interfaces/ProjectInterface.tsx";
import User from "../interfaces/UserInterface.tsx";


const Projects = ({user} : {
    user : User
}) => {


    const [activeProject, setActiveProject] = useState(null);
    const [isVisible, setIsVisible] = useState(false);


    useEffect(() => {
        if (activeProject) {
            setIsVisible(true);
        }
    }, [activeProject]);

    if (!user) {
        return null;
    }

    return (
        <>
            <h2>Recent Projects</h2>
            <ProjectsList
                callback={(project : Project) => {
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
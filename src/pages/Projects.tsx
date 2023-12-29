import withLayout from "../HOC/withLayout.tsx";
import ProjectsList from "../components/ProjectsList.tsx";

const Projects = () => {
    return (
        <>
            <ProjectsList/>
        </>
    )
}

export default withLayout(Projects)
import Project from "../interfaces/ProjectInterface.tsx";

const ProjectDetails = ({ project } : {project : Project}) => {
    return (
        <div className="flex justify-between gap-4 bg-border p-4 rounded-md">
            <div>
                <h2 className="text-large">{project?.attributes.title}</h2>
                <div className="flex items-center gap-x-2">
                    <p className="text-small text-text-light">|</p>
                    <p> {project?.attributes.description}</p>
                </div>
            </div>
        </div>
    );
};

export default ProjectDetails;

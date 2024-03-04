import Project from "../interfaces/ProjectInterface.tsx";
import {MeatballMenu} from "../components/MeatballMenus/MeatballMenu.tsx";
import StatusMeatball from "../components/MeatballMenus/StatusMeatball.tsx";
import PrioMeatball from "../components/MeatballMenus/PrioMeatball.tsx";


const ProjectDetails = ({project}: { project: Project }) => {
    return (
        <div className="flex flex-col justify-between  bg-border p-4 rounded-md">

            <div className="flex flex-col md:flex-row items-start md:items-center justify-start gap-x-2">
                <div className="flex items-center">
                    <p className="text-small text-text-gray">STATUS: </p>
                    {/* Status */}
                    <MeatballMenu type="statusMenu" status={project?.attributes.status}>
                        <StatusMeatball
                            project={project}
                        />
                    </MeatballMenu>
                </div>

                <div className="flex items-center">
                    <p className="text-small text-text-gray">PRIORITY: </p>
                    {/* Priority */}
                    <MeatballMenu type="prioMenu" status={project?.attributes.priority}>
                        <PrioMeatball
                            project={project}
                        />
                    </MeatballMenu>
                </div>

            </div>

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

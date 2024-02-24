import withLayout from "../HOC/withLayout.tsx";
import {useContext} from "react";
import {ProjectContext} from "../context/ProjectContext.tsx";
import {UserContext} from "../context/contextUser.tsx";

const Statistics = () => {

    const projects = useContext(ProjectContext);
    const user = useContext(UserContext);

    const doneProjects = projects.projects.filter((project) => project?.attributes.status === "done").length;

    return (
        <div className="w-full flex justify-center flex-col gap-4">
            <div className="">Statistics for {user.user.username}</div>

            {/*  div that shows the done projects */}
            <div className="mx-auto">
                <h2>Done Projects</h2>
                <p>{doneProjects}</p>
            </div>

            {/*  div that shows the total number of projects in the list */}
            <div className="mx-auto">
                <h2>Total Projects</h2>
                <p>{projects.projects.length}</p>
            </div>
        </div>
    )
}

export default withLayout(Statistics);
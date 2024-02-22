import withLayout from "../HOC/withLayout.tsx";
import {useContext} from "react";
import {ProjectContext} from "../context/ProjectContext.tsx";
import {UserContext} from "../context/contextUser.tsx";


const Dashboard = () => {

    const projects = useContext(ProjectContext);
    const user = useContext(UserContext);



    const doneProjects = projects.projects.filter((project) => project.attributes.status === "done").length;
    console.log(doneProjects);

    return (
        <div>
            <h1>Hello, {user.user.username}</h1>

            {/*  div that shows the last added project */}
            <div>
                <h2>Last added project</h2>
                <p>{projects.projects[projects.projects.length - 1].attributes.title}</p>
            </div>


            {/*  div that shows the project that is the longest time in the list */}
            <div>
                <h2>Longest project in the list</h2>
                <p>{projects.projects.sort((a, b) => new Date(b.attributes.created_at).getTime() - new Date(a.attributes.created_at).getTime())[0].attributes.title}</p>
            </div>



            {/*  div that shows the total number of projects added on a friday */}
            <div>
                <h2>Projects added on Friday</h2>
                <p>{projects.projects.filter((project) => new Date(project.attributes.created_at).getDay() === 5).length}</p>
            </div>


            {/*  div that shows the total number of projects added on a monday */}
            <div>
                <h2>Projects added on Monday</h2>
                <p>{projects.projects.filter((project) => new Date(project.attributes.created_at).getDay() === 1).length}</p>
            </div>


            {/*  div that shows the total number of projects in the list */}
            <div>
                <h2>Total Projects</h2>
                <p>{projects.projects.length}</p>
            </div>

            {/*  div that shows the total number of projects in the list where the status is "done" */}
            <div>
                <h2>Done Projects</h2>
                <p>{doneProjects}</p>

        </div>
        </div>
    )
}
export default withLayout(Dashboard);
import withLayout from "../HOC/withLayout.tsx";
import {useContext} from "react";
import {ProjectContext} from "../context/ProjectContext.tsx";
import {UserContext} from "../context/contextUser.tsx";

import BarChart from "../components/charts/barChart.tsx";
import DoughnutChart from "../components/charts/DoughnutChart.tsx";


const Statistics = () => {

    const projects = useContext(ProjectContext);
    const user = useContext(UserContext);

    const totalProjects = projects.projects.length;
    const toDoProjects = projects.projects.filter((project) => project?.attributes.status === "To-Do").length;
    const doneProjects = projects.projects.filter((project) => project?.attributes.status === "Done").length;
    const inProgressProjects = projects.projects.filter((project) => project?.attributes.status === "In Progress").length;

    console.log("total: " + totalProjects, "to-do: " + toDoProjects, "done: " + doneProjects, "in progress: " + inProgressProjects);

    return (
        <div className="w-full flex justify-center flex-col gap-4">
            <div className="">Statistics for {user.user.username}</div>


            <BarChart
                labels ={[
                    "to-do",
                    "in progress",
                    "done"

                ]}

                chartData = {[
                    toDoProjects,
                    inProgressProjects,
                    doneProjects
                ]}

                barColors= {[
                    "red",
                    "green",
                    "blue"
                ]}
            />

            <DoughnutChart/>


            <div className="mx-auto">
                <h2>Total Projects</h2>
                <p>{totalProjects}</p>
            </div>

            <div className="mx-auto">
                <h2>to-do Projects</h2>
                <p>{toDoProjects}</p>
            </div>

            <div className="mx-auto">
                <h2>In Progress Projects</h2>
                <p>{inProgressProjects}</p>
            </div>

            {/*  div that shows the total number of projects in the list */}
            <div className="mx-auto">
                <h2>Done Projects</h2>
                <p>{doneProjects}</p>
            </div>
        </div>
    )
}

export default withLayout(Statistics);
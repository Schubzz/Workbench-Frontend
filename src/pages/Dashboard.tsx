import withLayout from "../HOC/withLayout.tsx";
import {useContext, useEffect, useState} from "react";
import {ProjectContext} from "../context/ProjectContext.tsx";
import DoughnutChart from "../components/charts/DoughnutChart.tsx";
import useAxios from "../hooks/useAxios.tsx";
import Task from "../interfaces/TaskInterface.tsx";
import {useNavigate} from "react-router-dom";


const Dashboard = () => {

    const projects = useContext(ProjectContext);

    const http = useAxios();
    const navigate = useNavigate();
    const [tasks, setTasks] = useState<Task[]>([]);

    const tasksList = async () => {
        try {
            const response = await http.get(`/api/tasks`);
            setTasks(response.data.data)
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }

    }


    const totalTasks = tasks.length;
    const toDoTasks = tasks.filter((task) => task?.attributes.status === "To-Do").length;
    const doneTasks = tasks.filter((task) => task?.attributes.status === "Done").length;
    const inProgressTasks = tasks.filter((task) => task?.attributes.status === "In Progress").length;

    const totalProjects = projects.projects.length;
    const toDoProjects = projects.projects.filter((project) => project?.attributes.status === "To-Do").length;
    const doneProjects = projects.projects.filter((project) => project?.attributes.status === "Done").length;
    const inProgressProjects = projects.projects.filter((project) => project?.attributes.status === "In Progress").length;

    const lastTwoAddedProjects = projects.projects.slice(-2);

    const navigateToProject = (projectId: string) => {
        navigate(`/projects/${projectId}`)
    }
    const formattedDate = (dateString: string) => {
        const date = new Date(dateString);

        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');

        return date.toLocaleDateString('en-US') + ' at ' + hours + ':' + minutes;
    };

    useEffect(() => {
        tasksList()
    }, []);



    return (
        <div className="w-full flex flex-col gap-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-[2rem] self-center lg:self-start ] ">

                <div className="relative flex items-center justify-center bg-body-bg-hover rounded-md ">
                    <div className="flex flex-col absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]">
                        <h2 className="text-small">Total Projects:</h2>
                        <h2 className="text-center text-medium">{totalProjects}</h2>
                    </div>

                    {/*Projects*/}
                    <DoughnutChart
                        labels={[
                            "to-do",
                            "in progress",
                            "done"
                        ]}

                        chartData={[
                            toDoProjects,
                            inProgressProjects,
                            doneProjects
                        ]}

                        arkColors={[
                            "#D9D9D9",
                            "#3C70A4",
                            "rgb(34,176,56)"
                        ]}
                    />
                </div>

                <div className="relative flex items-center justify-center bg-body-bg-hover rounded-md">
                    <div className="flex flex-col absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]">
                        <h2 className="text-small">Total Tasks:</h2>
                        <h2 className="text-center text-medium">{totalTasks}</h2>
                    </div>
                    <DoughnutChart
                        labels={[
                            "to-do",
                            "in progress",
                            "done"
                        ]}

                        chartData={[
                            toDoTasks,
                            inProgressTasks,
                            doneTasks
                        ]}

                        arkColors={[
                            "#D9D9D9",
                            "#3C70A4",
                            "rgb(34,176,56)"
                        ]}
                    />
                </div>

                <div className="bg-body-bg-hover p-6 rounded-md">
                    <div>
                        <p className="text-medium mb-6">recently added Projects:</p>
                    </div>
                    <div className="flex flex-col gap-2">
                        {lastTwoAddedProjects.reverse().map((project, index) => {
                            return (
                                <div key={index}>
                                    <p onClick={() => navigateToProject(project.id)}
                                       className="text-small hover:underline cursor-pointer"
                                    >
                                        {project.attributes.title} -
                                        <span
                                            className="text-text-gray"> on {formattedDate(project.attributes.created_at)}
                                    </span>
                                    </p>
                                </div>
                            )
                        })}
                    </div>
                </div>

                <div className="bg-body-bg-hover p-6 rounded-md">
                    <div>
                        <p className="text-medium mb-6">recently added Tasks:</p>
                    </div>
                    <div className="flex flex-col gap-2">
                        {tasks.slice(-2).reverse().map((task, index) => {
                            return (
                                <div key={index}>
                                    <p onClick={() => navigateToProject(task.relationships.project.id)}
                                       className="text-small hover:underline cursor-pointer"
                                    >
                                        {task.attributes.title} -
                                        <span
                                            className="text-text-gray"> on {projects.projects.find((project) => project.id === task.relationships.project.id)?.attributes.title}
                                        </span>
                                    </p>
                                </div>
                            )
                        })}

                    </div>
                </div>
            </div>
        </div>
    )
}

export default withLayout(Dashboard);
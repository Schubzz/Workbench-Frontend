import toDo from "../../assets/Open.svg";
import inProgress from "../../assets/inProgress.svg";
import done from "../../assets/Done.svg";
import Project from "../../interfaces/ProjectInterface.tsx";
import useAxios from "../../hooks/useAxios.tsx";
import {ProjectContext} from "../../context/ProjectContext.tsx";
import {useContext} from "react";

const StatusMeatball = ({project} : {project : Project}) => {

    const http = useAxios();
    const {editProject} = useContext(ProjectContext);

    const editStatus = async (status: string) => {
        try {
            const response = await http.patch(`/api/projects/${project.id}`, {status});
            editProject(response.data.data);
        } catch (error) {
            console.error('Fehler beim bearbeiten des Projekts:', error);
        }
    }

    const statusItems = [
        {
            label: "To Do",
            icon: <img src={toDo} alt="to-do" className="w-4 h-4"/>,
            action: () => {
                editStatus("To-Do")
            }
        },
        {
            label: "In Progress",
            icon: <img src={inProgress} alt="in progress" className="w-4 h-4"/>,
            action: () => {
                editStatus("In Progress")
            }
        },
        {
            label: "Done",
            icon: <img src={done} alt="done" className="w-4 h-4"/>,
            action: () => {
                editStatus("Done")
            }
        }
    ];

    return (
        <>
            {statusItems.map((item, index) => (
                <div key={index}
                >
                    <div
                        className="flex items-center justify-start gap-x-2 text-small text-text-gray hover:text-text-light p-2 cursor-pointer hover:bg-body-bg-hover w-[8rem]"
                        onClick={(e) => {
                            e.stopPropagation();
                            item.action();
                        }}>
                        <span className="">{item.icon}</span>
                        {item.label}
                    </div>
                </div>
            ))}
        </>
    )
}

export default StatusMeatball
import low from "../../assets/PrioLow.svg";
import medium from "../../assets/PrioMedium.svg";
import high from "../../assets/PrioHigh.svg";
import Project from "../../interfaces/ProjectInterface.tsx";
import {ProjectContext} from "../../context/ProjectContext.tsx";
import {useContext} from "react";
import useAxios from "../../hooks/useAxios.tsx";


const PrioMeatball = ({project}: { project: Project }) => {

    const http = useAxios();
    const {editProject} = useContext(ProjectContext);

    const editPrio = async (priority: string) => {
        try {
            const response = await http.patch(`/api/projects/${project.id}`, {priority});
            console.log(response)
            editProject(response.data.data);
        } catch (error) {
            console.error('Fehler beim bearbeiten des Projekts:', error);
        }
    }

    const prioItems = [
        {
            label: "low",
            icon: <img src={low} alt="low" className="w-6 h-6"/>,
            action: () => {
                editPrio("low")
            }
        },
        {
            label: "medium",
            icon: <img src={medium} alt="medium" className="w-6 h-6"/>,
            action: () => {
                editPrio("medium")
            }
        },

        {
            label: "high",
            icon: <img src={high} alt="high" className="w-6 h-6"/>,
            action: () => {
                editPrio("high")
            }
        },
    ]

    return (
        <>
            {prioItems.map((item, index) => (
                <div key={index}>
                    <div
                        className="flex items-center justify-start gap-x-2 text-small text-text-gray hover:text-text-light p-2 cursor-pointer hover:bg-body-bg-hover w-[7rem]"
                        onClick={(e) => {
                            e.stopPropagation();
                            item.action(); // Aufrufen der action-Funktion
                        }}>
                        <span className="">{item.icon}</span>
                        {item.label}
                    </div>
                </div>
            ))}
        </>
    )
}

export default PrioMeatball
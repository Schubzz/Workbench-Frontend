import {useRef} from "react";


const ProjectMeatball = ({projectId, callback}: { projectId: number, callback: any }) => {


    const ref = useRef()

    const deleteProject = (projectId: string) => {
        return projectId;
    }


    const menuItems = [
        {
            label: "Edit",
            icon: "✏️",
            action: () => {
                callback("edit")
                ref.current.parentNode.style.display = "none"
            },
        },
        {
            label: "Delete",
            icon: "🗑️",
            action: () => {
                deleteProject(projectId.toString());
                console.log("DELETE request für Projekt", projectId);
            },
        },
    ];


    return (
        <div ref={ref}>
            {menuItems.map((item, index) => (
                <div key={index}>
                    <div
                        className="flex items-center justify-between text-small p-2 cursor-pointer hover:bg-body-bg-hover w-[10rem]"
                        onClick={(e) => {
                            e.stopPropagation();
                            item.action();
                        }}>
                        {item.label}
                        <span className="">{item.icon}</span>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default ProjectMeatball
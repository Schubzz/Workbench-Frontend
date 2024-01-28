const ProjectMeatball = ({projectId}: any) => {


    const deleteProject = (projectId: string) => {
        return projectId;
    }

    const patchProject = (projectId: string) => {
        return projectId;
    };


    const menuItems = [
        {
            label: "Edit",
            icon: "✏️",
            action: () => {
                patchProject(projectId)
                console.log("PATCH request für Projekt", projectId);
            },
        },
        {
            label: "Delete",
            icon: "🗑️",
            action: () => {
                deleteProject(projectId);
                console.log("DELETE request für Projekt", projectId);
            },
        },
    ];


    return (
        <>
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
        </>
    )
}

export default ProjectMeatball
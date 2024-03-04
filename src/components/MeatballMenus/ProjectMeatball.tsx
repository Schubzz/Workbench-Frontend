import {useRef, useState} from "react";
import ProjectDeleteConfirmationModal from "../Projects/ProjectDeleteConfirm.tsx";

const ProjectMeatball = ({projectId, callback}: {
    projectId: string,
    callback: () => void
}) => {

    const ref = useRef<HTMLDivElement>(null);

    const project_id = projectId;

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const handleDeleteProject = async () => {
        setIsDeleteModalOpen(true);
    };

    const menuItems = [
        {
            label: "Edit",
            icon: "✏️",
            action: () => {
                callback("edit")
                if (ref.current) {
                    const parentNode = ref.current.parentNode;
                    if (parentNode) {
                        parentNode.style.display = "none";
                    }
                }
            },
        },
        {
            label: "Delete",
            icon: "🗑️",
            action: () => {
                handleDeleteProject()
            },
        },
    ];


    return (
        <div>
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
            <div>
                {isDeleteModalOpen &&
                    <ProjectDeleteConfirmationModal
                        setIsDeleteModalOpen={setIsDeleteModalOpen}
                        onCancel={() => setIsDeleteModalOpen(false)}
                        project_id={project_id}
                    />}
            </div>
        </div>
    )
}

export default ProjectMeatball
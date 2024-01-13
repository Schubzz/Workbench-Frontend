const ProjectItem = ({ project, onInfoClick, onProjectClick }) => {
    // Logik zur Anzeige eines Projekts
    return (
        <div onClick={onProjectClick}>
            <div
                                    key={project.id}
                                    onClick={() => navigateToProject(project.id)}

                                >
                                    <div
                                        className="project-selector flex flex-row w-full justify-between items-center p-2 border-b border-amber-50 hover:bg-body-bg-hover cursor-pointer rounded-md">
                                        <div className="flex items-center gap-3">

                                            {
                                                (() => {
                                                    const key = project.attributes.status as keyof typeof status;
                                                    const {src, alt} = status[key] || {};
                                                    return src && <img src={src} alt={alt} className="w-4 h-4"/>;
                                                })()
                                            }

                                            <h2 className="text-small">{project.attributes.title}</h2>
                                            <button
                                                onClick={(e) => handleInfoButtonClick(e, project)}
                                                className="text-small text-accent font-black border border-solid border-accent rounded-full w-4 h-4 flex items-center justify-center hover:bg-border"
                                            >
                                                i
                                            </button>
                                        </div>

                                        <div className=" flex items-center gap-3">

                                            <div className="flex items-center gap-3">

                                                {
                                                    (() => {
                                                        const key = project.attributes.priority as keyof typeof priority;
                                                        const {src, alt} = priority[key] || {};
                                                        return src && <img src={src} alt={alt} className="w-6 h-6"/>;
                                                    })()
                                                }
                                            </div>

                                            <span
                                                className="text-small text-text-gray hidden md:flex">{project.attributes.created_at.split("T")[0]}</span>
                                        </div>
                                    </div>
            <button onClick={onInfoClick}>
                i
            </button>
        </div>

    );
};

export default ProjectItem;

import Project from "../../interfaces/ProjectInterface.tsx";


const InfoButton = ({onInfoClick, project}: { onInfoClick: any, project: Project }) => {
    return (
        <button
            onClick={(e) => onInfoClick(e, project)}
            className="text-sm text-accent font-black  w-4 h-4 flex items-center justify-center"
        >
            &#9432;
        </button>
    )
}

export default InfoButton
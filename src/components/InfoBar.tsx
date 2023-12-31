import { useState, useEffect, useRef} from 'react';
import { useProject } from '../context/ProjectContext.tsx';

export default function InfoBar() {
    const { activeProject, setActiveProject } = useProject();
    const [isVisible, setIsVisible] = useState(false);
    const infoBarRef = useRef(null);

    useEffect(() => {
        if (activeProject) {
            setIsVisible(true); // Fährt die InfoBar aus
        }
    }, [activeProject]);

    function isClickInsideProjectSelector(element) {
        return element.closest('.project-selector');
    }

    useEffect(() => {
        function handleClickOutside(event) {
            if (infoBarRef.current && !infoBarRef.current.contains(event.target) && !isClickInsideProjectSelector(event.target)) {
                handleClose();
            }
        }

        if (activeProject) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [activeProject]);

    const handleClose = () => {
        setIsVisible(false);
        setTimeout(() => {
            setActiveProject(null);
        }, 500);
    };

    if (!activeProject) {
        return null;
    }

    return (
        <div ref={infoBarRef} className={`fixed top-0 right-[-60%] md:right-[-40%] w-[60%] md:w-[40%] z-20 h-[100dvh]  flex flex-col backdrop-blur-md bg-border/10 border-l border-solid border-border info-bar ${isVisible ? 'open' : ''}`}>
            {(
                <>
                    <button id="close-btn"
                            onClick={handleClose}
                            className="flex flex-col p-[.125rem] cursor-pointer mt-4">
                        <span className="w-[20px] h-[3px] transition bg-accent rotate-45"></span>
                        <span className="w-[20px] h-[3px] transition bg-accent -rotate-45 translate-y-[-3px]"></span>
                    </button>
                    <h2>Projektname: {activeProject?.attributes.name}</h2>
                    <p>Priorität: {activeProject?.attributes.priority}</p>
                    <p>Status: {activeProject?.attributes.status}</p>
                    <p>Beschreibung: {activeProject?.attributes.description}</p>
                </>
            )}
        </div>
    );
}


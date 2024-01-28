import {useEffect, useRef} from 'react';
import Project from "../interfaces/ProjectInterface.tsx";

export default function InfoBar({activeProject, isVisible, callback} : {activeProject: Project, isVisible: boolean, callback: () => void}) {

    const infoBarRef = useRef(null);

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

    useEffect(() => {
        if (!isVisible) {
            const timeoutId = setTimeout(() => {
                callback(); // activeProject wird hier nicht zurückgesetzt, da die InfoBar geschlossen wird
            }, 500);
            return () => clearTimeout(timeoutId); // Timer löschen, wenn die Komponente entladen wird
        }
    }, [isVisible, callback]);


    const handleClose = () => {
        callback();
    };


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
                    <h2>Projektname: {activeProject?.attributes.title}</h2>
                    <p>Priorität: {activeProject?.attributes.priority}</p>
                    <p>Status: {activeProject?.attributes.status}</p>
                    <p>Beschreibung: {activeProject?.attributes.description}</p>
                </>
            )}
        </div>
    );
}


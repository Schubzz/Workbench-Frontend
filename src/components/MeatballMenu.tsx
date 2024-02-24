import React, {useEffect, useState} from "react";
import {Status} from "./Status.tsx";
import {Priority} from "./Priority.tsx";



export const MeatballMenu = ({ children, type, status = "none" } : {children: any, type: string, status?: string}) => {


    const priorityImg = Priority;
    const statusImg = Status;

    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = (e: React.BaseSyntheticEvent) => {
        e.stopPropagation();
        document.dispatchEvent(new CustomEvent('closeMeatballMenus'));
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        const closeMenu = () => {

                setIsOpen(false);

        };

        // Fügt einen globalen Event-Listener hinzu
        document.addEventListener('click', closeMenu);

        // Bereinigungsfunktion, um den Event-Listener zu entfernen
        return () => {
            document.removeEventListener('click', closeMenu);
        };
    }, []);

    useEffect(() => {
        const handleMenuClose = () => {
            setIsOpen(false); // Schließt das Menü
        };

        // Fügt einen Listener für das benutzerdefinierte 'closeMeatballMenus'-Event hinzu
        document.addEventListener('closeMeatballMenus', handleMenuClose);

        // Bereinigungsfunktion, um den Event-Listener zu entfernen
        return () => {
            document.removeEventListener('closeMeatballMenus', handleMenuClose);
        };
    }, []);


    return (
        <div className="relative">
            { type == "edit/delete" && (
                <button onClick={toggleMenu} className="text-text-light hover:bg-body-bg rounded-md p-1">
                    <span>⋮</span>
                </button>
            )}

            { type == "statusMenu" && (
                <button onClick={toggleMenu} className="text-text-light hover:bg-body-bg rounded-md p-1">
                    {
                        (() => {
                            const {src, alt} = statusImg[status] ;
                            return src && <img src={src} alt={alt} className="w-4 h-4"/>;
                        })()
                    }
                </button>
            )}

            { type == "prioMenu" && (
                <button onClick={toggleMenu} className="text-text-light hover:bg-body-bg rounded-md p-1">

                    {
                        (() => {
                            const {src, alt} = priorityImg[status] ;
                            return src && <img src={src} alt={alt} className="w-6 h-6"/>;
                        })()
                    }

                </button>
            )}
            {isOpen && (
                <div className="meatball-menu absolute border border-solid border-border bg-border z-20 rounded-md">
                    {children}
                </div>
            )}
        </div>
    );
};

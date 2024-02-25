import React, {useEffect, useRef, useState} from "react";
import {Status} from "../Status.tsx";
import {Priority} from "../Priority.tsx";

export const MeatballMenu = ({children, type, status }: { children: any, type: string, status?: string }) => {

    const prioImg = Priority;
    const statusImg = Status;

    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = (e: React.BaseSyntheticEvent) => {
        e.stopPropagation();
        document.dispatchEvent(new CustomEvent('closeMeatballMenus'));
        setIsOpen(!isOpen);
    };

    useRef()

    useEffect(() => {
        const closeMenu = () => {
            setIsOpen(false);
        };
        document.addEventListener('click', closeMenu);
        return () => {
            document.removeEventListener('click', closeMenu);
        };
    }, []);

    useEffect(() => {
        const handleMenuClose = () => {
            setIsOpen(false);
        };
        document.addEventListener('closeMeatballMenus', handleMenuClose);
        return () => {
            document.removeEventListener('closeMeatballMenus', handleMenuClose);
        };
    }, []);


    return (
        <div className="relative">
            {type == "edit/delete" && (
                <button onClick={toggleMenu} className="text-text-light hover:bg-body-bg rounded-md p-1">
                    <span>⋮</span>
                </button>
            )}

            {type == "statusMenu" && (
                <button onClick={toggleMenu} className="text-text-light hover:bg-body-bg rounded-md p-1">
                    {
                        (() => {
                            const { src, alt } = statusImg[status ?? ""] || {};
                            return src && <img src={src} alt={alt} className="w-4 h-4"/>;
                        })()
                    }
                </button>
            )}

            {type == "prioMenu" && (
                <button onClick={toggleMenu} className="text-text-light hover:bg-body-bg rounded-md p-1">

                    {
                        (() => {
                            const {src, alt} = prioImg[ status ?? "" ] || {};
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

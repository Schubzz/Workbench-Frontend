import {useEffect, useRef, useState} from 'react';
import Project from "../../interfaces/ProjectInterface.tsx";
import {Priority} from "../Priority.tsx";
import {Status} from "../Status.tsx";
import DoughnutChart from "../charts/DoughnutChart.tsx";
import useAxios from "../../hooks/useAxios.tsx";
import Task from "../../interfaces/TaskInterface.tsx";


export default function InfoBar({activeProject, isVisible, callback}: {
    activeProject: Project,
    isVisible: boolean,
    callback: () => void
}) {

    const http = useAxios();
    const [tasks, setTasks] = useState<Task[]>([]);

    const tasksList = async () => {
        try {
            const response = await http.get(`/api/tasks`);
            setTasks(response.data.data)
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }

    }

    const infoBarRef = useRef(null);

    const priority = Priority;
    const status = Status;

    const totalTasks = activeProject?.relationships.tasks.length;
    const toDoTasks = activeProject?.relationships.tasks.filter((task: Task) => task?.attributes.status === "To-Do").length;
    const inProgressTasks = activeProject?.relationships.tasks.filter((task: Task) => task?.attributes.status === "In Progress").length;
    const doneTasks = activeProject?.relationships.tasks.filter((task: Task) => task?.attributes.status === "Done").length;


    function isClickInsideProjectSelector(element: any) {
        return element.closest('.project-selector');
    }

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (infoBarRef.current && !event.target.classList.contains("infobar-opener") && !infoBarRef.current.contains(event.target) && !isClickInsideProjectSelector(event.target)) {
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
                callback();
                tasksList();
            }, 500);
            return () => clearTimeout(timeoutId);
        }
    }, [isVisible, callback]);

    const handleClose = () => {
        callback();
    };


    return (
        <div ref={infoBarRef}
             className={`fixed top-0 right-[-15rem] w-[15rem]  h-[100dvh] p-2 flex flex-col backdrop-blur-md bg-border/10 border-l border-solid border-border info-bar z-[110] ${isVisible ? 'open' : ''}`}>
            {(
                <>
                    <button id="close-btn"
                            onClick={handleClose}
                            className="flex flex-col p-[.125rem] cursor-pointer my-4">
                        <span className="w-[20px] h-[3px] transition bg-accent rotate-45"></span>
                        <span className="w-[20px] h-[3px] transition bg-accent -rotate-45 translate-y-[-3px]"></span>
                    </button>

                    <div className=" bg-border rounded-md p-4">
                        <h2 className="text-small">Project:</h2>
                        <span className="text-medium"> | {activeProject?.attributes.title}</span>
                        <p className="text-small">| {activeProject?.attributes.description}</p>

                        <div className="flex my-4 gap-4">
                            <div className="flex items-center gap-2">
                                {
                                    (() => {
                                        const key = activeProject?.attributes.status as keyof typeof status;
                                        const {src, alt} = status[key] || {};
                                        return src && <img src={src} alt={alt} className="w-6 h-6"/>;
                                    })()
                                }
                                <p className="text-text-gray text-small"> {activeProject?.attributes.status}</p>
                            </div>

                            <div className="flex items-center gap-2">
                                <div className="flex items-center gap-3">
                                    {
                                        (() => {
                                            const key = activeProject?.attributes.priority as keyof typeof priority;
                                            const {src, alt} = priority[key] || {};
                                            return src && <img src={src} alt={alt} className="w-6 h-6"/>;
                                        })()
                                    }
                                </div>
                                <p className="text-text-gray text-small">{activeProject?.attributes.priority}</p>
                            </div>
                        </div>
                    </div>

                    <div className="relative flex items-center justify-center">
                        <div className="flex flex-col absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-80%]">
                            <h2 className="text-small">Tasks:</h2>
                            <h2 className="text-center text-medium">{totalTasks}</h2>
                        </div>


                        <DoughnutChart
                            labels={[
                                "to-do",
                                "in progress",
                                "done"
                            ]}

                            chartData={[
                                toDoTasks,
                                inProgressTasks,
                                doneTasks
                            ]}

                            arkColors={[
                                "#D9D9D9",
                                "#3C70A4",
                                "rgb(34,176,56)"
                            ]}
                        />
                    </div>

                </>
            )}
        </div>
    );
}


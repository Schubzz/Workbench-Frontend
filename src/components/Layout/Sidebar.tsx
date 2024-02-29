import {UserContext} from "../../context/contextUser.tsx";
import {useContext} from "react";
import NavLink from "./Navlink.tsx";
import {Link} from "react-router-dom";

import dashboardIcon from "../../assets/Icons/dashboard.svg";
import projectsIcon from "../../assets/Icons/projects.svg";
import tasksIcon from "../../assets/Icons/tasks.svg";
import settingsIcon from "../../assets/Icons/settings.svg";
import logoutIcon from "../../assets/Icons/logout.svg";



export default function Sidebar({onClose, isVisible}: { onClose () : void, isVisible: boolean }) {

    const {user, logout} = useContext(UserContext);

    const icons = {
        dashboardIcon,
        projectsIcon,
        tasksIcon,
        settingsIcon,
        logoutIcon,
    };


    return (
        <aside id="sidebar"
               className={`grow-[1] basis-[200px] trans w-[250px] fixed left-[-250px] z-20 flex flex-col top-0  bg-body-bg border border-solid border-r border-border lg:sticky h-[100dvh] 
               ${isVisible ? 'aside-visible' : ''}`}>
            <div id="info-head"
                 className="flex items-center justify-between h-[80px] p-5 border-b border-solid border-border">

                <span>
                    {user?.username}
                </span>

                {user && <img src={`${user?.profile_image}`}
                              alt="profile-img"
                              className="w-[50px] h-[50px] border border-solid rounded-full border-border"/>}
                <button id="close-btn"
                        onClick={onClose}
                        className="close-btn flex flex-col p-[.125rem] cursor-pointer lg:hidden">
                    <span className="w-[20px] h-[3px] transition bg-text-light rotate-45"></span>
                    <span className="w-[20px] h-[3px] transition bg-text-light -rotate-45 translate-y-[-3px]"></span>
                </button>
            </div>

            <ul id="navigation">
                {[
                    {name: 'Dashboard', path: '/dashboard', icon: 'dashboardIcon'},
                    {name: 'Projects', path: '/projects', icon: 'projectsIcon'},
                    {name: 'Tasks', path: '/tasks' , icon: 'tasksIcon'},
                ].map((link, index) => (
                    <NavLink
                        key={index}
                        linkIcon={icons[link.icon]}
                        linkText={link.name}
                        link={link.path}
                    />
                ))}
            </ul>

            <ul id="bottom-nav" className="mt-auto">
                <li className="text-small font-medium transition hover:bg-body-bg-hover">
                        <Link to={"/settings"} className="flex items-center justify-start h-full w-full gap-2 px-4 py-2">
                            <img src={settingsIcon} alt="settings" className="w-6 h-6"/>
                            <p>
                                Settings
                            </p>
                        </Link>
                </li>
                <li className="text-small font-medium transition hover:bg-red-900">
                    <button
                        onClick={logout}
                        className="flex items-center justify-start h-full w-full gap-2 px-4 py-2">
                        <img src={logoutIcon} alt="settings" className="w-6 h-6"/>
                        <p>
                            Logout
                        </p>
                    </button>
                </li>
            </ul>

        </aside>
    )
}

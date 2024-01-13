import {UserContext} from "../context/contextUser.tsx";
import {useContext} from "react";
import NavLink from "./Navlink.tsx";
import {BASE_URL} from "../baseURL.tsx";

export default function Sidebar({onClose, isVisible}: { onClose: never, isVisible: boolean }) {

    const {user, logout} = useContext(UserContext);


    return (
        <aside id="sidebar"
               className={`grow-[1] basis-[200px] trans w-[250px] fixed left-[-250px] z-20 flex flex-col top-0  bg-body-bg border border-solid border-r border-border lg:sticky h-[100dvh] 
               ${isVisible ? 'aside-visible' : ''}`}>
            <div id="info-head"
                 className="flex items-center justify-between h-[80px] p-5 border-b border-solid border-border">

                <span>
                    {user?.username}
                </span>

                {user && <img src={`${BASE_URL}${user?.profile_image}`}
                              alt="profile-img"
                              className="w-[50px] h-[50px] border border-solid rounded-full border-border" />}
                <button id="close-btn"
                        onClick={onClose}
                        className="close-btn flex flex-col p-[.125rem] cursor-pointer lg:hidden">
                    <span className="w-[20px] h-[3px] transition bg-text-light rotate-45"></span>
                    <span className="w-[20px] h-[3px] transition bg-text-light -rotate-45 translate-y-[-3px]"></span>
                </button>
            </div>

            <ul id="navigation">
                {[
                    { name: 'Dashboard', path: '/dashboard' },
                    { name: 'Projects', path: '/projects' },
                    { name: 'Tasks', path: '/tasks' },
                    { name: 'Statistics', path: '/statistics' }
                ].map((link, index) => (
                    <NavLink
                        key={index}
                        linkText={link.name}
                        link={link.path}

                    />
                ))}
            </ul>

            <ul id="bottom-nav" className="mt-auto">
                <li className="text-small font-medium transition hover:bg-body-bg-hover">
                    <a href="#" className="flex items-center justify-start h-full w-full gap-2 px-4 py-2">
                        <div className="w-[20px] h-[20px] border custom-border-radius bg-accent">

                        </div>
                        <p>
                            Settings
                        </p>
                    </a>
                </li>
                <li className="text-small font-medium transition hover:bg-red-900">
                    <button
                        onClick={logout}
                        className="flex items-center justify-start h-full w-full gap-2 px-4 py-2">
                        <div className="w-[20px] h-[20px] border custom-border-radius bg-accent">

                        </div>
                        <p>
                            Logout
                        </p>
                    </button>
                </li>
            </ul>

        </aside>
    )
}

import Topbar from "./Topbar.tsx";
import Sidebar from "./Sidebar.tsx";
import Backdrop from "./Backdrop.tsx";
import Content from "./Content.tsx";
import React, {useState} from "react";

interface LayoutProps {
    children: React.ReactNode;
}

export default function Layout({children}: LayoutProps) {

    const [sidebarVisible, setSidebarVisible] = useState(false);

    const toggleSidebar = () => {
        setSidebarVisible(!sidebarVisible);
        if (sidebarVisible) {
            document.body.classList.remove('no-scroll');
        } else {
            document.body.classList.add('no-scroll');
        }
    };


    return (

        <div className="bg-body-bg">

            <Backdrop isVisible={sidebarVisible}
                      onClick={toggleSidebar}/>

            <main className="flex items-start h-full w-full">

                <Sidebar onClose={toggleSidebar}
                         isVisible={sidebarVisible}/>

                <div id="main-content"
                     className="grow-[9999] basis-[500px] bg-body-bg relative">

                    <Topbar onOpen={toggleSidebar}/>

                    <Content>
                        {children}
                    </Content>

                </div>


            </main>

        </div>

    )
}
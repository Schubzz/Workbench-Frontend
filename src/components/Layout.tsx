import Topbar from "./Topbar.tsx";
import Sidebar from "./Sidebar.tsx";
import Backdrop from "./Backdrop.tsx";
import Content from "./Content.tsx"
import React from "react";

interface LayoutProps {
    children: React.ReactNode;
}
const Layout = ({children}: LayoutProps) => {
    return (

        <div className="bg-body-bg">

            <Backdrop/>

            <main className="flex items-start h-full w-full">

                <Sidebar/>

                <div id="main-content"
                     className="grow-[9999] basis-[500px] bg-body-bg">

                    <Topbar/>

                    <Content>
                        {children}
                    </Content>

                </div>

            </main>

        </div>

    )
}

export default Layout
const Layout = ({children}: { children: never }) => {
    return (

        <div className="bg-body-bg">

            <div id="backdrop"
                 className="fixed top-0 left-0 w-full h-full z-10 opacity-0 invisible bg-bg-trans trans-visible"
            >
            </div>

            <main className="flex items-start h-full w-full">

                <aside id="sidebar"
                       className="grow-[1] basis-[200px] trans w-[250px] fixed left-[-250px] z-20 flex flex-col top-0  bg-body-bg border border-solid border-r border-border lg:sticky h-[100dvh]">
                    <div id="info-head"
                         className="flex items-center justify-between h-[80px] p-5 border-b border-solid border-border">
                        <img src="./src/img/profile-img.jpeg"
                             alt="profile-img"
                             className="w-[50px] h-[50px] border border-solid rounded-full border-border"
                        />
                        <button id="close-btn"
                                className="close-btn flex flex-col p-[.125rem] cursor-pointer lg:hidden">
                            <span className="w-[20px] h-[3px] transition bg-text-light rotate-45"></span>
                            <span className="w-[20px] h-[3px] transition bg-text-light -rotate-45 translate-y-[-3px]"></span>
                        </button>
                    </div>

                    <ul id="navigation">
                        <li className="text-small font-medium transition hover:bg-body-bg-hover">
                            <a href="#" className="flex items-center justify-start h-full w-full gap-2 px-4 py-2">
                                <div className="w-[20px] h-[20px] border custom-border-radius bg-accent">

                                </div>
                                <p>
                                    Nav Link 1
                                </p>
                            </a>
                        </li>
                        <li className="text-small font-medium transition hover:bg-body-bg-hover">
                            <a href="#" className="flex items-center justify-start h-full w-full gap-2 px-4 py-2">
                                <div className="w-[20px] h-[20px] border custom-border-radius bg-accent">

                                </div>
                                <p>
                                    Nav Link 2
                                </p>
                            </a>
                        </li>
                        <li className="text-small font-medium transition hover:bg-body-bg-hover">
                            <a href="#" className="flex items-center justify-start h-full w-full gap-2 px-4 py-2">
                                <div className="w-[20px] h-[20px] border custom-border-radius bg-accent">

                                </div>
                                <p>
                                    Nav Link 3
                                </p>
                            </a>
                        </li>
                        <li className="text-small font-medium transition hover:bg-body-bg-hover">
                            <a href="#" className="flex items-center justify-start h-full w-full gap-2 px-4 py-2">
                                <div className="w-[20px] h-[20px] border custom-border-radius bg-accent">

                                </div>
                                <p>
                                    Nav Link 4
                                </p>
                            </a>
                        </li>
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
                            <a href="#" className="flex items-center justify-start h-full w-full gap-2 px-4 py-2">
                                <div className="w-[20px] h-[20px] border custom-border-radius bg-accent">

                                </div>
                                <p>
                                    Logout
                                </p>
                            </a>
                        </li>
                    </ul>

                </aside>

                <div id="main-content" className="grow-[9999] basis-[500px] bg-body-bg">
                    <div id="topbar"
                         className="flex items-center sticky top-0 h-[80px] w-full p-6 gap-4 bg-body-bg border-b border-solid border-border">

                        <div id="topbar-wrapper"
                             className="flex  items-center gap-8 py-4">

                            <button id="open-btn"
                                    className="burger-hover flex lg:hidden flex-col gap-1 p-[.125rem] cursor-pointer">
                                <span className="w-[20px] h-[2px] bg-text-light transition-all duration-200 ease-in-out"></span>
                                <span className="w-[20px] h-[2px] bg-text-light"></span>
                                <span className="w-[20px] h-[2px] bg-text-light"></span>
                            </button>

                            <div id="breadcrumbs">
                                <h3 className="text-accent uppercase tracking-tighter font-extrabold text-small">
                                    Breadcrumb
                                </h3>
                            </div>

                        </div>

                        <form action="" className="ml-auto">
                            <input type="text" id="search" placeholder="search here..."
                                   className="w-full outline-0 border-hidden border rounded-[50px] bg-body-bg-hover py-1 px-2 text-small placeholder-text-gray placeholder-small"
                            />
                        </form>

                    </div>

                    <div id="content"
                         className="p-6"
                    >
                        {children}
                    </div>

                </div>

            </main>

        </div>

    )
}

export default Layout
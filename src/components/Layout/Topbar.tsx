import Breadcrumbs from "./Breadcrumbs.tsx";

export default function Topbar({onOpen}: { onOpen: any }) {
    return (
        <div id="topbar"
             className="flex items-center sticky top-0 h-[80px] w-full p-6 gap-4 bg-body-bg border-b border-solid border-border z-[100]">

            <div id="topbar-wrapper"
                 className="flex  items-center gap-8 py-4">

                <button id="open-btn"
                        onClick={onOpen}
                        className="burger-hover flex lg:hidden flex-col gap-1 p-[.125rem] cursor-pointer">
                    <span className="w-[20px] h-[2px] bg-text-light transition-all duration-200 ease-in-out"></span>
                    <span className="w-[20px] h-[2px] bg-text-light"></span>
                    <span className="w-[20px] h-[2px] bg-text-light"></span>
                </button>

                <div id="breadcrumbs">
                    <h3 className="text-accent uppercase tracking-tighter font-extrabold text-small">
                        <Breadcrumbs/>
                    </h3>
                </div>

            </div>

            <form action="" className="ml-auto">
                <input type="text" id="search" placeholder="search here..."
                       className="w-full outline-0 border-hidden border rounded-[50px] bg-body-bg-hover py-1 px-2 text-small placeholder-text-gray placeholder-small"
                />
            </form>

        </div>
    )
}
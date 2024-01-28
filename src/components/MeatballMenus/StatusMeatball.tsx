import toDo from "../../assets/Open.svg";
import inProgress from "../../assets/inProgress.svg";
import done from "../../assets/Done.svg";

const StatusMeatball = () => {

    const statusItems = [
        {
            label: "To Do",
            icon: <img src={toDo} alt="to-do" className="w-4 h-4"/>,
            action: () => {
                console.log("status to do set")
            }
        },
        {
            label: "In Progress",
            icon: <img src={inProgress} alt="in progress" className="w-4 h-4"/>,
            action: () => {
                console.log("status in progress set")
            }
        },
        {
            label: "Done",
            icon: <img src={done} alt="done" className="w-4 h-4"/>,
            action: () => {
                console.log("status done set")
            }
        }
    ];

    return (
        <>
            {statusItems.map((item, index) => (
                <div key={index}>
                    <div
                        className="flex items-center justify-start gap-x-2 text-small text-text-gray hover:text-text-light p-2 cursor-pointer hover:bg-body-bg-hover w-[8rem]"
                        onClick={(e) => {
                            e.stopPropagation();
                            item.action();
                        }}>
                        <span className="">{item.icon}</span>
                        {item.label}
                    </div>
                </div>
            ))}
        </>
    )
}

export default StatusMeatball
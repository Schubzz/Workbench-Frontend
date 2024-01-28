import low from "../../assets/PrioLow.svg";
import medium from "../../assets/PrioMedium.svg";
import high from "../../assets/PrioHigh.svg";


const PrioMeatball = () => {

    const prioItems = [
        {
            label: "low",
            icon: <img src={low} alt="low"  className="w-6 h-6"/>,
            action: () => {

                console.log("Prio low set")
            }
        },
        {
            label: "medium",
            icon: <img src={medium} alt="medium" className="w-6 h-6"/>,
            action: () => {

                console.log("Prio medium set")
            }
        },

        {
            label: "high",
            icon: <img src={high} alt="high" className="w-6 h-6"/>,
            action: () => {

                console.log("Prio high set")
            }
        },
    ]

    return (
  <>
      {prioItems.map((item, index) => (
          <div key={index}>
              <div
                  className="flex items-center justify-start gap-x-2 text-small text-text-gray hover:text-text-light p-2 cursor-pointer hover:bg-body-bg-hover w-[7rem]"
                  onClick={(e) => {
                      e.stopPropagation();
                      item.action(); // Aufrufen der action-Funktion
                  }}>
                  <span className="">{item.icon}</span>
                  {item.label}
              </div>
          </div>
      ))}
  </>
  )
}

export default PrioMeatball
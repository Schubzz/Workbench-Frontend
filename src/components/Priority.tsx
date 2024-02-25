interface StatusObject {
    [key: string]: {
        src: string;
        alt: string;
    };
}
export const Priority : StatusObject = {
    low:
        {
            src: "../../src/assets/PrioLow.svg",
            alt: "Low Priority"
        },
    medium:
        {
            src: "../../src/assets/PrioMedium.svg",
            alt: "Medium Priority"
        },
    high:
        {
            src: "../../src/assets/PrioHigh.svg",
            alt: "High Priority"
        }
};
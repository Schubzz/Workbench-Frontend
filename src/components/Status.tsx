interface StatusObject {
    [key: string]: {
        src: string;
        alt: string;
    };
}
export const Status : StatusObject = {
    "To-Do": {src: "../../src/assets/Open.svg", alt: "to do"},
    "In Progress": {src: "../../src/assets/inProgress.svg", alt: "in progress"},
    "Done": {src: "../../src/assets/Done.svg", alt: "done"}
};
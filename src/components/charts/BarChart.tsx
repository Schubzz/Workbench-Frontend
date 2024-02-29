import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import {Bar} from 'react-chartjs-2';


ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top' as const,
        },
        title: {
            display: true,
        },
    },
};


export default function BarChart({labels, chartData, barColors}: {
    labels: string[],
    chartData: number[],
    barColors: string[]
}) {


    const data = {
        labels,
        datasets: [
            {
                label: '',
                data: chartData,
                backgroundColor: barColors,
            },
        ],
    };
    return <Bar
        className="max-w-[80vw] max-h-[10rem]"
        options={options}
        data={data}
    />;
}

// <details>
//     <summary>
//         <li className="flex flex-row w-full justify-between items-center p-2 border-b border-amber-50 hover:bg-body-bg-hover cursor-pointer rounded-md">
//             <div className="flex items-center gap-3">
//                 <div className="text-medium underline">Total Tasks: {totalTasks}</div>
//             </div>
//         </li>
//     </summary>
//     <div className="flex flex-col gap-2 bg-body-bg-hover p-4 rounded">
//         <div className="flex flex-col gap-x-2 max-w-[90%]">
//
//             {/*Tasks*/}
//             <BarChart
//                 labels={[
//                     "to-do",
//                     "in progress",
//                     "done"
//
//                 ]}
//
//                 chartData={[
//                     toDoTasks,
//                     inProgressTasks,
//                     doneTasks
//                 ]}
//
//                 barColors={[
//                     "red",
//                     "green",
//                     "blue"
//                 ]}
//             />
//
//         </div>
//     </div>
//
// </details>
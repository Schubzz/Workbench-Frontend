
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';


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
            text: 'Chart.js Bar Chart',
        },
    },
};



export default function BarChart({labels, chartData, barColors}) {


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
    return <Bar options={options} data={data} />;
}
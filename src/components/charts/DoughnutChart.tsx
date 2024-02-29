import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend
} from 'chart.js';
import {Doughnut} from 'react-chartjs-2';

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend
);

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'bottom' as const,
        },
        title: {
            display: true,
        },
    },
};

export default function DoughnutChart({labels, chartData, arkColors}: {
    labels: string[],
    chartData: number[],
    arkColors: string[],
}) {

    const data = {
        labels,
        datasets: [
            {
                label: '',
                data: chartData,
                backgroundColor: arkColors,
                borderColor: 'transparent',
                cutout: '70%',
                hoverOffset: 20,
            },
        ],
    };
    return <Doughnut
        className="relative p-6"
        options={options}
        data={data}
    />

}
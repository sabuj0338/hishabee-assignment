import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

type Props = {
  data?: number[];
  labels?: string[];
};

export default function PieChart({ data, labels }: Props) {
  return (
    <Pie
      style={{ width: "100%", maxHeight: 300, minHeight: 300 }}
      options={{
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "bottom" as const,
            // position: 'top' as const,
          },
          title: {
            display: true,
            text: "Bangladesh Population",
          },
        },
      }}
      data={{
        labels: labels,
        datasets: [
          {
            label: "Population",
            data: data,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(255, 159, 64, 0.2)',
              'rgba(255, 205, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 127, 80, 0.2)',
              'rgba(51, 221, 98, 0.2)',
              'rgba(26, 188, 156,0.2)',
              'rgba(214, 137, 16,0.2)',
              'rgba(108, 52, 131 ,0.2)',
              'rgba(203, 67, 53 ,0.2)',
              'rgba(72, 201, 176,0.2)',
              'rgba(84, 153, 199,0.2)',
            ],
            borderColor: [
              'rgb(255, 99, 132)',
              'rgb(255, 159, 64)',
              'rgb(255, 205, 86)',
              'rgb(75, 192, 192)',
              'rgb(54, 162, 235)',
              'rgb(153, 102, 255)',
              'rgb(255, 127, 80)',
              'rgb(51, 221, 98)',
              'rgb(26, 188, 156)',
              'rgb(214, 137, 16)',
              'rgb(108, 52, 131)',
              'rgb(203, 67, 53)',
              'rgb(72, 201, 176)',
              'rgb(84, 153, 199)',
            ],
            borderWidth: 1,
            // barThickness: 50,
          },
        ],
      }}
    />
  );
}

import React from "react";
import { Bar } from "react-chartjs-2";

const RouteGraph = (props) => {
  const entries = props.filteredEntries;

  const timeNumberfied = entries.map((entry) =>
    parseFloat(
      `${entry.time.split(":")[0]}.${
        (entry.time.split(":")[1] / 60).toString().split(".")[1]
      }`.slice(0, 5)
    )
  );

  const state = {
    labels: timeNumberfied,
    datasets: [
      {
        backgroundColor: "rgba(75,192,192,1)",
        borderColor: "rgba(0,0,0,1)",
        barThickness: "flex",
        data: entries.map((entry) => entry.attendee_count),
      },
    ],
  };

  return (
    <div>
      <Bar
        type="bar"
        data={state}
        options={{
          title: {
            display: true,
            text: "Attendee counts over time",
            fontSize: 20,
          },
          legend: {
            display: false,
          },
          scales: {
            xAxes: [
              {
                distribution: "linear",
              },
            ],
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                },
              },
            ],
          },
        }}
      />
    </div>
  );
};

export default RouteGraph;

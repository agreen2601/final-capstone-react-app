import React from "react";
import { Scatter } from "react-chartjs-2";

const TestGraph = (props) => {
  const entries = props.filteredEntries;

  const timeNumberfied = entries.map((entry) =>
    parseFloat(
      `${entry.time.split(":")[0]}.${
        (entry.time.split(":")[1] / 60).toString().split(".")[1]
      }`.slice(0, 5)
    )
  );

  // console.log(timeNumberfied)

  //   console.log(entries.map((entry) => (entry.time.split(":")[1] / 60).toString().split(".")[1]));

  //   console.log(entries.map((entry) => entry.time));

  const xData = timeNumberfied
  const yData = entries.map((entry) => entry.attendee_count);
  const combined = [];
  for (let i = 0; i < entries.length; i++) {
    const x = xData[i];
    const y = yData[i];
    const both = { x: x, y: y };
    combined.push(both);
  }

  //   console.log("combined", combined)

  const state = {
    datasets: [
      {
        backgroundColor: "rgba(75,192,192,1)",
        borderColor: "rgba(0,0,0,1)",
        borderWidth: 2,
        data: combined,
      },
    ],
  };

  return (
    <div>
      <Scatter
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
            // xAxes: [
            //   {
            //     labels: [-30, 30],
                type: "linear",
            //     ticks: {
            //       max: -30,
            //       min: 40,
            //       stepSize: 10,
            //     },
            //   },
            // ],
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

export default TestGraph;

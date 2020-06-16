import React from "react";
import { Bar } from "react-chartjs-2";
// import apiManager from "../api/apiManager";

const RouteGraph = (props) => {
  const entries = props.entries;

  const state = {
    labels: entries.map((entry) => entry.time),
    datasets: [
      {
        label: "Number",
        backgroundColor: "rgba(75,192,192,1)",
        borderColor: "rgba(0,0,0,1)",
        borderWidth: 2,
        data: entries.map((entry) => entry.attendee_count),
      },
    ],
  };

  return (
    <div>
      <Bar
        data={state}
        options={{
          title: {
            display: true,
            text: "Attendee counts over time",
            fontSize: 20,
          },
          scales: {
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

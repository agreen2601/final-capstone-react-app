import React from "react";
import { Bar } from "react-chartjs-2";

const TestA = (props) => {
  const entries = props.filteredEntries;

  const timesNumberfied = entries.map((entry) =>
    parseFloat(
      `${entry.time.split(":")[0]}.${
        (entry.time.split(":")[1] / 60).toString().split(".")[1]
      }`.slice(0, 5)
    )
  );

  const times = entries.map((entry) => entry.time.slice(0, 4));

  console.log(times)

  const xData = timesNumberfied;
  const yData = entries.map((entry) => entry.attendee_count);
  const combined = [];
  for (let i = 0; i < entries.length; i++) {
    const x = xData[i];
    const y = yData[i];
    const both = { x: x, y: y };
    combined.push(both);
  }

  // for (
  //   let j = parseInt(xData[xData.length - 1].toString().split(".")[0]);
  //   j < parseInt(xData[0].toString().split(".")[0]) + 1;
  //   j++
  // )

  const timeSpaced = [];
  for (let j = 9; j < 17; j++) {
    for (let i = 0; i < 60; i++) {
      if (i % 60 != 0) {
        timeSpaced.push(parseFloat(`${j}.${(i / 60).toString().slice(2, 4)}`));
      } else {
        timeSpaced.push(parseFloat(`${j}.${i / 60}`));
      }
    }
  }

  function barValue(x) {
    for (let each of combined) {
      // console.log(x, each.x, each.y);
      if (x == each.x) {
        return each.y;
      }
    }
    return 0;
  }
  console.log(timeSpaced);

  // console.log(timeSpaced.map((v) => v))

  return (
    <div>
      <Bar
        type="bar"
        data={{
          labels: timeSpaced.map((v) => v),
          datasets: [
            {
              backgroundColor: "#000",
              borderWidth: 2,
              fill: false,
              data: timeSpaced.map((v) => barValue(v)),
              yAxisID: "A",
            },
          ],
        }}
        options={{
          responsive: true,
          legend: {
            display: false,
          },
          scales: {
            xAxes: [
              {
                display: true,
                ticks: {
                  maxTicksLimit: 10,
                  callback: (value) => Math.floor(value),
                },
              },
            ],
            yAxes: [
              {
                id: "A",
                display: true,
                type: "linear",
              },
            ],
          },
        }}
      />
    </div>
  );
};

export default TestA;

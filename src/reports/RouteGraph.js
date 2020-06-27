import React from "react";
import { Bar } from "react-chartjs-2";

const RouteGraph = (props) => {
  const entries = props.filteredEntries;
  const chosenRoute = props.chosenRoute;
  const chosenLocation = props.chosenLocation;

  // round times down to nearest 10 minutes (slice off the last number) and put that and attendee counts into new array
  const times = entries.map((entry) => entry.time.slice(0, 4));
  const counts = entries.map((entry) => entry.attendee_count);
  const isolated = [];
  for (let i = 0; i < entries.length; i++) {
    isolated.push({ x: `${times[i]}0`, y: counts[i] });
  }

  const holder = {};

  // reduce duplicate times and accumulate attendee counts for those duplicate times
  isolated.forEach(function (a) {
    if (holder.hasOwnProperty(a.x)) {
      holder[a.x] = holder[a.x] + a.y;
    } else {
      holder[a.x] = a.y;
    }
  });

  const accumulated = [];

  for (const prop in holder) {
    accumulated.push({ x: prop, y: holder[prop] });
  }

  // find earliest and latest hour for width of x-axis
  let earliestHour = "";
  let latestHour = "";
  if (accumulated.length !== 0) {
    earliestHour = parseInt(accumulated[0].x);
    latestHour = parseInt(accumulated[accumulated.length - 1].x) + 1;
  }

  // break timespan into 10 minute intervals - bar graph must have data in each x position to reflect linear x-axis spacing,
  const timeSpanIntervals = [];
  for (let j = earliestHour; j < latestHour; j++) {
    for (let i = 0; i < 6; i++) {
      if (j < 10) {
        timeSpanIntervals.push(`0${j}:${i}0`);
      } else {
        timeSpanIntervals.push(`${j}:${i}0`);
      }
    }
  }

  // get the attendee count for each time interval, those with no data set y = 0 (meaning the bar has no height)
  function getAttendeeCountOrMakeZero(x) {
    for (let each of accumulated) {
      if (x === each.x) {
        return each.y;
      }
    }
    return 0;
  }

  let routeColor = "black";
  if (entries.length !== 0) {
    if (chosenLocation === "" && chosenRoute === "") {
    } else {
      routeColor = entries[0].place.route.color;
    }
  }

  return (
    <div>
      <Bar
        data={{
          labels: timeSpanIntervals.map((v) => v),
          datasets: [
            {
              backgroundColor: routeColor,
              borderColor: "black",
              borderWidth: 2,
              // fill: true,
              data: timeSpanIntervals.map((v) => getAttendeeCountOrMakeZero(v)),
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
                  maxTicksLimit: (latestHour - earliestHour + 1) * 2,
                },
              },
            ],
            yAxes: [
              {
                display: true,
              },
            ],
          },
        }}
      />
    </div>
  );
};

export default RouteGraph;
